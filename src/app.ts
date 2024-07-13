/*
 * @file: app.ts
 * @description: It contain the main layer for a backend code.
 * @author: Rajneshwar Singh
 */

import express from 'express';
import 'dotenv/config'
import { urlencoded, json } from 'body-parser';
import users from './routes/users';
import chats from './routes/chats';
import rooms from './routes/rooms';
import * as DB from './collections/index';
import http from 'http';
import SocketService from './sockets/socket';
import path from 'path';
import cors from 'cors';

const port = process.env.PORT;
try {
  const app = express();
  app.use(urlencoded({ limit: '256mb', extended: true }));
  app.use(json({ limit: '256mb' }));
  app.use(cors());

  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'logs')));

  DB.connection();

  app.use('/api/v1', users);
  app.use('/api/v1', chats);
  app.use('/api/v1', rooms);

  const server = http.createServer(app);

  /* Configure socket implementation */
  SocketService(server);

  server.listen(port, () => {
    console.log('Server listening on port ' + port);
  });
} catch (err) {
  console.log(err, 'err in app.ts');
}
