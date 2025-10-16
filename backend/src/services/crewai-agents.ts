import OpenAI from 'openai';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

/**
 * CrewAI-Inspired Multi-Agent Payment System
 * Multiple specialized AI agents work together to make payment decisions
 */

export interface AgentResponse {
  role: string;
  analysis: string;
  score: number; // 0-100
  recommendation: 'approve' | 'reject' | 'review';
  reasoning: string;
}

export interface CrewDecision {
  approved: boolean;
  confidence: number;
  totalScore: number;
  agentReports: AgentResponse[];
  finalReasoning: string;
  amount: number;
}

class AIAgent {
  constructor(
    public role: string,
    public expertise: string,
    public systemPrompt: string
  ) {}

  async analyze(context: any): Promise<AgentResponse> {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: this.systemPrompt },
          { 
            role: 'user', 
            content: `Analyze this card purchase:\n${JSON.stringify(context, null, 2)}\n\nProvide your analysis in JSON format with: analysis, score (0-100), recommendation (approve/reject/review), reasoning` 
          }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
      });

      const response = JSON.parse(completion.choices[0].message.content || '{}');
      
      return {
        role: this.role,
        analysis: response.analysis || 'No analysis provided',
        score: response.score || 50,
        recommendation: response.recommendation || 'review',
        reasoning: response.reasoning || 'No reasoning provided',
      };
    } catch (error) {
      console.error(`${this.role} agent error:`, error);
      return {
        role: this.role,
        analysis: 'Error during analysis',
        score: 0,
        recommendation: 'reject',
        reasoning: 'Agent encountered an error',
      };
    }
  }
}

export class CrewAIPaymentSystem {
  private agents: AIAgent[];

  constructor() {
    // Initialize specialized agents
    this.agents = [
      new AIAgent(
        'Valuation Expert',
        'NFT and Trading Card Valuation',
        `You are an expert NFT valuation specialist. Your role is to:
        - Assess card rarity vs market value
        - Compare stats (attack, defense, speed) to price
        - Evaluate if the card is fairly priced
        - Consider rarity tiers: legendary > epic > rare > common
        
        Provide a score (0-100) where:
        - 90-100: Excellent value, highly recommended
        - 70-89: Fair value, good purchase
        - 50-69: Acceptable but slightly overpriced
        - 30-49: Overpriced, caution advised
        - 0-29: Severely overpriced, reject
        
        Be critical and data-driven in your analysis.`
      ),
      
      new AIAgent(
        'Risk Analyst',
        'Transaction Risk Assessment',
        `You are a blockchain transaction risk analyst. Your role is to:
        - Identify potential transaction risks
        - Check for suspicious pricing patterns
        - Assess seller reputation (if available)
        - Evaluate transaction safety
        - Flag unusual market conditions
        
        Provide a score (0-100) where:
        - 90-100: Very low risk, safe transaction
        - 70-89: Low risk, proceed with confidence
        - 50-69: Moderate risk, acceptable
        - 30-49: High risk, proceed with caution
        - 0-29: Very high risk, reject
        
        Focus on security and fraud prevention.`
      ),
      
      new AIAgent(
        'Market Intelligence',
        'Market Analysis and Trends',
        `You are a market intelligence analyst for NFT trading cards. Your role is to:
        - Analyze current market trends
        - Evaluate demand for similar cards
        - Assess liquidity and resale potential
        - Consider market timing
        - Predict future value trends
        
        Provide a score (0-100) where:
        - 90-100: Strong market opportunity
        - 70-89: Good market conditions
        - 50-69: Neutral market
        - 30-49: Weak market conditions
        - 0-29: Poor market timing
        
        Be strategic and forward-thinking.`
      ),
      
      new AIAgent(
        'Investment Advisor',
        'Portfolio and Investment Strategy',
        `You are an investment advisor specializing in digital assets. Your role is to:
        - Evaluate investment potential
        - Consider portfolio diversification
        - Assess long-term value
        - Balance risk vs reward
        - Provide strategic recommendations
        
        Provide a score (0-100) where:
        - 90-100: Excellent investment opportunity
        - 70-89: Good investment
        - 50-69: Acceptable investment
        - 30-49: Questionable investment
        - 0-29: Poor investment, avoid
        
        Think like a professional investor.`
      ),
    ];
  }

