import { Hono } from 'hono';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { db } from '../db';
import { users, applications, smsVerifications } from '../db/schema';
import { eq, and, gt } from 'drizzle-orm';
import { generateToken } from '../middleware/auth';

const auth = new Hono();

// ============================================
// 로그인
// ============================================
auth.post('/login', async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;
    
    if (!email || !password) {
      return c.json({ error: '이메일과 비밀번호를 입력해주세요.' }, 400);
    }
    
    // 사용자 조회
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    
    if (!user) {
      return c.json({ error: '이메일 또는 비밀번호가 올바르지 않습니다.' }, 401);
    }
    
    // 비밀번호 확인
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return c.json({ error: '이메일 또는 비밀번호가 올바르지 않습니다.' }, 401);
    }
    
    // 토큰 생성
    const token = generateToken(user.id);
    
    return c.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        memberType: user.memberType,
        avatarUrl: user.avatarUrl,
        tier: user.tier,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return c.json({ error: '로그인 중 오류가 발생했습니다.' }, 500);
  }
});

// ============================================
// 이메일 중복 확인
// ============================================
auth.post('/check-email', async (c) => {
  try {
    const { email } = await c.req.json();
    
    if (!email) {
      return c.json({ error: '이메일을 입력해주세요.' }, 400);
    }
    
    // 기존 사용자 확인
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    
    // 기존 신청 확인
    const existingApplication = await db.query.applications.findFirst({
      where: eq(applications.email, email),
    });
    
    if (existingUser) {
      return c.json({ available: false, reason: '이미 가입된 이메일입니다.' });
    }
    
    if (existingApplication) {
      return c.json({ 
        available: false, 
        reason: '이미 신청된 이메일입니다.',
        status: existingApplication.status,
      });
    }
    
    return c.json({ available: true });
  } catch (error) {
    console.error('Check email error:', error);
    return c.json({ error: '확인 중 오류가 발생했습니다.' }, 500);
  }
});

// ============================================
// SMS 인증번호 발송 (임시 - 실제론 알리고 연동)
// ============================================
auth.post('/sms/send', async (c) => {
  try {
    const { phone } = await c.req.json();
    
    if (!phone) {
      return c.json({ error: '전화번호를 입력해주세요.' }, 400);
    }
    
    // 6자리 인증번호 생성
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // 3분 후 만료
    const expiresAt = new Date(Date.now() + 3 * 60 * 1000);
    
    // DB에 저장
    await db.insert(smsVerifications).values({
      phone,
      code,
      expiresAt,
    });
    
    // TODO: 실제 SMS 발송 (알리고 연동)
    console.log(`[SMS] ${phone}: ${code}`); // 개발용 로그
    
    return c.json({ 
      success: true, 
      message: '인증번호가 발송되었습니다.',
      expiresAt: expiresAt.toISOString(),
      // 개발 환경에서만 코드 노출
      ...(process.env.NODE_ENV === 'development' && { code }),
    });
  } catch (error) {
    console.error('SMS send error:', error);
    return c.json({ error: '인증번호 발송 중 오류가 발생했습니다.' }, 500);
  }
});

// ============================================
// SMS 인증번호 확인
// ============================================
auth.post('/sms/verify', async (c) => {
  try {
    const { phone, code } = await c.req.json();
    
    if (!phone || !code) {
      return c.json({ error: '전화번호와 인증번호를 입력해주세요.' }, 400);
    }
    
    // 유효한 인증번호 조회
    const verification = await db.query.smsVerifications.findFirst({
      where: and(
        eq(smsVerifications.phone, phone),
        eq(smsVerifications.code, code),
        gt(smsVerifications.expiresAt, new Date()),
      ),
    });
    
    if (!verification) {
      return c.json({ error: '인증번호가 올바르지 않거나 만료되었습니다.' }, 400);
    }
    
    // 인증 완료 처리
    await db
      .update(smsVerifications)
      .set({ verifiedAt: new Date() })
      .where(eq(smsVerifications.id, verification.id));
    
    return c.json({ 
      success: true, 
      message: '인증이 완료되었습니다.',
    });
  } catch (error) {
    console.error('SMS verify error:', error);
    return c.json({ error: '인증 확인 중 오류가 발생했습니다.' }, 500);
  }
});

export default auth;
