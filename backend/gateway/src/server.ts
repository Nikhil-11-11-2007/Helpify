import express from 'express';
import pino from 'pino';
import { rateLimiter } from './rateLimiter';
import routes from './routes';

const logger = pino();
const app = express();

// Global middleware - applies to ALL requests
app.use(express.json());        // Parse JSON request bodies
app.use(rateLimiter);           // Rate limit by IP
app.use('/', routes);           // Mount all route handlers

// Global error handler - catches any unhandled errors
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(err);
  res.status(500).json({ success: false, message: 'Gateway error' });
});

// Start the gateway server
app.listen(process.env.PORT || 5000, () => {
  logger.info(`Gateway running on port ${process.env.PORT || 5000}`);
});
