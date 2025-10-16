import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyB-ZMV7a9KZEvR6fE7UElbh4bbefMvl62c';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export interface PaymentDecision {
  shouldPay: boolean;
  amount: number;
  reasoning: string;
  confidence: number;
}

export class GeminiPaymentAgent {
  private model;

  constructor() {
    this.model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async analyzeCardPurchase(cardData: {
    name: string;
    price: number;
    rarity: string;
    stats: any;
    marketData?: any;
  }): Promise<PaymentDecision> {
    const prompt = `You are an AI agent analyzing a trading card purchase decision.

Card Details:
- Name: ${cardData.name}
- Price: ${cardData.price} ADA
- Rarity: ${cardData.rarity}
- Stats: ${JSON.stringify(cardData.stats)}

Analyze this card and determine:
1. Is this a good purchase at the current price?
2. What's the fair value?
3. Should the payment be automated?

Respond in JSON format:
{
  "shouldPay": boolean,
  "amount": number,
  "reasoning": "detailed explanation",
  "confidence": number (0-1)
}`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // Fallback decision
      return {
        shouldPay: cardData.price < 100,
        amount: cardData.price,
        reasoning: 'Automated decision based on price threshold',
        confidence: 0.5
      };
    } catch (error) {
      console.error('Gemini AI error:', error);
      throw error;
    }
  }

  async evaluateTradingStrategy(portfolio: any[], marketConditions: any): Promise<string> {
    const prompt = `As a trading advisor AI, analyze this portfolio and market conditions:

Portfolio: ${JSON.stringify(portfolio)}
Market Conditions: ${JSON.stringify(marketConditions)}

Provide trading recommendations.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini AI error:', error);
      return 'Unable to generate recommendations at this time.';
    }
  }

  async calculateCardValuation(cardData: any): Promise<number> {
    const prompt = `Analyze this trading card and estimate its fair market value in ADA:

Card: ${JSON.stringify(cardData)}

Consider rarity, stats, and market trends. Respond with just a number representing the ADA value.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      const value = parseFloat(text.match(/\d+(\.\d+)?/)?.[0] || '0');
      return value || cardData.price;
    } catch (error) {
      console.error('Gemini AI error:', error);
      return cardData.price;
    }
  }
}

export const geminiAgent = new GeminiPaymentAgent();
