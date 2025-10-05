import { Wallet } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useWallet } from '../../hooks/useWallet';

export const WalletConnect = () => {
  const { connect, connected, disconnect, address, connecting } = useWallet();
  const [showWalletModal, setShowWalletModal] = useState(false);

  const supportedWallets = [
    { name: 'Nami', id: 'nami' },
    { name: 'Eternl', id: 'eternl' },
    { name: 'Flint', id: 'flint' },
    { name: 'Lace', id: 'lace' },
    { name: 'Typhon', id: 'typhoncip30' },
  ];

  const handleConnect = async (_walletId: string, walletName: string) => {
    try {
      const success = await connect(walletName);
      if (success) {
        toast.success(`Connected to ${walletName}`);
        setShowWalletModal(false);
      } else {
        toast.error('Failed to connect wallet');
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      toast.error('Failed to connect wallet');
    }
  };

  const handleDisconnect = () => {
    try {
      disconnect();
      toast.success('Wallet disconnected');
    } catch (error) {
      console.error('Disconnect error:', error);
      toast.error('Failed to disconnect wallet');
    }
  };

  const getShortAddress = (addr: string | null) => {
    if (!addr) return '';
    return `${addr.slice(0, 8)}...${addr.slice(-6)}`;
  };

  if (connected) {
    return (
      <div className="relative">
        <button
          onClick={handleDisconnect}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg glass-effect hover:bg-white/10 transition-all"
        >
          <Wallet size={20} className="text-green-400" />
          <span className="text-sm">{getShortAddress(address)}</span>
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowWalletModal(true)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all"
      >
        <Wallet size={20} />
        <span className="text-sm font-medium">Connect Wallet</span>
      </button>

      {/* Wallet Selection Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="glass-effect rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Connect Wallet</h2>
              <button
                onClick={() => setShowWalletModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {supportedWallets.map((wallet) => (
                <button
                  key={wallet.id}
                  onClick={() => handleConnect(wallet.id, wallet.name)}
                  disabled={connecting}
                  className="w-full flex items-center space-x-4 p-4 rounded-lg glass-effect hover:bg-white/10 transition-all disabled:opacity-50"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Wallet size={20} />
                  </div>
                  <span className="font-medium">{wallet.name}</span>
                </button>
              ))}
            </div>

            <p className="text-xs text-gray-400 mt-6 text-center">
              By connecting your wallet, you agree to our Terms of Service
            </p>
          </div>
        </div>
      )}
    </>
  );
};
