/*
 * @file: users.controller.ts
 * @description: It contain controller funcations layer for users.controller.
 * @author: Rajneshwar Singh
 */

import * as SERVICE from '../services/users.service';
import { successAction, failAction } from '../utilities/responses';
import { statusCode, message } from '../utilities/constants';

export const login = async (req: any, res: any) => {
  try {
    const result = await SERVICE.login(req.body);
    if (result == 'invalidCredentials') {
      return res.status(statusCode.badRequest).json(successAction(statusCode.badRequest, result, message.invalidCredentials));
    } else {
      return res.status(statusCode.success).json(successAction(statusCode.success, result, message.loginSuccess));
    }
  } catch (error: any) {
    return res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, error.message, message.somethingWrong));
  }
};

export const register = async (req: any, res: any) => {
  try {
    const data = await SERVICE.register(req.body);
    if (data == 'aleadyExist') {
      return res.status(statusCode.success).json(successAction(statusCode.success, data, message.dataExist('User')));
    } else {
      return res.status(statusCode.success).json(successAction(statusCode.success, data, message.registerSuccess));
    }
  } catch (error: any) {
    return res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, error.message, message.somethingWrong));
  }
};

export const updateUser = async (req: any, res: any) => {
  try {
    const data = await SERVICE.updateUser(req.body, req.params);
    if (data === 'userNotExist') {
      return res.status(statusCode.success).json(successAction(statusCode.success, data, message.dataNotExist('User')));
    } else {
      return res.status(statusCode.success).json(successAction(statusCode.success, data, message.dataUpdated('User')));
    }
  } catch (error: any) {
    return res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, error.message, message.somethingWrong));
  }
};

export const userDetails = async (req: any, res: any) => {
  try {
    const data = await SERVICE.userDetails(req.params);
    return res.status(statusCode.success).json(successAction(statusCode.success, data, message.dataFetched('User')));
  } catch (error: any) {
    return res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, error.message, message.somethingWrong));
  }
};
