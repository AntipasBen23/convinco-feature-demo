'use client';

import { SentimentDataPoint } from '@/lib/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface SentimentGraphProps {
  data: SentimentDataPoint[];
  currentTime: number;
  duration: number;
}

export default function SentimentGraph({ data, currentTime, duration }: SentimentGraphProps) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="timestamp" 
            label={{ value: 'Time (seconds)', position: 'insideBottom', offset: -5 }}
            stroke="#6b7280"
          />
          <YAxis 
            label={{ value: 'Engagement %', angle: -90, position: 'insideLeft' }}
            domain={[0, 100]}
            stroke="#6b7280"
          />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">
                      {Math.floor(data.timestamp / 60)}:{(data.timestamp % 60).toString().padStart(2, '0')}
                    </p>
                    <p className="text-sm text-gray-600">
                      Engagement: <span className="font-bold">{data.score}%</span>
                    </p>
                    <p className="text-xs text-gray-500 capitalize mt-1">
                      {data.label}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <ReferenceLine 
            x={currentTime} 
            stroke="#3b82f6" 
            strokeWidth={2}
            label={{ value: 'Now', position: 'top', fill: '#3b82f6', fontWeight: 'bold' }}
          />
          <Line 
            type="monotone" 
            dataKey="score" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}