// Socket.IO disabled for ticket-based support system
// Re-enable here if real-time notifications are needed later
export function initSocket(httpServer) {
    console.log("Socket.IO initialized (stub)");
}
export function getIO() {
    throw new Error("Socket.IO not available");
}
