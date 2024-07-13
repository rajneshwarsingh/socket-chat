/*
 * @file: rooms.controller.ts
 * @description: It contain controller funcations layer for rooms.controller.
 * @author: Rajneshwar Singh
 */

import * as SERVICE from '../services/rooms.service';
import { successAction, failAction } from '../utilities/responses';
import { statusCode, message } from '../utilities/constants';

export const createRoom = async (req: any, res: any) => {
  try {
    const result: any = await SERVICE.createRoom(req.body, req.user);
    if (result == 'userNotExist') {
      return res.status(statusCode.success).json(successAction(statusCode.success, result, message.dataNotExist('User')));
    } else if (result == 'roomAlreadyExist') {
      return res.status(statusCode.success).json(successAction(statusCode.success, result, message.dataExist('Room')));
    } else {
      return res.status(statusCode.success).json(successAction(statusCode.success, result, message.dataSaved('Room')));
    }
  } catch (error: any) {
    return res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, error.message, message.somethingWrong));
  }
};

export const updateRoom = async (req: any, res: any) => {
  try {
    const result: any = await SERVICE.updateRoom(req.params, req.body, req.user);
    if (result == 'roomNotExist') {
      return res.status(statusCode.success).json(successAction(statusCode.success, result, message.dataNotExist('Room')));
    } else {
      return res.status(statusCode.success).json(successAction(statusCode.success, result, message.dataUpdated('Room')));
    }
  } catch (error: any) {
    return res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, error.message, message.somethingWrong));
  }
};

export const deleteRoom = async (req: any, res: any) => {
  try {
    const result = await SERVICE.deleteRoom(req.params, req.user);
    if (result == 'userNotExist') {
      return res.status(statusCode.success).json(successAction(statusCode.success, result, message.dataNotExist('User')));
    } else {
      return res.status(statusCode.success).json(successAction(statusCode.success, result, message.dataDeleted('Room')));
    }
  } catch (error: any) {
    return res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, error.message, message.somethingWrong));
  }
};
