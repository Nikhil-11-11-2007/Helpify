import { Server, Socket } from 'socket.io';
import pino from 'pino';
import * as messageService from './message.service';

const logger = pino();

// This sets up all Socket.IO event handlers
// Socket.IO lets us have real-time two-way communication with the frontend
export function setupSocket(io: Server) {
  io.on('connection', (socket: Socket) => {
    logger.info({ socketId: socket.id }, 'Socket connected');

    // When a user joins a room, they'll receive all messages sent to that room
    socket.on('join-room', async (roomId: string) => {
      // socket.join adds this connection to a "room" - think of it like a WhatsApp group
      // Any message emitted to this room goes to ALL connected members
      socket.join(roomId);
      // Tell everyone else in the room that a new user joined
      socket.to(roomId).emit('user-joined', { socketId: socket.id });
    });

    // Broadcast that someone is typing (without sending the actual message yet)
    socket.on('typing', (roomId: string) => {
      // socket.to sends to everyone EXCEPT the sender
      socket.to(roomId).emit('typing', { socketId: socket.id });
    });

    // When someone sends a message, save it to DB and broadcast to the room
    socket.on('send-message', async (data: { roomId: string; senderId: string; text: string }) => {
      try {
        // Save to MongoDB first so we don't lose messages
        const message = await messageService.saveMessage(data.roomId, data.senderId, data.text);
        // Broadcast to EVERYONE in the room (including sender, so they know it saved)
        io.to(data.roomId).emit('new-message', message);
      } catch (err) {
        // Tell only the sender that their message failed to save
        socket.emit('error', { message: 'Failed to save message' });
      }
    });

    socket.on('disconnect', () => {
      logger.info({ socketId: socket.id }, 'Socket disconnected');
    });
  });
}
