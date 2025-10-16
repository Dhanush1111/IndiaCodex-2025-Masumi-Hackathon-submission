import { Brain, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const HomePage = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center py-24 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-7xl md:text-8xl font-black mb-6 relative">
              <span className="text-gradient text-glow animate-float">CardanoVerse</span>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-6xl">✨</div>
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold text-white mb-4"
          >
            AI-Powered Trading Cards on Cardano
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Experience the future of trading cards with <span className="text-blue-400 font-semibold">Masumi Network's</span> P2P infrastructure
            and <span className="text-purple-400 font-semibold">CrewAI agents</span> providing intelligent insights powered by Google Gemini.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              to="/marketplace"
              className="group px-10 py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all pulse-glow relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
                Explore Marketplace
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>
            <Link
              to="/create"
              className="px-10 py-5 glass-effect rounded-2xl font-bold text-lg hover-lift hover:bg-white/10 transition-all border-2 border-white/20"
            >
              Create Cards
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0 }}
          className="glass-effect gradient-border p-8 rounded-3xl hover-lift group"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform shadow-2xl">
            <Brain size={40} className="text-white" />
          </div>
          <h3 className="text-3xl font-bold mb-4 text-gradient">4 AI Agents</h3>
          <p className="text-gray-300 leading-relaxed">
            <span className="font-semibold text-blue-400">CrewAI</span> agents powered by <span className="font-semibold text-purple-400">Google Gemini</span> provide real-time valuation, risk analysis, market intelligence, and payment decisions for every purchase.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="glass-effect gradient-border p-8 rounded-3xl hover-lift group"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 via-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform shadow-2xl">
            <TrendingUp size={40} className="text-white" />
          </div>
          <h3 className="text-3xl font-bold mb-4 text-gradient">P2P Trading</h3>
          <p className="text-gray-300 leading-relaxed">
            Trade directly with collectors via <span className="font-semibold text-green-400">Masumi Network's</span> decentralized infrastructure. MIP-003 compliant with automated AI payment verification.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
          className="glass-effect gradient-border p-8 rounded-3xl hover-lift group"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform shadow-2xl">
            <Sparkles size={40} className="text-white" />
          </div>
          <h3 className="text-3xl font-bold mb-4 text-gradient">Cardano NFTs</h3>
          <p className="text-gray-300 leading-relaxed">
            Every card is a <span className="font-semibold text-pink-400">Cardano Native Token</span> with CIP-25/68 compliant metadata, ensuring true ownership and seamless RainbowKit wallet integration.
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