  async evaluatePurchase(cardData: {
    id: string;
    name: string;
    price: number;
    rarity: string;
    stats: any;
    description?: string;
    owner?: string;
  }): Promise<CrewDecision> {
    console.log('🤖 CrewAI Multi-Agent System Activated');
    console.log(`📋 Analyzing: ${cardData.name} (${cardData.rarity})`);
    console.log(`💰 Price: ${cardData.price} ADA`);
    
    // Run all agents in parallel
    const agentPromises = this.agents.map(agent => agent.analyze(cardData));
    const agentReports = await Promise.all(agentPromises);

    // Log individual agent reports
    console.log('\n🔍 Agent Reports:');
    agentReports.forEach(report => {
      console.log(`\n  👤 ${report.role}:`);
      console.log(`     Score: ${report.score}/100`);
      console.log(`     Recommendation: ${report.recommendation.toUpperCase()}`);
      console.log(`     Reasoning: ${report.reasoning}`);
    });

    // Calculate consensus
    const totalScore = agentReports.reduce((sum, report) => sum + report.score, 0);
    const averageScore = totalScore / agentReports.length;
    
    const approvals = agentReports.filter(r => r.recommendation === 'approve').length;
    const rejections = agentReports.filter(r => r.recommendation === 'reject').length;
    
    // Decision logic: Need majority approval and average score >= 65
    const approved = approvals > rejections && averageScore >= 65;
    const confidence = Math.round(averageScore) / 100;

    // Generate final reasoning
    const finalReasoning = this.generateFinalReasoning(agentReports, approved, averageScore);

    console.log(`\n📊 Consensus:`);
    console.log(`   Average Score: ${averageScore.toFixed(1)}/100`);
    console.log(`   Approvals: ${approvals}/${agentReports.length}`);
    console.log(`   Rejections: ${rejections}/${agentReports.length}`);
    console.log(`   Decision: ${approved ? '✅ APPROVED' : '❌ REJECTED'}`);
    console.log(`   Confidence: ${(confidence * 100).toFixed(1)}%`);

    return {
      approved,
      confidence,
      totalScore: averageScore,
      agentReports,
      finalReasoning,
      amount: cardData.price,
    };
  }

  private generateFinalReasoning(
    reports: AgentResponse[],
    approved: boolean,
    averageScore: number
  ): string {
    const approvals = reports.filter(r => r.recommendation === 'approve');
    const rejections = reports.filter(r => r.recommendation === 'reject');

    if (approved) {
      const topReasons = approvals
        .sort((a, b) => b.score - a.score)
        .slice(0, 2)
        .map(r => `${r.role} gives ${r.score}/100 - ${r.reasoning}`)
        .join('. ');
      
      return `✅ PURCHASE APPROVED (Score: ${averageScore.toFixed(1)}/100). ${approvals.length}/${reports.length} agents recommend approval. ${topReasons}`;
    } else {
      const topConcerns = rejections
        .sort((a, b) => a.score - b.score)
        .slice(0, 2)
        .map(r => `${r.role} concern: ${r.reasoning}`)
        .join('. ');
      
      return `❌ PURCHASE REJECTED (Score: ${averageScore.toFixed(1)}/100). ${rejections.length}/${reports.length} agents advise against. ${topConcerns}`;
    }
  }

  async getCardValuation(cardData: any): Promise<number> {
    // Use valuation expert for price estimation
    const valuationAgent = this.agents[0];
    const analysis = await valuationAgent.analyze(cardData);
    
    // Estimate value based on score
    const basePrice = cardData.price;
    const adjustmentFactor = analysis.score / 100;
    const estimatedValue = basePrice * adjustmentFactor;
    
    return Math.round(estimatedValue * 100) / 100;
  }
}

export const crewAIPaymentSystem = new CrewAIPaymentSystem();
