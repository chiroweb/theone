import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL!;

// PostgreSQL 클라이언트
const client = postgres(connectionString, {
  max: 10, // 최대 연결 수
  idle_timeout: 20,
  connect_timeout: 10,
  ssl: 'require', // RDS requires SSL for public access
});

// Drizzle ORM 인스턴스
export const db = drizzle(client, { schema });

// 연결 테스트
export async function testConnection() {
  try {
    await client`SELECT 1`;
    console.log('✅ Database connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}
