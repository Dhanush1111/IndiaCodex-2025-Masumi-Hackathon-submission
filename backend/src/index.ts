import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { cardanoRouter } from './routes/cardano.js';
import { aiAgentsRouter } from './routes/ai-agents.js';
import { p2pRouter } from './routes/p2p.js';
import { cardsRouter } from './routes/cards.js';
import { logger } from './utils/logger.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  },
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/v1/cardano', cardanoRouter);
app.use('/api/v1/ai-agents', aiAgentsRouter);
app.use('/api/v1/p2p', p2pRouter);
app.use('/api/v1/cards', cardsRouter);

// WebSocket connection
io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`);
  
  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });

  // Subscribe to market updates
  socket.on('subscribe:market', () => {
    socket.join('market-updates');
  });

  // Subscribe to AI insights
  socket.on('subscribe:ai-insights', () => {
    socket.join('ai-insights');
  });
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Error:', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500,
    },
  });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  logger.info(`🚀 CardanoVerse Backend running on port ${PORT}`);
  logger.info(`📡 WebSocket server ready`);
  logger.info(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export { io };
