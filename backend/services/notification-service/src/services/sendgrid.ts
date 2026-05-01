import sgMail from '@sendgrid/mail';
import pino from 'pino';

const logger = pino();

// Setup SendGrid only if API key is provided (so it works without one during development)
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Sends an email using SendGrid's API
// This is called by the worker, not directly from the API route
export async function sendEmail(to: string, subject: string, html: string) {
  if (!process.env.SENDGRID_API_KEY) {
    logger.warn('No SendGrid API key, skipping email');
    return;
  }

  await sgMail.send({
    to,
    from: 'noreply@chatbot.hackathon',
    subject,
    html,
  });

  logger.info({ to, subject }, 'Email sent');
}
