import mongoose from 'mongoose';
import pino from 'pino';

const logger = pino();

export async function connectDB() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error('MONGO_URI is required');
  }
  // Connect to MongoDB - this is the database that stores user accounts
  await mongoose.connect(mongoUri);
  logger.info('Auth DB connected');
}
