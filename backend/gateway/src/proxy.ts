import axios from 'axios';
import pino from 'pino';

const logger = pino();

// Maps route prefixes to internal service URLs
// Docker Compose service names are used as hostnames
// Each service exposes a different port internally
const services = {
  auth: 'http://auth-service:5001',
  chat: 'http://chat-service:5002',
  ai: 'http://ai-service:5003',
  notify: 'http://notification-service:5004',
};

// Generic proxy function - forwards HTTP requests to the right internal service
// The gateway doesn't know what each service does - it just passes the request through
export async function proxyTo(service: keyof typeof services, path: string, method: string, body?: any, headers?: any) {
  const url = `${services[service]}${path}`;
  logger.debug({ method, url }, 'Proxying request');

  try {
    const response = await axios({
      method,
      url,
      data: body,
      headers,
      timeout: 5000,  // If a service doesn't respond in 5 seconds, fail fast
    });
    return response.data;
  } catch (err: any) {
    if (err.response) {
      // The downstream service returned an error - pass it through as-is
      throw { status: err.response.status, data: err.response.data };
    }
    // Network error - the service is probably down
    throw { status: 503, data: { message: 'Service unavailable' } };
  }
}
