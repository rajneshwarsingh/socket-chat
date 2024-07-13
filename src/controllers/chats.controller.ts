/*
 * @file: chats.controller.ts
 * @description: It contain controller funcations layer for chats.controller.
 * @author: Rajneshwar Singh
 */

import * as SERVICE from '../services/chats.service';
import { successAction, failAction } from '../utilities/responses';
import { statusCode, message } from '../utilities/constants';

export const chatMessages = async (req: any, res: any) => {
  try {
    const result = await SERVICE.chatMessages(req.query);
    return res.status(statusCode.success).json(successAction(statusCode.success, result, message.dataFetched('Message')));
  } catch (error: any) {
    return res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, error.message, message.somethingWrong));
  }
};
