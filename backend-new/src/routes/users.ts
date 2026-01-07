import { Hono } from 'hono';
import { db } from '../db';
import { users } from '../db/schema';
import { eq, ilike, or } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth';

const usersRouter = new Hono();

// ============================================
// 내 프로필 조회
// ============================================
usersRouter.get('/me', authMiddleware, async (c) => {
  try {
    const user = c.get('user');
    
    return c.json({
      id: user.id,
      email: user.email,
      phone: user.phone,
      name: user.name,
      memberType: user.memberType,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      company: user.company,
      position: user.position,
      specialties: user.specialties,
      canProvide: user.canProvide,
      lookingFor: user.lookingFor,
      tier: user.tier,
      points: user.points,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error('Get me error:', error);
    return c.json({ error: '프로필 조회 중 오류가 발생했습니다.' }, 500);
  }
});

// ============================================
// 내 프로필 수정
// ============================================
usersRouter.patch('/me', authMiddleware, async (c) => {
  try {
    const userId = c.get('userId');
    const body = await c.req.json();
    
    const allowedFields = [
      'name',
      'avatarUrl',
      'bio',
      'company',
      'position',
      'specialties',
      'canProvide',
      'lookingFor',
    ];
    
    const updateData: Record<string, any> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }
    updateData.updatedAt = new Date();
    
    const [updated] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, userId))
      .returning();
    
    return c.json(updated);
  } catch (error) {
    console.error('Update me error:', error);
    return c.json({ error: '프로필 수정 중 오류가 발생했습니다.' }, 500);
  }
});

// ============================================
// 멤버 목록 (파이프라인)
// ============================================
usersRouter.get('/', authMiddleware, async (c) => {
  try {
    const limit = parseInt(c.req.query('limit') || '20');
    const offset = parseInt(c.req.query('offset') || '0');
    const search = c.req.query('search');
    const memberType = c.req.query('memberType');
    
    let query = db
      .select({
        id: users.id,
        name: users.name,
        avatarUrl: users.avatarUrl,
        bio: users.bio,
        company: users.company,
        position: users.position,
        memberType: users.memberType,
        specialties: users.specialties,
        canProvide: users.canProvide,
        lookingFor: users.lookingFor,
        tier: users.tier,
      })
      .from(users)
      .limit(limit)
      .offset(offset);
    
    const data = await query;
    
    // 검색 필터링 (간단 버전)
    let filtered = data;
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = data.filter(
        u =>
          u.name?.toLowerCase().includes(searchLower) ||
          u.company?.toLowerCase().includes(searchLower) ||
          u.position?.toLowerCase().includes(searchLower)
      );
    }
    if (memberType) {
      filtered = filtered.filter(u => u.memberType === memberType);
    }
    
    return c.json({ data: filtered });
  } catch (error) {
    console.error('Get users error:', error);
    return c.json({ error: '멤버 조회 중 오류가 발생했습니다.' }, 500);
  }
});

// ============================================
// 멤버 상세 조회
// ============================================
usersRouter.get('/:id', authMiddleware, async (c) => {
  try {
    const id = c.req.param('id');
    
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });
    
    if (!user) {
      return c.json({ error: '멤버를 찾을 수 없습니다.' }, 404);
    }
    
    // 민감한 정보 제외
    return c.json({
      id: user.id,
      name: user.name,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      company: user.company,
      position: user.position,
      memberType: user.memberType,
      specialties: user.specialties,
      canProvide: user.canProvide,
      lookingFor: user.lookingFor,
      tier: user.tier,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error('Get user error:', error);
    return c.json({ error: '멤버 조회 중 오류가 발생했습니다.' }, 500);
  }
});

export default usersRouter;
