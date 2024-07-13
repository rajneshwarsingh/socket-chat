/*
 * @file: rooms.service.ts
 * @description: It contain services function layer for rooms services.
 * @author: Rajneshwar Singh
 */

import Rooms from '../collections/rooms';
import Users from '../collections/users';
import mongoose from 'mongoose';

export const createRoom = async (payload: any, user: any) => {
  if (payload.roomType == 2) {
    // Group
    let membersId = [];
    let adminId = [];
    if (payload.members) {
      membersId = payload.members.map((element: any) => new mongoose.Types.ObjectId(element));
    }
    if (payload.admins) {
      adminId = payload.admins.map((element: any) => new mongoose.Types.ObjectId(element));
    }
    const newRoom = new Rooms({
      roomType: payload.roomType,
      title: payload.title,
      description: payload.description,
      icon: payload.icon,
      members: membersId,
      admins: adminId,
      createdBy: user.userId
    });
    return await newRoom.save();
  } else {
    //Individual
    const members: any = await Users.find({ userId: payload.members }, { _id: 1 });
    if (members.length > 0) {
      const newMembers = members.map((e: any) => e._id.toString());

      const room = await Rooms.findOne({
        members: { $size: 2, $all: newMembers }
      });
      if (!room) {
        const admins: any = await Users.find({ userId: payload.admins }, { _id: 1 });
        const newAdmins = admins.map((e: any) => e._id.toString());

        const newRoom = new Rooms({
          ...payload,
          admins: newAdmins,
          members: newMembers,
          createdBy: user.userId
        });
        return await newRoom.save();
      } else {
        return 'roomAlreadyExist';
      }
    } else {
      return 'userNotExist';
    }
  }
};

export const deleteRoom = async (payload: any, user: any) => {
  const member: any = await Users.findOne({ userId: payload.otherUserId }, { id: 1 });
  if (member) {
    return await Rooms.deleteOne({
      members: { $size: 2, $all: [member._id?.toString(), user.userId] },
      admins: { $all: [user.userId] }
    });
  } else {
    return 'userNotExist';
  }
};

export const updateRoom = async (params: any, payload: any, user: any) => {
  const room: any = await Rooms.findOne({ _id: params.roomId, admins: { $all: [user.userId] } }, { id: 1 });
  if (room) {
    return await Rooms.findOneAndUpdate({ _id: params.roomId }, { $set: payload }, { new: true });
  } else {
    return 'roomNotExist';
  }
};
