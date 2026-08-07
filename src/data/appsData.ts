import { ShinyAppInfo, ComparisonItem } from '../types';

export const SHINY_APPS: Record<'original' | 'pro', ShinyAppInfo> = {
  original: {
    id: 'original',
    name: 'Original Version',
    badge: 'Base Release',
    version: 'SIGMA-v1.0.2',
    url: 'https://cdar-2026-c1m6-day1-sigma.vercel.app',
    description: 'The baseline Shiny application interface featuring standard data inputs, essential statistical graphics, and core workflow tools.',
    highlights: [
      'Core statistical visualization pipeline',
      'Standard parameter inputs & controls',
      'Standard tabular dataset view',
      'Baseline interactive plots'
    ],
    themeColor: '#475569', // Slate
    accentBg: 'bg-slate-100 text-slate-700 border-slate-200',
    accentText: 'text-slate-700',
    accentBorder: 'border-slate-200'
  },
  pro: {
    id: 'pro',
    name: 'Pro Version',
    badge: 'High Performance Alpha',
    version: 'ALPHA-v2.1.0-px',
    url: 'https://cdar-2026-c1m6-day1-pro-alpha.vercel.app',
    description: 'Advanced Pro edition with expanded analytics capabilities, enriched visual customization, extended parameters, and hardware-accelerated rendering.',
    highlights: [
      'Enhanced reactive UI rendering engine',
      'Expanded multi-parameter filter matrix',
      'Advanced export & snapshot capabilities',
      'Refined visual layout with high-density mode'
    ],
    themeColor: '#4f46e5', // Indigo
    accentBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    accentText: 'text-indigo-600',
    accentBorder: 'border-indigo-200'
  }
};

export const INITIAL_COMPARISON_MATRIX: ComparisonItem[] = [
  {
    id: '1',
    category: 'User Interface',
    feature: 'Dashboard Layout Density & Themes',
    originalStatus: 'Basic',
    proStatus: 'Enhanced',
    notes: 'Pro version offers geometric balance spacing, dark/light optimization, and refined typography.'
  },
  {
    id: '2',
    category: 'Data Analytics',
    feature: 'Interactive Data Filtering Matrix',
    originalStatus: 'Limited',
    proStatus: 'Advanced',
    notes: 'Pro adds dynamic multi-variable slicers and real-time reactive parameter recalculation.'
  },
  {
    id: '3',
    category: 'Visualization',
    feature: 'Plot Interactivity & Customization',
    originalStatus: 'Included',
    proStatus: 'Enhanced',
    notes: 'Pro supports custom color palettes, zoom ranges, and high-resolution chart export.'
  },
  {
    id: '4',
    category: 'Export & Report',
    feature: 'Data Download & Snapshot Export',
    originalStatus: 'Basic',
    proStatus: 'Supported',
    notes: 'Pro includes direct CSV/PNG data snapshot export buttons.'
  },
  {
    id: '5',
    category: 'Performance',
    feature: 'App Boot & Reactive Latency',
    originalStatus: 'Included',
    proStatus: 'Real-Time',
    notes: 'Pro Alpha includes optimized server caching for instant reactive inputs.'
  }
];
