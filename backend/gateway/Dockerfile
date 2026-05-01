FROM node:18-alpine
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npx tsc

# Expose the port the service runs on
EXPOSE 5000

# Start the server
CMD ["node", "dist/server.js"]
