# 📡 CardanoVerse API Documentation

## Base URLs

- **Development**: `http://localhost:5000/api/v1`
- **Production**: `https://api.cardanoverse.io/api/v1`

## Authentication

Most endpoints require wallet-based authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Health Check

#### GET `/health`

Check API server health.

**Response**:
```json
{
  "status": "healthy",
  "timestamp": "2025-10-05T12:00:00.000Z"
}
```

---

## 🪙 Cardano Blockchain Endpoints

### Get Wallet Balance

#### GET `/cardano/balance/:address`

Get the ADA balance of a Cardano address.

**Parameters**:
- `address` (path): Cardano address

**Response**:
```json
{
  "balance": {
    "amount": [
      {
        "unit": "lovelace",
        "quantity": "5000000000"
      }
    ]
  }
}
```

### Get NFTs by Address

#### GET `/cardano/nfts/:address`

Get all NFTs owned by an address.

**Parameters**:
- `address` (path): Cardano address

**Response**:
```json
{
  "assets": [
    {
      "unit": "policy_id.asset_name",
      "quantity": "1"
    }
  ]
}
```

### Submit Transaction

#### POST `/cardano/submit-tx`

Submit a signed transaction to the Cardano blockchain.

**Request Body**:
```json
{
  "signedTx": "84a40081825820..."
}
```

**Response**:
```json
{
  "txHash": "5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb"
}
```

### Get Transaction Status

#### GET `/cardano/tx/:hash`

Get the status of a transaction.

**Parameters**:
- `hash` (path): Transaction hash

**Response**:
```json
{
  "transaction": {
    "hash": "5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb",
    "block": "...",
    "block_height": 8765432,
    "slot": 87654321
  }
}
```

---

## 🤖 AI Agent Endpoints

### Get Card Valuation

#### POST `/ai-agents/valuation`

Get AI-powered valuation for a trading card.

**Request Body**:
```json
{
  "cardId": "asset_id",
  "metadata": {
    "name": "Legendary Dragon",
    "rarity": "legendary",
    "attributes": {
      "power": 95,
      "defense": 88
    }
  },
  "historicalSales": [
    {
      "price": 100,
      "timestamp": 1696512000000
    }
  ]
}
```

**Response**:
```json
{
  "valuation": 125.50,
  "confidence": 0.87,
  "factors": {
    "rarity": 10.0,
    "demand": 1.5,
    "historicalTrend": 1.2,
    "collectionPopularity": 1.2
  },
  "recommendation": "Strong Buy"
}
```

### Get Trading Advice

#### POST `/ai-agents/trading-advice`

Get personalized trading recommendations.

**Request Body**:
```json
{
  "portfolio": [
    {
      "id": "card_1",
      "rarity": "rare",
      "collection": "fantasy"
    }
  ],
  "riskProfile": "moderate",
  "marketConditions": {
    "trend": "bullish"
  }
}
```

**Response**:
```json
{
  "recommendations": [
    {
      "action": "buy",
      "cardId": "trending-card-1",
      "reasoning": "This card shows strong upward momentum with moderate risk.",
      "expectedReturn": 15,
      "risk": 5
    }
  ],
  "reasoning": "Based on your moderate risk profile, we recommend 1 actions...",
  "portfolioHealth": 60
}
```

### Get Market Analysis

#### GET `/ai-agents/market-analysis`

Get AI-powered market analysis and trends.

**Response**:
```json
{
  "trends": [
    {
      "category": "Fantasy Cards",
      "direction": "up",
      "strength": 0.8,
      "volume": "+35% last 7 days"
    }
  ],
  "hotCards": [
    {
      "id": "dragon-legendary-001",
      "name": "Ancient Dragon",
      "priceChange": "+45%",
      "volume": 1250,
      "reason": "New expansion announcement"
    }
  ],
  "predictions": [
    {
      "timeframe": "24 hours",
      "prediction": "Fantasy category expected to continue upward trend",
      "confidence": 0.82
    }
  ],
  "marketSentiment": {
    "overall": "bullish",
    "score": 0.72,
    "indicators": {
      "social": 0.78,
      "trading": 0.71,
      "newListings": 0.68
    }
  },
  "timestamp": "2025-10-05T12:00:00.000Z"
}
```

### Calculate Rarity Score

#### POST `/ai-agents/rarity-score`

Calculate the rarity score for a card.

**Request Body**:
```json
{
  "cardAttributes": {
    "background": "starry_night",
    "character": "dragon",
    "element": "fire",
    "power": 95
  },
  "collectionStats": {
    "totalCards": 10000,
    "attributes": {
      "background": {
        "distribution": {
          "starry_night": 0.05
        }
      }
    }
  }
}
```

**Response**:
```json
{
  "rarityScore": 87.5,
  "ranking": 125,
  "classification": "Legendary",
  "breakdown": {
    "background": 95,
    "character": 82,
    "element": 88,
    "power": 85
  },
  "percentile": 98
}
```

---

## 🌐 P2P Network Endpoints

### Broadcast Trade Offer

#### POST `/p2p/broadcast-offer`

Broadcast a trade offer to the P2P network.

**Request Body**:
```json
{
  "offerId": "uuid-1234",
  "cardId": "asset_id",
  "price": 100000000,
  "seller": "addr_test1..."
}
```

**Response**:
```json
{
  "success": true,
  "peers": 15
}
```

### Get Active Offers

#### GET `/p2p/active-offers`

Get all active P2P trade offers.

**Response**:
```json
{
  "offers": [
    {
      "offerId": "uuid-1234",
      "cardId": "asset_id",
      "price": 100000000,
      "seller": "addr_test1...",
      "receivedAt": 1696512000000
    }
  ]
}
```

