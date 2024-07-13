/*
 * @file: chats.service.ts
 * @description: It contain services function layer for chat services.
 * @author: Rajneshwar Singh
 */

import Messages from '../collections/messages';
import mongoose from 'mongoose';

export const chatMessages = async (payload: any) => {
  return await Messages.aggregate([
    {
      $match: { roomId: new mongoose.Types.ObjectId(payload.roomId) }
    },
    { $sort: { createdAt: -1 } },
    { $skip: (payload.pageNum - 1) * 20 },
    { $limit: 20 }
  ]);
};
