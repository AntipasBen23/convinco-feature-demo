'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, Video as VideoIcon, Play, Sparkles } from 'lucide-react';
import { DEMO_PITCHES } from '@/lib/demo-data';
import { PitchAnalysis } from '@/lib/types';
import { mockAnalyzePitch } from '@/lib/demo-data';
import AnalysisDashboard from '@/components/AnalysisDashboard';

export default function AnalyzePage() {
  const [selectedPitch, setSelectedPitch] = useState<PitchAnalysis | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDemoSelect = (pitch: PitchAnalysis) => {
    setSelectedPitch(pitch);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);

    try {
      const analysis = await mockAnalyzePitch(file);
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setTimeout(() => {
        setSelectedPitch(analysis);
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
    } catch (error) {
      console.error('Upload failed:', error);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  if (selectedPitch) {
    return <AnalysisDashboard pitch={selectedPitch} onBack={() => setSelectedPitch(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-black transition">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to home</span>
            </Link>
            <span className="text-2xl font-bold text-black">convinco</span>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Pitch Pulse Analysis
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
            Analyze your pitch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your own video or try one of our demo pitches to see live sentiment analysis in action.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-300 p-12 text-center hover:border-blue-500 transition">
            <input
              type="file"
              id="video-upload"
              accept="video/*"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploading}
            />
            <label htmlFor="video-upload" className="cursor-pointer">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                {isUploading ? (
                  <div className="animate-spin text-white text-3xl">⏳</div>
                ) : (
                  <Upload className="w-10 h-10 text-white" />
                )}
              </div>
              {isUploading ? (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-black">Analyzing your pitch...</h3>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-blue-500 h-full transition-all duration-300 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-gray-600">Processing sentiment data • {uploadProgress}%</p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-black mb-3">Upload your pitch video</h3>
                  <p className="text-gray-600 mb-6">
                    Drag and drop or click to select a video file (MP4, MOV, AVI)
                  </p>
                  <div className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition">
                    <Upload className="w-5 h-5" />
                    Choose file
                  </div>
                </>
              )}
            </label>
          </div>
        </div>

        <div className="flex items-center justify-center mb-16">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-6 text-gray-500 font-medium">OR TRY A DEMO</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-black text-center mb-8">
            Try with demo pitches
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {DEMO_PITCHES.map((pitch) => (
              <button
                key={pitch.id}
                onClick={() => handleDemoSelect(pitch)}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden text-left border-2 border-transparent hover:border-blue-500"
              >
                <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition"></div>
                  <VideoIcon className="w-16 h-16 text-white/80 relative z-10" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <div className="bg-blue-500 text-white rounded-full p-4">
                      <Play className="w-8 h-8" />
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4 z-20">
                    <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                      pitch.metrics.averageEngagement > 80 
                        ? 'bg-green-500 text-white' 
                        : pitch.metrics.averageEngagement > 60 
                        ? 'bg-yellow-500 text-black' 
                        : 'bg-red-500 text-white'
                    }`}>
                      {pitch.metrics.averageEngagement}% Engagement
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-2 group-hover:text-blue-500 transition">
                    {pitch.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {Math.floor(pitch.duration / 60)}:{(pitch.duration % 60).toString().padStart(2, '0')} minutes
                  </p>
                  
                  <div className="flex gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Peak Moments:</span>
                      <span className="ml-1 font-semibold text-black">{pitch.metrics.peakMoments}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Critical:</span>
                      <span className="ml-1 font-semibold text-black">{pitch.metrics.criticalMoments}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500">Speaking Pace: </span>
                    <span className={`text-xs font-semibold ${
                      pitch.metrics.speakingPace === 'optimal' 
                        ? 'text-green-600' 
                        : 'text-yellow-600'
                    }`}>
                      {pitch.metrics.speakingPace.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-24 bg-blue-50 rounded-2xl p-12 text-center">
          <h3 className="text-2xl font-bold text-black mb-4">
            How does Pitch Pulse work?
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Our AI analyzes your video in real-time, tracking engagement through tone, pace, body language, 
            and content structure. You'll get second-by-second feedback with actionable suggestions to improve 
            your pitch performance.
          </p>
        </div>
      </main>
    </div>
  );
}