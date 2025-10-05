import { Brain, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const HomePage = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-bold mb-6">
            <span className="text-gradient">CardanoVerse</span>
          </h1>
          <p className="text-2xl text-gray-300 mb-4">
            AI-Powered Trading Cards on Cardano Blockchain
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Experience the future of trading cards with Masumi Network's decentralized infrastructure
            and Sokosumi AI agents providing intelligent insights for every trade.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/marketplace"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all glow-effect"
            >
              Explore Marketplace
            </Link>
            <Link
              to="/create"
              className="px-8 py-4 glass-effect rounded-lg font-semibold hover:bg-white/10 transition-all"
            >
              Create Cards
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <motion.div
          className="glass-effect p-8 rounded-2xl hover:bg-white/10 transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <Brain size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-4">AI-Powered Insights</h3>
          <p className="text-gray-400">
            Sokosumi AI agents provide real-time valuation, market analysis, and personalized
            trading recommendations powered by machine learning.
          </p>
        </motion.div>

        <motion.div
          className="glass-effect p-8 rounded-2xl hover:bg-white/10 transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mb-4">
            <TrendingUp size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-4">P2P Trading</h3>
          <p className="text-gray-400">
            Trade directly with other collectors via Masumi Network's decentralized peer-to-peer
            infrastructure. No middlemen, just pure trading.
          </p>
        </motion.div>

        <motion.div
          className="glass-effect p-8 rounded-2xl hover:bg-white/10 transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mb-4">
            <Sparkles size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-4">Cardano NFTs</h3>
          <p className="text-gray-400">
            Every card is a Cardano Native Token with CIP-25/68 compliant metadata, ensuring true
            ownership and seamless wallet integration.
          </p>
        </motion.div>
      </section>

      {/* Technology Stack */}
      <section className="text-center">
        <h2 className="text-4xl font-bold mb-12">
          <span className="text-gradient">Powered by Cutting-Edge Tech</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-effect p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-2">Cardano Blockchain</h3>
            <p className="text-sm text-gray-400">
              Plutus V3 smart contracts, native tokens, and energy-efficient PoS consensus
            </p>
          </div>
          <div className="glass-effect p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-2">Masumi Network</h3>
            <p className="text-sm text-gray-400">
              Decentralized P2P infrastructure with DHT-based discovery and IPFS storage
            </p>
          </div>
          <div className="glass-effect p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-2">Sokosumi AI</h3>
            <p className="text-sm text-gray-400">
              Multi-agent system with ML-powered valuation, trading, and market analysis
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center glass-effect p-12 rounded-2xl">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Trading?</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Connect your Cardano wallet and join the future of trading cards.
          Experience AI-powered insights and decentralized P2P trading today.
        </p>
        <Link
          to="/marketplace"
          className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all glow-effect"
        >
          <span>Get Started</span>
          <ArrowRight size={20} />
        </Link>
      </section>
    </div>
  );
};
