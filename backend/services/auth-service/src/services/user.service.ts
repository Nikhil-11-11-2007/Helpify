import { User } from '../models/User';

// Gets the profile info for a specific user (excluding their hashed password)
export async function getProfile(userId: string) {
  const user = await User.findById(userId).select('-passwordHash');
  if (!user) throw new Error('User not found');
  return user;
}

// Lists all users (admin feature). Can filter by role if needed
export async function listUsers(role?: string) {
  const filter = role ? { role } : {};
  return User.find(filter).select('-passwordHash');
}
