# Cardano Smart Contracts for CardanoVerse

This directory contains Plutus smart contracts for the CardanoVerse trading cards platform.

## Overview

Smart contracts power the trustless trading and NFT functionality of CardanoVerse:

- **Minting Policy**: Controls NFT card creation
- **Marketplace Validator**: Handles card sales and purchases
- **Escrow Contract**: Enables safe P2P trades
- **Royalty Distributor**: Automates creator royalties

## Technology Stack

- **Aiken**: Modern smart contract language for Cardano
- **Plutus V3**: Latest Plutus version with enhanced features
- **CIP-25**: NFT metadata standard
- **CIP-68**: Enhanced NFT datum standard

## Contract Architecture

```
┌────────────────────────────────────────────────────────┐
│              CardanoVerse Smart Contracts               │
├────────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌──────────────────────────┐   │
│  │  Minting Policy  │  │  Marketplace Validator   │   │
│  │                  │  │                          │   │
│  │  - NFT Creation  │  │  - List Card for Sale    │   │
│  │  - Supply Cap    │  │  - Purchase Card         │   │
│  │  - Burn Tokens   │  │  - Cancel Listing        │   │
│  └──────────────────┘  └──────────────────────────┘   │
│                                                        │
│  ┌──────────────────┐  ┌──────────────────────────┐   │
│  │ Escrow Contract  │  │  Royalty Distributor     │   │
│  │                  │  │                          │   │
│  │  - P2P Trades    │  │  - Creator Royalties     │   │
│  │  - Atomic Swaps  │  │  - Platform Fees         │   │
│  │  - Dispute Res.  │  │  - Auto Distribution     │   │
│  └──────────────────┘  └──────────────────────────┘   │
└────────────────────────────────────────────────────────┘
```

## Contracts

### 1. Minting Policy

**Purpose**: Controls the creation of trading card NFTs

**Features**:
- Single-use minting (one card per transaction)
- Metadata validation (CIP-25/68 compliance)
- Supply cap enforcement
- Authorized minter verification

**File**: `validators/minting_policy.ak`

### 2. Marketplace Validator

**Purpose**: Manages the decentralized marketplace

**Features**:
- List cards for sale with ADA pricing
- Purchase cards with automatic transfer
- Cancel listings
- Platform fee collection (2.5%)
- Creator royalty enforcement (5%)

**File**: `validators/marketplace.ak`

### 3. Escrow Contract

**Purpose**: Enables safe peer-to-peer trades

**Features**:
- Lock cards and ADA in escrow
- Atomic swap execution
- Timeout-based refunds
- Multi-signature support

**File**: `validators/escrow.ak`

### 4. Royalty Distributor

**Purpose**: Automates royalty payments

**Features**:
- Automatic royalty calculation
- Multi-recipient distribution
- Gas-efficient batching
- Transparent tracking

**File**: `validators/royalty.ak`

## Development

### Prerequisites

```bash
# Install Aiken
curl -sSfL https://install.aiken-lang.org | bash

# Verify installation
aiken --version
```

### Building Contracts

```bash
# Build all contracts
aiken build

# Check contracts
aiken check

# Run tests
aiken test
```

### Testing

```bash
# Unit tests
aiken test

# Integration tests
npm run test:integration
```

### Deployment

```bash
# Deploy to PreProd testnet
npm run deploy:preprod

# Deploy to Mainnet
npm run deploy:mainnet
```

## Contract Addresses (PreProd)

```
Minting Policy: addr_test1...
Marketplace: addr_test1...
Escrow: addr_test1...
Royalty: addr_test1...
```

## Transaction Examples

### Mint a Card

```typescript
const mintTx = await lucid
  .newTx()
  .mintAssets({
    [policyId + assetName]: 1n,
  })
  .attachMetadata(721, metadata)
  .complete();

const signedTx = await mintTx.sign().complete();
await signedTx.submit();
```

### List Card for Sale

```typescript
const listTx = await lucid
  .newTx()
  .payToContract(marketplaceAddress, {
    inline: datum,
  }, {
    [assetId]: 1n,
  })
  .complete();
```

### Purchase Card

```typescript
const purchaseTx = await lucid
  .newTx()
  .collectFrom([utxo], redeemer)
  .attachSpendingValidator(marketplaceValidator)
  .payToAddress(sellerAddress, { lovelace: priceInLovelace })
  .complete();
```

## Security Considerations

1. **Double Satisfaction**: Prevented through proper UTXO handling
2. **Integer Overflow**: Aiken's type system prevents overflow
3. **Reentrancy**: Not applicable in UTXO model
4. **Front-running**: Mitigated through proper datum design
5. **Signature Verification**: Required for all state transitions

## Auditing

Contracts will be audited by:
- [ ] MLabs
- [ ] Tweag
- [ ] Internal security review

## Gas Optimization

- Efficient datum structures
- Minimal script size
- Optimized validation logic
- Batch operations where possible

## Future Enhancements

- [ ] Auction mechanism
- [ ] Bundle sales
- [ ] Fractional ownership
- [ ] Lending protocol
- [ ] Cross-chain bridges
- [ ] DAO governance

## Resources

- [Aiken Documentation](https://aiken-lang.org/)
- [Plutus Documentation](https://plutus.readthedocs.io/)
- [CIP-25 Spec](https://cips.cardano.org/cips/cip25/)
- [CIP-68 Spec](https://cips.cardano.org/cips/cip68/)
