import socket
from typing import List, Dict

class RedTeamScanner:
    def __init__(self):
        pass

    def scan_target(self, target_ip: str, ports: List[int]) -> List[Dict]:
        """
        Scans a list of ports on a target IP.
        """
        results = []
        for port in ports:
            try:
                s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                s.settimeout(0.5)
                result = s.connect_ex((target_ip, port))
                state = "OPEN" if result == 0 else "CLOSED"
                service = "Unknown"
                if state == "OPEN":
                    try:
                        service = socket.getservbyport(port)
                    except:
                        pass
                
                results.append({
                    "port": port,
                    "state": state,
                    "service": service
                })
                s.close()
            except Exception as e:
                results.append({
                    "port": port,
                    "state": "ERROR",
                    "error": str(e)
                })
        return results

    def simulate_attack(self, attack_type: str, log_callback=None) -> Dict:
        """
        Simulates an attack outcome for demonstration purposes.
        """
        outcomes = {
            "sql_injection": "Vulnerability Found: Input field 'username' not sanitized.",
            "ddos_simulation": "Stress Test: Server latency increased by 400ms.",
            "brute_force": "Weak Password Found: '123456' for user 'root'."
        }
        
        result_msg = outcomes.get(attack_type, "Unknown attack type")
        
        # Purple Team Loop: Red Team action triggers Blue Team log
        if log_callback:
            log_callback("CRITICAL", "RED_TEAM_OPS", f"Attack Detected: {attack_type.upper()} - {result_msg}")
            
        return {
            "attack": attack_type,
            "result": result_msg,
            "success_probability": 0.85
        }

scanner = RedTeamScanner()
