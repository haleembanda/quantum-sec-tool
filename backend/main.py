from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import time
from typing import List
from pydantic import BaseModel

# Relative imports or package imports depending on run context
try:
    from backend.blue_team import monitor
    from backend.red_team import scanner
    from backend.quantum_module import quantum_engine
except ImportError:
    # Fallback if running from inside backend dir
    from blue_team import monitor
    from red_team import scanner
    from quantum_module import quantum_engine

app = FastAPI(title="Quantum Cyber Security Tool")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScanRequest(BaseModel):
    target_ip: str
    ports: List[int]

class SimulationRequest(BaseModel):
    attack_type: str

@app.get("/")
def read_root():
    return {"message": "Quantum Cyber Security Backend Online", "timestamp": time.time()}

# --- Blue Team Endpoints ---
@app.get("/api/blue/stats")
async def get_system_stats():
    return monitor.get_system_stats()

@app.get("/api/blue/logs")
async def get_recent_logs():
    return monitor.get_logs()

# --- Red Team Endpoints ---
@app.post("/api/red/scan")
async def run_scan(request: ScanRequest):
    return scanner.scan_target(request.target_ip, request.ports)

@app.post("/api/red/simulate")
async def simulate_attack(request: SimulationRequest):
    # Pass blue team monitor as callback to close the loop
    return scanner.simulate_attack(request.attack_type, log_callback=monitor.inject_log)

@app.post("/api/blue/remediate")
async def remediate_threat(request: SimulationRequest):
    # Reuse SimulationRequest schema as it has attack_type
    return {"action": monitor.trigger_remediation(request.attack_type)}

# --- Quantum Endpoints ---
@app.get("/api/quantum/grover")
async def run_grover(qubits: int = 3):
    if qubits > 10:
        raise HTTPException(status_code=400, detail="Too many qubits for simulation")
    return quantum_engine.run_grover_simulation(n_qubits=qubits)

@app.get("/api/quantum/entropy")
async def get_entropy():
    return {"entropy_score": quantum_engine.analyze_entropy_source()}
