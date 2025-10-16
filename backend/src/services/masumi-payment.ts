import axios from 'axios';
import { crewAIService } from './crewai-service.js';

const MASUMI_PAYMENT_ENDPOINT = process.env.MASUMI_PAYMENT_URL || 'http://localhost:7777/payments';

export interface MasumiPaymentRequest {
  amount: number;
  currency: string;
  fromAddress: string;
  toAddress: string;
  cardId: string;
  metadata?: any;
}

export interface MasumiPaymentResponse {
  success: boolean;
  transactionId: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: string;
  gasUsed?: number;
}

export class MasumiPaymentService {
  async processAutomatedPayment(
    cardData: any,
    buyerAddress: string,
    sellerAddress: string
  ): Promise<MasumiPaymentResponse> {
    try {
      // Step 1: CrewAI Multi-Agent Analysis (Python microservice)
      console.log('🤖 CrewAI Multi-Agent System analyzing purchase...');
      
      const analysisResult = await crewAIService.analyzeCardPurchase({
        id: cardData.id,
        name: cardData.name,
        price: cardData.price,
        rarity: cardData.rarity,
        stats: cardData.stats,
        description: cardData.description,
        owner: cardData.owner,
      });
      
      if (!analysisResult.success) {
        console.log('❌ CrewAI analysis failed:', analysisResult.error);
        return {
          success: false,
          transactionId: '',
          status: 'failed',
          timestamp: new Date().toISOString(),
        };
      }

      const decision = analysisResult.analysis;
      const approved = decision.decision === 'APPROVE';
      
      console.log(`\n🎯 Final Decision: ${approved ? 'APPROVE' : 'REJECT'}`);
      console.log(`📊 Confidence Score: ${decision.confidence_score || 'N/A'}/100`);
      console.log(`💡 Reasoning: ${decision.reasoning || 'See full analysis'}`);
      
      if (decision.agent_consensus) {
        console.log(`📈 Agent Scores:`);
        console.log(`   Valuation: ${decision.agent_consensus.valuation_score}/100`);
        console.log(`   Risk: ${decision.agent_consensus.risk_score}/100`);
        console.log(`   Market: ${decision.agent_consensus.market_score}/100`);
      }

      if (!approved) {
        return {
          success: false,
          transactionId: '',
          status: 'failed',
          timestamp: new Date().toISOString(),
        };
      }

      // Step 2: Initiate Masumi payment
      const paymentRequest: MasumiPaymentRequest = {
        amount: decision.recommended_price || cardData.price,
        currency: 'ADA',
        fromAddress: buyerAddress,
        toAddress: sellerAddress,
        cardId: cardData.id,
        metadata: {
          crewAIDecision: {
            approved: approved,
            confidence: decision.confidence_score,
            reasoning: decision.reasoning,
            keyFactors: decision.key_factors,
            agentConsensus: decision.agent_consensus,
          },
          cardName: cardData.name,
          rarity: cardData.rarity,
        },
      };

      console.log('💳 Processing payment through Masumi Network...');
      
      // Simulate Masumi payment (replace with actual Masumi API when available)
      const response = await this.simulateMasumiPayment(paymentRequest);
      
      console.log(`✅ Payment ${response.status}: ${response.transactionId}`);
      
      return response;
    } catch (error) {
      console.error('❌ Payment processing error:', error);
      throw error;
    }
  }

  private async simulateMasumiPayment(
    request: MasumiPaymentRequest
  ): Promise<MasumiPaymentResponse> {
    // This simulates the Masumi payment - replace with actual Masumi SDK
    try {
      // In production, this would call Masumi Network API
      // const response = await axios.post(MASUMI_PAYMENT_ENDPOINT, request);
      
      // For now, simulate successful payment
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return {
        success: true,
        transactionId: `masumi_tx_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        status: 'completed',
        timestamp: new Date().toISOString(),
        gasUsed: Math.floor(Math.random() * 1000) + 500,
      };
    } catch (error) {
      console.error('Masumi payment error:', error);
      throw error;
    }
  }

  async getPaymentStatus(transactionId: string): Promise<any> {
    try {
      // In production: const response = await axios.get(`${MASUMI_PAYMENT_ENDPOINT}/${transactionId}`);
      
      return {
        transactionId,
        status: 'completed',
        confirmations: 6,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Failed to get payment status:', error);
      throw error;
    }
  }

  async estimateGasFee(amount: number): Promise<number> {
    // Estimate transaction fee
    return Math.max(0.17, amount * 0.001); // Base fee + 0.1% of amount
  }
}

export const masumiPaymentService = new MasumiPaymentService();
