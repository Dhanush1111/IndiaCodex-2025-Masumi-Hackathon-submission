import { Router } from 'express';
import axios from 'axios';

const router = Router();
const SOKOSUMI_URL = process.env.SOKOSUMI_MCP_URL || 'http://localhost:3000';

// Get AI valuation for a card
router.post('/valuation', async (req, res) => {
  try {
    const { cardId, metadata, historicalSales } = req.body;
    
    const response = await axios.post(`${SOKOSUMI_URL}/agent/valuation`, {
      cardId,
      metadata,
      historicalSales,
    });
    
    res.json({
      valuation: response.data.valuation,
      confidence: response.data.confidence,
      factors: response.data.factors,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get AI valuation' });
  }
});

// Get trading recommendations
router.post('/trading-advice', async (req, res) => {
  try {
    const { portfolio, riskProfile, marketConditions } = req.body;
    
    const response = await axios.post(`${SOKOSUMI_URL}/agent/trading-advisor`, {
      portfolio,
      riskProfile,
      marketConditions,
    });
    
    res.json({
      recommendations: response.data.recommendations,
      reasoning: response.data.reasoning,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get trading advice' });
  }
});

// Get market analysis
router.get('/market-analysis', async (req, res) => {
  try {
    const response = await axios.get(`${SOKOSUMI_URL}/agent/market-analysis`);
    
    res.json({
      trends: response.data.trends,
      hotCards: response.data.hotCards,
      predictions: response.data.predictions,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get market analysis' });
  }
});

// Calculate rarity score
router.post('/rarity-score', async (req, res) => {
  try {
    const { cardAttributes, collectionStats } = req.body;
    
    const response = await axios.post(`${SOKOSUMI_URL}/agent/rarity-evaluator`, {
      cardAttributes,
      collectionStats,
    });
    
    res.json({
      rarityScore: response.data.rarityScore,
      ranking: response.data.ranking,
      breakdown: response.data.breakdown,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate rarity score' });
  }
});

export { router as aiAgentsRouter };
