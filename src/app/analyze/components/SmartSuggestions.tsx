'use client';

import { SmartSuggestion } from '@/lib/types';
import { X, AlertCircle, Lightbulb, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface SmartSuggestionsProps {
  suggestions: SmartSuggestion[];
  currentTime: number;
}

export default function SmartSuggestions({ suggestions, currentTime }: SmartSuggestionsProps) {
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  const activeSuggestions = suggestions.filter(s => !dismissedIds.includes(s.id));

  const handleDismiss = (id: string) => {
    setDismissedIds([...dismissedIds, id]);
  };

  const getIcon = (type: string) => {
    if (type === 'warning') return <AlertCircle className="w-5 h-5" />;
    if (type === 'success') return <CheckCircle className="w-5 h-5" />;
    return <Lightbulb className="w-5 h-5" />;
  };

  const getStyles = (type: string) => {
    if (type === 'warning') return 'bg-red-50 border-red-200 text-red-900';
    if (type === 'success') return 'bg-green-50 border-green-200 text-green-900';
    return 'bg-blue-50 border-blue-200 text-blue-900';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-black">AI Coach</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-gray-600">Live</span>
        </div>
      </div>

      <div className="space-y-3">
        {activeSuggestions.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">
              No suggestions right now.<br />Keep going!
            </p>
          </div>
        ) : (
          activeSuggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className={`p-4 rounded-xl border-2 ${getStyles(suggestion.type)} animate-in slide-in-from-right duration-300`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getIcon(suggestion.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-relaxed">
                    {suggestion.message}
                  </p>
                </div>
                <button
                  onClick={() => handleDismiss(suggestion.id)}
                  className="flex-shrink-0 opacity-50 hover:opacity-100 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {dismissedIds.length > 0 && (
        <button
          onClick={() => setDismissedIds([])}
          className="w-full mt-4 text-sm text-gray-500 hover:text-gray-700 transition"
        >
          Show dismissed ({dismissedIds.length})
        </button>
      )}
    </div>
  );
}