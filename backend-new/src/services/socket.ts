import { Server as SocketIOServer } from 'socket.io';
import { Server as HttpServer } from 'http';

let io: SocketIOServer;

export function initSocket(server: HttpServer) {
    io = new SocketIOServer(server, {
        cors: {
            origin: ['http://localhost:3000', 'https://the1percent.com'],
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    io.on('connection', (socket) => {
        console.log(`Socket connected: ${socket.id}`);

        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });

    return io;
}

export function getIO() {
    if (!io) {
        throw new Error('Socket.io is not initialized!');
    }
    return io;
}

// Events
export const EVENTS = {
    POST_CREATE: 'post:create',
    COMMENT_CREATE: 'comment:create',
    LIKE_UPDATE: 'like:update',
};
