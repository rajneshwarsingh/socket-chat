/*
 * @file: handler.ts
 * @description: It contain services function layer for handler.
 * @author: Rajneshwar Singh
 */

import mongoose from 'mongoose';
import User from '../collections/users';
import Room from '../collections/rooms';
import Message from '../collections/messages';

export default {
  getRoom: async (roomId: any, callback: any) => {
    if (mongoose.Types.ObjectId.isValid(roomId)) {
      const room = await Room.findById(roomId);
      callback(room);
    } else {
      callback(null);
    }
  },

  saveMessage: async (request: any, callback: any) => {
    const sender = await User.findOne({ userId: request.senderId });
    const receiver = await User.findOne({ userId: request.receiverId });

    if (sender != null && receiver != null) {
      request.senderId = sender._id;
      request.receiverId = receiver._id;
      // check room id
      const room: any = await Room.findOne({
        members: { $size: 2, $all: [sender._id, receiver._id] }
      });
      if (!room) {
        callback(null);
      }
      // send message
      const newMessage = new Message({ ...request, roomId: room._id });
      const message: any = newMessage.save();
      const roomDataCount: any = await Room.findOne({ _id: room._id });
      let unreadCount = 0;
      if (roomDataCount.unreadMessageCount) {
        unreadCount = roomDataCount.unreadMessageCount + 1;
      } else {
        unreadCount = unreadCount + 1;
      }
      if (message) {
        const payload = {
          id: room._id,
          lastMessage: request.message,
          type: request.type,
          lastMessageBy: sender._id,
          unreadMessageCount: unreadCount,
          lastMessageDate: new Date()
        };
        await Room.findByIdAndUpdate(payload.id, payload, { new: true });

        // request.senderSocketId = sender.socketId;
        // request.receiverSocketId = receiver.socketId;

        callback(request);
      } else {
        callback(null);
      }
    } else {
      callback(null);
    }
  }
};
