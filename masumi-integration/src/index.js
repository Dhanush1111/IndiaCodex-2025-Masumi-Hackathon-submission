import { createLibp2p } from 'libp2p';
import { tcp } from '@libp2p/tcp';
import { noise } from '@libp2p/noise';
import { mplex } from '@libp2p/mplex';
import { gossipsub } from '@libp2p/gossipsub';
import { kadDHT } from '@libp2p/kad-dht';
import { bootstrap } from '@libp2p/bootstrap';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const ORDER_BOOK_TOPIC = '/cardanoverse/orderbook/v1';
const TRADE_TOPIC = '/cardanoverse/trades/v1';

let node;
const activeOffers = new Map();

async function startNode() {
  node = await createLibp2p({
    addresses: {
      listen: [`/ip4/0.0.0.0/tcp/${process.env.MASUMI_NODE_PORT || 7777}`],
    },
    transports: [tcp()],
    connectionEncryption: [noise()],
    streamMuxers: [mplex()],
    peerDiscovery: [
      bootstrap({
        list: process.env.MASUMI_BOOTSTRAP_PEERS?.split(',') || [],
      }),
    ],
    services: {
      pubsub: gossipsub({ emitSelf: false }),
      dht: kadDHT(),
    },
  });

  await node.start();
  console.log('🚀 Masumi Network Node started');
  console.log('🆔 Peer ID:', node.peerId.toString());

  // Subscribe to topics
  node.services.pubsub.subscribe(ORDER_BOOK_TOPIC);
  node.services.pubsub.addEventListener('message', handleMessage);

  console.log(`📡 Subscribed to ${ORDER_BOOK_TOPIC}`);
}

function handleMessage(event) {
  try {
    const message = JSON.parse(new TextDecoder().decode(event.detail.data));
    
    if (event.detail.topic === ORDER_BOOK_TOPIC) {
      console.log('📥 Received order:', message);
      activeOffers.set(message.data.offerId, {
        ...message.data,
        receivedAt: Date.now(),
      });
    }
  } catch (error) {
    console.error('Error handling message:', error);
  }
}

// Express API
const app = express();
app.use(express.json());

app.post('/p2p/broadcast', async (req, res) => {
  try {
    const message = JSON.stringify(req.body);
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    
    await node.services.pubsub.publish(ORDER_BOOK_TOPIC, data);
    
    res.json({
      success: true,
      peersReached: node.services.pubsub.getSubscribers(ORDER_BOOK_TOPIC).length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/p2p/offers', (req, res) => {
  const offers = Array.from(activeOffers.values());
  res.json({ offers });
});

app.get('/p2p/stats', (req, res) => {
  res.json({
    connectedPeers: node.getPeers().length,
    totalOffers: activeOffers.size,
    volume24h: 0, // TODO: Calculate from offers
  });
});

const PORT = process.env.MASUMI_NODE_PORT || 7777;
app.listen(PORT, () => {
  console.log(`🌐 API server listening on port ${PORT}`);
});

startNode().catch(console.error);
