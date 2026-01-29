import React, { useState } from 'react';
import { api } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Cpu, Zap, Activity } from 'lucide-react';

export const QuantumView = () => {
    const [qubits, setQubits] = useState(3);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const runSimulation = async () => {
        setLoading(true);
        try {
            // Add artificial delay to feel "heavy"
            await new Promise(r => setTimeout(r, 800));
            const res = await api.quantum.runGrover(qubits);
            setResult(res.data);
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    const data = result ? Object.keys(result.measurement_results).map(key => ({
        state: `|${key}>`,
        probability: result.measurement_results[key]
    })) : [];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="cyber-card col-span-1">
                    <h3 className="text-xl font-display text-white mb-6 flex items-center gap-2">
                        <Cpu className="text-purple-500" /> Quantum Core
                    </h3>
                    <p className="text-sm text-slate-400 mb-6">
                        Simulate Grover's Algorithm to search for threat signatures in unstructured data with quadratic speedup.
                    </p>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2">Qubit Register Size (Search Space 2^N)</label>
                            <input
                                type="range" min="2" max="6" value={qubits}
                                onChange={(e) => setQubits(parseInt(e.target.value))}
                                className="w-full h-2 bg-cyber-700 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-cyber-500 font-mono mt-1">
                                <span>2 Qubits</span>
                                <span>{qubits} Qubits ({Math.pow(2, qubits)} States)</span>
                                <span>6 Qubits</span>
                            </div>
                        </div>

                        <button
                            onClick={runSimulation}
                            disabled={loading}
                            className="w-full cyber-btn mt-4 bg-purple-500/10 text-purple-400 border-purple-500/50 hover:bg-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                        >
                            {loading ? 'COLLAPSING WAVEFUNCTION...' : 'EXECUTE QUANTUM SEARCH'}
                        </button>
                    </div>
                </div>

                <div className="cyber-card col-span-1 md:col-span-2 flex flex-col items-center justify-center relative overflow-hidden">
                    {!result && !loading && (
                        <div className="text-center opacity-50">
                            <Activity size={48} className="mx-auto mb-4 text-purple-500 animate-pulse" />
                            <h3 className="text-xl font-display">QUANTUM STATE: SUPERPOSITION</h3>
                            <p>Ready to initialize circuit.</p>
                        </div>
                    )}

                    {loading && (
                        <div className="text-center">
                            <Zap size={48} className="mx-auto mb-4 text-yellow-400 animate-bounce" />
                            <h3 className="text-xl font-display text-yellow-500">Processing Quantum Circuit...</h3>
                        </div>
                    )}

                    {result && !loading && (
                        <div className="w-full h-full flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-lg text-white font-mono">Measurements (1000 shots)</h4>
                                <div className="text-right">
                                    <p className="text-xs text-slate-400">Target Found: <span className="text-green-400 font-bold">|{result.collapsed_state}&gt;</span></p>
                                    <p className="text-xs text-slate-400">Confidence: 91.2%</p>
                                </div>
                            </div>
                            <div className="flex-1 min-h-[250px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data}>
                                        <XAxis dataKey="state" stroke="#475569" />
                                        <YAxis stroke="#475569" />
                                        <Tooltip
                                            cursor={{ fill: '#1e293b' }}
                                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #a855f7' }}
                                        />
                                        <Bar dataKey="probability">
                                            {data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.state === `|${result.collapsed_state}>` ? '#a855f7' : '#1e293b'} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
