'use client';

import { useState } from 'react';
import { Upload, Sparkles } from 'lucide-react';
import { DEMO_PITCHES } from '@/lib/demo-data';
import { PitchAnalysis } from '@/lib/types';
import { mockAnalyzePitch } from '@/lib/demo-data';
import AnalysisDashboard from '@/app/analyze/components/AnalysisDashboard';

export default function HomePage() {
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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Simple Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Pitch Pulse • Live Sentiment Analysis
          </div>
          <h1 className="text-4xl font-bold text-black mb-3">
            Practice your pitch. Get real-time feedback.
          </h1>
          <p className="text-gray-600">
            Upload a video or try a demo to see live AI coaching in action
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-300 p-8 mb-8 hover:border-blue-500 transition">
          <input
            type="file"
            id="video-upload"
            accept="video/*"
            onChange={handleFileUpload}
            className="hidden"
            disabled={isUploading}
          />
          <label htmlFor="video-upload" className="cursor-pointer block text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              {isUploading ? (
                <div className="animate-spin text-white text-2xl">⏳</div>
              ) : (
                <Upload className="w-8 h-8 text-white" />
              )}
            </div>
            {isUploading ? (
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-black">Analyzing...</h3>
                <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-blue-500 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600">{uploadProgress}%</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-black mb-2">Upload your pitch</h3>
                <p className="text-sm text-gray-600 mb-4">
                  MP4, MOV, AVI supported
                </p>
                <div className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full font-medium hover:bg-gray-800 transition text-sm">
                  <Upload className="w-4 h-4" />
                  Choose file
                </div>
              </>
            )}
          </label>
        </div>

        {/* Demo Pitches */}
        <div>
          <h2 className="text-xl font-bold text-black mb-4 text-center">
            Or try a demo pitch
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {DEMO_PITCHES.map((pitch) => (
              <button
                key={pitch.id}
                onClick={() => handleDemoSelect(pitch)}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-5 text-left border-2 border-transparent hover:border-blue-500"
              >
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${
                  pitch.metrics.averageEngagement > 80 
                    ? 'bg-green-100 text-green-700' 
                    : pitch.metrics.averageEngagement > 60 
                    ? 'bg-yellow-100 text-yellow-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {pitch.metrics.averageEngagement}% Engagement
                </div>
                <h3 className="font-bold text-black mb-2 group-hover:text-blue-500">
                  {pitch.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {Math.floor(pitch.duration / 60)}:{(pitch.duration % 60).toString().padStart(2, '0')} min
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}