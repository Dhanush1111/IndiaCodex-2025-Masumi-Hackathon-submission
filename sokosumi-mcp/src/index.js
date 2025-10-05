import express from 'express';
import dotenv from 'dotenv';
import { valuationAgent } from './agents/valuation.js';
import { tradingAdvisorAgent } from './agents/trading-advisor.js';
import { marketAnalysisAgent } from './agents/market-analysis.js';
import { rarityEvaluatorAgent } from './agents/rarity-evaluator.js';

dotenv.config();

const app = express();
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', agents: ['valuation', 'trading-advisor', 'market-analysis', 'rarity-evaluator'] });
});

// Valuation Agent
app.post('/agent/valuation', async (req, res) => {
  try {
    const { cardId, metadata, historicalSales } = req.body;
    const result = await valuationAgent({ cardId, metadata, historicalSales });
    res.json(result);
  } catch (error) {
    console.error('Valuation agent error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Trading Advisor Agent
app.post('/agent/trading-advisor', async (req, res) => {
  try {
    const { portfolio, riskProfile, marketConditions } = req.body;
    const result = await tradingAdvisorAgent({ portfolio, riskProfile, marketConditions });
    res.json(result);
  } catch (error) {
    console.error('Trading advisor agent error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Market Analysis Agent
app.get('/agent/market-analysis', async (req, res) => {
  try {
    const result = await marketAnalysisAgent();
    res.json(result);
  } catch (error) {
    console.error('Market analysis agent error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Rarity Evaluator Agent
app.post('/agent/rarity-evaluator', async (req, res) => {
  try {
    const { cardAttributes, collectionStats } = req.body;
    const result = await rarityEvaluatorAgent({ cardAttributes, collectionStats });
    res.json(result);
  } catch (error) {
    console.error('Rarity evaluator agent error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.MCP_PORT || 3000;

app.listen(PORT, () => {
  console.log('🤖 Sokosumi MCP Server started');
  console.log(`🌐 Listening on port ${PORT}`);
  console.log('✅ AI Agents: Valuation, Trading Advisor, Market Analysis, Rarity Evaluator');
});
