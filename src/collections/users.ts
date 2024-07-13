/*
 * @file: users.ts
 * @description: It contain db schema for users collection.
 * @author: Rajneshwar Singh
 */

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: ''
    },
    userId: {
      type: String,
      required: true
    },
    profileUrl: {
      type: String,
      required: false
    },
    password: {
      type: String,
      required: true,
      default: 'null'
    },
    socketId: {
      type: String,
      default: 'null'
    },
    status: {
      type: Number,
      default: 0 // 0 offline,  1 online
    },
    lastActive: {
      type: Date,
      required: false
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model('users', userSchema);
