import { io } from 'socket.io-client';

// 백엔드 URL (환경변수 또는 하드코딩)
const URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const socket = io(URL, {
    autoConnect: false,
    withCredentials: true,
});

export const SOCKET_EVENTS = {
    POST_CREATE: 'post:create',
    COMMENT_CREATE: 'comment:create',
    LIKE_UPDATE: 'like:update',
};
