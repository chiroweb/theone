import { Context, Next } from 'hono';
import jwt from 'jsonwebtoken';
import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

const JWT_SECRET = process.env.JWT_SECRET!;

// ============================================
// JWT 토큰 생성
// ============================================
export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

// ============================================
// JWT 토큰 검증
// ============================================
export function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch {
    return null;
  }
}

// ============================================
// 인증 미들웨어 (필수)
// ============================================
export async function authMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: '인증이 필요합니다.' }, 401);
  }
  
  const token = authHeader.substring(7);
  const payload = verifyToken(token);
  
  if (!payload) {
    return c.json({ error: '유효하지 않은 토큰입니다.' }, 401);
  }
  
  // 사용자 조회
  const user = await db.query.users.findFirst({
    where: eq(users.id, payload.userId),
  });
  
  if (!user) {
    return c.json({ error: '사용자를 찾을 수 없습니다.' }, 401);
  }
  
  // Context에 사용자 정보 저장
  c.set('user', user);
  c.set('userId', user.id);
  
  await next();
}

// ============================================
// 인증 미들웨어 (선택 - 비로그인도 허용)
// ============================================
export async function optionalAuthMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header('Authorization');
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const payload = verifyToken(token);
    
    if (payload) {
      const user = await db.query.users.findFirst({
        where: eq(users.id, payload.userId),
      });
      
      if (user) {
        c.set('user', user);
        c.set('userId', user.id);
      }
    }
  }
  
  await next();
}
