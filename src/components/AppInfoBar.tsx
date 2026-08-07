import React from 'react';
import { SHINY_APPS } from '../data/appsData';
import { ExternalLink, ArrowRightLeft, ShieldCheck, Activity, Cpu } from 'lucide-react';

interface AppInfoBarProps {
  onOpenBoth: () => void;
  onRefreshBoth: () => void;
}

export const AppInfoBar: React.FC<AppInfoBarProps> = ({ onOpenBoth, onRefreshBoth }) => {
  return (
    <div className="bg-white border-b border-slate-200 px-4 py-3">
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-600">
        
        {/* Apps Overview items */}
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          {/* Original */}
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
            <span className="font-bold text-slate-900">Original (Sigma):</span>
            <span className="text-slate-600 font-mono text-[11px] truncate max-w-[220px]">
              cdar-2026-c1m6-day1-sigma.vercel.app
            </span>
            <a 
              href={SHINY_APPS.original.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-slate-900 flex items-center gap-0.5 ml-1"
              title="Open link"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <ArrowRightLeft className="w-4 h-4 text-slate-400 hidden md:block" />

          {/* Pro */}
          <div className="flex items-center gap-2 bg-indigo-50/50 px-3 py-1.5 rounded-xl border border-indigo-100 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
            <span className="font-bold text-slate-900">Pro Version (Alpha):</span>
            <span className="text-indigo-700 font-mono text-[11px] font-medium truncate max-w-[220px]">
              cdar-2026-c1m6-day1-pro-alpha.vercel.app
            </span>
            <a 
              href={SHINY_APPS.pro.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5 ml-1"
              title="Open link"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* System metrics & SSL */}
        <div className="flex items-center gap-6 text-slate-500 text-[11px] font-medium ml-auto">
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Load</span>
            <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div className="w-1/3 h-full bg-indigo-600"></div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Vercel SSL Active</span>
          </div>
        </div>

      </div>
    </div>
  );
};
