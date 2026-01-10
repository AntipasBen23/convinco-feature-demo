'use client';

import { MicroMoment, SentimentDataPoint } from '@/lib/types';

interface TimelineMarkersProps {
  duration: number;
  currentTime: number;
  moments: MicroMoment[];
  sentimentData: SentimentDataPoint[];
  onSeek: (time: number) => void;
}

export default function TimelineMarkers({ 
  duration, 
  currentTime, 
  moments, 
  sentimentData,
  onSeek 
}: TimelineMarkersProps) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    onSeek(newTime);
  };

  const getColorForTime = (time: number) => {
    const point = sentimentData.find(p => Math.abs(p.timestamp - time) < 2);
    if (!point) return '#94a3b8';
    if (point.score > 70) return '#22c55e';
    if (point.score > 40) return '#eab308';
    return '#ef4444';
  };

  return (
    <div className="space-y-3">
      <div 
        className="relative h-2 bg-gray-200 rounded-full cursor-pointer group"
        onClick={handleClick}
      >
        <div className="absolute inset-0 flex rounded-full overflow-hidden">
          {sentimentData.map((point, i) => {
            const width = i < sentimentData.length - 1 
              ? ((sentimentData[i + 1].timestamp - point.timestamp) / duration) * 100
              : ((duration - point.timestamp) / duration) * 100;
            
            return (
              <div 
                key={i}
                style={{ 
                  width: `${width}%`,
                  backgroundColor: getColorForTime(point.timestamp)
                }}
              />
            );
          })}
        </div>

        <div 
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg z-10 transition-all"
          style={{ left: `${(currentTime / duration) * 100}%`, marginLeft: '-8px' }}
        />

        {moments.map((moment) => (
          <div
            key={moment.id}
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full cursor-pointer hover:scale-150 transition z-20"
            style={{ 
              left: `${(moment.timestamp / duration) * 100}%`,
              backgroundColor: moment.type === 'peak' ? '#22c55e' : moment.type === 'drop' ? '#ef4444' : '#eab308',
              marginLeft: '-6px'
            }}
            title={moment.reason}
          />
        ))}
      </div>

      <div className="relative h-8">
        {moments.map((moment) => (
          <button
            key={moment.id}
            onClick={() => onSeek(moment.timestamp)}
            className="absolute -translate-x-1/2 text-xs opacity-0 hover:opacity-100 transition"
            style={{ left: `${(moment.timestamp / duration) * 100}%` }}
          >
            <div className={`px-2 py-1 rounded-md font-medium whitespace-nowrap ${
              moment.type === 'peak' ? 'bg-green-100 text-green-700' :
              moment.type === 'drop' ? 'bg-red-100 text-red-700' :
              'bg-yellow-100 text-yellow-700'
            }`}>
              {Math.floor(moment.timestamp / 60)}:{(moment.timestamp % 60).toString().padStart(2, '0')}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}