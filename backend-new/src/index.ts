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
    const year = c.req.query('year');
    const targetYear = year === '2025' ? 2025 : 2026;

    console.log(`🔄 Manually triggering news fetch for Year ${targetYear}...`);
    const allItems = await fetchAllFeeds();

    let savedCount = 0;
    const sourceCounts: Record<string, number> = {};

    for (const item of allItems) {
      // Limit to 10 items per source if simulating 2025
      if (targetYear === 2025) {
        sourceCounts[item.source] = (sourceCounts[item.source] || 0) + 1;
        if (sourceCounts[item.source] > 10) continue;
      }

      // Determine Date
      let itemDate: Date;
      if (targetYear === 2025) {
        // Random date in 2025
        const start = new Date('2025-01-01').getTime();
        const end = new Date('2025-12-31').getTime();
        itemDate = new Date(start + Math.random() * (end - start));
      } else {
        // Time-shift to Jan 2026 (current logic)
        // Use a simple hash of the title to deterministically pick a day in the first week
        const hash = item.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const dayOffset = hash % 7;
        itemDate = new Date(`2026-01-0${dayOffset + 1}T09:00:00`);
      }

      // Check existence based on URL and Year (to allow same item in different simulated years if needed, 
      // but for now strict URL check is safer to avoid clutter)
      const existing = await db.select().from(insights).where(eq(insights.originalUrl, item.link));

      if (existing.length === 0) {
        await db.insert(insights).values({
          source: item.source,
          country: item.country,
          originalUrl: item.link,
          originalTitle: item.title,
          aiSummary: [item.content.substring(0, 300) + "..."],
          actionIdea: targetYear === 2025 ? "2025 Best Practice Analysis" : "AI Analysis Pending...",
          tags: targetYear === 2025 ? ["2025", "Best"] : [],
          createdAt: itemDate,
          krCheck: { similarService: "", regulation: "", barrier: "" }
        });
        savedCount++;
      }
    }

    console.log(`📰 Processed ${allItems.length} items. Saved ${savedCount} items for ${targetYear}.`);
    return c.json({ success: true, processed: allItems.length, saved: savedCount, year: targetYear });
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
