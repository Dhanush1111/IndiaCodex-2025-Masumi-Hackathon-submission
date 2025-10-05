FROM node:20-alpine

WORKDIR /app

# Install Python for ML dependencies
RUN apk add --no-cache python3 py3-pip

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy application
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
