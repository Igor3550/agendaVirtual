import express, { Express } from 'express';
import cors from 'cors';

import { connectDb, disconnectDB, loadEnv } from './config';

import {
  dateRouter,
  scheduleRouter
} from './routers'

loadEnv();

const app = express();

app
  .use(cors())
  .use(express.json())
  .use('/schedule', scheduleRouter)
  .use('/date', dateRouter);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void>{
  await disconnectDB();
}

export default app;
