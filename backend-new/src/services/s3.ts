import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.AWS_S3_BUCKET!;
const REGION = process.env.AWS_S3_REGION!;

// ============================================
// 파일 업로드
// ============================================
export async function uploadFile(
  file: File | Blob,
  path: string,
  contentType: string
): Promise<{ url: string; key: string }> {
  const buffer = await file.arrayBuffer();
  const key = `${path}/${Date.now()}-${Math.random().toString(36).substring(7)}`;
  
  await s3Client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: Buffer.from(buffer),
      ContentType: contentType,
    })
  );
  
  const url = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;
  
  return { url, key };
}

// ============================================
// 파일 삭제
// ============================================
export async function deleteFile(key: string): Promise<boolean> {
  try {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: BUCKET,
        Key: key,
      })
    );
    return true;
  } catch (error) {
    console.error('S3 Delete Error:', error);
    return false;
  }
}

// ============================================
// 업로드 경로별 폴더
// ============================================
export const UPLOAD_PATHS = {
  AVATAR: 'avatars',
  BUSINESS_LICENSE: 'documents/business-license',
  PORTFOLIO: 'documents/portfolio',
  POST_IMAGE: 'posts',
  CHAT_FILE: 'chats',
} as const;
