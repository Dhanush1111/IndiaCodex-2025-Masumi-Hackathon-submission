import { Router } from 'express';
import { BlockFrostAPI } from '@blockfrost/blockfrost-js';

const router = Router();

// Initialize Blockfrost only if API key is provided
let blockfrost: BlockFrostAPI | null = null;
const apiKey = process.env.BLOCKFROST_API_KEY;

if (apiKey && apiKey !== 'your_blockfrost_api_key_here') {
  try {
    blockfrost = new BlockFrostAPI({
      projectId: apiKey,
    });
  } catch (error) {
    console.warn('Failed to initialize Blockfrost API:', error);
  }
}

// Get wallet balance
router.get('/balance/:address', async (req, res) => {
  try {
    if (!blockfrost) {
      return res.status(503).json({ 
        error: 'Blockfrost API not configured. Please add BLOCKFROST_API_KEY to .env file.',
        message: 'Get your free API key at https://blockfrost.io'
      });
    }
    const { address } = req.params;
    const balance = await blockfrost.addresses(address);
    res.json({ balance });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch balance' });
  }
});

// Get NFTs owned by address
router.get('/nfts/:address', async (req, res) => {
  try {
    if (!blockfrost) {
      return res.status(503).json({ 
        error: 'Blockfrost API not configured. Please add BLOCKFROST_API_KEY to .env file.',
        message: 'Get your free API key at https://blockfrost.io'
      });
    }
    const { address } = req.params;
    const addressInfo = await blockfrost.addresses(address);
    const assets = addressInfo.amount.filter((asset: any) => asset.unit !== 'lovelace');
    res.json({ assets });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch NFTs' });
  }
});

// Submit transaction
router.post('/submit-tx', async (req, res) => {
  try {
    if (!blockfrost) {
      return res.status(503).json({ 
        error: 'Blockfrost API not configured. Please add BLOCKFROST_API_KEY to .env file.',
        message: 'Get your free API key at https://blockfrost.io'
      });
    }
    const { signedTx } = req.body;
    const txHash = await blockfrost.txSubmit(signedTx);
    res.json({ txHash });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit transaction' });
  }
});

// Get transaction status
router.get('/tx/:hash', async (req, res) => {
  try {
    if (!blockfrost) {
      return res.status(503).json({ 
        error: 'Blockfrost API not configured. Please add BLOCKFROST_API_KEY to .env file.',
        message: 'Get your free API key at https://blockfrost.io'
      });
    }
    const { hash } = req.params;
    const tx = await blockfrost.txs(hash);
    res.json({ transaction: tx });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transaction' });
  }
});

export { router as cardanoRouter };
