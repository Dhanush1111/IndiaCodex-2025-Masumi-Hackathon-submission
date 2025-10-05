# Masumi Network Integration for CardanoVerse

This directory contains the Masumi Network integration for decentralized P2P trading infrastructure.

## Overview

Masumi Network provides the decentralized backbone for CardanoVerse's peer-to-peer marketplace:

- **Distributed Hash Table (DHT)**: For card catalog discovery
- **PubSub Messaging**: Real-time order book and trade notifications
- **IPFS Integration**: Decentralized storage for card artwork
- **NAT Traversal**: Universal peer connectivity

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Masumi Network Node                    │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   libp2p    │  │  Gossipsub   │  │   Kad-DHT    │  │
│  │  Transport  │  │   PubSub     │  │  Discovery   │  │
│  └─────────────┘  └──────────────┘  └──────────────┘  │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐   │
│  │          P2P Marketplace Protocol                │   │
│  │  - Order Broadcasting                            │   │
│  │  - Trade Matching                                │   │
│  │  - Price Discovery                               │   │
│  └─────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌─────────────────┐     │
│  │   IPFS   │  │  Crypto  │  │  CardanoVerse   │     │
│  │  Client  │  │  Identity│  │   API Bridge    │     │
│  └──────────┘  └──────────┘  └─────────────────┘     │
└─────────────────────────────────────────────────────────┘
```

## Features

### 1. Decentralized Order Book
- **Gossip-based dissemination**: Orders propagate through the network
- **Conflict-free replicated data types (CRDTs)**: Consistent order state
- **Real-time updates**: Sub-second order propagation

### 2. Peer Discovery
- **Bootstrap nodes**: Initial network entry points
- **Kademlia DHT**: Efficient peer routing
- **mDNS**: Local network discovery

### 3. Content Addressing
- **IPFS integration**: Card artwork and metadata storage
- **Content IDs (CIDs)**: Immutable content references
- **Pin services**: Ensure availability

## Setup Instructions

### Prerequisites
```bash
npm install
```

### Configuration

Edit `config/masumi.config.json`:

```json
{
  "network": {
    "port": 7777,
    "bootstrapPeers": [
      "/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ"
    ],
    "enableDHT": true,
    "enablePubSub": true
  },
  "marketplace": {
    "orderBookTopic": "/cardanoverse/orderbook/v1",
    "tradeTopic": "/cardanoverse/trades/v1",
    "maxOrderAge": 86400
  },
  "ipfs": {
    "apiUrl": "http://localhost:5001",
    "gateway": "https://ipfs.io/ipfs/"
  }
}
```

### Running with Docker

```bash
docker-compose up masumi-node
```

### Running Standalone

```bash
npm start
```

## API Endpoints

### P2P Marketplace

#### Broadcast Trade Offer
```http
POST /p2p/broadcast
Content-Type: application/json

{
  "type": "trade-offer",
  "data": {
    "offerId": "uuid",
    "cardId": "asset_id",
    "price": 100000000,
    "seller": "addr_test1..."
  }
}
```

#### Get Active Offers
```http
GET /p2p/offers
```

#### Get Network Stats
```http
GET /p2p/stats
```

## Protocol Specifications

### Order Message Format

```typescript
interface TradeOffer {
  id: string;
  type: 'sell' | 'buy';
  cardId: string;
  price: number;
  quantity: number;
  seller: string;
  timestamp: number;
  signature: string;
}
```

### Topic Structure

- **Order Book**: `/cardanoverse/orderbook/v1`
- **Trade Execution**: `/cardanoverse/trades/v1`
- **Market Data**: `/cardanoverse/market-data/v1`

## Security Considerations

1. **Signature Verification**: All orders must be signed by the seller's wallet
2. **Rate Limiting**: Prevent spam and DoS attacks
3. **Content Filtering**: Validate order messages
4. **Peer Reputation**: Track reliable peers

## Future Enhancements

- [ ] Order book sharding for scalability
- [ ] Zero-knowledge order privacy
- [ ] Cross-chain bridge integration
- [ ] Advanced matching algorithms
- [ ] Market maker incentives

## Resources

- [Masumi Network Documentation](https://github.com/masumi-network)
- [libp2p Documentation](https://docs.libp2p.io/)
- [IPFS Documentation](https://docs.ipfs.tech/)
