import React, { useState, useEffect } from 'react';
import { ViewMode, DeviceMode, ReviewNote } from './types';
import { SHINY_APPS } from './data/appsData';
import { Header } from './components/Header';
import { AppFrame } from './components/AppFrame';
import { ComparisonPanel } from './components/ComparisonPanel';
import { NotesDrawer } from './components/NotesDrawer';
import { AppInfoBar } from './components/AppInfoBar';
import { DisqusComments } from './components/DisqusComments';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeftRight } from 'lucide-react';

const INITIAL_NOTES: ReviewNote[] = [
  {
    id: 'note-1',
    appId: 'pro',
    title: 'Pro Version Visual Theme & Responsiveness',
    content: 'The Pro version has updated visual typography and clearer metric callout panels compared to the Sigma release.',
    category: 'UI/UX',
    rating: 5,
    timestamp: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  },
  {
    id: 'note-2',
    appId: 'original',
    title: 'Baseline Sigma App Functionality',
    content: 'Original app is lightweight and loads standard charts quickly.',
    category: 'General',
    rating: 4,
    timestamp: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
];

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [originalRefreshKey, setOriginalRefreshKey] = useState<number>(Date.now());
  const [proRefreshKey, setProRefreshKey] = useState<number>(Date.now() + 1);
  const [showComparisonPanel, setShowComparisonPanel] = useState<boolean>(false);
  const [showNotesDrawer, setShowNotesDrawer] = useState<boolean>(false);
  const [expandedApp, setExpandedApp] = useState<'original' | 'pro' | null>(null);

  // Persistent QA Review Notes
  const [notes, setNotes] = useState<ReviewNote[]>(() => {
    try {
      const saved = localStorage.getItem('shiny_apps_notes');
      return saved ? JSON.parse(saved) : INITIAL_NOTES;
    } catch (e) {
      return INITIAL_NOTES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('shiny_apps_notes', JSON.stringify(notes));
    } catch (e) {
      // ignore
    }
  }, [notes]);

  const handleRefreshBoth = () => {
    const now = Date.now();
    setOriginalRefreshKey(now);
    setProRefreshKey(now + 1);
  };

  const handleOpenBoth = () => {
    window.open(SHINY_APPS.original.url, '_blank');
    window.open(SHINY_APPS.pro.url, '_blank');
  };

  const handleAddNote = (newNoteData: Omit<ReviewNote, 'id' | 'timestamp'>) => {
    const newNote: ReviewNote = {
      ...newNoteData,
      id: `note-${Date.now()}`,
      timestamp: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      
      {/* Top Main Navigation Header */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        deviceMode={deviceMode}
        setDeviceMode={setDeviceMode}
        onRefreshBoth={handleRefreshBoth}
        onOpenBoth={handleOpenBoth}
        showComparisonPanel={showComparisonPanel}
        setShowComparisonPanel={setShowComparisonPanel}
        showNotesDrawer={showNotesDrawer}
        setShowNotesDrawer={setShowNotesDrawer}
        notesCount={notes.length}
      />

      {/* App Quick Status Info Bar */}
      <AppInfoBar 
        onOpenBoth={handleOpenBoth} 
        onRefreshBoth={handleRefreshBoth} 
      />

      {/* Main Workspace Canvas Container */}
      <main className="flex-1 p-4 sm:p-6 flex flex-col overflow-hidden max-w-[1920px] w-full mx-auto">
        <AnimatePresence mode="wait">
          
          {/* Expanded Single Frame Mode */}
          {expandedApp ? (
            <motion.div
              key={`expanded-${expandedApp}`}
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              className="flex-1 flex flex-col min-h-[720px]"
            >
              <div className="mb-3 flex items-center justify-between">
                <button
                  onClick={() => setExpandedApp(null)}
                  className="px-3.5 py-1.5 bg-white hover:bg-slate-50 text-xs font-bold text-slate-800 rounded-xl border border-slate-200 flex items-center gap-1.5 shadow-xs transition-all"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Exit Focus View</span>
                </button>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Viewing {SHINY_APPS[expandedApp].name} Full Canvas
                </span>
              </div>

              <AppFrame
                app={SHINY_APPS[expandedApp]}
                deviceMode={deviceMode}
                refreshKey={expandedApp === 'original' ? originalRefreshKey : proRefreshKey}
                onRefresh={() => {
                  if (expandedApp === 'original') setOriginalRefreshKey(Date.now());
                  else setProRefreshKey(Date.now());
                }}
                isExpanded={true}
                onToggleExpand={() => setExpandedApp(null)}
              />
            </motion.div>

          ) : viewMode === 'tabbed-original' ? (
            
            /* Tabbed Original Version */
            <motion.div
              key="tabbed-original"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex-1 flex flex-col min-h-[740px]"
            >
              <AppFrame
                app={SHINY_APPS.original}
                deviceMode={deviceMode}
                refreshKey={originalRefreshKey}
                onRefresh={() => setOriginalRefreshKey(Date.now())}
                isExpanded={false}
                onToggleExpand={() => setExpandedApp('original')}
              />
            </motion.div>

          ) : viewMode === 'tabbed-pro' ? (

            /* Tabbed Pro Version */
            <motion.div
              key="tabbed-pro"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex-1 flex flex-col min-h-[740px]"
            >
              <AppFrame
                app={SHINY_APPS.pro}
                deviceMode={deviceMode}
                refreshKey={proRefreshKey}
                onRefresh={() => setProRefreshKey(Date.now())}
                isExpanded={false}
                onToggleExpand={() => setExpandedApp('pro')}
              />
            </motion.div>

          ) : viewMode === 'stacked' ? (

            /* Stacked Top & Bottom View */
            <motion.div
              key="stacked"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col gap-6 min-h-[1300px]"
            >
              <div className="h-[640px] flex flex-col">
                <AppFrame
                  app={SHINY_APPS.original}
                  deviceMode={deviceMode}
                  refreshKey={originalRefreshKey}
                  onRefresh={() => setOriginalRefreshKey(Date.now())}
                  isExpanded={false}
                  onToggleExpand={() => setExpandedApp('original')}
                />
              </div>

              <div className="h-[640px] flex flex-col">
                <AppFrame
                  app={SHINY_APPS.pro}
                  deviceMode={deviceMode}
                  refreshKey={proRefreshKey}
                  onRefresh={() => setProRefreshKey(Date.now())}
                  isExpanded={false}
                  onToggleExpand={() => setExpandedApp('pro')}
                />
              </div>
            </motion.div>

          ) : (

            /* Default Split Side-by-Side View */
            <motion.div
              key="split-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 min-h-[780px]"
            >
              {/* Left Column: Original App */}
              <div className="flex flex-col h-full min-h-[640px] lg:min-h-0">
                <AppFrame
                  app={SHINY_APPS.original}
                  deviceMode={deviceMode}
                  refreshKey={originalRefreshKey}
                  onRefresh={() => setOriginalRefreshKey(Date.now())}
                  isExpanded={false}
                  onToggleExpand={() => setExpandedApp('original')}
                />
              </div>

              {/* Right Column: Pro App */}
              <div className="flex flex-col h-full min-h-[640px] lg:min-h-0">
                <AppFrame
                  app={SHINY_APPS.pro}
                  deviceMode={deviceMode}
                  refreshKey={proRefreshKey}
                  onRefresh={() => setProRefreshKey(Date.now())}
                  isExpanded={false}
                  onToggleExpand={() => setExpandedApp('pro')}
                />
              </div>
            </motion.div>

          )}

        </AnimatePresence>

        {/* Disqus Comments Section */}
        <DisqusComments />
      </main>

      {/* Feature Comparison Matrix Drawer */}
      <ComparisonPanel
        isOpen={showComparisonPanel}
        onClose={() => setShowComparisonPanel(false)}
      />

      {/* QA Review & Notes Drawer */}
      <NotesDrawer
        isOpen={showNotesDrawer}
        onClose={() => setShowNotesDrawer(false)}
        notes={notes}
        onAddNote={handleAddNote}
        onDeleteNote={handleDeleteNote}
      />

      {/* Geometric Balance Footer Bar */}
      <footer className="h-12 bg-white border-t border-slate-200 px-6 sm:px-8 flex items-center justify-between shrink-0 text-xs text-slate-500">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Load</span>
            <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div className="w-1/3 h-full bg-indigo-600"></div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Storage</span>
            <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div className="w-[72%] h-full bg-slate-400"></div>
            </div>
          </div>
        </div>
        <p className="text-[10px] text-slate-400 font-bold tracking-tight">
          © 2026 CENTRAL DATA ANALYSIS REPOSITORY. ALL RIGHTS RESERVED.
        </p>
      </footer>

    </div>
  );
}
