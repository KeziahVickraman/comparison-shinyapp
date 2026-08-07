export type ViewMode = 'split' | 'tabbed-original' | 'tabbed-pro' | 'stacked';

export type DeviceMode = 'responsive' | 'desktop' | 'tablet' | 'mobile';

export interface ShinyAppInfo {
  id: 'original' | 'pro';
  name: string;
  badge: string;
  version: string;
  url: string;
  description: string;
  highlights: string[];
  themeColor: string;
  accentBg: string;
  accentText: string;
  accentBorder: string;
}

export interface ComparisonItem {
  id: string;
  category: string;
  feature: string;
  originalStatus: 'Included' | 'Basic' | 'Not Supported' | 'Limited';
  proStatus: 'Enhanced' | 'Advanced' | 'Supported' | 'Real-Time';
  notes: string;
}

export interface ReviewNote {
  id: string;
  appId: 'original' | 'pro' | 'both';
  title: string;
  content: string;
  rating?: number;
  timestamp: string;
  category: 'Bug' | 'UI/UX' | 'Performance' | 'Feature Request' | 'General';
}
