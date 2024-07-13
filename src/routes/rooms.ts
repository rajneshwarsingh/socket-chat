/*
 * @file: rooms.ts
 * @description: It contain routes funcations for rooms.
 * @author: Rajneshwar Singh
 */

import express from 'express';
import { createRoom, deleteRoom, updateRoom } from '../controllers/rooms.controller';
import validationMiddleware from '../validators/joi.validator';
import { checkToken } from '../utilities/universal';
const router = express.Router();

router.post('/room', checkToken, (req, res, next) => validationMiddleware(req, res, next, 'createRoom'), createRoom);
router.put('/room/:roomId', checkToken, (req, res, next) => validationMiddleware(req, res, next, 'updateRoom'), updateRoom);
router.delete('/room/:otherUserId', checkToken, deleteRoom);

export default router;
