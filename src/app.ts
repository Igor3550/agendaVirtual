import express from 'express';
import { loadEnv } from './config';

import {
  scheduleRouter
} from './routers'

loadEnv();

const PORT = process.env.PORT || 4000;
const app = express();

app
  .use(express.json())
  .get('/health', (req, res) => { res.send('OK') })
  .use('/schedule', scheduleRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
} )

export default app;
