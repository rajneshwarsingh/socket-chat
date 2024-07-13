/*
 * @file: authentications.ts
 * @description: It contain db schema for authantications collection.
 * @author: Rajneshwar Singh
 */

import mongoose from 'mongoose';

const authanticationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    token: {
      type: String,
      required: true,
      default: null
    },
    expiry: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model('authantications', authanticationSchema);
