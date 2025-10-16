import { Router } from 'express';
import { masumiPaymentService } from '../services/masumi-payment.js';
import { crewAIService } from '../services/crewai-service.js';

const router = Router();

// Mock database
const mockCards = [
  {
    id: '1',
    name: 'Legendary Dragon',
    rarity: 'legendary',
    price: 500,
    image: 'https://picsum.photos/seed/dragon/400/600',
    owner: 'addr_test1qz...',
    description: 'A powerful dragon that commands fire and fury.',
    stats: { attack: 95, defense: 85, speed: 70 },
    attributes: [
      { trait: 'Element', value: 'Fire' },
      { trait: 'Class', value: 'Beast' },
    ],
  },
  {
    id: '2',
    name: 'Epic Warrior',
    rarity: 'epic',
    price: 150,
    image: 'https://picsum.photos/seed/warrior/400/600',
    owner: 'addr_test1qy...',
    description: 'A skilled warrior with unmatched combat prowess.',
    stats: { attack: 80, defense: 75, speed: 60 },
    attributes: [
      { trait: 'Element', value: 'Steel' },
      { trait: 'Class', value: 'Fighter' },
    ],
  },
  {
    id: '3',
    name: 'Rare Mage',
    rarity: 'rare',
    price: 75,
    image: 'https://picsum.photos/seed/mage/400/600',
    owner: 'addr_test1qx...',
    description: 'A mystical mage wielding powerful spells.',
    stats: { attack: 70, defense: 50, speed: 80 },
    attributes: [
      { trait: 'Element', value: 'Arcane' },
      { trait: 'Class', value: 'Caster' },
    ],
  },
];

// Get all cards
router.get('/', async (req, res) => {
  try {
    const { rarity, minPrice, maxPrice, sort } = req.query;
    
    let filteredCards = [...mockCards];
    
    // Filter by rarity
    if (rarity && rarity !== 'all') {
      filteredCards = filteredCards.filter(card => card.rarity === rarity);
    }
    
    // Filter by price range
    if (minPrice) {
      filteredCards = filteredCards.filter(card => card.price >= Number(minPrice));
    }
    if (maxPrice) {
      filteredCards = filteredCards.filter(card => card.price <= Number(maxPrice));
    }
    
    // Sort
    if (sort === 'price_asc') {
      filteredCards.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
      filteredCards.sort((a, b) => b.price - a.price);
    }
    
    res.json({
      cards: filteredCards,
      total: filteredCards.length,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cards' });
  }
});

// Get card by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const card = mockCards.find(c => c.id === id);
    
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }
    
    res.json({ card });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch card' });
  }
});

// Mint new card
router.post('/mint', async (req, res) => {
  try {
    const { name, description, rarity, stats, attributes, image } = req.body;
    
    // Validate required fields
    if (!name || !description || !image) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Generate mock transaction hash
    const txHash = 'tx_' + Math.random().toString(36).substring(7);
    const assetId = 'asset_' + Math.random().toString(36).substring(7);
    
    // Create new card
    const newCard = {
      id: String(mockCards.length + 1),
      name,
      description,
      rarity: rarity || 'common',
      price: 0, // Newly minted cards start with no price
      image,
      owner: 'addr_test1qz...', // Would be actual wallet address
      stats: stats || { attack: 50, defense: 50, speed: 50 },
      attributes: attributes || [],
    };
    
    mockCards.push(newCard);
    
    res.json({
      success: true,
      txHash,
      assetId,
      card: newCard,
      message: 'Card minted successfully on Cardano blockchain',
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to mint card' });
  }
});

// List card for sale
router.post('/:id/list', async (req, res) => {
  try {
    const { id } = req.params;
    const { price } = req.body;
    
    const card = mockCards.find(c => c.id === id);
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }
    
    card.price = price;
    
    res.json({
      success: true,
      message: 'Card listed for sale',
      card,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to list card' });
  }
});

// Purchase card with Masumi AI-powered payment
router.post('/:id/purchase', async (req, res) => {
  try {
    const { id } = req.params;
    const { buyerAddress, autoPayment = true } = req.body;
    
    const card = mockCards.find(c => c.id === id);
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    if (autoPayment) {
      // Use AI-powered automated payment through Masumi
      console.log(`🚀 Initiating AI-powered payment for card: ${card.name}`);
      
      const paymentResult = await masumiPaymentService.processAutomatedPayment(
        card,
        buyerAddress,
        card.owner
      );

      if (!paymentResult.success) {
        return res.status(400).json({
          error: 'Payment rejected by AI agent',
          message: 'The AI agent determined this purchase does not meet criteria',
        });
      }

      // Transfer ownership after successful payment
      const previousOwner = card.owner;
      card.owner = buyerAddress;

      res.json({
        success: true,
        txHash: paymentResult.transactionId,
        message: 'Card purchased successfully via Masumi AI payment',
        card,
        payment: {
          method: 'masumi-ai-automated',
          transactionId: paymentResult.transactionId,
          status: paymentResult.status,
          gasUsed: paymentResult.gasUsed,
          timestamp: paymentResult.timestamp,
        },
        aiAnalysis: {
          approved: true,
          previousOwner,
        },
      });
    } else {
      // Manual payment flow
      const txHash = 'tx_' + Math.random().toString(36).substring(7);
      card.owner = buyerAddress;
      
      res.json({
        success: true,
        txHash,
        message: 'Card purchased successfully',
        card,
        payment: {
          method: 'manual',
        },
      });
    }
  } catch (error) {
    console.error('Purchase error:', error);
    res.status(500).json({ error: 'Failed to purchase card' });
  }
});

// Get CrewAI valuation for a card
router.get('/:id/ai-valuation', async (req, res) => {
  try {
    const { id } = req.params;
    const card = mockCards.find(c => c.id === id);
    
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    console.log(`🤖 CrewAI evaluating card: ${card.name}`);
    const analysisResult = await crewAIService.analyzeCardPurchase(card);
    
    if (!analysisResult.success) {
      return res.status(500).json({ error: analysisResult.error || 'Analysis failed' });
    }

    const decision = analysisResult.analysis;
    const aiValuation = decision.recommended_price || card.price;
    
    res.json({
      cardId: id,
      currentPrice: card.price,
      aiValuation,
      difference: aiValuation - card.price,
      recommendation: aiValuation > card.price ? 'undervalued' : 'overvalued',
      crewAIAnalysis: {
        decision: decision.decision,
        confidence: decision.confidence_score,
        reasoning: decision.reasoning,
        keyFactors: decision.key_factors,
        agentConsensus: decision.agent_consensus,
      },
    });
  } catch (error) {
    console.error('CrewAI valuation error:', error);
    res.status(500).json({ error: 'Failed to get AI valuation. Is CrewAI service running?' });
  }
});

export { router as cardsRouter };
