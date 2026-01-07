import { Hono } from 'hono';
import { db } from '../db';
import { insights, insightSaves } from '../db/schema';
import { eq, desc, and } from 'drizzle-orm';
import { authMiddleware, optionalAuthMiddleware } from '../middleware/auth';
import { fetchAllFeeds, fetchFeed, RSS_FEEDS } from '../services/rss';
import { analyzeNews } from '../services/claude';

const insightsRouter = new Hono();

// ============================================
// 인사이트 목록 조회
// ============================================
insightsRouter.get('/', optionalAuthMiddleware, async (c) => {
  try {
    const limit = parseInt(c.req.query('limit') || '20');
    const offset = parseInt(c.req.query('offset') || '0');
    const country = c.req.query('country'); // 필터: US, JP, KR 등
    
    let query = db.query.insights.findMany({
      orderBy: [desc(insights.createdAt)],
      limit,
      offset,
    });
    
    const data = await query;
    
    // 로그인한 경우 저장 여부 체크
    const userId = c.get('userId');
    let savedIds: string[] = [];
    
    if (userId) {
      const saves = await db.query.insightSaves.findMany({
        where: eq(insightSaves.userId, userId),
      });
      savedIds = saves.map(s => s.insightId);
    }
    
    const result = data.map(insight => ({
      ...insight,
      isSaved: savedIds.includes(insight.id),
    }));
    
    return c.json({ data: result });
  } catch (error) {
    console.error('Get insights error:', error);
    return c.json({ error: '인사이트 조회 중 오류가 발생했습니다.' }, 500);
  }
});

// ============================================
// 인사이트 상세 조회
// ============================================
insightsRouter.get('/:id', optionalAuthMiddleware, async (c) => {
  try {
    const id = c.req.param('id');
    
    const insight = await db.query.insights.findFirst({
      where: eq(insights.id, id),
    });
    
    if (!insight) {
      return c.json({ error: '인사이트를 찾을 수 없습니다.' }, 404);
    }
    
    // 저장 여부 체크
    const userId = c.get('userId');
    let isSaved = false;
    
    if (userId) {
      const save = await db.query.insightSaves.findFirst({
        where: and(
          eq(insightSaves.userId, userId),
          eq(insightSaves.insightId, id),
        ),
      });
      isSaved = !!save;
    }
    
    return c.json({ ...insight, isSaved });
  } catch (error) {
    console.error('Get insight error:', error);
    return c.json({ error: '인사이트 조회 중 오류가 발생했습니다.' }, 500);
  }
});

// ============================================
// 인사이트 저장/취소 (토글)
// ============================================
insightsRouter.post('/:id/save', authMiddleware, async (c) => {
  try {
    const id = c.req.param('id');
    const userId = c.get('userId');
    
    // 기존 저장 확인
    const existing = await db.query.insightSaves.findFirst({
      where: and(
        eq(insightSaves.userId, userId),
        eq(insightSaves.insightId, id),
      ),
    });
    
    if (existing) {
      // 이미 저장됨 → 삭제
      await db.delete(insightSaves).where(eq(insightSaves.id, existing.id));
      return c.json({ saved: false, message: '저장이 취소되었습니다.' });
    } else {
      // 저장 안 됨 → 추가
      await db.insert(insightSaves).values({
        userId,
        insightId: id,
      });
      return c.json({ saved: true, message: '저장되었습니다.' });
    }
  } catch (error) {
    console.error('Save insight error:', error);
    return c.json({ error: '저장 중 오류가 발생했습니다.' }, 500);
  }
});

// ============================================
// 뉴스 수동 새로고침 (관리자용)
// ============================================
insightsRouter.post('/refresh', async (c) => {
  try {
    console.log('🔄 Starting news refresh...');
    
    const allItems = await fetchAllFeeds();
    console.log(`📰 Fetched ${allItems.length} items from RSS`);
    
    let processed = 0;
    let skipped = 0;
    
    for (const item of allItems.slice(0, 10)) { // 한 번에 10개만
      // 중복 체크
      const existing = await db.query.insights.findFirst({
        where: eq(insights.originalUrl, item.link),
      });
      
      if (existing) {
        skipped++;
        continue;
      }
      
      // Claude로 분석
      console.log(`🤖 Analyzing: ${item.title}`);
      const analysis = await analyzeNews(item);
      
      if (analysis) {
        await db.insert(insights).values({
          source: item.source,
          country: item.country,
          originalUrl: item.link,
          originalTitle: item.title,
          aiSummary: analysis.summary || [],
          actionIdea: analysis.actionIdea || '',
          krCheck: analysis.krCheck || {},
          tags: analysis.tags || [],
        });
        processed++;
        console.log(`✅ Saved: ${item.title}`);
      }
    }
    
    return c.json({ 
      success: true, 
      message: `${processed}개 인사이트 생성, ${skipped}개 스킵`,
      processed,
      skipped,
    });
  } catch (error) {
    console.error('Refresh error:', error);
    return c.json({ error: '새로고침 중 오류가 발생했습니다.' }, 500);
  }
});

export default insightsRouter;
