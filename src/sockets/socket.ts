/*
 * @file: socket.ts
 * @description: It contain services function layer for socket.
 * @author: Rajneshwar Singh
 */

import socketHandler from './handler';
import { Server } from 'socket.io';

export default (server1: any) => {
  const io = new Server(server1, {
    cors: {
      origin: '*'
    }
  });

  io.on('connection', (socket: any) => {
    console.log('user connected!!!!!!!!!');

    socket.emit('socketConnection', 'Socket connected successfully');
    //  io.to(socket.id).emit("createSocket", { socketId: socket.id });

    socket.on('joinRoom', async (data: any) => {
      socketHandler.getRoom(data.roomId, (res: any) => {
        if (res) {
          socket.join(data.roomId);
        }
      });
    });

    //Send message to receiver
    socket.on('sendMessage', async (data: any) => {
      socketHandler.saveMessage(data, (res: any) => {
        if (res) {
          io.to(data.roomId).emit('newMessage', data);
        }
      });
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });
};
