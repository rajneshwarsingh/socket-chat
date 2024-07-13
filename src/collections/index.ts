/*
 * @file: index.js
 * @description: It contain db setup function.
 * @author: Rajneshwar Singh
 */
 
import mongoose from 'mongoose';
import { config } from '../config/index';
const databaseUrl = config.development.db;
console.log('databaseUrl', databaseUrl);

mongoose.set('strictQuery', false);
mongoose
  .connect(databaseUrl)
  .then(() => console.log('DB Connection Successfull'))
  .catch((err) => {
    console.error(err);
  });

export const connection = () => {
  mongoose.connection.on('connected', function (err) {
    console.log('Mongoose default connection error: ' + err);
    console.log('Mongoose connected!');
  });
};
