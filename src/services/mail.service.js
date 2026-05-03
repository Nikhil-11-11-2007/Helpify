import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: 'OAuth2',
        user: process.env.GOOGLE_USER,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        clientId: process.env.GOOGLE_CLIENT_ID
    }
})

transporter.verify()
    .then(() => { console.log("Email transporter is ready to send emails"); })
    .catch((err) => { console.error("Email transporter verification failed:", err); });


export async function sendEmail({ to, subject, html, text }) {

    const mailOptions = {
        from: process.env.GOOGLE_USER,
        to,
        subject,
        html,
        text
    };

    const details = await transporter.sendMail(mailOptions);
    console.log("Email sent:", details);
}

export async function sendTicketNotification(ticket, replyContent) {
    if (!ticket.customerInfo?.email) return;

    const subject = `Re: Support Request - ${ticket.subject || "Your Ticket"}`;
    const text = `Hi ${ticket.customerInfo.name || "there"},

An agent has replied to your support request:

"${replyContent}"

You can view the full conversation here: ${process.env.FRONTEND_URL}/chat/${ticket.chat}

Ticket ID: ${ticket._id}
Status: ${ticket.status}

Best regards,
${ticket.business?.name || "Support Team"}
`;

    try {
        const result = await transporter.sendMail({
            from: `"Support" <${process.env.GOOGLE_USER}>`,
            to: ticket.customerInfo.email,
            subject,
            text,
        });
        console.log("Ticket notification sent:", result.messageId);
    } catch (err) {
        console.error("Failed to send ticket notification:", err);
    }
}