import { Hono } from 'hono';
import { db } from '../db';
import { posts, comments, likes, bookmarks, users } from '../db/schema';
import { eq, desc, and, sql } from 'drizzle-orm';
import { authMiddleware, optionalAuthMiddleware } from '../middleware/auth';
import { getIO, EVENTS } from '../services/socket';

const postsRouter = new Hono();

// ============================================
// 게시글 목록 조회
// ============================================
postsRouter.get('/', optionalAuthMiddleware, async (c) => {
  try {
    const limit = parseInt(c.req.query('limit') || '20');
    const offset = parseInt(c.req.query('offset') || '0');
    const category = c.req.query('category');

    const data = await db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        category: posts.category,
        views: posts.views,
        likeCount: posts.likeCount,
        commentCount: posts.commentCount,
        createdAt: posts.createdAt,
        authorId: posts.authorId,
        authorName: users.name,
        authorAvatar: users.avatarUrl,
        authorCompany: users.company,
        authorPosition: users.position,
      })
      .from(posts)
      .leftJoin(users, eq(posts.authorId, users.id))
      .where(eq(posts.isDeleted, false))
      .orderBy(desc(posts.createdAt))
      .limit(limit)
      .offset(offset);

    // 로그인한 경우 좋아요/북마크 여부 체크
    const userId = c.get('userId');

    if (userId) {
      const postIds = data.map(p => p.id);

      const userLikes = await db.query.likes.findMany({
        where: and(
          eq(likes.userId, userId),
          sql`${likes.postId} IN ${postIds}`,
        ),
      });

      const userBookmarks = await db.query.bookmarks.findMany({
        where: and(
          eq(bookmarks.userId, userId),
          sql`${bookmarks.postId} IN ${postIds}`,
        ),
      });

      const likedIds = userLikes.map(l => l.postId);
      const bookmarkedIds = userBookmarks.map(b => b.postId);

      return c.json({
        data: data.map(post => ({
          ...post,
          author: {
            id: post.authorId,
            name: post.authorName,
            avatarUrl: post.authorAvatar,
            company: post.authorCompany,
            position: post.authorPosition,
          },
          isLiked: likedIds.includes(post.id),
          isSaved: bookmarkedIds.includes(post.id),
        })),
      });
    }

    return c.json({
      data: data.map(post => ({
        ...post,
        author: {
          id: post.authorId,
          name: post.authorName,
          avatarUrl: post.authorAvatar,
          company: post.authorCompany,
          position: post.authorPosition,
        },
        isLiked: false,
        isSaved: false,
      })),
    });
  } catch (error) {
    console.error('Get posts error:', error);
    return c.json({ error: '게시글 조회 중 오류가 발생했습니다.' }, 500);
  }
});

// ============================================
// 게시글 상세 조회
// ============================================
postsRouter.get('/:id', optionalAuthMiddleware, async (c) => {
  try {
    const id = c.req.param('id');

    // 조회수 증가
    await db
      .update(posts)
      .set({ views: sql`${posts.views} + 1` })
      .where(eq(posts.id, id));

    const post = await db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        category: posts.category,
        views: posts.views,
        likeCount: posts.likeCount,
        commentCount: posts.commentCount,
        imageUrls: posts.imageUrls,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        authorId: posts.authorId,
        authorName: users.name,
        authorAvatar: users.avatarUrl,
        authorCompany: users.company,
        authorPosition: users.position,
      })
      .from(posts)
      .leftJoin(users, eq(posts.authorId, users.id))
      .where(eq(posts.id, id))
      .limit(1);

    if (!post[0]) {
      return c.json({ error: '게시글을 찾을 수 없습니다.' }, 404);
    }

    // 댓글 조회
    const postComments = await db
      .select({
        id: comments.id,
        content: comments.content,
        parentId: comments.parentId,
        likeCount: comments.likeCount,
        createdAt: comments.createdAt,
        authorId: comments.authorId,
        authorName: users.name,
        authorAvatar: users.avatarUrl,
      })
      .from(comments)
      .leftJoin(users, eq(comments.authorId, users.id))
      .where(and(eq(comments.postId, id), eq(comments.isDeleted, false)))
      .orderBy(comments.createdAt);

    // 좋아요/북마크 여부
    const userId = c.get('userId');
    let isLiked = false;
    let isSaved = false;

    if (userId) {
      const like = await db.query.likes.findFirst({
        where: and(eq(likes.userId, userId), eq(likes.postId, id)),
      });
      const bookmark = await db.query.bookmarks.findFirst({
        where: and(eq(bookmarks.userId, userId), eq(bookmarks.postId, id)),
      });
      isLiked = !!like;
      isSaved = !!bookmark;
    }

    return c.json({
      ...post[0],
      author: {
        id: post[0].authorId,
        name: post[0].authorName,
        avatarUrl: post[0].authorAvatar,
        company: post[0].authorCompany,
        position: post[0].authorPosition,
      },
      comments: postComments.map(comment => ({
        ...comment,
        author: {
          id: comment.authorId,
          name: comment.authorName,
          avatarUrl: comment.authorAvatar,
        },
      })),
      isLiked,
      isSaved,
    });
  } catch (error) {
    console.error('Get post error:', error);
    return c.json({ error: '게시글 조회 중 오류가 발생했습니다.' }, 500);
  }
});

