import React, { useState } from 'react';
import { ComparisonItem } from '../types';
import { INITIAL_COMPARISON_MATRIX, SHINY_APPS } from '../data/appsData';
import { 
  X, 
  Search, 
  Sparkles, 
  Download, 
  SlidersHorizontal,
  Info
} from 'lucide-react';

interface ComparisonPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComparisonPanel: React.FC<ComparisonPanelProps> = ({ isOpen, onClose }) => {
  const [matrixItems] = useState<ComparisonItem[]>(INITIAL_COMPARISON_MATRIX);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', ...Array.from(new Set(matrixItems.map(i => i.category)))];

  const filteredItems = matrixItems.filter(item => {
    const matchesSearch = item.feature.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.notes.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(matrixItems, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "shiny-apps-comparison-matrix.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end transition-opacity">
      <div className="w-full max-w-2xl bg-white border-l border-slate-200 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="px-6 py-5 bg-white border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold uppercase tracking-tight text-slate-900">Version Feature Diff Matrix</h2>
              <p className="text-xs text-slate-500">Comparing Original (Sigma) vs Pro (Alpha) Capabilities</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJSON}
              className="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl border border-slate-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
              title="Export matrix data as JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Category Bar */}
        <div className="p-4 bg-slate-50/50 border-b border-slate-200 flex flex-col gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search features or notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 transition-colors shadow-xs"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Feature List Table/Cards */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/30">
          
          {/* Version Header Cards */}
          <div className="grid grid-cols-2 gap-3 mb-2">
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">Base Release</span>
              <h4 className="text-sm font-bold text-slate-900">{SHINY_APPS.original.name}</h4>
              <p className="text-[11px] text-slate-500 font-mono mt-1">{SHINY_APPS.original.version}</p>
            </div>

            <div className="p-4 bg-indigo-50/60 border border-indigo-200 rounded-xl shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 block mb-0.5">High Performance</span>
              <h4 className="text-sm font-bold text-slate-900">{SHINY_APPS.pro.name}</h4>
              <p className="text-[11px] text-indigo-700 font-mono mt-1 font-bold">{SHINY_APPS.pro.version}</p>
            </div>
          </div>

          {filteredItems.map(item => (
            <div 
              key={item.id}
              className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs hover:border-slate-300 transition-all flex flex-col gap-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                  {item.category}
                </span>
                <span className="text-xs text-indigo-600 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-600" />
                  Upgrade Delta
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900">{item.feature}</h3>

              {/* Status Comparison */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Original</span>
                  <span className="font-bold text-slate-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                    {item.originalStatus}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100">
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block mb-1">Pro Alpha</span>
                  <span className="font-bold text-indigo-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    {item.proStatus}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                <strong className="text-slate-800 font-bold">Analysis Note: </strong>
                {item.notes}
              </p>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="p-8 text-center text-slate-400">
              <Info className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-semibold">No matching features found.</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
