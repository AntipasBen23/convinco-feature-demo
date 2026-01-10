import { PitchAnalysis, SentimentDataPoint, MicroMoment, SmartSuggestion, PitchMetrics } from './types';

// Generate realistic sentiment curve
const generateSentimentData = (pattern: 'bad' | 'good' | 'expert', duration: number): SentimentDataPoint[] => {
  const data: SentimentDataPoint[] = [];
  const intervals = Math.floor(duration / 2); // Data point every 2 seconds

  for (let i = 0; i <= intervals; i++) {
    const timestamp = i * 2;
    let score: number;

    if (pattern === 'bad') {
      // Starts ok, drops significantly, slight recovery
      if (timestamp < 20) score = 65 + Math.random() * 10;
      else if (timestamp < 60) score = 35 + Math.random() * 15;
      else if (timestamp < 100) score = 25 + Math.random() * 10;
      else score = 40 + Math.random() * 10;
    } else if (pattern === 'good') {
      // Consistent with some peaks and minor dips
      if (timestamp < 30) score = 70 + Math.random() * 10;
      else if (timestamp < 60) score = 60 + Math.random() * 15;
      else if (timestamp < 120) score = 75 + Math.random() * 10;
      else score = 80 + Math.random() * 8;
    } else {
      // Expert: High engagement throughout with strategic peaks
      if (timestamp < 20) score = 85 + Math.random() * 10;
      else if (timestamp < 60) score = 88 + Math.random() * 8;
      else if (timestamp < 120) score = 90 + Math.random() * 8;
      else score = 92 + Math.random() * 6;
    }

    const label = score > 70 ? 'engaging' : score > 40 ? 'losing' : 'critical';
    data.push({ timestamp, score: Math.round(score), label });
  }

  return data;
};

// Bad Pitch Demo
const badPitchMicroMoments: MicroMoment[] = [
  {
    id: 'bad-1',
    timestamp: 15,
    type: 'drop',
    score: 55,
    reason: 'Speaking too fast - losing clarity',
    severity: 'high'
  },
  {
    id: 'bad-2',
    timestamp: 45,
    type: 'drop',
    score: 38,
    reason: 'Lost eye contact for extended period',
    severity: 'high'
  },
  {
    id: 'bad-3',
    timestamp: 78,
    type: 'drop',
    score: 28,
    reason: 'Monotone delivery - energy dropping',
    severity: 'high'
  },
  {
    id: 'bad-4',
    timestamp: 95,
    type: 'neutral',
    score: 42,
    reason: 'Attempted recovery with pricing discussion',
    severity: 'medium'
  },
  {
    id: 'bad-5',
    timestamp: 130,
    type: 'drop',
    score: 35,
    reason: 'Weak closing - no clear call-to-action',
    severity: 'high'
  }
];

const badPitchSuggestions: SmartSuggestion[] = [
  {
    id: 'sug-bad-1',
    timestamp: 15,
    message: '🎯 You\'re speaking too fast - slow down and breathe',
    type: 'warning',
    icon: '⚠️',
    dismissed: false
  },
  {
    id: 'sug-bad-2',
    timestamp: 45,
    message: '👁️ Maintain eye contact - you\'re losing your audience',
    type: 'warning',
    icon: '👁️',
    dismissed: false
  },
  {
    id: 'sug-bad-3',
    timestamp: 60,
    message: '📖 Add a customer success story here to re-engage',
    type: 'tip',
    icon: '💡',
    dismissed: false
  },
  {
    id: 'sug-bad-4',
    timestamp: 78,
    message: '⚠️ Energy dropping critically - re-engage with enthusiasm!',
    type: 'warning',
    icon: '🔴',
    dismissed: false
  },
  {
    id: 'sug-bad-5',
    timestamp: 110,
    message: '🎬 Prepare for strong closing - this is crucial',
    type: 'tip',
    icon: '💪',
    dismissed: false
  }
];

// Good Pitch Demo
const goodPitchMicroMoments: MicroMoment[] = [
  {
    id: 'good-1',
    timestamp: 8,
    type: 'peak',
    score: 78,
    reason: 'Strong opening hook with compelling question',
    severity: 'low'
  },
  {
    id: 'good-2',
    timestamp: 42,
    type: 'neutral',
    score: 62,
    reason: 'Slight pace issue during technical explanation',
    severity: 'medium'
  },
  {
    id: 'good-3',
    timestamp: 85,
    type: 'peak',
    score: 82,
    reason: 'Powerful customer testimonial delivered well',
    severity: 'low'
  },
  {
    id: 'good-4',
    timestamp: 120,
    type: 'peak',
    score: 84,
    reason: 'Clear value proposition with specific ROI',
    severity: 'low'
  },
  {
    id: 'good-5',
    timestamp: 155,
    type: 'peak',
    score: 86,
    reason: 'Strong call-to-action with urgency',
    severity: 'low'
  }
];

const goodPitchSuggestions: SmartSuggestion[] = [
  {
    id: 'sug-good-1',
    timestamp: 8,
    message: '✅ Excellent opening! Your hook is engaging',
    type: 'success',
    icon: '🎯',
    dismissed: false
  },
  {
    id: 'sug-good-2',
    timestamp: 42,
    message: '💡 Simplify this technical section slightly',
    type: 'tip',
    icon: '📊',
    dismissed: false
  },
  {
    id: 'sug-good-3',
    timestamp: 85,
    message: '🔥 Perfect storytelling moment - great delivery!',
    type: 'success',
    icon: '⭐',
    dismissed: false
  },
  {
    id: 'sug-good-4',
    timestamp: 120,
    message: '💰 Strong value prop - numbers are convincing',
    type: 'success',
    icon: '📈',
    dismissed: false
  }
];