// ============================================
// 게시글 작성
// ============================================
postsRouter.post('/', authMiddleware, async (c) => {
  try {
    const userId = c.get('userId');
    const { title, content, category, imageUrls } = await c.req.json();

    if (!title || !content || !category) {
      return c.json({ error: '제목, 내용, 카테고리는 필수입니다.' }, 400);
    }

    const [newPost] = await db
      .insert(posts)
      .values({
        authorId: userId,
        title,
        content,
        category,
        imageUrls: imageUrls || [],
      })
      .returning();

    try {
      getIO().emit(EVENTS.POST_CREATE, newPost);
    } catch (e) {
      console.error(e);
    }

    return c.json(newPost, 201);
  } catch (error) {
    console.error('Create post error:', error);
    return c.json({ error: '게시글 작성 중 오류가 발생했습니다.' }, 500);
  }
});

// ============================================
// 게시글 수정
// ============================================
postsRouter.patch('/:id', authMiddleware, async (c) => {
  try {
    const id = c.req.param('id');
    const userId = c.get('userId');
    const { title, content, category, imageUrls } = await c.req.json();

    // 작성자 확인
    const post = await db.query.posts.findFirst({
      where: eq(posts.id, id),
    });

    if (!post) {
      return c.json({ error: '게시글을 찾을 수 없습니다.' }, 404);
    }

    if (post.authorId !== userId) {
      return c.json({ error: '수정 권한이 없습니다.' }, 403);
    }

    const [updated] = await db
      .update(posts)
      .set({
        ...(title && { title }),
        ...(content && { content }),
        ...(category && { category }),
        ...(imageUrls && { imageUrls }),
        updatedAt: new Date(),
      })
      .where(eq(posts.id, id))
      .returning();

    return c.json(updated);
  } catch (error) {
    console.error('Update post error:', error);
    return c.json({ error: '게시글 수정 중 오류가 발생했습니다.' }, 500);
  }
});

// ============================================
// 게시글 삭제
// ============================================
postsRouter.delete('/:id', authMiddleware, async (c) => {
  try {
    const id = c.req.param('id');
    const userId = c.get('userId');

    const post = await db.query.posts.findFirst({
      where: eq(posts.id, id),
    });

    if (!post) {
      return c.json({ error: '게시글을 찾을 수 없습니다.' }, 404);
    }

    if (post.authorId !== userId) {
      return c.json({ error: '삭제 권한이 없습니다.' }, 403);
    }

    await db
      .update(posts)
      .set({ isDeleted: true })
      .where(eq(posts.id, id));

    return c.json({ success: true, message: '삭제되었습니다.' });
  } catch (error) {
    console.error('Delete post error:', error);
    return c.json({ error: '게시글 삭제 중 오류가 발생했습니다.' }, 500);
  }
});

// ============================================
// 좋아요 토글
// ============================================
postsRouter.post('/:id/like', authMiddleware, async (c) => {
  try {
    const id = c.req.param('id');
    const userId = c.get('userId');

    const existing = await db.query.likes.findFirst({
      where: and(eq(likes.userId, userId), eq(likes.postId, id)),
    });

    if (existing) {
      // 좋아요 취소
      await db.delete(likes).where(eq(likes.id, existing.id));
      await db
        .update(posts)
        .set({ likeCount: sql`${posts.likeCount} - 1` })
        .where(eq(posts.id, id));


      try { getIO().emit(EVENTS.LIKE_UPDATE, { postId: id, liked: false }); } catch (e) { }

      return c.json({ liked: false });
    } else {
      // 좋아요
      await db.insert(likes).values({ userId, postId: id });
      await db
        .update(posts)
        .set({ likeCount: sql`${posts.likeCount} + 1` })
        .where(eq(posts.id, id));


      try { getIO().emit(EVENTS.LIKE_UPDATE, { postId: id, liked: true }); } catch (e) { }

      return c.json({ liked: true });
    }
  } catch (error) {
    console.error('Like post error:', error);
    return c.json({ error: '좋아요 처리 중 오류가 발생했습니다.' }, 500);
  }
});

// ============================================
// 북마크 토글
// ============================================
postsRouter.post('/:id/bookmark', authMiddleware, async (c) => {
  try {
    const id = c.req.param('id');
    const userId = c.get('userId');

    const existing = await db.query.bookmarks.findFirst({
      where: and(eq(bookmarks.userId, userId), eq(bookmarks.postId, id)),
    });

    if (existing) {
      await db.delete(bookmarks).where(eq(bookmarks.id, existing.id));
      return c.json({ saved: false });
    } else {
      await db.insert(bookmarks).values({ userId, postId: id });
      return c.json({ saved: true });
    }
  } catch (error) {
    console.error('Bookmark post error:', error);
    return c.json({ error: '북마크 처리 중 오류가 발생했습니다.' }, 500);
  }
});

// ============================================
// 댓글 작성
// ============================================
postsRouter.post('/:id/comments', authMiddleware, async (c) => {
  try {
    const postId = c.req.param('id');
    const userId = c.get('userId');
    const { content, parentId } = await c.req.json();

    if (!content) {
      return c.json({ error: '내용을 입력해주세요.' }, 400);
    }

    const [newComment] = await db
      .insert(comments)
      .values({
        postId,
        authorId: userId,
        content,
        parentId: parentId || null,
      })
      .returning();

    // 댓글 수 증가
    await db
      .update(posts)
      .set({ commentCount: sql`${posts.commentCount} + 1` })
      .where(eq(posts.id, postId));

    try {
      getIO().emit(EVENTS.COMMENT_CREATE, newComment);
    } catch (e) {
      console.error(e);
    }

    return c.json(newComment, 201);
  } catch (error) {
    console.error('Create comment error:', error);
    return c.json({ error: '댓글 작성 중 오류가 발생했습니다.' }, 500);
  }
});

export default postsRouter;
