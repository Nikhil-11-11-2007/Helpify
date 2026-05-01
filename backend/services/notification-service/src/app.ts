import express from 'express';
import pino from 'pino';
import routes from './routes';
// Import the worker so it starts listening for jobs when the app boots
// The worker runs in the same process - simple enough for a hackathon
import './workers/email.worker';

const logger = pino();
const app = express();

app.use(express.json());
app.use('/', routes);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(err);
  res.status(500).json({ success: false, message: 'Notification service error' });
});

app.listen(process.env.PORT || 5004, () => {
  logger.info(`Notification service running on port ${process.env.PORT || 5004}`);
});
