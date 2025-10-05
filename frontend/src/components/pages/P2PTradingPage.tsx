import { Network, Shield, Zap } from 'lucide-react';

export const P2PTradingPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">P2P Trading</h1>
        <p className="text-gray-400">Powered by Masumi Network</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass-effect p-6 rounded-xl">
          <Network className="w-12 h-12 text-blue-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Decentralized</h3>
          <p className="text-sm text-gray-400">
            Trade directly with other users via Masumi's P2P network infrastructure.
          </p>
        </div>

        <div className="glass-effect p-6 rounded-xl">
          <Shield className="w-12 h-12 text-green-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Secure</h3>
          <p className="text-sm text-gray-400">
            Smart contract escrow ensures safe and trustless peer-to-peer trades.
          </p>
        </div>

        <div className="glass-effect p-6 rounded-xl">
          <Zap className="w-12 h-12 text-yellow-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Fast</h3>
          <p className="text-sm text-gray-400">
            Instant matching and settlement with Cardano's efficient blockchain.
          </p>
        </div>
      </div>
    </div>
  );
};
