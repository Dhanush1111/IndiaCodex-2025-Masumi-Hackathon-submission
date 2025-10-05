import { Brain, TrendingUp, BarChart3 } from 'lucide-react';

export const AIInsightsPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">AI Insights</h1>
        <p className="text-gray-400">Powered by Sokosumi AI Agents</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass-effect p-6 rounded-xl">
          <Brain className="w-12 h-12 text-blue-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Valuation Agent</h3>
          <p className="text-sm text-gray-400">
            AI-powered card price predictions based on historical data and market trends.
          </p>
        </div>

        <div className="glass-effect p-6 rounded-xl">
          <TrendingUp className="w-12 h-12 text-green-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Trading Advisor</h3>
          <p className="text-sm text-gray-400">
            Get personalized trading recommendations based on your portfolio and goals.
          </p>
        </div>

        <div className="glass-effect p-6 rounded-xl">
          <BarChart3 className="w-12 h-12 text-purple-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Market Analysis</h3>
          <p className="text-sm text-gray-400">
            Real-time market insights and trend analysis powered by machine learning.
          </p>
        </div>
      </div>
    </div>
  );
};
