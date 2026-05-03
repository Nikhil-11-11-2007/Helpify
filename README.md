# Customer Support Backend

A Node.js/Express backend for a **multi-tenant customer support system**. Businesses can upload FAQs, an AI (Gemini) answers customer questions automatically, and complex queries are converted into support tickets for human agents.

Think of it like this: A customer visits a website, clicks "Chat with us", types a question — the AI answers instantly using the business's FAQs. If the AI can't help, a ticket is created and a human agent follows up via email.

---

## What This Project Does

```
Customer on Website                    Business Admin (Dashboard)
      |                                      |
      |-- sends message (no login needed) -->|
      |                                      |
      |<----- AI replies instantly ---------|  (if answer is in FAQs)
      |                                      |
      |<----- "Agent will follow up" -------|  (if AI can't answer)
      |                                      |
      |                                 |-- sees ticket in dashboard
      |                                 |-- replies to ticket
      |                                 |
      |<----- email notification ----------|
```

---

## Tech Stack

| Technology | What It Does | Beginner Note |
|---|---|---|
| **Node.js + Express** | Runs the web server | The program that listens for HTTP requests |
| **MongoDB + Mongoose** | Stores data in a database | Like a JSON file but organized and queryable |
| **JWT (JSON Web Tokens)** | Authenticates admins | A secure "ticket" that proves you're logged in |
| **Gemini (Google AI)** | Powers the AI chatbot | The brain that reads FAQs and answers questions |
| **Nodemailer** | Sends emails | Sends notification emails when agents reply |
| **Bcrypt** | Hashes passwords | Makes passwords unreadable before saving |

You don't need to know all of these in depth — this project shows you how they work together.

---

## Project Structure

```
Backend/
├── server.js              # Main entry point — starts the server
├── app.js                  # Express app setup — mounts all routes
├── src/
│   ├── config/
│   │   └── database.js     # Connects to MongoDB
│   ├── models/             # Database schemas (how data is structured)
│   │   ├── user.model.js   # Business admin accounts
│   │   ├── business.model.js # Each business's info and settings
│   │   ├── faq.model.js     # FAQs (question + answer pairs)
│   │   ├── chat.model.js    # Customer chat sessions
│   │   ├── message.model.js # Individual messages in a chat
│   │   └── ticket.model.js  # Support tickets created when AI can't help
│   ├── controllers/         # Logic for each route
│   ├── routes/              # API endpoint definitions
│   ├── services/            # External integrations (AI, email)
│   ├── middleware/          # Auth check (protects routes)
│   └── validators/          # Input validation
└── .env.example             # Environment variables template
```

---

## Setup (Step by Step)

