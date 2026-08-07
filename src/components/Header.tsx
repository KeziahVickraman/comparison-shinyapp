import React from 'react';
import { ViewMode, DeviceMode } from '../types';
import { 
  Columns, 
  Layers, 
  Monitor, 
  Tablet, 
  Smartphone, 
  RotateCw, 
  ExternalLink, 
  SlidersHorizontal, 
  FileEdit
} from 'lucide-react';

interface HeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
  onRefreshBoth: () => void;
  onOpenBoth: () => void;
  showComparisonPanel: boolean;
  setShowComparisonPanel: (show: boolean) => void;
  showNotesDrawer: boolean;
  setShowNotesDrawer: (show: boolean) => void;
  notesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  deviceMode,
  setDeviceMode,
  onRefreshBoth,
  onOpenBoth,
  showComparisonPanel,
  setShowComparisonPanel,
  showNotesDrawer,
  setShowNotesDrawer,
  notesCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 text-slate-900 shadow-sm">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Left Geometric Brand & Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200">
              <div className="w-4 h-4 border-2 border-white rotate-45"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg tracking-tight uppercase text-slate-900">
                  CDAR 2026 <span className="text-slate-400 font-light">/ Hub</span>
                </h1>
                <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 ml-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Network Active
                </div>
              </div>
              <p className="text-[11px] text-slate-500 font-mono hidden md:block uppercase tracking-wider">
                Shiny Web Applications Dashboard • v2.4.0-stable
              </p>
            </div>
          </div>

          {/* Center Layout View Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600">
            <button
              onClick={() => setViewMode('split')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'split'
                  ? 'bg-white text-indigo-600 shadow-sm border border-slate-200 font-bold'
                  : 'hover:text-slate-900 hover:bg-slate-200/60'
              }`}
              title="Split View (Side by Side)"
            >
              <Columns className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Side-by-Side</span>
            </button>

            <button
              onClick={() => setViewMode('tabbed-original')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'tabbed-original'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200 font-bold'
                  : 'hover:text-slate-900 hover:bg-slate-200/60'
              }`}
              title="View Original Version Only"
            >
              <span className="w-2 h-2 rounded-full bg-slate-500" />
              <span>Original</span>
            </button>

            <button
              onClick={() => setViewMode('tabbed-pro')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'tabbed-pro'
                  ? 'bg-indigo-600 text-white shadow-sm font-bold'
                  : 'hover:text-slate-900 hover:bg-slate-200/60'
              }`}
              title="View Pro Version Only"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-300" />
              <span>Pro Alpha</span>
            </button>

            <button
              onClick={() => setViewMode('stacked')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'stacked'
                  ? 'bg-white text-indigo-600 shadow-sm border border-slate-200 font-bold'
                  : 'hover:text-slate-900 hover:bg-slate-200/60'
              }`}
              title="Stacked View (Top & Bottom)"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Stacked</span>
            </button>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2">
            
            {/* Device Mode Selector */}
            <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-slate-500">
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`p-1.5 rounded-lg transition-all ${
                  deviceMode === 'desktop' || deviceMode === 'responsive'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'hover:text-slate-900'
                }`}
                title="Desktop View (Full Width)"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceMode('tablet')}
                className={`p-1.5 rounded-lg transition-all ${
                  deviceMode === 'tablet' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'
                }`}
                title="Tablet Frame (768px)"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`p-1.5 rounded-lg transition-all ${
                  deviceMode === 'mobile' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'
                }`}
                title="Mobile Frame (390px)"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            {/* Reload Both */}
            <button
              onClick={onRefreshBoth}
              className="p-2 rounded-xl bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all border border-slate-200 shadow-sm"
              title="Reload Both Frames"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            {/* Open Both External */}
            <button
              onClick={onOpenBoth}
              className="p-2 rounded-xl bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all border border-slate-200 shadow-sm hidden sm:flex"
              title="Open Both Apps in New Browser Tabs"
            >
              <ExternalLink className="w-4 h-4" />
            </button>

            {/* Feature Comparison Matrix Drawer Toggle */}
            <button
              onClick={() => setShowComparisonPanel(!showComparisonPanel)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
                showComparisonPanel
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 shadow-sm'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Feature Diff</span>
            </button>

            {/* Reviewer Notes Toggle */}
            <button
              onClick={() => setShowNotesDrawer(!showNotesDrawer)}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
                showNotesDrawer
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 shadow-sm'
              }`}
            >
              <FileEdit className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">QA Notes</span>
              {notesCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-indigo-600 text-white">
                  {notesCount}
                </span>
              )}
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
