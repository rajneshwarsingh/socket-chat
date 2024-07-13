/*
 * @file: messages.ts
 * @description: It contain db schema for messages collection.
 * @author: Rajneshwar Singh
 */

import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'rooms'
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    type: {
      type: String,
      default: ''
    }, // 1=> text, 2=> media, 3=> money transfer
    message: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    isRead: {
      type: Number,
      default: 1 // 1 deliver,  2 single tik, 3 double tik
    },
    giftedChatFormat: {
      type: Object,
      default: {}
    }
  },
  { timestamps: true }
);

export default mongoose.model('messages', messageSchema);