### Prerequisites
- Node.js installed (v18+ recommended)
- A MongoDB database (free at [MongoDB Atlas](https://www.mongodb.com/atlas) or local)
- A Google Gemini API key (free at [Google AI Studio](https://aistudio.google.com))

### 1. Install dependencies
```bash
npm install
```

### 2. Create environment file
```bash
cp .env.example .env
```

### 3. Fill in `.env` with your values
```
PORT=8000
MONGODB_URI=mongodb+srv://your_connection_string
JWT_SECRET=any_random_string_you_make_up
GOOGLE_API_KEY=your_gemini_api_key
GOOGLE_USER=your_email@gmail.com
GOOGLE_CLIENT_ID=from_google_cloud_console
GOOGLE_CLIENT_SECRET=from_google_cloud_console
GOOGLE_REFRESH_TOKEN=get_from_google_oauth_setup
FRONTEND_URL=http://localhost:5173
```

### 4. Start the server
```bash
npm run dev
```
Server runs on `http://localhost:8000`

---

## API Routes Explained

There are two groups: **public routes** (anyone can use) and **protected routes** (only logged-in admins).

### Public Routes (No Login Required)

| Method | Endpoint | What it does |
|---|---|---|
| `POST` | `/api/chats/message` | Customer sends a message. Business is identified by `ownerId` passed in the body. |
| `GET` | `/api/chats/:chatId/messages` | Get all messages in a chat session. |

**Example: Customer sends a message**
```bash
curl -X POST http://localhost:8000/api/chats/message \
  -H "Content-Type: application/json" \
  -d '{
    "ownerId": "biz_abc123",
    "message": "How do I reset my password?",
    "customerName": "Alex",
    "customerEmail": "alex@email.com"
  }'
```

### Protected Routes (Require Login)

**Auth (same as before):**
| Method | Endpoint | What it does |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new business admin |
| `POST` | `/api/auth/login` | Login and get a JWT cookie |
| `GET` | `/api/auth/get-me` | Get current admin's info |
| `GET` | `/api/auth/verify-email` | Verify email address |

**Business Management (your FAQs):**
| Method | Endpoint | What it does |
|---|---|---|
| `POST` | `/api/business/faqs` | Add a new FAQ |
| `GET` | `/api/business/faqs` | List all your FAQs |
| `PUT` | `/api/business/faqs/:faqId` | Update an FAQ |
| `DELETE` | `/api/business/faqs/:faqId` | Delete an FAQ |
| `GET` | `/api/business/settings` | Get your AI settings |
| `PUT` | `/api/business/settings` | Update AI settings |

**Ticket Management:**
| Method | Endpoint | What it does |
|---|---|---|
| `GET` | `/api/tickets` | List all support tickets |
| `GET` | `/api/tickets/:ticketId` | Get ticket detail with chat history |
| `PUT` | `/api/tickets/:ticketId/status` | Change ticket status |
| `POST` | `/api/tickets/:ticketId/reply` | Reply to a ticket (sends email to customer) |

**Example: Admin adds an FAQ**
```bash
curl -X POST http://localhost:8000/api/business/faqs \
  -H "Content-Type: application/json" \
  -H "Cookie: token=your_jwt_cookie_here" \
  -d '{
    "question": "How do I reset my password?",
    "answer": "Click Forgot Password on the login page and check your email for a reset link.",
    "category": "Account",
    "tags": ["password", "login", "account"]
  }'
```

---

## Data Models

### User (Business Admin)
```js
{
  username: "admin123",        // Their login name
  email: "admin@business.com", // Their email
  password: "hashed_password",  // Encrypted (never stored as plain text)
  verified: true,              // Has they confirmed their email?
  business: ObjectId           // Reference to their Business record
}
```

### Business
```js
{
  owner: ObjectId,              // Links to the User who owns this business
  ownerId: "biz_abc123",       // Public ID used in the chat widget
  name: "My Company",          // Display name
  settings: {
    aiTone: "professional",    // How the AI talks: professional/friendly/technical
    autoReply: true,           // Should AI always try to answer, or create tickets always?
    ticketThreshold: 0         // Future: confidence score for escalation
  }
}
```

### FAQ
```js
{
  business: ObjectId,          // Which business this FAQ belongs to
  question: "How do I reset my password?",
  answer: "Click Forgot Password...",
  category: "Account",
  tags: ["password", "login"]
}
```

### Chat
```js
{
  business: ObjectId,           // Which business this chat is with
  customerInfo: {
    name: "Alex",
    email: "alex@email.com"
  },
  status: "active"              // active | ticket_created | resolved
}
```

### Message
```js
{
  chat: ObjectId,               // Which chat this message belongs to
  content: "How do I reset my password?",
  role: "user"                  // user | ai | admin
}
```

### Ticket
```js
{
  business: ObjectId,
  chat: ObjectId,               // Links back to the original chat
  customerInfo: { name, email },
  subject: "Customer can't reset password",
  status: "open",               // open | in_progress | resolved | closed
  priority: "medium",          // low | medium | high
  aiSummary: "Customer asking about password reset process",
  adminReplies: [
    { content: "Here's how to reset...", sentAt: Date }
  ]
}
```

---

## How the AI Chat Works (Flow Diagram)

```
1. Customer sends message with ownerId
           |
           v
2. Backend finds Business by ownerId
           |
           v
3. Load all FAQs for that business
           |
           v
4. Send message + FAQs to Gemini with this prompt:
   "Answer using ONLY the provided FAQs.
    If you can't answer, say exactly:
    'ESCALATE_TO_HUMAN: ...'"
           |
           v
   ┌──────┴──────┐
   |             |
AI can answer  AI can't answer
   |             |
   v             v
Save message  Save message
+ AI reply   + Create Ticket
   |             |
   v             v
Return reply  Return "agent will follow up"
           |
           v
5. Admin sees ticket in dashboard → replies → customer gets email
```

---

## Environment Variables

| Variable | What it is | Where to get it |
|---|---|---|
| `PORT` | Port the server runs on | Default is 8000 |
| `MONGODB_URI` | Your MongoDB connection string | MongoDB Atlas dashboard |
| `JWT_SECRET` | Secret key for signing JWT tokens | Make up any random string |
| `GOOGLE_API_KEY` | API key for Gemini AI | Google AI Studio |
| `GOOGLE_USER` | Gmail address for sending emails | Your Gmail account |
| `GOOGLE_CLIENT_ID` | OAuth2 client ID for Gmail | Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | OAuth2 client secret | Google Cloud Console |
| `GOOGLE_REFRESH_TOKEN` | OAuth2 refresh token for Gmail | Google OAuth setup |
| `FRONTEND_URL` | URL of the frontend (for email links) | Your frontend address |

---

## Common Errors and How to Fix Them

### `GOOGLE_API_KEY is not set`
You need a Gemini API key from [Google AI Studio](https://aistudio.google.com). The free tier has enough quota for development.

### `MongoDB connection failed`
Check your `MONGODB_URI` — make sure it starts with `mongodb+srv://` for Atlas, or `mongodb://` for local. Also check your network can reach MongoDB Atlas.

### `Email transporter verification failed`
The Gmail OAuth2 setup is complex. If email notifications don't work, check that `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `GOOGLE_REFRESH_TOKEN` are all correct. Consider using a service like [Resend](https://resend.com) or [SendGrid](https://sendgrid.com) instead for simpler setup.

### `jwt verification failed`
Your `JWT_SECRET` in `.env` is different from what was used to create the token. Make sure the `.env` file is consistent.

---

## Extending the Project (What to Add Next)

### 1. Add a Frontend
This is a backend only. Build a React/Vue dashboard for business admins to manage FAQs and tickets. Connect it to these API routes.

### 2. Vector Search for FAQs
Currently FAQs are matched by simple keyword matching. For better matching, you can:
- Use embeddings (Google's `embedding-001` model)
- Store in a vector database like Pinecone or Qdrant
- Search by similarity instead of keywords

### 3. Real-time Notifications
Socket.IO is initialized but unused. You could add real-time notifications to the admin dashboard when new tickets arrive.

### 4. Multiple Agents per Business
Currently one admin per business. You could add an `Agent` model with roles and permissions for team support.

### 5. Chat Widget Script
Generate a small JavaScript snippet that websites can embed (`<div id="chat-widget" data-owner-id="biz_abc123">`). This would be a separate frontend project.

---

## Quick Reference: Testing the API

### Register and login
```bash
# Register
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testadmin","email":"admin@test.com","password":"password123"}'

# Login (saves cookie automatically)
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"password123"}'
```

### Add FAQ and test AI
```bash
# Add FAQ (after login)
curl -X POST http://localhost:8000/api/business/faqs \
  -H "Content-Type: application/json" \
  -H "Cookie: token=your_cookie" \
  -d '{"question":"What are your hours?","answer":"We are open 9am-5pm Monday-Friday."}'

# Send message as customer (no auth needed)
curl -X POST http://localhost:8000/api/chats/message \
  -H "Content-Type: application/json" \
  -d '{"ownerId":"your_owner_id","message":"What are your hours?"}'
```

---

## File Naming Conventions

| Pattern | Example | What it means |
|---|---|---|
| `*.model.js` | `user.model.js` | Mongoose schema for a database collection |
| `*.controller.js` | `auth.controller.js` | Functions that handle route logic |
| `*.routes.js` | `auth.routes.js` | Route definitions (which URL calls which function) |
| `*.service.js` | `ai.service.js` | External service integrations |
| `*.middleware.js` | `auth.middleware.js` | Functions that run before routes (like auth checks) |
| `*.validator.js` | `auth.validator.js` | Input validation rules |

---

## Credits

Built with Express, MongoDB, Gemini, and a lot of coffee.
Test change