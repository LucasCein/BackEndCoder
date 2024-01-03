import { Server } from 'socket.io';

let io;

export const initIo = (server) => {
    io = new Server(server);
    return io;
};

export const getIo = () => {
    if (!io) {
        throw new Error('Socket.io no ha sido inicializado!');
    }
    return io;
};
