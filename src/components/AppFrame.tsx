import React, { useState, useRef } from 'react';
import { ShinyAppInfo, DeviceMode } from '../types';
import { 
  RotateCw, 
  ExternalLink, 
  Copy, 
  Check, 
  Maximize2, 
  Minimize2, 
  ShieldCheck, 
  Info,
  Sparkles,
  Zap
} from 'lucide-react';

interface AppFrameProps {
  app: ShinyAppInfo;
  deviceMode: DeviceMode;
  refreshKey: number;
  onRefresh: () => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export const AppFrame: React.FC<AppFrameProps> = ({
  app,
  deviceMode,
  refreshKey,
  onRefresh,
  isExpanded = false,
  onToggleExpand
}) => {
  const [copied, setCopied] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const isPro = app.id === 'pro';

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(app.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const iframeSrc = `${app.url}?_rk=${refreshKey}`;

  // Device width constraints
  const getContainerStyles = () => {
    if (deviceMode === 'mobile') {
      return 'w-[390px] h-[720px] max-w-full mx-auto rounded-3xl border-8 border-slate-800 shadow-2xl my-4 overflow-hidden';
    }
    if (deviceMode === 'tablet') {
      return 'w-[768px] h-[840px] max-w-full mx-auto rounded-2xl border-8 border-slate-800 shadow-2xl my-4 overflow-hidden';
    }
    return 'w-full h-full';
  };

  return (
    <div className={`flex flex-col h-full bg-white rounded-2xl border ${
      isPro 
        ? 'border-2 border-indigo-200 shadow-xl shadow-indigo-100/30' 
        : 'border border-slate-200 shadow-sm'
    } overflow-hidden transition-all relative`}>
      
      {/* Top Header Card Info */}
      <div className={`flex flex-wrap items-center justify-between px-4 py-3 border-b ${
        isPro 
          ? 'bg-indigo-50/40 border-indigo-100' 
          : 'bg-slate-50/60 border-slate-200'
      } gap-2`}>
        
        {/* Left Badge & Name */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-2">
            <span 
              className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
              style={{ backgroundColor: app.themeColor }} 
            />
            <h2 className="text-base font-bold text-slate-900 tracking-tight truncate">
              {app.name}
            </h2>
          </div>

          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider ${
            isPro 
              ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' 
              : 'bg-slate-200 text-slate-700 border border-slate-300'
          }`}>
            {app.badge}
          </span>
        </div>

        {/* Center Simulated URL Bar */}
        <div className="hidden sm:flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600 min-w-[240px] max-w-[360px] truncate shadow-xs">
          <ShieldCheck className={`w-4 h-4 shrink-0 ${isPro ? 'text-indigo-600' : 'text-slate-500'}`} />
          <span className="truncate font-mono text-[11px] font-medium text-slate-700 select-all">
            {app.url}
          </span>
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-1.5 ml-auto">
          
          {/* Zoom controls */}
          <div className="hidden xl:flex items-center bg-white rounded-lg border border-slate-200 text-[11px] text-slate-600 shadow-xs">
            <button
              onClick={() => setZoomLevel(Math.max(75, zoomLevel - 10))}
              className="px-2 py-1 hover:bg-slate-100 rounded-l transition-colors"
              title="Zoom out"
            >
              -
            </button>
            <span className="px-2 font-mono font-bold text-slate-800">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel(Math.min(125, zoomLevel + 10))}
              className="px-2 py-1 hover:bg-slate-100 rounded-r transition-colors"
              title="Zoom in"
            >
              +
            </button>
          </div>

          {/* Info toggle */}
          <button
            onClick={() => setShowInfo(!showInfo)}
            className={`p-1.5 rounded-lg transition-all border ${
              showInfo 
                ? 'bg-indigo-600 text-white border-indigo-600' 
                : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-100'
            }`}
            title="Toggle Version Highlights"
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Copy URL */}
          <button
            onClick={handleCopyUrl}
            className="p-1.5 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-all"
            title="Copy URL to clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600 font-bold" /> : <Copy className="w-4 h-4" />}
          </button>

          {/* Refresh Frame */}
          <button
            onClick={() => {
              setIsLoading(true);
              onRefresh();
            }}
            className="p-1.5 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-all"
            title="Reload Frame"
          >
            <RotateCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-indigo-600' : ''}`} />
          </button>

          {/* Open in New Tab */}
          <a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-all flex items-center justify-center"
            title="Open in new browser tab"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* Expand / Collapse frame */}
          {onToggleExpand && (
            <button
              onClick={onToggleExpand}
              className="p-1.5 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-all"
              title={isExpanded ? 'Exit Full Screen' : 'Full Screen Frame'}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4 text-amber-600" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          )}

        </div>

      </div>

      {/* Info Header Banner (Collapsible) */}
      {showInfo && (
        <div className="bg-slate-900 text-white p-4 text-xs border-b border-slate-800 flex flex-col gap-2.5">
          <p className="text-slate-200 font-medium leading-relaxed">
            {app.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-1">
            {app.highlights.map((h, i) => (
              <span key={i} className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 border border-slate-700 flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3 h-3 text-indigo-400" />
                {h}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Main Iframe Canvas View */}
      <div className="relative flex-1 bg-slate-100 overflow-auto flex items-center justify-center min-h-[500px]">
        
        {/* Geometric Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-20 bg-slate-900/40 backdrop-blur-xs flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-200 animate-bounce">
              <div className="w-6 h-6 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            </div>
            <div className="bg-slate-900 text-white px-4 py-2 rounded-xl text-center shadow-lg border border-slate-800">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-300">Loading {app.name}</p>
              <p className="text-[11px] font-mono text-slate-400 mt-0.5">{app.url}</p>
            </div>
          </div>
        )}

        {/* Device wrapper container */}
        <div className={`transition-all duration-300 ${getContainerStyles()}`}>
          <div 
            className="w-full h-full origin-top transition-transform"
            style={{ 
              transform: zoomLevel !== 100 ? `scale(${zoomLevel / 100})` : 'none',
              height: zoomLevel !== 100 ? `${100 * (100 / zoomLevel)}%` : '100%' 
            }}
          >
            <iframe
              ref={iframeRef}
              key={refreshKey}
              src={iframeSrc}
              title={app.name}
              onLoad={handleIframeLoad}
              className="w-full h-full border-0 bg-white"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
            />
          </div>
        </div>

      </div>

      {/* Frame Bottom Status Bar */}
      <div className="px-4 py-2.5 bg-white border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Build Active
          </span>
          <span className="text-slate-300">•</span>
          <span className="font-mono text-[11px] text-slate-500 font-medium">{app.version}</span>
        </div>

        <a 
          href={app.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-800 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1"
        >
          <span>Launch Direct</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
};
