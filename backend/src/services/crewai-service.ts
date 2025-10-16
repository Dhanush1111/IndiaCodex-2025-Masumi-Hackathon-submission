import axios from 'axios';

const CREWAI_SERVICE_URL = process.env.CREWAI_SERVICE_URL || 'http://localhost:8000';

export interface CrewAIAnalysisRequest {
  id: string;
  name: string;
  price: number;
  rarity: string;
  stats?: {
    attack?: number;
    defense?: number;
    speed?: number;
  };
  description?: string;
  owner?: string;
}

export interface CrewAIAnalysisResponse {
  success: boolean;
  analysis: {
    decision?: string;
    confidence_score?: number;
    recommended_price?: number;
    reasoning?: string;
    key_factors?: string[];
    agent_consensus?: {
      valuation_score?: number;
      risk_score?: number;
      market_score?: number;
    };
    raw_output?: string;
  };
  card: any;
  error?: string;
}

export class CrewAIService {
  async analyzeCardPurchase(cardData: CrewAIAnalysisRequest): Promise<CrewAIAnalysisResponse> {
    try {
      console.log('🤖 Calling CrewAI service for analysis...');
      console.log(`📋 Card: ${cardData.name} (${cardData.rarity})`);
      console.log(`💰 Price: ${cardData.price} ADA`);
      
      const response = await axios.post<CrewAIAnalysisResponse>(
        `${CREWAI_SERVICE_URL}/test_analysis`,
        cardData,
        {
          timeout: 120000, // 2 minutes timeout for AI analysis
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      console.log('✅ CrewAI analysis received');
      
      return response.data;
    } catch (error: any) {
      console.error('❌ CrewAI service error:', error.message);
      
      if (error.code === 'ECONNREFUSED') {
        throw new Error('CrewAI service is not running. Please start it with: python main.py api');
      }
      
      throw new Error(`CrewAI analysis failed: ${error.message}`);
    }
  }

  async checkServiceHealth(): Promise<boolean> {
    try {
      const response = await axios.get(`${CREWAI_SERVICE_URL}/availability`, {
        timeout: 5000,
      });
      return response.data.available === true;
    } catch (error) {
      return false;
    }
  }

  async getInputSchema(): Promise<any> {
    try {
      const response = await axios.get(`${CREWAI_SERVICE_URL}/input_schema`);
      return response.data;
    } catch (error) {
      console.error('Failed to get input schema:', error);
      return null;
    }
  }
}

export const crewAIService = new CrewAIService();
