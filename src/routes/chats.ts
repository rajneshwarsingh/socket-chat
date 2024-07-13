/*
 * @file: chats.ts
 * @description: It contain routes funcations for chats.
 * @author: Rajneshwar Singh
 */

import express from 'express';
import { chatMessages } from '../controllers/chats.controller';
import validationMiddleware from '../validators/joi.validator';
import { checkToken } from '../utilities/universal';
const router = express.Router();

router.get('/messages', checkToken, (req, res, next) => validationMiddleware(req, res, next, 'message'), chatMessages);
export default router;
