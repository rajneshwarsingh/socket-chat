/*
 * @file: rooms.ts
 * @description: It contain db schema for rooms collection.
 * @author: Rajneshwar Singh
 */

import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      }
    ],
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      }
    ],
    roomType: {
      type: Number,
      default: 1
    }, //1=> Individual, 2=> Group
    type: {
      type: Number,
      default: 1
    }, //1=> text, 2=> image
    status: {
      type: Number,
      default: 1
    }, // 0=> inactive, 1=> active
    lastMessage: {
      type: String,
      default: ''
    },
    lastMessageBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    lastMessageDate: {
      type: Date,
      default: new Date()
    },
    unreadMessageCount: {
      type: Number,
      default: 0
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

export default mongoose.model('rooms', roomSchema);
