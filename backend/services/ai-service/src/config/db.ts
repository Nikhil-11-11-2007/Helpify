import mongoose from 'mongoose';
import pino from 'pino';

const logger = pino();

export async function connectDB() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error('MONGO_URI required');
  }
  await mongoose.connect(mongoUri);
  logger.info('AI DB connected');
}
