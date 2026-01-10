// Core types for Pitch Pulse Demo

export interface SentimentDataPoint {
  timestamp: number; // seconds
  score: number; // 0-100
  label: 'critical' | 'losing' | 'engaging';
}

export interface MicroMoment {
  id: string;
  timestamp: number; // seconds
  type: 'peak' | 'drop' | 'neutral';
  score: number;
  reason: string;
  severity: 'high' | 'medium' | 'low';
}

export interface SmartSuggestion {
  id: string;
  timestamp: number; // seconds
  message: string;
  type: 'warning' | 'tip' | 'success';
  icon: string;
  dismissed: boolean;
}

export interface PitchMetrics {
  averageEngagement: number;
  peakMoments: number;
  criticalMoments: number;
  speakingPace: 'too-fast' | 'optimal' | 'too-slow';
  totalDuration: number;
  clarity: number;
}

export interface PitchAnalysis {
  id: string;
  title: string;
  duration: number; // seconds
  videoUrl: string;
  thumbnailUrl: string;
  sentimentData: SentimentDataPoint[];
  microMoments: MicroMoment[];
  suggestions: SmartSuggestion[];
  metrics: PitchMetrics;
  analyzedAt: string;
  isDemo: boolean;
}

export interface ComparisonData {
  userPitch: PitchAnalysis;
  benchmarkPitch: PitchAnalysis;
}