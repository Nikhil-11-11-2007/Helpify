export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}

// Wraps any successful response in a standard format
// Usage: res.json(success({ user: "john" }))
export function success<T>(data: T, message?: string): ApiResponse<T> {
  return { success: true, data, message };
}

// Wraps an error response in the same format
// Usage: res.json(error("Something went wrong"))
export function error(message: string): ApiResponse {
  return { success: false, message };
}
