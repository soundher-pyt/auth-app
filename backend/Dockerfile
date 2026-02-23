# Use Node.js base image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json first (for caching)
COPY package.json .

# Install dependencies
RUN npm install

# Copy rest of the code
COPY . .

# Expose port
EXPOSE 5000

# Start the server
CMD ["node", "src/server.js"]
