import express from 'express';
import cookieParser from 'cookie-parser';
import pino from 'pino';
import { connectDB } from './config/db';
import routes from './routes';

const logger = pino();
const app = express();

// Middleware that parses JSON request bodies and cookies
app.use(express.json());
app.use(cookieParser());

// Mount all routes under /
app.use('/', routes);

// Global error handler - catches any errors thrown in routes
// and returns a consistent JSON error response
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(err);
  res.status(500).json({ success: false, message: err.message || 'Internal server error' });
});

// Start the server only after connecting to MongoDB
async function start() {
  await connectDB();
  app.listen(process.env.PORT || 5001, () => {
    logger.info(`Auth service running on port ${process.env.PORT || 5001}`);
  });
}

start();
