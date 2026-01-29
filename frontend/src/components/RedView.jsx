import React, { useState } from 'react';
import { api } from '../services/api';
import { Target, Terminal, Hexagon, Play } from 'lucide-react';

export const RedView = () => {
    const [target, setTarget] = useState('127.0.0.1');
    const [ports, setPorts] = useState('80, 443, 22, 8080');
    const [scanResults, setScanResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [simResult, setSimResult] = useState(null);

    const handleScan = async () => {
        setLoading(true);
        try {
            const portList = ports.split(',').map(p => parseInt(p.trim()));
            const res = await api.red.scan(target, portList);
            setScanResults(res.data);
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    const handleSimulate = async (type) => {
        try {
            const res = await api.red.simulate(type);
            setSimResult(res.data);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Scanner Controls */}
            <div className="space-y-6">
                <div className="cyber-card">
                    <h3 className="text-xl font-display text-white mb-6 flex items-center gap-2">
                        <Target className="text-red-500" /> Target Configuration
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1">Target Address</label>
                            <input
                                value={target}
                                onChange={(e) => setTarget(e.target.value)}
                                className="w-full bg-cyber-900 border border-cyber-700 p-2 rounded text-red-100 focus:border-red-500 outline-none font-mono"
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1">Target Ports (CSV)</label>
                            <input
                                value={ports}
                                onChange={(e) => setPorts(e.target.value)}
                                className="w-full bg-cyber-900 border border-cyber-700 p-2 rounded text-red-100 focus:border-red-500 outline-none font-mono"
                            />
                        </div>
                        <button
                            onClick={handleScan}
                            disabled={loading}
                            className="w-full cyber-btn mt-4 bg-red-500/10 text-red-500 border-red-500/50 hover:bg-red-500/20"
                        >
                            {loading ? 'SCANNING...' : 'INITIATE ACTIVE SCAN'}
                        </button>
                    </div>
                </div>

                {/* Attack Simulator */}
                <div className="cyber-card">
                    <h3 className="text-xl font-display text-white mb-6 flex items-center gap-2">
                        <Hexagon className="text-orange-500" /> Attack Simulation
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => handleSimulate('sql_injection')} className="cyber-btn border-orange-500/50 text-orange-400 hover:bg-orange-500/10 text-sm">
                            SQL Injection
                        </button>
                        <button onClick={() => handleSimulate('brute_force')} className="cyber-btn border-orange-500/50 text-orange-400 hover:bg-orange-500/10 text-sm">
                            Brute Force
                        </button>
                        <button onClick={() => handleSimulate('ddos_simulation')} className="cyber-btn border-orange-500/50 text-orange-400 hover:bg-orange-500/10 text-sm">
                            DDoS Stress
                        </button>
                    </div>

                    {simResult && (
                        <div className="mt-4 p-4 bg-orange-900/20 border border-orange-500/30 rounded text-sm text-orange-200">
                            <p className="font-bold border-b border-orange-500/30 pb-2 mb-2">Simulation Report: {simResult.attack}</p>
                            <p>{simResult.result}</p>
                            <p className="mt-2 text-xs opacity-70">Success Probability: {simResult.success_probability * 100}%</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Results Terminal */}
            <div className="cyber-card min-h-[500px] flex flex-col font-mono text-sm">
                <div className="flex items-center justify-between border-b border-cyber-700 pb-2 mb-4">
                    <span className="text-slate-400 flex items-center gap-2"><Terminal size={14} /> SCAN_RESULTS.LOG</span>
                    <div className="flex space-x-1">
                        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    </div>
                </div>
                <div className="flex-1 overflow-auto space-y-2">
                    {scanResults.length === 0 && !loading && <span className="text-slate-600 animate-pulse cursor-blink">Waiting for input...</span>}
                    {loading && <span className="text-yellow-400 animate-pulse">Scanning target {target}...</span>}
                    {scanResults.map((res, i) => (
                        <div key={i} className="flex space-x-4 border-b border-dashed border-slate-800 pb-1">
                            <span className={res.state === 'OPEN' ? 'text-green-400' : 'text-slate-500'}>
                                [{res.state}]
                            </span>
                            <span className="text-purple-300">PORT:{res.port}</span>
                            <span className="text-slate-400">{res.service}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
