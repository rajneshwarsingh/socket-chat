/*
 * @file: universal.js
 * @description: It Contain function layer for all commom function.
 * @author: Rajneshwar Singh
 */

import md5 from 'md5';
import jwt from 'jsonwebtoken';
import { config } from '../config/index';
import User from '../collections/users';
import { failAction } from './responses';
import { statusCode, message } from './constants';
const { jwtAlgo, jwtKey } = config.development.secret;

/*********** Password encryption *************/
export const encryptpassword = (password) => {
  return md5(password);
};

/*********** Generate random strings *************/
export const generateRandom = (length = 32, alphanumeric = true) => {
  let data = '',
    keys = '';

  if (alphanumeric) {
    keys = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  } else {
    keys = '0123456789';
  }

  for (let i = 0; i < length; i++) {
    data += keys.charAt(Math.floor(Math.random() * keys.length));
  }
  return data;
};

/*********** Generate JWT token *************/
export const generateToken = (data) => jwt.sign(data, jwtKey, { algorithm: jwtAlgo, expiresIn: '90d' });

/*********** Decode JWT token *************/
export const decodeToken = (token) => jwt.verify(token, jwtKey);

/*********** Verify token *************/
export const checkToken = async (req, res, next) => {
  try {
    let token = req.headers['authorization'];
    if (token) {
      token = token.replace(/^Bearer\s+/, '');
      let decoded = {};
      decoded = jwt.verify(token, jwtKey);
      const AuthUser = await User.findOne({ _id: decoded.userId });
      if (AuthUser) {
        req.user = { ...decoded, token };
        next();
      } else {
        return res.status(statusCode.unauthorized).json(failAction(statusCode.unauthorized, {}, message.unauthorized));
      }
    } else {
      return res.status(statusCode.authTokenRequired).json(failAction(statusCode.authTokenRequired, {}, message.authTokenRequired));
    }
  } catch (err) {
    return res.status(statusCode.authTokenRequired).json(failAction(statusCode.authTokenRequired, {}, message.authTokenRequired));
  }
};
