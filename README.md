# Quantum Cyber Security Tool - AI Agent Instructions
## Project Overview
A full-stack cybersecurity demonstrator that simulates **Blue Team** (defense), **Red Team** (offense), and **Quantum Computing** threat detection. The backend is a FastAPI server; the frontend is React + Vite with Tailwind CSS.

**Big Picture Flow:**
1. **Frontend** (React) dispatches requests to **Backend API** (FastAPI on port 8000)
2. **Backend** routes to three subsystems:
   - **Blue Team** (`blue_team.py`): Defense, monitoring, remediation
   - **Red Team** (`red_team.py`): Attack simulation, scanning
   - **Quantum Module** (`quantum_module.py`): Grover's algorithm for threat search
3. **Purple Team Loop**: Red Team attacks trigger Blue Team logs via callback

## Architecture & Key Patterns

### Backend Structure
- **Entry point**: `backend/server.py` → runs `backend/main.py` via Uvicorn on `0.0.0.0:8000`
- **CORS enabled** for all origins (frontend on different port during dev)
- **Module pattern**: Each team is a class with a singleton instance (`monitor`, `scanner`, `quantum_engine`)
- **Callback integration**: Red Team's `simulate_attack()` accepts `log_callback` to close the purple team loop

### API Endpoints
All routes are `/api/{subsystem}/{action}`:
- **Blue**: `GET /api/blue/stats`, `GET /api/blue/logs`, `POST /api/blue/remediate`
- **Red**: `POST /api/red/scan`, `POST /api/red/simulate`
- **Quantum**: `GET /api/quantum/grover`, `GET /api/quantum/entropy`

### Frontend Architecture
- Single-page app with **view-based routing** via `App.jsx` state (`currentView`)
- Four views: `Dashboard`, `BlueView`, `RedView`, `QuantumView`
- **API layer**: `frontend/src/services/api.js` exports `api` object with namespaced methods
- **Styling**: Tailwind CSS + Framer Motion for animations
- **UI components**: Recharts for data viz, Lucide React for icons

## Critical Development Workflows

### Starting the Application
```bash
# Backend (from root or backend/)
python backend/server.py

# Frontend (from frontend/)
npm run dev

# Both serve simultaneously on different ports (8000 backend, 5173 frontend)
```

### Building for Production
```bash
# Backend: No build step (pure Python)
# Frontend:
cd frontend && npm run build  # Creates dist/
```

### Linting & Code Quality
```bash
# Frontend ESLint (already configured):
cd frontend && npm run lint

# Backend: No linter configured (add if needed)
```

## Project-Specific Conventions

### Import Fallback Pattern (Backend)
`backend/main.py` uses try/except for imports to handle both package (`from backend.module`) and direct (`from module`) imports:
```python
try:
    from backend.blue_team import monitor
except ImportError:
    from blue_team import monitor
```
This is needed because the server can run from root or backend directory. **Always preserve this pattern when importing modules.**

### Pydantic Models for Type Safety
All API requests use Pydantic `BaseModel` (e.g., `ScanRequest`, `SimulationRequest`). **When adding new endpoints, define models explicitly** rather than using loose dicts.

### Singleton Instances
Each team module exports a singleton: `monitor`, `scanner`, `quantum_engine`. **Do not create new instances** in endpoints; use the module-level singletons for state consistency.

### Frontend API Namespacing
API calls are organized by subsystem in `api.js`:
```javascript
api.blue.getStats()   // not api.getBlueStats()
api.red.scan()
api.quantum.runGrover()
```
**When adding endpoints, extend the corresponding namespace.**

### History Management
Blue Team maintains a 100-item history buffer (pops oldest when full). This prevents unbounded memory growth in the demo. **Respect this limit** when modifying `get_logs()` or adding new history-tracking.

## External Dependencies & Integration Points

### Critical Libraries
- **Backend**: FastAPI (async HTTP), Qiskit (quantum circuits), psutil (system stats)
- **Frontend**: Axios (HTTP client), Recharts (charting), Framer Motion (animations)

### Port Configuration
- Backend listens on `0.0.0.0:8000` (hardcoded in `server.py`)
- Frontend dev server defaults to `5173` (Vite)
- **Frontend API_URL hardcoded** to `http://localhost:8000/api` — update if deployment changes ports

### Quantum Module Implementation Note
`quantum_module.py` uses **simulated** Grover results (not actual quantum execution) due to Qiskit sampler stability. The `run_grover_simulation()` generates probability distributions matching expected Grover output. **Do not attempt to use real quantum hardware sampling without refactoring.**

## Common Tasks & File Locations

| Task | Key Files |
|------|-----------|
| Add new Blue Team feature | `backend/blue_team.py` (class method), `backend/main.py` (route) |
| Add new Red Team attack type | `backend/red_team.py` (`simulate_attack()` outcomes), update attack options |
| Add new frontend view | Create component in `frontend/src/components/`, add case to `App.jsx` switch |
| Add API call | Extend namespace in `frontend/src/services/api.js`, use in component |
| Update quantum algorithm | `backend/quantum_module.py` (`run_grover_simulation()` or `analyze_entropy_source()`) |
| Modify styling | `frontend/src/index.css` (global) or component `.jsx` files (inline Tailwind classes) |

## Debugging Tips
- **Backend not responding?** Check `server.py` runs without `reload=True` (set for stability)
- **Frontend API errors?** Verify `http://localhost:8000/api` is accessible and CORS is enabled
- **History growing unbounded?** Check 100-item limit isn't bypassed in new code
- **Quantum circuit errors?** Review qubits parameter limit (max 10) to avoid simulation timeouts

