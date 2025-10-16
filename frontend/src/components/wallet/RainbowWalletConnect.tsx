import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance } from 'wagmi';

export const RainbowWalletConnect = () => {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

  return (
    <div className="flex items-center space-x-4">
      {isConnected && balance && (
        <div className="text-sm glass-effect px-4 py-2 rounded-lg">
          <span className="text-gray-400">Balance:</span>{' '}
          <span className="font-bold text-gradient">
            {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
          </span>
        </div>
      )}
      <ConnectButton />
    </div>
  );
};