### Get Network Stats

#### GET `/p2p/network-stats`

Get P2P network statistics.

**Response**:
```json
{
  "connectedPeers": 25,
  "totalOffers": 150,
  "volume24h": 50000
}
```

---

## 🎴 Card Management Endpoints

### Get All Cards

#### GET `/cards`

Get all trading cards.

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `rarity` (optional): Filter by rarity
- `collection` (optional): Filter by collection

**Response**:
```json
{
  "cards": [
    {
      "id": "1",
      "name": "Legendary Dragon",
      "rarity": "legendary",
      "price": 100,
      "image": "ipfs://...",
      "owner": "addr_test1..."
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 500,
    "pages": 25
  }
}
```

### Get Card by ID

#### GET `/cards/:id`

Get detailed information about a specific card.

**Parameters**:
- `id` (path): Card ID

**Response**:
```json
{
  "card": {
    "id": "1",
    "name": "Legendary Dragon",
    "description": "A powerful dragon card",
    "rarity": "legendary",
    "price": 100,
    "image": "ipfs://...",
    "owner": "addr_test1...",
    "attributes": {
      "power": 95,
      "defense": 88,
      "element": "fire"
    },
    "metadata": {
      "policyId": "...",
      "assetName": "..."
    },
    "history": [
      {
        "type": "minted",
        "timestamp": 1696512000000,
        "txHash": "..."
      }
    ]
  }
}
```

### Mint New Card

#### POST `/cards/mint`

Mint a new trading card as Cardano NFT.

**Request Body**:
```json
{
  "name": "Epic Warrior",
  "description": "A fierce warrior card",
  "attributes": {
    "power": 85,
    "defense": 78,
    "element": "earth"
  },
  "metadata": {
    "creator": "Artist Name",
    "collection": "Warriors"
  },
  "image": "base64_encoded_image_or_ipfs_cid"
}
```

**Response**:
```json
{
  "success": true,
  "txHash": "5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb",
  "assetId": "policy_id.asset_name",
  "cardId": "generated_card_id"
}
```

---

## 🔌 WebSocket Events

Connect to WebSocket server at `ws://localhost:5000` or `wss://api.cardanoverse.io`

### Client → Server Events

#### `subscribe:market`
Subscribe to market updates.

```javascript
socket.emit('subscribe:market');
```

#### `subscribe:ai-insights`
Subscribe to AI insights updates.

```javascript
socket.emit('subscribe:ai-insights');
```

### Server → Client Events

#### `market:update`
Receive real-time market updates.

```javascript
socket.on('market:update', (data) => {
  console.log('Market update:', data);
});
```

**Payload**:
```json
{
  "type": "price_change",
  "cardId": "asset_id",
  "oldPrice": 100,
  "newPrice": 110,
  "timestamp": 1696512000000
}
```

#### `ai:insight`
Receive real-time AI insights.

```javascript
socket.on('ai:insight', (data) => {
  console.log('AI insight:', data);
});
```

**Payload**:
```json
{
  "type": "valuation_update",
  "cardId": "asset_id",
  "valuation": 125.50,
  "confidence": 0.87,
  "timestamp": 1696512000000
}
```

---

## Error Responses

All endpoints follow a consistent error response format:

```json
{
  "error": {
    "message": "Error description",
    "status": 400,
    "code": "ERROR_CODE"
  }
}
```

### Common Error Codes

| Status | Code | Description |
|--------|------|-------------|
| 400 | BAD_REQUEST | Invalid request parameters |
| 401 | UNAUTHORIZED | Missing or invalid authentication |
| 403 | FORBIDDEN | Insufficient permissions |
| 404 | NOT_FOUND | Resource not found |
| 429 | RATE_LIMIT_EXCEEDED | Too many requests |
| 500 | INTERNAL_ERROR | Server error |
| 503 | SERVICE_UNAVAILABLE | Service temporarily unavailable |

---

## Rate Limiting

API endpoints are rate-limited:
- **Default**: 100 requests per 15 minutes
- **Authenticated**: 1000 requests per 15 minutes

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1696512900
```

---

## SDK Examples

### JavaScript/TypeScript

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  headers: {
    'Authorization': `Bearer ${jwt_token}`,
  },
});

// Get card valuation
const valuation = await api.post('/ai-agents/valuation', {
  cardId: 'asset_id',
  metadata: { /* ... */ },
  historicalSales: [],
});

console.log('Valuation:', valuation.data);
```

### Python

```python
import requests

api_url = 'http://localhost:5000/api/v1'
headers = {'Authorization': f'Bearer {jwt_token}'}

# Get market analysis
response = requests.get(f'{api_url}/ai-agents/market-analysis', headers=headers)
data = response.json()

print('Market Analysis:', data)
```

### cURL

```bash
# Get network stats
curl -X GET http://localhost:5000/api/v1/p2p/network-stats \
  -H "Authorization: Bearer your_jwt_token"

# Mint a card
curl -X POST http://localhost:5000/api/v1/cards/mint \
  -H "Authorization: Bearer your_jwt_token" \
  -H "Content-Type: application/json" \
  -d '{"name":"Epic Warrior","attributes":{}}'
```

---

## Changelog

### Version 1.0.0 (2025-10-05)
- Initial API release
- Cardano integration endpoints
- AI agent endpoints
- P2P network endpoints
- Card management endpoints
- WebSocket support

---

**For more information, visit**: https://docs.cardanoverse.io  
**Support**: support@cardanoverse.io  
**Discord**: https://discord.gg/cardanoverse
