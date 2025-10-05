import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { WalletConnect } from '@components/wallet/WalletConnect';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold">🎴</span>
            </div>
            <span className="text-xl font-bold text-gradient">CardanoVerse</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/marketplace" className="hover:text-blue-400 transition-colors">
              Marketplace
            </Link>
            <Link to="/collection" className="hover:text-blue-400 transition-colors">
              My Collection
            </Link>
            <Link to="/create" className="hover:text-blue-400 transition-colors">
              Create
            </Link>
            <Link to="/ai-insights" className="hover:text-blue-400 transition-colors">
              AI Insights
            </Link>
            <Link to="/p2p-trading" className="hover:text-blue-400 transition-colors">
              P2P Trading
            </Link>
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            <WalletConnect />
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-4">
            <Link
              to="/marketplace"
              className="block hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Marketplace
            </Link>
            <Link
              to="/collection"
              className="block hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              My Collection
            </Link>
            <Link
              to="/create"
              className="block hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Create
            </Link>
            <Link
              to="/ai-insights"
              className="block hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              AI Insights
            </Link>
            <Link
              to="/p2p-trading"
              className="block hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              P2P Trading
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};
