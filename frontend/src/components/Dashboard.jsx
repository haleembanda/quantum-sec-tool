import React from 'react';
import { Shield, Crosshair, Cpu, Globe } from 'lucide-react';
import { NetworkMap } from './NetworkMap';

// eslint-disable-next-line no-unused-vars
const StatCard = ({ title, value, sub, icon: Icon, color }) => (
    <div className={`cyber-card border-${color}-900/50 hover:border-${color}-500/50 transition-colors cursor-pointer group`}>
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-lg bg-${color}-500/10 text-${color}-500 group-hover:bg-${color}-500/20 transition-colors`}>
                <Icon size={24} />
            </div>
            <span className={`text-xs font-mono px-2 py-1 rounded bg-${color}-900/50 text-${color}-400 border border-${color}-500/20`}>ACTIVE</span>
        </div>
        <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
        <p className="text-slate-400 text-sm font-medium">{title}</p>
        <p className="text-xs text-slate-500 mt-2">{sub}</p>
    </div>
);

export const Dashboard = ({ onViewChange }) => {
    return (
        <div className="space-y-8">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white mb-2">Command Center</h1>
                    <p className="text-slate-400">Global Threat Monitoring & Quantum Response System</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-slate-500 font-mono">DEFCON LEVEL</p>
                    <h2 className="text-4xl font-bold text-green-500 neon-text">5</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div onClick={() => onViewChange('blue')}>
                    <StatCard title="System Health" value="98.2%" sub="All systems nominal" icon={Shield} color="green" />
                </div>
                <div onClick={() => onViewChange('red')}>
                    <StatCard title="Vulnerabilities" value="0" sub="Last scan: 2m ago" icon={Crosshair} color="red" />
                </div>
                <div onClick={() => onViewChange('quantum')}>
                    <StatCard title="Q-Probability" value="1.00" sub="Coherence Stable" icon={Cpu} color="purple" />
                </div>
                <div>
                    <StatCard title="Network Flow" value="12 Gbps" sub="Traffic Normal" icon={Globe} color="cyan" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 3D Network Map Visualization in Standout Features */}
                <div className="cyber-card col-span-2 min-h-[300px] flex items-center justify-center relative p-0 overflow-hidden">
                    <NetworkMap />
                </div>

                <div className="cyber-card flex flex-col space-y-4">
                    <h3 className="text-white font-medium border-b border-cyber-700 pb-2">Recent Alerts</h3>
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center space-x-3 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                            <span className="text-slate-400">Suspicious packet blocked from 192.168.1.{100 + i}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
