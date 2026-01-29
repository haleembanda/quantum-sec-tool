import React from 'react';
import { LayoutDashboard, Shield, Crosshair, Cpu, Menu, Bell } from 'lucide-react';
import clsx from 'clsx';

// eslint-disable-next-line no-unused-vars
const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={clsx(
            "flex items-center w-full p-4 space-x-3 transition-all duration-300",
            active ? "bg-cyber-500/10 text-cyber-500 border-r-2 border-cyber-500" : "text-slate-400 hover:text-white hover:bg-slate-800/50"
        )}
    >
        <Icon size={20} />
        <span className="font-medium tracking-wide">{label}</span>
    </button>
);

export const Layout = ({ children, currentView, onViewChange }) => {
    return (
        <div className="flex h-screen bg-cyber-900 text-slate-300 overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 bg-cyber-800/80 backdrop-blur border-r border-cyber-700 flex flex-col">
                <div className="p-6 border-b border-cyber-700">
                    <h1 className="text-2xl font-display font-bold text-white tracking-widest neon-text">
                        Q-SEC<span className="text-cyber-500">.AI</span>
                    </h1>
                    <p className="text-xs text-cyber-400 mt-1 opacity-70">QUANTUM DEFENSE GRID</p>
                </div>

                <nav className="flex-1 py-6 space-y-2">
                    <SidebarItem icon={LayoutDashboard} label="Dashboard" active={currentView === 'dashboard'} onClick={() => onViewChange('dashboard')} />
                    <SidebarItem icon={Shield} label="Blue Team (Monitor)" active={currentView === 'blue'} onClick={() => onViewChange('blue')} />
                    <SidebarItem icon={Crosshair} label="Red Team (Attack)" active={currentView === 'red'} onClick={() => onViewChange('red')} />
                    <SidebarItem icon={Cpu} label="Quantum Compute" active={currentView === 'quantum'} onClick={() => onViewChange('quantum')} />
                </nav>

                <div className="p-4 border-t border-cyber-700">
                    <div className="flex items-center space-x-2 text-xs text-slate-500">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span>System Online</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* Header */}
                <header className="h-16 border-b border-cyber-700 bg-cyber-800/30 backdrop-blur flex items-center justify-between px-8">
                    <h2 className="text-lg font-medium text-white">{currentView.charAt(0).toUpperCase() + currentView.slice(1)} Operations</h2>
                    <div className="flex items-center space-x-4">
                        <button className="p-2 hover:bg-slate-800 rounded-full text-cyber-500 relative">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyber-500 to-blue-600 border border-white/20"></div>
                    </div>
                </header>

                {/* Content Body */}
                <main className="flex-1 overflow-auto p-8 relative z-10">
                    {children}
                </main>

                {/* Background Grid Effect */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            </div>
        </div>
    );
};
