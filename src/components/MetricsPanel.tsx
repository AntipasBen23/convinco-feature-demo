'use client';

import { PitchMetrics } from '@/lib/types';
import { TrendingUp, Clock, Zap } from 'lucide-react';

interface MetricsPanelProps {
  metrics: PitchMetrics;
}

export default function MetricsPanel({ metrics }: MetricsPanelProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-xl font-bold text-black mb-6">Performance Metrics</h3>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Avg Engagement</span>
            <TrendingUp className="w-5 h-5 text-blue-500" />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-black">{metrics.averageEngagement}%</span>
            <span className={`text-sm font-medium mb-1 ${
              metrics.averageEngagement > 70 ? 'text-green-600' :
              metrics.averageEngagement > 50 ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {metrics.averageEngagement > 70 ? 'Excellent' :
               metrics.averageEngagement > 50 ? 'Good' : 'Needs Work'}
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 p-4 bg-green-50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm text-gray-600">Peak Moments</span>
            </div>
            <span className="text-2xl font-bold text-black">{metrics.peakMoments}</span>
          </div>

          <div className="flex-1 p-4 bg-red-50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <span className="text-sm text-gray-600">Critical</span>
            </div>
            <span className="text-2xl font-bold text-black">{metrics.criticalMoments}</span>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Speaking Pace</span>
            <Zap className="w-5 h-5 text-yellow-500" />
          </div>
          <span className={`text-lg font-bold capitalize ${
            metrics.speakingPace === 'optimal' ? 'text-green-600' :
            metrics.speakingPace === 'too-fast' ? 'text-red-600' :
            'text-yellow-600'
          }`}>
            {metrics.speakingPace.replace('-', ' ')}
          </span>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">Clarity</span>
            <span className="text-lg font-bold text-black">{metrics.clarity}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full transition-all rounded-full ${
                metrics.clarity > 80 ? 'bg-green-500' :
                metrics.clarity > 60 ? 'bg-yellow-500' :
                'bg-red-500'
              }`}
              style={{ width: `${metrics.clarity}%` }}
            />
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total Duration</span>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <span className="text-lg font-bold text-black">
            {Math.floor(metrics.totalDuration / 60)}:{(metrics.totalDuration % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Overall Score</p>
          <div className={`text-4xl font-bold ${
            metrics.averageEngagement > 80 ? 'text-green-500' :
            metrics.averageEngagement > 60 ? 'text-yellow-500' :
            'text-red-500'
          }`}>
            {metrics.averageEngagement > 80 ? 'A' :
             metrics.averageEngagement > 70 ? 'B' :
             metrics.averageEngagement > 60 ? 'C' : 'D'}
          </div>
        </div>
      </div>
    </div>
  );
}