import apiClient from './api.client';

const AUTH_PREFIX = '/api/auth';

// POST /api/auth/register
// Register a new business admin
// Backend expects: username, email, password
export async function register({ username, email, password }) {
  const response = await apiClient.post(`${AUTH_PREFIX}/register`, {
    username,
    email,
    password,
  });
  return response.data;
}

// POST /api/auth/login
// Login and receive JWT via cookie
export async function login({ email, password }) {
  const response = await apiClient.post(`${AUTH_PREFIX}/login`, {
    email,
    password,
  });
  return response.data;
}

// GET /api/auth/get-me
// Get currently authenticated admin's info (JWT cookie sent automatically)
export async function getMe() {
  const response = await apiClient.get(`${AUTH_PREFIX}/get-me`);
  return response.data;
}

// GET /api/auth/verify-email?token=xxx
// Verify email address using token from email link
// Confirm exact param name with backend dev if unsure
export async function verifyEmail(token) {
  const response = await apiClient.get(`${AUTH_PREFIX}/verify-email`, {
    params: { token },
  });
  return response.data;
}