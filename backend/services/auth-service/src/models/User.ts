import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// This describes the shape of a user document in the database
export interface IUser extends Document {
  email: string;
  passwordHash: string;   // We NEVER store plain text passwords
  role: 'user' | 'admin' | 'agent';
  createdAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'agent'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
});

// This method lets us check a login password against the stored hash
// bcrypt.compare handles the complex hashing math for us
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.passwordHash);
};

export const User = mongoose.model<IUser>('User', UserSchema);
