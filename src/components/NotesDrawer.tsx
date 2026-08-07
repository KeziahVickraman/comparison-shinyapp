import React, { useState } from 'react';
import { ReviewNote } from '../types';
import { 
  X, 
  Plus, 
  Trash2, 
  Star, 
  FileEdit, 
  Download
} from 'lucide-react';

interface NotesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notes: ReviewNote[];
  onAddNote: (note: Omit<ReviewNote, 'id' | 'timestamp'>) => void;
  onDeleteNote: (id: string) => void;
}

export const NotesDrawer: React.FC<NotesDrawerProps> = ({
  isOpen,
  onClose,
  notes,
  onAddNote,
  onDeleteNote
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [appId, setAppId] = useState<'original' | 'pro' | 'both'>('both');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<ReviewNote['category']>('UI/UX');
  const [rating, setRating] = useState<number>(5);
  const [filterApp, setFilterApp] = useState<'all' | 'original' | 'pro' | 'both'>('all');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onAddNote({
      appId,
      title: title.trim(),
      content: content.trim(),
      category,
      rating
    });

    setTitle('');
    setContent('');
    setShowAddForm(false);
  };

  const filteredNotes = notes.filter(n => filterApp === 'all' || n.appId === filterApp);

  const handleExportMarkdown = () => {
    let mdContent = `# Shiny Apps Comparison & QA Audit Report\n\n`;
    mdContent += `Generated: ${new Date().toLocaleString()}\n\n`;
    
    notes.forEach((n, idx) => {
      mdContent += `### ${idx + 1}. ${n.title}\n`;
      mdContent += `- **Target App**: ${n.appId.toUpperCase()}\n`;
      mdContent += `- **Category**: ${n.category}\n`;
      mdContent += `- **Rating**: ${'★'.repeat(n.rating || 0)}\n`;
      mdContent += `- **Date**: ${n.timestamp}\n\n`;
      mdContent += `${n.content}\n\n---\n\n`;
    });

    const dataStr = "data:text/markdown;charset=utf-8," + encodeURIComponent(mdContent);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "shiny-apps-qa-report.md");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end transition-opacity">
      <div className="w-full max-w-lg bg-white border-l border-slate-200 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 bg-white border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-100 text-slate-800 rounded-xl border border-slate-200">
              <FileEdit className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold uppercase tracking-tight text-slate-900">QA Audit & Notes Log</h2>
              <p className="text-xs text-slate-500">Record observations and feedback</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {notes.length > 0 && (
              <button
                onClick={handleExportMarkdown}
                className="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl border border-slate-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
                title="Export as Markdown Report"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action & Filter Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3">
          
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs text-slate-600 font-medium shadow-xs">
            <button
              onClick={() => setFilterApp('all')}
              className={`px-2.5 py-1 rounded-lg transition-all ${filterApp === 'all' ? 'bg-slate-900 text-white font-bold' : ''}`}
            >
              All ({notes.length})
            </button>
            <button
              onClick={() => setFilterApp('original')}
              className={`px-2.5 py-1 rounded-lg transition-all ${filterApp === 'original' ? 'bg-slate-200 text-slate-900 font-bold' : ''}`}
            >
              Original
            </button>
            <button
              onClick={() => setFilterApp('pro')}
              className={`px-2.5 py-1 rounded-lg transition-all ${filterApp === 'pro' ? 'bg-indigo-600 text-white font-bold' : ''}`}
            >
              Pro
            </button>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-indigo-200 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Note</span>
          </button>
        </div>

        {/* Add Note Form Modal / Expandable */}
        {showAddForm && (
          <form onSubmit={handleSubmit} className="p-5 bg-slate-50 border-b border-slate-200 flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-700">Add Evaluation Note</h3>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">Target Version</label>
                <select
                  value={appId}
                  onChange={(e) => setAppId(e.target.value as any)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 shadow-xs"
                >
                  <option value="both">Both Versions</option>
                  <option value="original">Original Version</option>
                  <option value="pro">Pro Version</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 shadow-xs"
                >
                  <option value="UI/UX">UI / UX Design</option>
                  <option value="Performance">Performance & Speed</option>
                  <option value="Bug">Bug / Issue</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="General">General Review</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">Note Title</label>
              <input
                type="text"
                placeholder="e.g., Layout density in Pro version..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 shadow-xs"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">Detailed Observations</label>
              <textarea
                placeholder="Write your findings, visual difference notes, or testing feedback..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={3}
                required
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 shadow-xs"
              />
            </div>

            {/* Rating */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Score Rating</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        star <= rating ? 'text-amber-500 fill-amber-400' : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all"
              >
                Save Note
              </button>
            </div>
          </form>
        )}

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-slate-50/40">
          {filteredNotes.map(note => (
            <div
              key={note.id}
              className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs hover:border-slate-300 transition-all flex flex-col gap-2 relative group"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                    note.appId === 'original' 
                      ? 'bg-slate-100 text-slate-700 border border-slate-200'
                      : note.appId === 'pro'
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      : 'bg-slate-900 text-white'
                  }`}>
                    {note.appId}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                    {note.category}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star
                        key={s}
                        className={`w-3 h-3 ${
                          s <= (note.rating || 0) ? 'text-amber-500 fill-amber-400' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => onDeleteNote(note.id)}
                    className="p-1 text-slate-300 hover:text-rose-600 transition-colors"
                    title="Delete Note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h4 className="text-sm font-bold text-slate-900">{note.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">{note.content}</p>

              <span className="text-[10px] text-slate-400 mt-1 font-mono">
                {note.timestamp}
              </span>
            </div>
          ))}

          {filteredNotes.length === 0 && (
            <div className="p-8 text-center text-slate-400 flex flex-col items-center gap-2">
              <FileEdit className="w-8 h-8 opacity-40" />
              <p className="text-sm font-medium">No notes recorded yet.</p>
              <p className="text-xs text-slate-500">Click "New Note" to document UI differences, issues, or feedback.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
