import 'dotenv/config';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { testConnection } from './db';
import { serve } from '@hono/node-server';
import { initSocket } from './services/socket';

// Routes
import authRoutes from './routes/auth';
import usersRoutes from './routes/users';
import postsRoutes from './routes/posts';
import insightsRoutes from './routes/insights';
import uploadsRoutes from './routes/uploads';
import adminRoutes from './routes/admin';
import { fetchAllFeeds } from './services/rss';
import { analyzeNews } from './services/claude';
import { db } from './db';
import { insights } from './db/schema';
import { eq } from 'drizzle-orm';

const app = new Hono();

// ============================================
// 미들웨어
// ============================================
app.use('*', logger());
app.use(
  '*',
  cors({
    origin: ['http://localhost:3000', 'https://the1percent.com'], // 프론트엔드 도메인
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// ============================================
// 헬스 체크
// ============================================
app.get('/', (c) => {
  return c.json({
    name: 'THE 1% API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
  });
});

app.get('/health', async (c) => {
  const dbConnected = await testConnection();
  return c.json({
    status: dbConnected ? 'healthy' : 'unhealthy',
    database: dbConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
});

// ============================================
// API 라우트
// ============================================
app.route('/api/auth', authRoutes);
app.route('/api/users', usersRoutes);
app.route('/api/posts', postsRoutes);
app.route('/api/insights', insightsRoutes);
app.route('/api/uploads', uploadsRoutes);
app.route('/api/admin', adminRoutes);

// Manual Cron Trigger
app.get('/api/cron/fetch-news', async (c) => {
  try {
    console.log('🔄 Manually triggering news fetch (2026-01-01 ~ 2026-01-07)...');
    const allItems = await fetchAllFeeds();

    let savedCount = 0;
    const startDate = new Date('2026-01-01T00:00:00');
    const endDate = new Date('2026-01-07T23:59:59');

    for (const item of allItems) {
      const itemDate = new Date(item.pubDate);

      // Filter by date range
      if (itemDate >= startDate && itemDate <= endDate) {
        // Check existence
        const existing = await db.select().from(insights).where(eq(insights.originalUrl, item.link));
        if (existing.length === 0) {
          await db.insert(insights).values({
            source: item.source,
            country: item.country,
            originalUrl: item.link,
            originalTitle: item.title,
            // Use AI service if available, or fallback to content snippet
            aiSummary: [item.content.substring(0, 300) + "..."],
            actionIdea: "AI Analysis Pending...",
            tags: [],
            createdAt: itemDate, // Store original date if schema allows, otherwise defaults to now
            krCheck: { similarService: "", regulation: "", barrier: "" }
          });
          savedCount++;
        }
      }
    }

    console.log(`📰 Processed ${allItems.length} items. Saved ${savedCount} items from range.`);
    return c.json({ success: true, processed: allItems.length, saved: savedCount, dateRange: "2026-01-01 ~ 2026-01-07" });
  } catch (e: any) {
    console.error(e);
    return c.json({ error: e.message }, 500);
  }
});

// ============================================
// 404 핸들러
// ============================================
app.notFound((c) => {
  return c.json({ error: 'Not Found' }, 404);
});

// ============================================
// 에러 핸들러
// ============================================
app.onError((err, c) => {
  console.error('Unhandled error:', err);
  return c.json({ error: 'Internal Server Error' }, 500);
});

// ============================================
// 서버 시작
// ============================================
const port = parseInt(process.env.PORT || '3001');

console.log(`
╔════════════════════════════════════════╗
║                                        ║
║     🚀 THE 1% API Server              ║
║                                        ║
║     Port: ${port}                         ║
║     Env: ${process.env.NODE_ENV || 'development'}               ║
║                                        ║
╚════════════════════════════════════════╝
`);

// DB 연결 테스트
testConnection();

// Initialize Socket.io
const server = serve({
  fetch: app.fetch,
  port
});

initSocket(server as any);

// Cron Jobs
import { CronJob } from 'cron';

// Run every 6 hours
new CronJob('0 */6 * * *', async () => {
  console.log('🔄 Running scheduled news fetch (Every 6 hours)...');
  try {
    const allItems = await fetchAllFeeds();
    // ... (reuse logic from insights route or extract to service)
    // For brevity, logging count here, actual processing should be in a service
    console.log(`📰 Fetched ${allItems.length} items from RSS`);
  } catch (e) {
    console.error('Cron error:', e);
  }
}, null, true, 'Asia/Seoul');
