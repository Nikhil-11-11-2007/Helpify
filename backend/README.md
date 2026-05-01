# 🤖 Chatbot Microservices

A chatbot backend made of **5 small services** that talk to each other. Built for a hackathon — simple enough for beginners, but shows microservices for bonus marks.

---

## 📖 What is This?

Imagine a customer support chatbot. A user types a message, the bot sends it to AI, and the AI replies. This project handles all of that behind the scenes.

We split the work into **5 mini-apps** (called "microservices") instead of one big app. Why? Because the judges give extra points for "horizontal scaling" — which just means you can run more copies of the busy services when lots of people use the app at once.

---

## 🏗️ Architecture (How the Pieces Fit)

```
User's Phone/PC
      │
      ▼
┌─────────────────────────────┐
│      GATEWAY (port 5000)     │  ← All requests come here first
│   • Checks your login token  │
│   • Prevents spam attacks    │
│   • Forwards to right place  │
└────────┬────────┬────────┬───┘
         │        │        │
    ┌────▼──┐ ┌──▼───┐ ┌──▼────────┐
    │ Auth  │ │ Chat │ │   AI      │
    │ :5001 │ │:5002 │ │  :5003    │
    └──┬────┘ └──┬───┘ └──┬───────┬┘
       │         │        │       │
    ┌──▼──┐  ┌──▼───┐  ┌─▼──┐  ┌─▼──────────┐
    │Mongo│  │Mongo │  │Mongo│  │  Redis     │
    │(DB) │  │(DB)  │  │(DB) │  │(cache/queue)│
    └─────┘  └──────┘  └─────┘  └────────────┘
                                        │
                                   ┌────▼────────┐
                                   │Notification │
                                   │   :5004     │
                                   └────┬────────┘
                                        │
                                   ┌────▼────┐
                                   │SendGrid │
                                   │(email)  │
                                   └─────────┘
```

### The 5 Services

| Service | What It Does | Port | Who Should Build It |
|---------|-------------|------|-------------------|
| **Gateway** | The front door. Checks login tokens, stops spammers, sends requests to the right service | 5000 | Person A |
| **Auth Service** | Signup, Login, Logout. Manages user accounts and passwords | 5001 | Person B |
| **Chat Service** | Real-time messaging. Uses WebSockets (fancy two-way connection) | 5002 | Person C |
| **AI Service** | Talks to OpenRouter AI. Streams responses word-by-word (like ChatGPT) | 5003 | Person D |
| **Notification** | Sends emails in the background (queue pattern) | 5004 | Anyone with time |

### Extra Stuff We Use

- **MongoDB** — A database (stores user accounts, messages, AI logs)
- **Redis** — A fast cache (stores rate limits, sessions, email queue)
- **OpenRouter** — An AI service (like ChatGPT but cheaper)
- **SendGrid** — Email sending service (for notifications)

---

## ✅ Prerequisites (What You Need Installed)

1. **Node.js v18+** — Download from https://nodejs.org (get the LTS version)
   - Check if it's installed: open a terminal and type `node --version`
   
2. **Docker Desktop** — Download from https://www.docker.com/products/docker-desktop/
   - This lets us run MongoDB and Redis without installing them directly
   - Check if it's installed: open a terminal and type `docker --version`
   
3. **Git** — For version control (you probably already have this)

4. **A code editor** — VS Code is free and works great: https://code.visualstudio.com/

---

## 🚀 How to Run the Project

### Step 1: Open a Terminal
Open PowerShell, Command Prompt, or any terminal. Navigate to the project folder:
```bash
cd path/to/backend
```
*(Replace "path/to" with the actual folder location on your computer)*

### Step 2: Set Your API Keys
Open the `.env` file in the `backend/` folder. It should look like this:
```env
OPENROUTER_API_KEY=your_key_here
```
You need to get a real key from https://openrouter.ai/keys and paste it there.
The other keys (SendGrid, JWT secrets) have default values that work for testing.

