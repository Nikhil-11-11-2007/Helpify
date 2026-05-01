export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
    // Makes sure the stack trace points to where the error was thrown, not here
    (Error as any).captureStackTrace(this, this.constructor);
  }

  // Converts the error to a JSON response object
  // Express error handlers use this to send consistent error responses
  toJSON() {
    return {
      success: false,
      message: this.message,
      code: this.code,
    };
  }
}