// Expert Pitch Demo
const expertPitchMicroMoments: MicroMoment[] = [
  {
    id: 'expert-1',
    timestamp: 5,
    type: 'peak',
    score: 88,
    reason: 'Captivating opening - immediate value stated',
    severity: 'low'
  },
  {
    id: 'expert-2',
    timestamp: 35,
    type: 'peak',
    score: 91,
    reason: 'Perfect pacing with strategic pause',
    severity: 'low'
  },
  {
    id: 'expert-3',
    timestamp: 72,
    type: 'peak',
    score: 93,
    reason: 'Emotional connection through relatable story',
    severity: 'low'
  },
  {
    id: 'expert-4',
    timestamp: 108,
    type: 'peak',
    score: 94,
    reason: 'Data-driven claims with visual reinforcement',
    severity: 'low'
  },
  {
    id: 'expert-5',
    timestamp: 145,
    type: 'peak',
    score: 96,
    reason: 'Powerful closing with clear next steps',
    severity: 'low'
  },
  {
    id: 'expert-6',
    timestamp: 165,
    type: 'peak',
    score: 95,
    reason: 'Handled objections proactively',
    severity: 'low'
  }
];

const expertPitchSuggestions: SmartSuggestion[] = [
  {
    id: 'sug-expert-1',
    timestamp: 5,
    message: '🌟 Perfect opening - you have their attention!',
    type: 'success',
    icon: '🎯',
    dismissed: false
  },
  {
    id: 'sug-expert-2',
    timestamp: 35,
    message: '⭐ Excellent use of pause for emphasis',
    type: 'success',
    icon: '👏',
    dismissed: false
  },
  {
    id: 'sug-expert-3',
    timestamp: 72,
    message: '❤️ Strong emotional connection established',
    type: 'success',
    icon: '🔥',
    dismissed: false
  },
  {
    id: 'sug-expert-4',
    timestamp: 108,
    message: '📊 Data presentation is crystal clear',
    type: 'success',
    icon: '💎',
    dismissed: false
  },
  {
    id: 'sug-expert-5',
    timestamp: 145,
    message: '🎬 Masterclass closing - this is how it\'s done!',
    type: 'success',
    icon: '🏆',
    dismissed: false
  }
];

// Create complete pitch analyses
export const BAD_PITCH: PitchAnalysis = {
  id: 'demo-bad-pitch',
  title: 'Sales Pitch - Needs Improvement',
  duration: 150,
  videoUrl: '/demo-videos/bad-pitch.mp4',
  thumbnailUrl: '/demo-videos/bad-pitch-thumb.jpg',
  sentimentData: generateSentimentData('bad', 150),
  microMoments: badPitchMicroMoments,
  suggestions: badPitchSuggestions,
  metrics: {
    averageEngagement: 42,
    peakMoments: 0,
    criticalMoments: 5,
    speakingPace: 'too-fast',
    totalDuration: 150,
    clarity: 38
  },
  analyzedAt: new Date().toISOString(),
  isDemo: true
};

export const GOOD_PITCH: PitchAnalysis = {
  id: 'demo-good-pitch',
  title: 'Product Demo - Solid Performance',
  duration: 170,
  videoUrl: '/demo-videos/good-pitch.mp4',
  thumbnailUrl: '/demo-videos/good-pitch-thumb.jpg',
  sentimentData: generateSentimentData('good', 170),
  microMoments: goodPitchMicroMoments,
  suggestions: goodPitchSuggestions,
  metrics: {
    averageEngagement: 73,
    peakMoments: 5,
    criticalMoments: 1,
    speakingPace: 'optimal',
    totalDuration: 170,
    clarity: 78
  },
  analyzedAt: new Date().toISOString(),
  isDemo: true
};

export const EXPERT_PITCH: PitchAnalysis = {
  id: 'demo-expert-pitch',
  title: 'Enterprise Sales - Top Performer',
  duration: 180,
  videoUrl: '/demo-videos/expert-pitch.mp4',
  thumbnailUrl: '/demo-videos/expert-pitch-thumb.jpg',
  sentimentData: generateSentimentData('expert', 180),
  microMoments: expertPitchMicroMoments,
  suggestions: expertPitchSuggestions,
  metrics: {
    averageEngagement: 91,
    peakMoments: 6,
    criticalMoments: 0,
    speakingPace: 'optimal',
    totalDuration: 180,
    clarity: 94
  },
  analyzedAt: new Date().toISOString(),
  isDemo: true
};

export const DEMO_PITCHES = [BAD_PITCH, GOOD_PITCH, EXPERT_PITCH];

// Mock API simulation
export const mockAnalyzePitch = async (videoFile: File): Promise<PitchAnalysis> => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Return a randomized "good" pitch analysis for user uploads
  return {
    id: `user-pitch-${Date.now()}`,
    title: videoFile.name.replace(/\.[^/.]+$/, ''),
    duration: 120, // Would be actual video duration
    videoUrl: URL.createObjectURL(videoFile),
    thumbnailUrl: '/demo-videos/user-thumb.jpg',
    sentimentData: generateSentimentData('good', 120),
    microMoments: goodPitchMicroMoments.slice(0, 3),
    suggestions: goodPitchSuggestions.slice(0, 3),
    metrics: {
      averageEngagement: 68 + Math.floor(Math.random() * 15),
      peakMoments: 2 + Math.floor(Math.random() * 3),
      criticalMoments: Math.floor(Math.random() * 2),
      speakingPace: 'optimal',
      totalDuration: 120,
      clarity: 70 + Math.floor(Math.random() * 15)
    },
    analyzedAt: new Date().toISOString(),
    isDemo: false
  };
};