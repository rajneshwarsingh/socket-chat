/*
 * @file: users.service.ts
 * @description: It contain services function layer for users services.
 * @author: Rajneshwar Singh
 */

import Users from '../collections/users';
import Authantications from '../collections/authentications';
import { encryptpassword, generateToken } from '../utilities/universal';

export const login = async (payload: any) => {
  const userData = await Users.findOne({
    userId: payload.userId,
    password: encryptpassword(payload.password),
    isDeleted: false
  });

  if (!userData) {
    return 'invalidCredentials';
  }

  const loginToken = generateToken({
    when: new Date(),
    userId: userData._id
  });
  const authObj = { userId: userData._id, token: loginToken };
  const auth = new Authantications(authObj);
  await auth.save();
  return { _id: userData._id, userId: userData.userId, token: loginToken };
};

export const register = async (payload: any) => {
  const userData = await Users.findOne({ userId: payload.userId });
  if (userData) {
    return 'aleadyExist';
  } else {
    const password = encryptpassword(payload.password);
    const profileUrl = payload.profileUrl ? payload.profileUrl : null;
    const name = payload.name ? payload.name : null;
    const newUser = new Users({
      userId: payload.userId,
      name,
      password,
      profileUrl
    });
    return newUser.save();
  }
};

export const updateUser = async (payload: any, params: any) => {
  const updateObj: any = {};
  if (payload.name) updateObj['name'] = payload.name;
  if (payload.profileUrl) updateObj['profileUrl'] = payload.profileUrl;
  if (payload.status) updateObj['status'] = payload.status;
  if (payload.about) updateObj['about'] = payload.about;
  const userData = await Users.findOne({ userId: params.userId });
  if (userData) {
    return await Users.findOneAndUpdate({ userId: params.userId }, { $set: updateObj }, { new: true });
  } else {
    return 'userNotExist';
  }
};

export const userDetails = async (payload: any) => {
  return await Users.findOne({ userId: payload.userId }, { _id: 1, name: 1, profileUrl: 1, socketId: 1, status: 1 });
};
