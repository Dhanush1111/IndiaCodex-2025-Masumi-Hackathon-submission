import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export interface PurchaseOptions {
  cardId: string;
  buyerAddress: string;
  autoPayment?: boolean;
}

export interface PurchaseResponse {
  success: boolean;
  txHash: string;
  message: string;
  card: any;
  payment?: {
    method: string;
    transactionId?: string;
    status?: string;
    gasUsed?: number;
    timestamp?: string;
  };
  aiAnalysis?: {
    approved: boolean;
    previousOwner: string;
  };
}

export interface AIValuationResponse {
  cardId: string;
  currentPrice: number;
  aiValuation: number;
  difference: number;
  recommendation: 'undervalued' | 'overvalued';
}

export class PaymentService {
  async purchaseCardWithAI(options: PurchaseOptions): Promise<PurchaseResponse> {
    try {
      console.log('🤖 Initiating AI-powered purchase...', options);
      
      const response = await axios.post<PurchaseResponse>(
        `${API_BASE_URL}/api/v1/cards/${options.cardId}/purchase`,
        {
          buyerAddress: options.buyerAddress,
          autoPayment: options.autoPayment ?? true,
        }
      );

      console.log('✅ Purchase response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Purchase failed:', error);
      throw new Error(error.response?.data?.message || 'Purchase failed');
    }
  }

  async getAIValuation(cardId: string): Promise<AIValuationResponse> {
    try {
      const response = await axios.get<AIValuationResponse>(
        `${API_BASE_URL}/api/v1/cards/${cardId}/ai-valuation`
      );
      return response.data;
    } catch (error) {
      console.error('Failed to get AI valuation:', error);
      throw error;
    }
  }

  async estimateGas(amount: number): Promise<number> {
    // Estimate gas for transaction
    return Math.max(0.17, amount * 0.001);
  }
}

export const paymentService = new PaymentService();
