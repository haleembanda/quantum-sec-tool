Q-SEC.AI Walkthrough
Overview
Q-SEC.AI is a proof-of-concept Cyber Security Dashboard integrating Blue Team monitoring, Red Team offense simulation, and Quantum Threat Detection. Location: /home/shinvauh/Desktop/quantum-sec-tool

Prerequisites
Python 3.10+
Node.js 18+
How to Run
1. Start the Backend
cd ~/Desktop/quantum-sec-tool/backend
python3 server.py
You should see "Starting Uvicorn server programmatically...". The server will listen on port 8000.

2. Start the Frontend
In a new terminal:

cd ~/Desktop/quantum-sec-tool/frontend
npm install # (If not already installed)
npm run dev
Access the dashboard at http://localhost:5173 (or the port shown in terminal).

Features
Blue Team (Defense)
Real-time Monitoring: Visualizes localized CPU/Memory usage and simulates network traffic.
Log Analysis: Stream of simulated system logs showing potential threats.
AI Auto-Remediation: Toggle to automatically patch threats detected by the system.
Red Team (Offense)
Port Scanner: Scans localhost or specified IPs for open ports (simulated/real hybrid).
Attack Simulator: Runs mock SQL Injections or DDoS attacks to test system resilience.
Purple Team Integration: Attacks launched here now instantly trigger alerts in the Blue Team module.
Quantum Module
Grover's Search: Uses IBM Qiskit (Simulated) to demonstrate finding a "threat signature" in a superposition of states.
Visualization: Displays probability distribution of measurement outcomes.
Dashboard
Live Network Map: Visualizes network nodes and traffic flow in a futuristic topology graph.
Verification Scenarios
1. The "Purple Team" Loop
Open two browser windows or split view.
In Blue Team, observe the "Recent Logs".
In Red Team, click SQL Injection.
Watch the Blue Team log instantly show a CRITICAL alert for the attack.
2. AI Auto-Remediation
In Blue Team, toggle AI Auto-Remediation to ON (Green).
Go to Red Team and launch a DDoS Stress attack.
Return to Blue Team log. You should see a new entry: "Auto-Remediation: Enabled Rate Limiting..." instantly following the attack.
3. Quantum Search
Go to Quantum View, select 4 Qubits, and click EXECUTE.
Watch the probability graph collapse on the target state with high confidence.
