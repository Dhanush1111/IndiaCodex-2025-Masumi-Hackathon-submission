/**
 * Valuation Agent
 * Uses ML models to predict fair market value of trading cards
 */

export async function valuationAgent({ cardId, metadata, historicalSales }) {
  // Mock implementation - replace with actual ML model
  console.log(`🔮 Valuing card ${cardId}...`);

  // Simulate ML inference
  const basePrice = Math.random() * 100;
  const rarityMultiplier = calculateRarityMultiplier(metadata);
  const demandFactor = calculateDemandFactor(historicalSales);
  const trendFactor = calculateTrendFactor(historicalSales);

  const valuation = basePrice * rarityMultiplier * demandFactor * trendFactor;
  const confidence = 0.75 + Math.random() * 0.2;

  return {
    valuation: Math.round(valuation * 100) / 100,
    confidence: Math.round(confidence * 100) / 100,
    factors: {
      rarity: rarityMultiplier,
      demand: demandFactor,
      historicalTrend: trendFactor,
      collectionPopularity: 1.2,
    },
    recommendation: valuation > 50 ? 'Strong Buy' : 'Fair Value',
  };
}

function calculateRarityMultiplier(metadata) {
  const rarity = metadata?.rarity || 'common';
  const multipliers = {
    common: 1.0,
    uncommon: 1.5,
    rare: 2.5,
    epic: 4.0,
    legendary: 10.0,
  };
  return multipliers[rarity] || 1.0;
}

function calculateDemandFactor(historicalSales) {
  if (!historicalSales || historicalSales.length === 0) return 1.0;
  
  // Simulate demand based on sale frequency
  const recentSales = historicalSales.filter(
    sale => Date.now() - sale.timestamp < 30 * 24 * 60 * 60 * 1000
  ).length;
  
  return 1.0 + (recentSales * 0.1);
}

function calculateTrendFactor(historicalSales) {
  if (!historicalSales || historicalSales.length < 2) return 1.0;
  
  // Simulate price trend
  const sortedSales = historicalSales.sort((a, b) => a.timestamp - b.timestamp);
  const oldAvg = sortedSales.slice(0, Math.floor(sortedSales.length / 2))
    .reduce((sum, sale) => sum + sale.price, 0) / (sortedSales.length / 2);
  const newAvg = sortedSales.slice(Math.floor(sortedSales.length / 2))
    .reduce((sum, sale) => sum + sale.price, 0) / (sortedSales.length / 2);
  
  return newAvg / oldAvg;
}
