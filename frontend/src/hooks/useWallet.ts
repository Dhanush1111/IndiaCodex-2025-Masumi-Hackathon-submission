import { useEffect, useState } from 'react';

interface WalletState {
  connected: boolean;
  address: string | null;
  balance: string | null;
  connecting: boolean;
}

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    connected: false,
    address: null,
    balance: null,
    connecting: false,
  });

  useEffect(() => {
    // Check if wallet is already connected (from localStorage)
    const storedAddress = localStorage.getItem('walletAddress');
    const storedWalletName = localStorage.getItem('walletName');
    
    if (storedAddress && storedWalletName) {
      setWalletState({
        connected: true,
        address: storedAddress,
        balance: null,
        connecting: false,
      });
    }
  }, []);

  const connect = async (walletName: string) => {
    try {
      setWalletState(prev => ({ ...prev, connecting: true }));
      
      // Mock wallet connection for development
      console.log('Connecting to wallet:', walletName);
      const mockAddress = 'addr_test1qz...' + Math.random().toString(36).substring(7);
      localStorage.setItem('walletAddress', mockAddress);
      localStorage.setItem('walletName', walletName);
      
      setWalletState({
        connected: true,
        address: mockAddress,
        balance: '1000.00 ADA',
        connecting: false,
      });
      
      return true;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      setWalletState(prev => ({ ...prev, connecting: false }));
      return false;
    }
  };

  const disconnect = () => {
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('walletName');
    setWalletState({
      connected: false,
      address: null,
      balance: null,
      connecting: false,
    });
  };

  return {
    ...walletState,
    connect,
    disconnect,
    lovelaceBalance: walletState.balance,
    adaBalance: walletState.balance || '0',
  };
};

