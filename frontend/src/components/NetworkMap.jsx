import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

// Mock Nodes
const NODES = [
    { id: 'core', x: 50, y: 50, type: 'SERVER', label: 'Mainframe' },
    { id: 'db1', x: 20, y: 30, type: 'DB', label: 'SQL-Primary' },
    { id: 'db2', x: 80, y: 30, type: 'DB', label: 'SQL-Backup' },
    { id: 'fw', x: 50, y: 80, type: 'FW', label: 'Firewall' },
    { id: 'client1', x: 20, y: 80, type: 'CLIENT', label: 'Workstation A' },
    { id: 'client2', x: 80, y: 80, type: 'CLIENT', label: 'Workstation B' }
];

const LINKS = [
    { from: 'core', to: 'db1' },
    { from: 'core', to: 'db2' },
    { from: 'fw', to: 'core' },
    { from: 'client1', to: 'fw' },
    { from: 'client2', to: 'fw' }
];

export const NetworkMap = () => {
    return (
        <div className="w-full h-full relative bg-cyber-900/40 rounded-lg overflow-hidden border border-cyber-700/30">
            <h3 className="absolute top-4 left-4 text-xs font-mono text-slate-500 uppercase tracking-widest z-10">Network Topology: Live</h3>
            <svg className="w-full h-full p-8" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Links */}
                {LINKS.map((link, i) => {
                    const start = NODES.find(n => n.id === link.from);
                    const end = NODES.find(n => n.id === link.to);
                    return (
                        <motion.line
                            key={i}
                            x1={start.x} y1={start.y}
                            x2={end.x} y2={end.y}
                            stroke="#1e293b"
                            strokeWidth="0.5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                        />
                    );
                })}
                {/* Active Traffic Simulation */}
                {LINKS.map((link, i) => {
                    const start = NODES.find(n => n.id === link.from);
                    const end = NODES.find(n => n.id === link.to);
                    return (
                        <circle key={`particle-${i}`} r="0.8" fill="#64ffda">
                            <animateMotion
                                dur={`${2 + i}s`}
                                repeatCount="indefinite"
                                path={`M${start.x},${start.y} L${end.x},${end.y}`}
                            />
                        </circle>
                    );
                })}

                {/* Nodes */}
                {NODES.map((node) => (
                    <g key={node.id}>
                        <circle cx={node.x} cy={node.y} r="3" fill="#0f172a" stroke={
                            node.type === 'SERVER' ? '#a855f7' :
                                node.type === 'DB' ? '#64ffda' :
                                    node.type === 'FW' ? '#f59e0b' : '#3b82f6'
                        } strokeWidth="0.5" />
                        <text x={node.x} y={node.y + 5} fontSize="2.5" fill="#64748b" textAnchor="middle" className="font-mono">{node.label}</text>
                    </g>
                ))}
            </svg>
        </div>
    );
};
