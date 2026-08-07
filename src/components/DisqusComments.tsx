import React, { useEffect, useState } from 'react';
import { MessageSquare, AlertCircle, ExternalLink } from 'lucide-react';

export const DisqusComments: React.FC = () => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Check if disqus script is already loaded
    const disqusScriptId = 'disqus-embed-script';
    const disqusCountScriptId = 'dsq-count-scr';

    // Embed script
    if (!document.getElementById(disqusScriptId)) {
      const d = document;
      const s = d.createElement('script');
      s.id = disqusScriptId;
      s.src = 'https://best-founder.disqus.com/embed.js';
      s.setAttribute('data-timestamp', (+new Date()).toString());
      s.async = true;
      s.onerror = () => {
        setHasError(true);
      };
      (d.head || d.body).appendChild(s);
    } else if ((window as any).DISQUS) {
      try {
        (window as any).DISQUS.reset({
          reload: true,
        });
      } catch (e) {
        // Safe catch for DISQUS reset
      }
    }

    // Count script
    if (!document.getElementById(disqusCountScriptId)) {
      const d = document;
      const s = d.createElement('script');
      s.id = disqusCountScriptId;
      s.src = 'https://best-founder.disqus.com/count.js';
      s.async = true;
      s.onerror = () => {
        // Silently ignore count.js load error
      };
      (d.head || d.body).appendChild(s);
    }
  }, []);

  return (
    <section className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs max-w-[1920px] w-full mx-auto">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight uppercase">Community Discussion & Feedback</h3>
            <p className="text-xs text-slate-500">Leave comments, report findings, or ask questions powered by Disqus</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold font-mono">
          best-founder.disqus.com
        </span>
      </div>

      {/* Disqus Thread Container */}
      <div id="disqus_thread" className="min-h-[220px]">
        {hasError && (
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center justify-center text-center gap-2">
            <AlertCircle className="w-6 h-6 text-slate-400" />
            <p className="text-xs text-slate-600 font-medium">
              Disqus comments script could not be loaded directly (e.g. ad-blocker active or cross-origin restriction).
            </p>
            <a
              href="https://best-founder.disqus.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors"
            >
              <span>Open Discussion Channel</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>

      {/* Fallback Noscript */}
      <noscript>
        Please enable JavaScript to view the{' '}
        <a href="https://disqus.com/?ref_noscript" className="text-indigo-600 underline">
          comments powered by Disqus.
        </a>
      </noscript>
    </section>
  );
};

