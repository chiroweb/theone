import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth';
import { uploadFile, deleteFile, UPLOAD_PATHS } from '../services/s3';

const uploadsRouter = new Hono();

// ============================================
// 파일 업로드
// ============================================
uploadsRouter.post('/', authMiddleware, async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string;
    
    if (!file) {
      return c.json({ error: '파일을 선택해주세요.' }, 400);
    }
    
    // 파일 크기 제한 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      return c.json({ error: '파일 크기는 10MB 이하여야 합니다.' }, 400);
    }
    
    // 허용된 타입 확인
    const allowedTypes = ['avatar', 'business_license', 'portfolio', 'post_image', 'chat_file'];
    if (!allowedTypes.includes(type)) {
      return c.json({ error: '허용되지 않은 파일 유형입니다.' }, 400);
    }
    
    // 경로 매핑
    const pathMap: Record<string, string> = {
      avatar: UPLOAD_PATHS.AVATAR,
      business_license: UPLOAD_PATHS.BUSINESS_LICENSE,
      portfolio: UPLOAD_PATHS.PORTFOLIO,
      post_image: UPLOAD_PATHS.POST_IMAGE,
      chat_file: UPLOAD_PATHS.CHAT_FILE,
    };
    
    const path = pathMap[type];
    const result = await uploadFile(file, path, file.type);
    
    return c.json({
      success: true,
      url: result.url,
      key: result.key,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return c.json({ error: '파일 업로드 중 오류가 발생했습니다.' }, 500);
  }
});

// ============================================
// 파일 삭제
// ============================================
uploadsRouter.delete('/:key', authMiddleware, async (c) => {
  try {
    const key = c.req.param('key');
    
    const success = await deleteFile(key);
    
    if (success) {
      return c.json({ success: true, message: '삭제되었습니다.' });
    } else {
      return c.json({ error: '파일 삭제에 실패했습니다.' }, 500);
    }
  } catch (error) {
    console.error('Delete error:', error);
    return c.json({ error: '파일 삭제 중 오류가 발생했습니다.' }, 500);
  }
});

export default uploadsRouter;
