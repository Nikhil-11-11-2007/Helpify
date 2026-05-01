import pino from 'pino';

// Creates a logger that prints nice colors in dev mode
// and plain JSON in production (for log aggregators)
export const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport: process.env.NODE_ENV !== 'production'
    ? { target: 'pino-pretty', options: { colorize: true } }
    : undefined,
});
