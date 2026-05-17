import React, { useState } from 'react';
import { sendToGemini, isFitnessQuery, sanitizePrompt, getRestrictedResponse } from '../services/geminiService';

const GeminiSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setResponse(null);
    setError(null);
    if (!query.trim()) return setError('Please enter a question or prompt.');

    // Frontend validation: quick check to block unrelated topics before network call
    const sanitized = sanitizePrompt(query.trim());
    if (!isFitnessQuery(sanitized)) {
      // Must return the exact refusal string when outside allowed topics.
      setResponse(getRestrictedResponse());
      return;
    }

    try {
      setLoading(true);
      const res = await sendToGemini(query.trim());
      // res.reply is returned by the proxy; fall back to raw if missing
      const text = res?.reply || JSON.stringify(res?.raw || res);
      setResponse(text);
    } catch (err: any) {
      setError(err?.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={submit} className="mb-4">
        <div className="flex items-center gap-2">
          <input
            aria-label="Ask Gemini"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about food, calories, recipes, workouts, or health tips..."
            className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:opacity-60"
          >
            {loading ? 'Thinking...' : 'Ask'}
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {loading && (
          <div className="text-sm text-gray-500">Loading response...</div>
        )}

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 rounded-md">{error}</div>
        )}

        {response && (
          <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm">
            <h3 className="font-semibold mb-2">AI Response</h3>
            <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">{response}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeminiSearch;
