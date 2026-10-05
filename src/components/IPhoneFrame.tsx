import React, { useState, useEffect } from 'react';
import { TabType } from '../types';
import {
  Sun,
  Calendar as CalendarIcon,
  Pill,
  User,
  Wifi,
  Battery,
  Signal,
  Sparkles,
} from 'lucide-react';

interface IPhoneFrameProps {
  children: React.ReactNode;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  fullWidthMode?: boolean;
}

export const IPhoneFrame: React.FC<IPhoneFrameProps> = ({
  children,
  activeTab,
  onTabChange,
  fullWidthMode = false,
}) => {
  const [statusBarTime, setStatusBarTime] = useState<string>('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = now.getHours() % 12 || 12;
      const m = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
      setStatusBarTime(`${h}:${m}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'today' as TabType, label: 'Hoy', icon: Sun },
    { id: 'calendar' as TabType, label: 'Calendario', icon: CalendarIcon },
    { id: 'medications' as TabType, label: 'Medicamentos', icon: Pill },
    { id: 'profile' as TabType, label: 'Perfil', icon: User },
  ];

  const content = (
    <div className="flex flex-col h-full bg-[#f8fafc] text-slate-800 relative overflow-hidden select-none">
      {/* iOS Status Bar */}
      <div className="shrink-0 h-11 pt-2.5 px-7 flex items-center justify-between z-40 bg-transparent text-slate-800 text-xs font-semibold">
        <span className="tabular-nums tracking-tight font-bold">{statusBarTime}</span>

        {/* Dynamic Island */}
        <div className="group absolute left-1/2 -translate-x-1/2 top-2 h-7 w-28 bg-black rounded-full flex items-center justify-between px-2.5 shadow-md cursor-pointer transition-all hover:w-36">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 animate-pulse" />
          <div className="text-[10px] text-white/90 font-medium tracking-tight">
            MediCare
          </div>
          <div className="w-2 h-2 rounded-full bg-sky-400/80" />
        </div>

        {/* Right Status Icons */}
        <div className="flex items-center gap-1.5 text-slate-800">
          <Signal className="w-3.5 h-3.5" />
          <Wifi className="w-3.5 h-3.5" />
          <div className="flex items-center">
            <span className="text-[10px] font-bold mr-1 tabular-nums">98%</span>
            <Battery className="w-4 h-4 fill-slate-800" />
          </div>
        </div>
      </div>

      {/* Main Scrollable View Area */}
      <div className="flex-1 overflow-y-auto px-4 pt-2 no-scrollbar">
        {children}
      </div>

      {/* Bottom Navigation Bar */}
      <div className="shrink-0 z-40 bg-white/90 backdrop-blur-md border-t border-slate-200/80 px-4 pt-1.5 pb-6">
        <div className="grid grid-cols-4 items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center justify-center py-1 transition-all relative ${
                  isActive ? 'text-sky-600 scale-105' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-sky-600" />
                  )}
                </div>
                <span
                  className={`text-[10px] tracking-tight mt-1 ${
                    isActive ? 'font-bold text-sky-700' : 'font-medium'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Home Indicator */}
        <div className="w-32 h-1 bg-slate-300 rounded-full mx-auto mt-2" />
      </div>
    </div>
  );

  if (fullWidthMode) {
    return (
      <div className="w-full max-w-md mx-auto h-[844px] shadow-2xl rounded-3xl overflow-hidden border border-slate-200">
        {content}
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center py-4">
      {/* iPhone 15 Pro Natural Titanium Outer Frame */}
      <div className="relative w-[385px] h-[812px] bg-[#2d2d30] rounded-[52px] p-[10px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.1)_inset] border-4 border-[#8e8d89]">
        {/* Subtle metallic bevel highlight */}
        <div className="absolute inset-0 rounded-[48px] pointer-events-none border border-white/20" />

        {/* Titanium Side Button Accents */}
        <div className="absolute -left-[14px] top-28 w-[4px] h-9 bg-[#696865] rounded-l-md shadow-xs" />
        <div className="absolute -left-[14px] top-42 w-[4px] h-12 bg-[#696865] rounded-l-md shadow-xs" />
        <div className="absolute -left-[14px] top-56 w-[4px] h-12 bg-[#696865] rounded-l-md shadow-xs" />
        <div className="absolute -right-[14px] top-36 w-[4px] h-16 bg-[#696865] rounded-r-md shadow-xs" />

        {/* Inner Screen Bezel with OLED Black Curve */}
        <div className="w-full h-full bg-black rounded-[42px] overflow-hidden relative shadow-inner">
          {content}
        </div>
      </div>
    </div>
  );
};
