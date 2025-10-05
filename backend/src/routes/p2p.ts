import { Router } from 'express';
import axios from 'axios';

const router = Router();
const MASUMI_URL = process.env.MASUMI_NODE_URL || 'http://localhost:7777';

// Broadcast trade offer to P2P network
router.post('/broadcast-offer', async (req, res) => {
  try {
    const { offerId, cardId, price, seller } = req.body;
    
    const response = await axios.post(`${MASUMI_URL}/p2p/broadcast`, {
      type: 'trade-offer',
      data: { offerId, cardId, price, seller },
    });
    
    res.json({
      success: true,
      peers: response.data.peersReached,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to broadcast offer' });
  }
});

// Get active P2P offers
router.get('/active-offers', async (req, res) => {
  try {
    const response = await axios.get(`${MASUMI_URL}/p2p/offers`);
    
    res.json({
      offers: response.data.offers,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get active offers' });
  }
});

// Get P2P network stats
router.get('/network-stats', async (req, res) => {
  try {
    const response = await axios.get(`${MASUMI_URL}/p2p/stats`);
    
    res.json({
      connectedPeers: response.data.connectedPeers,
      totalOffers: response.data.totalOffers,
      volume24h: response.data.volume24h,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get network stats' });
  }
});

export { router as p2pRouter };
