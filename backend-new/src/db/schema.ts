import { pgTable, uuid, text, timestamp, integer, boolean, varchar, jsonb } from 'drizzle-orm/pg-core';

// ============================================
// 사용자 (승인된 회원)
// ============================================
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  memberType: varchar('member_type', { length: 20 }).notNull(), // 'business' | 'founder'
  
  // 프로필
  avatarUrl: text('avatar_url'),
  bio: text('bio'),
  company: varchar('company', { length: 255 }),
  position: varchar('position', { length: 100 }),
  
  // 파이프라인 프로필
  specialties: jsonb('specialties').$type<string[]>().default([]),
  canProvide: jsonb('can_provide').$type<string[]>().default([]),
  lookingFor: jsonb('looking_for').$type<string[]>().default([]),
  
  // 멤버십
  tier: varchar('tier', { length: 20 }).default('standard'), // standard, premium, platinum
  points: integer('points').default(0),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================
// 가입 신청
// ============================================
export const applications = pgTable('applications', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  // 기본 인증
  phone: varchar('phone', { length: 20 }).notNull(),
  phoneVerifiedAt: timestamp('phone_verified_at'),
  email: varchar('email', { length: 255 }).unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  
  // 유형
  memberType: varchar('member_type', { length: 20 }).notNull(), // 'business' | 'founder'
  
  // 사업자 정보 (JSON)
  businessInfo: jsonb('business_info').$type<{
    businessNumber: string;
    companyName: string;
    representativeName: string;
    position: string;
    foundedYear?: number;
    employeeCount?: string;
    annualRevenue?: string;
    industry: string;
    subIndustry?: string;
    businessLicenseUrl?: string;
    websiteUrl?: string;
    linkedinUrl?: string;
    verifiedAt?: string;
    businessStatus?: string;
  }>(),
  
  // 창업자 정보 (JSON)
  founderInfo: jsonb('founder_info').$type<{
    currentStage: string;
    selfIntroduction: string;
    portfolioUrl: string;
    businessPlanUrl?: string;
    linkedinUrl?: string;
  }>(),
  
  // Give & Take
  canProvide: jsonb('can_provide').$type<string[]>().default([]),
  lookingFor: jsonb('looking_for').$type<string[]>().default([]),
  
  // 기타
  motivation: text('motivation'),
  referralCode: varchar('referral_code', { length: 50 }),
  
  // 상태
  status: varchar('status', { length: 20 }).default('pending'), // pending, reviewing, approved, rejected
  rejectionReason: text('rejection_reason'),
  reviewedAt: timestamp('reviewed_at'),
  reviewedBy: uuid('reviewed_by'),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================
// 게시글
// ============================================
export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  authorId: uuid('author_id').references(() => users.id).notNull(),
  
  title: varchar('title', { length: 500 }).notNull(),
  content: text('content').notNull(),
  category: varchar('category', { length: 50 }).notNull(), // 'general', 'qna', 'networking', 'deals'
  
  views: integer('views').default(0),
  likeCount: integer('like_count').default(0),
  commentCount: integer('comment_count').default(0),
  
  imageUrls: jsonb('image_urls').$type<string[]>().default([]),
  
  isPinned: boolean('is_pinned').default(false),
  isDeleted: boolean('is_deleted').default(false),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================
// 댓글
// ============================================
export const comments = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id').references(() => posts.id).notNull(),
  authorId: uuid('author_id').references(() => users.id).notNull(),
  parentId: uuid('parent_id'), // 대댓글용
  
  content: text('content').notNull(),
  
  likeCount: integer('like_count').default(0),
  isDeleted: boolean('is_deleted').default(false),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================
// 좋아요
// ============================================
export const likes = pgTable('likes', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  
  postId: uuid('post_id').references(() => posts.id),
  commentId: uuid('comment_id').references(() => comments.id),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================
// 북마크 (저장)
// ============================================
export const bookmarks = pgTable('bookmarks', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  postId: uuid('post_id').references(() => posts.id).notNull(),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================
// 인사이트 (AI 뉴스 요약)
// ============================================
export const insights = pgTable('insights', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  source: varchar('source', { length: 100 }).notNull(), // 'TechCrunch', 'VentureBeat' 등
  country: varchar('country', { length: 20 }).notNull(), // 'US', 'JP', 'KR' 등
  
  originalUrl: text('original_url').unique().notNull(),
  originalTitle: text('original_title').notNull(),
  
  aiSummary: jsonb('ai_summary').$type<string[]>().default([]),
  actionIdea: text('action_idea'),
  
  krCheck: jsonb('kr_check').$type<{
    similarService: string;
    regulation: string;
    barrier: string;
  }>(),
  
  tags: jsonb('tags').$type<string[]>().default([]),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================
// 인사이트 저장 (북마크)
// ============================================
export const insightSaves = pgTable('insight_saves', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  insightId: uuid('insight_id').references(() => insights.id).notNull(),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================
// 채팅방
// ============================================
export const chatRooms = pgTable('chat_rooms', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  // 1:1 채팅
  user1Id: uuid('user1_id').references(() => users.id).notNull(),
  user2Id: uuid('user2_id').references(() => users.id).notNull(),
  
  lastMessageAt: timestamp('last_message_at'),
  lastMessage: text('last_message'),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================
// 메시지
// ============================================
export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  roomId: uuid('room_id').references(() => chatRooms.id).notNull(),
  senderId: uuid('sender_id').references(() => users.id).notNull(),
  
  content: text('content').notNull(),
  
  isRead: boolean('is_read').default(false),
  readAt: timestamp('read_at'),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================
// 알림
// ============================================
export const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  
  type: varchar('type', { length: 50 }).notNull(), // 'comment', 'like', 'message', 'system'
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content'),
  
  linkType: varchar('link_type', { length: 50 }), // 'post', 'chat', 'profile'
  linkId: uuid('link_id'),
  
  isRead: boolean('is_read').default(false),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================
// SMS 인증 (임시)
// ============================================
export const smsVerifications = pgTable('sms_verifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  phone: varchar('phone', { length: 20 }).notNull(),
  code: varchar('code', { length: 6 }).notNull(),
  
  expiresAt: timestamp('expires_at').notNull(),
  verifiedAt: timestamp('verified_at'),
  attempts: integer('attempts').default(0),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
