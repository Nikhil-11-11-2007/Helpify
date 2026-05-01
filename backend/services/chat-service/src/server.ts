import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import pino from 'pino';
import { connectDB } from './config/db';
import { setupSocket } from './services/socket.service';
import routes from './routes';

const logger = pino();

// Create both an Express app (for REST API) and an HTTP server (for Socket.IO)
// Socket.IO needs a raw HTTP server to handle WebSocket upgrades
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

app.use(express.json());
app.use('/', routes);

// Attach Socket.IO event handlers
setupSocket(io);

async function start() {
  await connectDB();
  httpServer.listen(process.env.PORT || 5002, () => {
    logger.info(`Chat service running on port ${process.env.PORT || 5002}`);
  });
}

start();
