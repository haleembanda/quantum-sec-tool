import psutil
import time
import random
from typing import Dict, List

class BlueTeamMonitor:
    def __init__(self):
        self.history = []

    def get_system_stats(self) -> Dict:
        """
        Gathers real-time system statistics.
        """
        cpu_percent = psutil.cpu_percent(interval=None)
        memory = psutil.virtual_memory()
        net = psutil.net_io_counters()
        
        stats = {
            "timestamp": time.time(),
            "cpu": cpu_percent,
            "memory_percent": memory.percent,
            "memory_used_gb": round(memory.used / (1024**3), 2),
            "net_sent_mb": round(net.bytes_sent / (1024**2), 2),
            "net_recv_mb": round(net.bytes_recv / (1024**2), 2)
        }
        self.history.append(stats)
        if len(self.history) > 100:
            self.history.pop(0)
            
        return stats

    def get_logs(self) -> List[Dict]:
        """
        Simulates log entries for threat analysis.
        In a real app, this would parse /var/log/syslog or similar.
        """
        log_levels = ["INFO", "WARNING", "ERROR", "CRITICAL"]
        sources = ["Firewall", "AuthService", "Kernel", "Network"]
        messages = [
            "Connection established",
            "Packet dropped from 192.168.1.55",
            "Failed login attempt for user 'admin'",
            "Unexpected port scanning detected",
            "Service heartbeat received",
            "Buffer overflow attempt blocked"
        ]
        
        # Generate a random fresh log
        severity = random.choice(log_levels)
        source = random.choice(sources)
        message = random.choice(messages)
        
        return {
            "timestamp": time.time(),
            "level": severity,
            "source": source,
            "message": message
        }

    def inject_log(self, level: str, source: str, message: str):
        """
        Injects a log entry from an external source (e.g., Red Team attack).
        """
        self.history.append({
            "timestamp": time.time(),
            "level": level,
            "source": source,
            "message": message
        })
        # Keep history manageable
        if len(self.history) > 100:
            self.history.pop(0)

    def trigger_remediation(self, threat_type: str) -> str:
        """
        Simulates AI Auto-Remediation.
        """
        patches = {
            "sql_injection": "Applied WAF Rule ID: 942100 (SQLi Block)",
            "ddos_simulation": "Enabled Rate Limiting (1000 req/s)",
            "brute_force": "Account Locked: 'root'. IP Banned."
        }
        action = patches.get(threat_type, "General Patch Applied")
        self.inject_log("INFO", "AI_AGENT", f"Auto-Remediation: {action}")
        return action

monitor = BlueTeamMonitor()