### Step 3: Start MongoDB and Redis
Docker will download and run MongoDB and Redis for you:
```bash
docker-compose up -d mongo redis
```
- The `-d` flag means "run in background" (you won't see the logs)
- First time takes a few minutes to download

✅ **Check if it worked:** Run `docker ps` — you should see two containers running (mongo and redis)

### Step 4: Install Dependencies
Each service needs its packages installed. Do this:

#### Shared Package (needed only once)
```bash
cd shared
npm install
npx tsc
cd ..
```

#### Each Service (open a separate terminal for each)
```bash
# Terminal 1 - Auth Service
cd services/auth-service
npm install
npx ts-node src/app.ts

# Terminal 2 - Chat Service
cd services/chat-service
npm install
npx ts-node src/server.ts

# Terminal 3 - AI Service
cd services/ai-service
npm install
npx ts-node src/app.ts

# Terminal 4 - Notification Service
cd services/notification-service
npm install
npx ts-node src/app.ts

# Terminal 5 - Gateway
cd gateway
npm install
npx ts-node src/server.ts
```

> **💡 Tip:** You need 5 terminal windows open at the same time (one per service).

### Step 5: Test That Everything Works

Open a NEW terminal and run these commands one by one:

**Test 1: Signup a user**
```bash
curl -X POST http://localhost:5000/auth/signup ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"
```
✅ **Expected:** You get back a JSON response with `"success": true` and an access token.

**Test 2: Login**
```bash
curl -X POST http://localhost:5000/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"
```
✅ **Expected:** Same as above — you get a token.

> ⚠️ **Windows Users:** If `curl` doesn't work, install it or use a tool like Postman (https://www.postman.com/).

---

## 📂 Project Structure (Which File Does What)

```
backend/
├── .env                       # API keys and secrets (DO NOT SHARE)
├── docker-compose.yml         # Tells Docker which services to run
├── package.json               # Root project config
│
├── shared/                    # 📦 Shared code (used by ALL services)
│   └── src/
│       ├── env.ts             # Reads .env variables and validates them
│       ├── logger.ts          # Makes pretty colored logs
│       ├── ApiResponse.ts     # Standard format for API responses
│       └── AppError.ts        # Standard way to throw errors
│
├── gateway/                   # 🚪 API Gateway
│   └── src/
│       ├── proxy.ts           # Forwards requests to other services
│       ├── auth.middleware.ts # Checks JWT tokens on protected routes
│       ├── rateLimiter.ts     # Stops spam (100 requests/minute per IP)
│       ├── routes.ts          # Defines all the API endpoints
│       └── server.ts          # Starts the Express server
│
├── services/
│   ├── auth-service/          # 🔐 Auth Service
│   │   └── src/
│   │       ├── models/User.ts          # User database schema
│   │       ├── services/auth.service.ts # Login/signup logic
│   │       ├── services/user.service.ts # Profile updates
│   │       ├── controllers/            # Route handlers
│   │       ├── routes/index.ts          # API endpoints
│   │       ├── config/db.ts             # MongoDB connection
│   │       └── app.ts                   # Server entry point
│   │
│   ├── chat-service/          # 💬 Chat Service
│   │   └── src/
│   │       ├── models/Message.ts       # Message database schema
│   │       ├── models/Room.ts          # Chat room schema
│   │       ├── services/message.service.ts # Save/fetch messages
│   │       ├── services/socket.service.ts  # WebSocket handlers
│   │       ├── controllers/            # REST API handlers
│   │       ├── routes/index.ts          # History endpoint
│   │       ├── config/db.ts             # MongoDB connection
│   │       └── server.ts                # Socket.IO + Express server
│   │
│   ├── ai-service/            # 🧠 AI Service
│   │   └── src/
│   │       ├── models/Log.ts           # Logs AI interactions
│   │       ├── services/openrouter.ts  # Talks to OpenRouter API
│   │       ├── services/intent.ts      # Figures out what user wants
│   │       ├── services/sentiment.ts   # Detects happy/sad/angry
│   │       ├── services/triage.ts      # Decides: AI answer or human?
│   │       ├── services/stream.ts      # SSE streaming handler
│   │       ├── services/escalation.ts  # Hands off to human agent
│   │       ├── routes/index.ts          # API endpoints
│   │       ├── config/db.ts             # MongoDB connection
│   │       └── app.ts                   # Server entry point
│   │
│   └── notification-service/  # 📧 Notification Service
│       └── src/
│           ├── config/queue.ts         # BullMQ email queue
│           ├── services/sendgrid.ts    # Sends email via SendGrid
│           ├── workers/email.worker.ts # Background email sender
│           ├── routes/index.ts          # API endpoints
│           └── app.ts                   # Server entry point
│
└── docs/                      # 📝 Documentation
    └── superpowers/
        ├── specs/             # Design documents
        └── plans/             # Implementation plans
```

---

## 🔍 How It All Works Together (Step by Step)

When a user sends a message in the chat:

1. **Browser** → sends message to Gateway (`POST /chat/message`)
2. **Gateway** → checks the JWT token (is this user logged in?) → forwards to Chat Service
3. **Chat Service** → saves the message to MongoDB → broadcasts it to everyone in the room via WebSocket
4. **Chat Service** → also sends the message to AI Service for a reply
5. **AI Service** → runs TWO things in parallel:
   - "What does this user want?" (intent detection)
   - "Are they happy or angry?" (sentiment analysis)
6. **AI Service** → combines results. If confident enough (>= 60%), streams an AI reply word-by-word via SSE
7. **AI Service** → if NOT confident enough, tells the Chat Service to hand the conversation to a human agent

---

## 👥 Team Work Plan (Who Does What)

| Person | Service | Files They Edit | Difficulty |
|--------|---------|----------------|------------|
| **Person A** | Gateway | `gateway/src/*` | Easy |
| **Person B** | Auth Service | `services/auth-service/src/*` | Medium (passwords) |
| **Person C** | Chat Service | `services/chat-service/src/*` | Medium (WebSockets) |
| **Person D** | AI Service | `services/ai-service/src/*` | Hard (streaming) |
| **Anyone** | Notification | `services/notification-service/src/*` | Easy |

**Rules for the team:**
- Each person only edits files in THEIR service folder
- NEVER edit someone else's files without asking
- If you need to change something shared (in `shared/` folder), tell everyone
- Test your service BEFORE asking someone to test the full system

---

## 🐛 Common Problems (And How to Fix Them)

### "Port already in use"
You have a service already running. Either:
- Close the old terminal window
- Or run `taskkill /F /IM node.exe` to kill all Node processes

### "MongoDB connection refused"
MongoDB isn't running. Run:
```bash
docker-compose up -d mongo
```

### "Cannot find module 'express'"
You forgot to install dependencies. Run:
```bash
npm install
```
inside the service folder.

### "OpenRouter API key not set"
You didn't put your API key in the `.env` file. Get one at https://openrouter.ai/keys

---

## 🧪 Testing Checklist

Before the demo, run through this:

- [ ] `docker-compose up -d mongo redis` → both containers running
- [ ] All 5 services start without errors
- [ ] `curl POST /auth/signup` returns 201 with token
- [ ] `curl POST /auth/login` returns 200 with token
- [ ] `curl GET /auth/me` with token returns user profile
- [ ] Chat WebSocket connects (test with browser console)
- [ ] AI stream endpoint returns SSE data

---

## 🏆 What Judges Are Looking For

| Criterion | How We Show It |
|-----------|---------------|
| **Microservices** | 5 independent services, each with its own folder and Dockerfile |
| **Horizontal Scaling** | Each service is stateless (state in Mongo/Redis) — run multiple copies |
| **Real-time** | Chat uses WebSockets (Socket.IO) |
| **AI** | Streaming AI responses via SSE |
| **Async Processing** | Notification uses BullMQ queue |
| **Security** | JWT tokens + httpOnly cookies + rate limiting |

---

Built with ❤️ for the hackathon. Good luck! 🎉
