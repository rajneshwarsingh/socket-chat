/*
 * @file: users.ts
 * @description: It contain routes funcations for users.
 * @author: Rajneshwar Singh
 */

import express from 'express';
import { register, login, updateUser, userDetails } from '../controllers/users.controller';
import validationMiddleware from '../validators/joi.validator';
import { checkToken } from '../utilities/universal';
const router = express.Router();

router.post('/login', login);
router.post('/register', (req, res, next) => validationMiddleware(req, res, next, 'register'), register);
router.put('/user/:userId', checkToken, updateUser);
router.get('/user/:userId', checkToken, userDetails);
export default router;
