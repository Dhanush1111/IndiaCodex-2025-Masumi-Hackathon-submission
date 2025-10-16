from crewai import Agent, Crew, Task, Process
from langchain_google_genai import ChatGoogleGenerativeAI
import os

# Initialize Gemini LLM
gemini_llm = ChatGoogleGenerativeAI(
    model="gemini-pro",
    google_api_key=os.getenv("GEMINI_API_KEY"),
    temperature=0.7
)

class CardPaymentCrew:
    """CrewAI Crew for analyzing card payment decisions with Masumi Network"""
    
    def __init__(self):
        self.llm = gemini_llm
    
    def create_agents(self):
        """Create specialized agents for payment analysis"""
        
        # Valuation Expert Agent
        valuation_agent = Agent(
            role='NFT Valuation Expert',
            goal='Accurately assess the fair market value of trading cards based on rarity, stats, and market conditions',
            backstory="""You are a renowned expert in NFT and trading card valuation with over 10 years 
            of experience. You have analyzed thousands of cards and can instantly spot undervalued or 
            overpriced assets. Your specialty is Cardano-based NFTs and you understand the nuances of 
            legendary, epic, rare, and common rarities. You provide data-driven, objective valuations.""",
            verbose=True,
            allow_delegation=False,
            llm=self.llm
        )
        
        # Risk Assessment Agent
        risk_agent = Agent(
            role='Blockchain Risk Analyst',
            goal='Identify potential risks, fraud patterns, and security concerns in card transactions',
            backstory="""You are a cybersecurity specialist focused on blockchain transactions. You have 
            prevented millions in fraud by identifying suspicious patterns. You analyze transaction safety, 
            seller reputation, price anomalies, and market manipulation. Your cautious approach has saved 
            countless users from bad deals. You never compromise on security.""",
            verbose=True,
            allow_delegation=False,
            llm=self.llm
        )
        
        # Market Intelligence Agent
        market_agent = Agent(
            role='Market Intelligence Analyst',
            goal='Analyze market trends, demand patterns, and timing for optimal card purchases',
            backstory="""You are a market strategist who has tracked NFT and card trading markets for years. 
            You understand market cycles, seasonal trends, and can predict value appreciation. Your analysis 
            of liquidity, demand, and market sentiment helps buyers make informed timing decisions. You excel 
            at identifying market opportunities.""",
            verbose=True,
            allow_delegation=False,
            llm=self.llm
        )
        
        # Payment Decision Agent
        decision_agent = Agent(
            role='Payment Decision Manager',
            goal='Make final consensus-based payment decisions by synthesizing all agent analyses',
            backstory="""You are the chief decision maker who synthesizes insights from valuation, risk, 
            and market intelligence teams. You have approved thousands of transactions and have a proven 
            track record of protecting buyers while not missing good opportunities. You weigh all factors 
            carefully and provide clear, justified decisions with confidence scores.""",
            verbose=True,
            allow_delegation=True,
            llm=self.llm
        )
        
        return {
            'valuation': valuation_agent,
            'risk': risk_agent,
            'market': market_agent,
            'decision': decision_agent
        }
    
    def create_tasks(self, agents, card_data):
        """Create tasks for analyzing a card purchase"""
        
        card_context = f"""
        Card Details:
        - Name: {card_data.get('name')}
        - Rarity: {card_data.get('rarity')}
        - Price: {card_data.get('price')} ADA
        - Stats: Attack {card_data.get('stats', {}).get('attack', 'N/A')}, 
                Defense {card_data.get('stats', {}).get('defense', 'N/A')}, 
                Speed {card_data.get('stats', {}).get('speed', 'N/A')}
        - Description: {card_data.get('description', 'N/A')}
        - Owner: {card_data.get('owner', 'Unknown')}
        """
        
        # Task 1: Valuation Analysis
        valuation_task = Task(
            description=f"""Analyze the following trading card and provide a detailed valuation assessment:
            
            {card_context}
            
            Your analysis must include:
            1. Fair market value estimate in ADA
            2. Comparison with similar cards of the same rarity
            3. Stats-to-price ratio evaluation
            4. Value score (0-100)
            5. Clear recommendation (BUY/AVOID/INVESTIGATE)
            
            Be objective and data-driven in your assessment.""",
            expected_output="""Detailed valuation report with:
            - Estimated fair value (ADA)
            - Value score (0-100)
            - Price assessment (undervalued/fair/overpriced)
            - Recommendation with reasoning""",
            agent=agents['valuation']
        )
        
        # Task 2: Risk Assessment
        risk_task = Task(
            description=f"""Perform a comprehensive risk analysis for this card purchase:
            
            {card_context}
            
            Evaluate:
            1. Transaction safety and legitimacy
            2. Price anomalies or suspicious patterns
            3. Seller reputation indicators
            4. Market manipulation risks
            5. Risk score (0-100, higher is safer)
            6. Red flags or concerns
            
            Provide a security-focused assessment.""",
            expected_output="""Risk assessment report with:
            - Risk score (0-100)
            - Safety level (HIGH/MEDIUM/LOW)
            - Identified concerns
            - Recommendation (SAFE/CAUTION/REJECT)""",
            agent=agents['risk']
        )
        
        # Task 3: Market Analysis
        market_task = Task(
            description=f"""Analyze market conditions and timing for this card purchase:
            
            {card_context}
            
            Consider:
            1. Current market trends for this rarity
            2. Demand and liquidity indicators
            3. Timing (good time to buy?)
            4. Resale potential and appreciation
            5. Market score (0-100)
            6. Strategic positioning
            
            Provide market-focused insights.""",
            expected_output="""Market analysis report with:
            - Market score (0-100)
            - Market conditions (FAVORABLE/NEUTRAL/POOR)
            - Timing assessment
            - Resale potential
            - Strategic recommendation""",
            agent=agents['market']
        )
        
        # Task 4: Final Decision
        decision_task = Task(
            description="""Synthesize all analyses from the valuation, risk, and market teams to make a final payment decision.
            
            Based on their reports, provide:
            1. Overall approval decision (APPROVE/REJECT)
            2. Composite confidence score (0-100)
            3. Key factors influencing the decision
            4. Comprehensive reasoning
            5. Payment recommendation amount (if different from asking price)
            
            Your decision must be well-justified and consider all perspectives.""",
            expected_output="""Final decision report in JSON format:
            {
                "decision": "APPROVE" or "REJECT",
                "confidence_score": <0-100>,
                "recommended_price": <amount in ADA>,
                "reasoning": "Detailed explanation",
                "key_factors": ["factor1", "factor2", ...],
                "agent_consensus": {
                    "valuation_score": <score>,
                    "risk_score": <score>,
                    "market_score": <score>
                }
            }""",
            agent=agents['decision'],
            context=[valuation_task, risk_task, market_task]
        )
        
        return [valuation_task, risk_task, market_task, decision_task]
    
    def crew(self, card_data):
        """Create and return the crew instance"""
        agents = self.create_agents()
        tasks = self.create_tasks(agents, card_data)
        
        return Crew(
            agents=list(agents.values()),
            tasks=tasks,
            process=Process.sequential,  # Tasks execute in order
            verbose=2
        )
