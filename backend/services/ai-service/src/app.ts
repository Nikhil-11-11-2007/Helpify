import express from 'express';
import pino from 'pino';
import { connectDB } from './config/db';
import routes from './routes';

const logger = pino();
const app = express();

app.use(express.json());
app.use('/', routes);

// Global error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(err);
  res.status(500).json({ success: false, message: 'AI service error' });
});

async function start() {
  await connectDB();
  app.listen(process.env.PORT || 5003, () => {
    logger.info(`AI service running on port ${process.env.PORT || 5003}`);
  });
}

start();
