import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, Server, ShieldCheck, AlertTriangle } from 'lucide-react';

export const BlueView = () => {
    const [stats, setStats] = useState([]);
    const [logs, setLogs] = useState([]);

    const [autoRemediate, setAutoRemediate] = useState(false);

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const res = await api.blue.getStats();
                setStats(prev => [...prev.slice(-20), { ...res.data, time: new Date(res.data.timestamp * 1000).toLocaleTimeString() }]);

                const logRes = await api.blue.getLogs();
                const newLogs = logRes.data ? [logRes.data] : [];

                // Auto-Remediation Check
                if (autoRemediate && newLogs.length > 0) {
                    const latest = newLogs[0];
                    if (latest.level === 'CRITICAL' && latest.source === 'RED_TEAM_OPS') {
                        // Extract attack type hackily for demo
                        let type = "";
                        if (latest.message.includes("SQL")) type = "sql_injection";
                        if (latest.message.includes("Stress")) type = "ddos_simulation";
                        if (latest.message.includes("Password")) type = "brute_force";

                        if (type) {
                            await api.blue.remediate(type);
                        }
                    }
                }

                setLogs(prev => [...newLogs, ...prev].slice(0, 50)); // Increase log depth
            } catch (e) {
                console.error("Blue Team API Error", e);
            }
        }, 1500);

        return () => clearInterval(interval);
    }, [autoRemediate]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-display text-white">Defense Operations</h2>
                <div className="flex items-center space-x-3 bg-cyber-800 p-2 rounded-lg border border-cyber-700">
                    <span className="text-sm text-slate-300">AI Auto-Remediation</span>
                    <button
                        onClick={() => setAutoRemediate(!autoRemediate)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${autoRemediate ? 'bg-green-500' : 'bg-slate-700'}`}
                    >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${autoRemediate ? 'left-7' : 'left-1'}`}></div>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="cyber-card flex items-center justify-between">
                    <div>
                        <p className="text-slate-400 text-sm">Active Threat Level</p>
                        <h3 className="text-2xl font-bold text-green-400">LOW</h3>
                    </div>
                    <ShieldCheck size={32} className="text-green-500" />
                </div>
                <div className="cyber-card flex items-center justify-between">
                    <div>
                        <p className="text-slate-400 text-sm">System Load</p>
                        <h3 className="text-2xl font-bold text-cyber-500">{stats.length > 0 ? stats[stats.length - 1].cpu : 0}%</h3>
                    </div>
                    <Activity size={32} className="text-cyber-500" />
                </div>
                <div className="cyber-card flex items-center justify-between">
                    <div>
                        <p className="text-slate-400 text-sm">Memory Usage</p>
                        <h3 className="text-2xl font-bold text-purple-400">{stats.length > 0 ? stats[stats.length - 1].memory_percent : 0}%</h3>
                    </div>
                    <Server size={32} className="text-purple-500" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* CPU/Mem Chart */}
                <div className="cyber-card h-[300px]">
                    <h3 className="text-lg font-medium text-white mb-4">Real-time System Telemetry</h3>
                    <ResponsiveContainer width="100%" height="90%">
                        <AreaChart data={stats}>
                            <defs>
                                <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#64ffda" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#64ffda" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="time" hide />
                            <YAxis domain={[0, 100]} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#112240', borderColor: '#64ffda', color: '#fff' }}
                                itemStyle={{ color: '#64ffda' }}
                            />
                            <Area type="monotone" dataKey="cpu" stroke="#64ffda" fillOpacity={1} fill="url(#colorCpu)" />
                            <Line type="monotone" dataKey="memory_percent" stroke="#bd93f9" dot={false} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Live Logs */}
                <div className="cyber-card h-[300px] overflow-hidden flex flex-col">
                    <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                        <AlertTriangle size={18} className="text-yellow-500" /> Live Security Feed
                    </h3>
                    <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                        {logs.map((log, i) => (
                            <div key={i} className={`p-2 rounded text-xs border-l-2 ${log.level === 'CRITICAL' ? 'bg-red-900/20 border-red-500 text-red-200' :
                                log.level === 'WARNING' ? 'bg-yellow-900/20 border-yellow-500 text-yellow-200' :
                                    'bg-cyber-900/50 border-blue-500 text-slate-300'
                                }`}>
                                <span className="font-mono opacity-50 mr-2">[{new Date(log.timestamp * 1000).toLocaleTimeString()}]</span>
                                <span className="font-bold mr-2">{log.source}:</span>
                                {log.message}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
