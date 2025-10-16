"""
CardanoVerse AI Payment Crew - Masumi Network Integration
Following MIP-003 standard for AI agent monetization
"""

from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, Any
import uvicorn
import os
import sys
import json
import requests
from dotenv import load_dotenv
from crew_definition import CardPaymentCrew

# Load environment variables
load_dotenv()

app = FastAPI(
    title="CardanoVerse Payment Crew API",
    description="AI-powered card payment analysis using CrewAI and Masumi Network",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory job storage (use database in production!)
jobs: Dict[str, Dict[str, Any]] = {}

# Masumi Configuration
PAYMENT_SERVICE_URL = os.getenv("PAYMENT_SERVICE_URL", "http://localhost:3001/api/v1")
PAYMENT_API_KEY = os.getenv("PAYMENT_API_KEY", "")
AGENT_IDENTIFIER = os.getenv("AGENT_IDENTIFIER", "")
PAYMENT_AMOUNT = int(os.getenv("PAYMENT_AMOUNT", "10000000"))
PAYMENT_UNIT = os.getenv("PAYMENT_UNIT", "lovelace")

# Pydantic Models
class CardData(BaseModel):
    id: str
    name: str
    price: float
    rarity: str
    stats: Optional[Dict[str, int]] = None
    description: Optional[str] = None
    owner: Optional[str] = None

class StartJobRequest(BaseModel):
    identifier_from_purchaser: str
    input_data: CardData

class JobStatusResponse(BaseModel):
    status: str
    result: Optional[Any] = None
    error: Optional[str] = None

# MIP-003 Standard Endpoints

@app.get("/")
async def root():
    """Welcome endpoint"""
    return {
        "service": "CardanoVerse Payment Crew",
        "status": "online",
        "framework": "CrewAI",
        "llm": "Google Gemini",
        "masumi_integrated": True
    }

@app.get("/input_schema")
async def get_input_schema():
    """Returns the input schema for this agent (MIP-003)"""
    return {
        "type": "object",
        "properties": {
            "id": {"type": "string", "description": "Card ID"},
            "name": {"type": "string", "description": "Card name"},
            "price": {"type": "number", "description": "Card price in ADA"},
            "rarity": {
                "type": "string",
                "enum": ["common", "rare", "epic", "legendary"],
                "description": "Card rarity"
            },
            "stats": {
                "type": "object",
                "properties": {
                    "attack": {"type": "integer"},
                    "defense": {"type": "integer"},
                    "speed": {"type": "integer"}
                },
                "description": "Card battle stats"
            },
            "description": {"type": "string", "description": "Card description"},
            "owner": {"type": "string", "description": "Current owner address"}
        },
        "required": ["id", "name", "price", "rarity"]
    }

@app.get("/availability")
async def check_availability():
    """Check if the agent is available (MIP-003)"""
    return {
        "available": True,
        "estimated_response_time": "30-60 seconds",
        "current_load": len([j for j in jobs.values() if j["status"] == "processing"])
    }

@app.post("/start_job")
async def start_job(request: StartJobRequest, background_tasks: BackgroundTasks):
    """Start a new AI job (MIP-003)"""
    job_id = request.identifier_from_purchaser
    
    if job_id in jobs:
        raise HTTPException(status_code=400, detail="Job with this ID already exists")
    
    # Create job entry
    jobs[job_id] = {
        "status": "payment_pending",
        "input_data": request.input_data.dict(),
        "result": None,
        "error": None
    }
    
    # Start payment verification in background
    background_tasks.add_task(verify_payment_and_process, job_id)
    
    return {
        "job_id": job_id,
        "status": "payment_pending",
        "message": f"Job created. Please send {PAYMENT_AMOUNT} {PAYMENT_UNIT} to complete.",
        "payment_info": {
            "agent_identifier": AGENT_IDENTIFIER,
            "amount": PAYMENT_AMOUNT,
            "unit": PAYMENT_UNIT
        }
    }

@app.get("/status")
async def get_status(job_id: str):
    """Get job status (MIP-003)"""
    if job_id not in jobs:
        raise HTTPException(status_code=404, detail="Job not found")
    
    job = jobs[job_id]
    return {
        "job_id": job_id,
        "status": job["status"],
        "result": job.get("result"),
        "error": job.get("error")
    }

@app.post("/provide_input")
async def provide_input(job_id: str, additional_input: Dict[str, Any]):
    """Provide additional input to a running job (MIP-003)"""
    if job_id not in jobs:
        raise HTTPException(status_code=404, detail="Job not found")
    
    # Update job with additional input
    jobs[job_id]["additional_input"] = additional_input
    
    return {"status": "input_received", "job_id": job_id}

# Helper Functions

async def verify_payment_and_process(job_id: str):
    """Verify payment through Masumi and process the job"""
    try:
        # Check payment status with Masumi
        payment_verified = await check_masumi_payment(job_id)
        
        if payment_verified:
            jobs[job_id]["status"] = "processing"
            
            # Run CrewAI analysis
            card_data = jobs[job_id]["input_data"]
            result = await run_crew_analysis(card_data)
            
            jobs[job_id]["status"] = "completed"
            jobs[job_id]["result"] = result
        else:
            jobs[job_id]["status"] = "payment_failed"
            jobs[job_id]["error"] = "Payment not received"
            
    except Exception as e:
        jobs[job_id]["status"] = "failed"
        jobs[job_id]["error"] = str(e)

async def check_masumi_payment(identifier: str) -> bool:
    """Check if payment has been received via Masumi Network"""
    if not PAYMENT_API_KEY or not AGENT_IDENTIFIER:
        # For testing without Masumi integration
        print("⚠️ Masumi not configured - skipping payment verification")
        return True
    
    try:
        headers = {"token": PAYMENT_API_KEY}
        url = f"{PAYMENT_SERVICE_URL}/payments/{identifier}"
        
        response = requests.get(url, headers=headers, timeout=10)
        
        if response.status_code == 200:
            payment_data = response.json()
            return payment_data.get("status") == "completed"
        
        return False
        
    except Exception as e:
        print(f"Error checking payment: {e}")
        return False

async def run_crew_analysis(card_data: Dict[str, Any]) -> Dict[str, Any]:
    """Run the CrewAI payment analysis"""
    print(f"\n🤖 Starting CrewAI analysis for: {card_data['name']}")
    print(f"💰 Price: {card_data['price']} ADA")
    print(f"🎴 Rarity: {card_data['rarity']}")
    
    try:
        # Create crew and run analysis
        crew_instance = CardPaymentCrew()
        crew = crew_instance.crew(card_data)
        
        # Kickoff the crew
        result = crew.kickoff()
        
        print(f"\n✅ CrewAI analysis complete!")
        
        # Parse result (CrewAI returns string, try to parse as JSON)
        try:
            if isinstance(result, str):
                # Try to extract JSON from the result
                import re
                json_match = re.search(r'\{.*\}', result, re.DOTALL)
                if json_match:
                    parsed_result = json.loads(json_match.group())
                else:
                    parsed_result = {"raw_output": result}
            else:
                parsed_result = result
                
            return {
                "success": True,
                "analysis": parsed_result,
                "card": card_data
            }
            
        except json.JSONDecodeError:
            return {
                "success": True,
                "analysis": {"raw_output": str(result)},
                "card": card_data
            }
            
    except Exception as e:
        print(f"❌ CrewAI error: {e}")
        return {
            "success": False,
            "error": str(e),
            "card": card_data
        }

# Direct testing endpoint (without Masumi payment)
@app.post("/test_analysis")
async def test_analysis(card_data: CardData):
    """Test endpoint for direct analysis without payment (development only)"""
    print("⚠️ Using test endpoint - no payment required")
    result = await run_crew_analysis(card_data.dict())
    return result

# Main entry point
if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "api":
        # Run API server
        port = int(os.getenv("PORT", 8000))
        host = os.getenv("HOST", "0.0.0.0")
        
        print(f"""
╔══════════════════════════════════════════════════════════╗
║   🤖 CardanoVerse Payment Crew API                      ║
║   CrewAI + Gemini + Masumi Network                     ║
╚══════════════════════════════════════════════════════════╝

🚀 Starting server on {host}:{port}
📚 API Docs: http://localhost:{port}/docs
🎯 MIP-003 Compliant
💎 Gemini AI Powered
💳 Masumi Network Integrated

Endpoints:
  GET  /input_schema  - Input requirements
  GET  /availability  - Server status
  POST /start_job     - Start paid analysis
  GET  /status        - Check job status
  POST /test_analysis - Test without payment (dev)
        """)
        
        uvicorn.run(app, host=host, port=port)
    else:
        # Test mode - run single analysis
        print("🧪 Running test analysis...")
        
        test_card = {
            "id": "1",
            "name": "Legendary Dragon",
            "price": 500,
            "rarity": "legendary",
            "stats": {"attack": 95, "defense": 85, "speed": 70},
            "description": "A powerful dragon that commands fire and fury.",
            "owner": "addr_test1qz..."
        }
        
        import asyncio
        result = asyncio.run(run_crew_analysis(test_card))
        
        print("\n" + "="*60)
        print("ANALYSIS RESULT:")
        print("="*60)
        print(json.dumps(result, indent=2))
