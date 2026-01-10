'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, Maximize2, Volume2, Download } from 'lucide-react';
import { PitchAnalysis } from '@/lib/types';
import SentimentGraph from './SentimentGraph';
import TimelineMarkers from './TimelineMarkers';
import SmartSuggestions from './SmartSuggestions';
import MetricsPanel from './MetricsPanel';

interface AnalysisDashboardProps {
  pitch: PitchAnalysis;
  onBack: () => void;
}

export default function AnalysisDashboard({ pitch, onBack }: AnalysisDashboardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(pitch.duration);
  const [volume, setVolume] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  const getCurrentSentiment = () => {
    const currentPoint = pitch.sentimentData.find(
      point => Math.abs(point.timestamp - currentTime) < 2
    );
    return currentPoint?.score || 50;
  };

  const getSentimentColor = (score: number) => {
    if (score > 70) return 'rgb(34, 197, 94)';
    if (score > 40) return 'rgb(234, 179, 8)';
    return 'rgb(239, 68, 68)';
  };

  const getCurrentSuggestions = () => {
    return pitch.suggestions.filter(
      sug => Math.abs(sug.timestamp - currentTime) < 5 && !sug.dismissed
    );
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleRestart = () => {
    handleSeek(0);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentSentiment = getCurrentSentiment();
  const sentimentColor = getSentimentColor(currentSentiment);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-black transition font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            
            <div className="text-center">
              <h1 className="text-xl font-bold text-black">{pitch.title}</h1>
              <p className="text-sm text-gray-500">
                Live Analysis • {formatTime(duration)}
              </p>
            </div>

            <button className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition flex items-center gap-2 text-sm">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1800px] mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div 
                className="relative aspect-video bg-black transition-all duration-500"
                style={{ 
                  boxShadow: `inset 0 0 0 8px ${sentimentColor}`,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                  <div className="text-white text-center p-8">
                    <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="w-12 h-12" />
                    </div>
                    <p className="text-lg font-medium mb-2">Demo Video Player</p>
                    <p className="text-sm text-gray-400">
                      In production, actual video would play here
                    </p>
                  </div>
                </div>

                <video
                  ref={videoRef}
                  className="hidden"
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
                />

                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-xl px-4 py-2 text-white">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full animate-pulse"
                      style={{ backgroundColor: sentimentColor }}
                    />
                    <span className="text-sm font-medium">
                      Live: {currentSentiment}% Engagement
                    </span>
                  </div>
                </div>

                <div className="absolute top-4 right-4">
                  <div 
                    className="px-4 py-2 rounded-xl font-bold text-sm backdrop-blur-sm"
                    style={{ 
                      backgroundColor: `${sentimentColor}33`,
                      color: sentimentColor,
                      border: `2px solid ${sentimentColor}`
                    }}
                  >
                    {currentSentiment > 70 ? '🟢 ENGAGING' : currentSentiment > 40 ? '🟡 LOSING THEM' : '🔴 CRITICAL'}
                  </div>
                </div>

                {!isPlaying && (
                  <button
                    onClick={togglePlayPause}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition group"
                  >
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition shadow-2xl">
                      <Play className="w-10 h-10 text-black ml-1" />
                    </div>
                  </button>
                )}
              </div>

              <div className="p-6 border-t border-gray-100">
                <TimelineMarkers
                  duration={duration}
                  currentTime={currentTime}
                  moments={pitch.microMoments}
                  sentimentData={pitch.sentimentData}
                  onSeek={handleSeek}
                />

                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlayPause}
                      className="w-12 h-12 bg-black hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition shadow-lg"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                    </button>
                    <button
                      onClick={handleRestart}
                      className="w-12 h-12 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full flex items-center justify-center transition"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-2 ml-4">
                      <Volume2 className="w-5 h-5 text-gray-600" />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-24"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-600">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                    <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center transition">
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-black">Live Sentiment Waves</h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span>Engaging</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span>Losing</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span>Critical</span>
                  </div>
                </div>
              </div>
              <SentimentGraph
                data={pitch.sentimentData}
                currentTime={currentTime}
                duration={duration}
              />
            </div>
          </div>

          <div className="space-y-6">
            <SmartSuggestions
              suggestions={getCurrentSuggestions()}
              currentTime={currentTime}
            />

            <MetricsPanel metrics={pitch.metrics} />

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-black mb-4">Key Moments</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {pitch.microMoments.map((moment) => (
                  <button
                    key={moment.id}
                    onClick={() => handleSeek(moment.timestamp)}
                    className="w-full text-left p-4 rounded-xl hover:bg-gray-50 transition border border-gray-100"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        moment.type === 'peak' ? 'bg-green-100' : 
                        moment.type === 'drop' ? 'bg-red-100' : 'bg-yellow-100'
                      }`}>
                        {moment.type === 'peak' ? '📈' : moment.type === 'drop' ? '📉' : '➖'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-gray-900">
                            {formatTime(moment.timestamp)}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            moment.type === 'peak' ? 'bg-green-100 text-green-700' : 
                            moment.type === 'drop' ? 'bg-red-100 text-red-700' : 
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {moment.score}%
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {moment.reason}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}