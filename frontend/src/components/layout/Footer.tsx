import { Github, Twitter, MessageCircle } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="glass-effect border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gradient">CardanoVerse</h3>
            <p className="text-sm text-gray-400">
              AI-Powered trading cards platform built on Cardano blockchain with
              Masumi Network and Sokosumi AI agents.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/marketplace" className="hover:text-blue-400">Marketplace</a></li>
              <li><a href="/collection" className="hover:text-blue-400">Collections</a></li>
              <li><a href="/create" className="hover:text-blue-400">Create Cards</a></li>
              <li><a href="/ai-insights" className="hover:text-blue-400">AI Insights</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-blue-400">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-400">API Reference</a></li>
              <li><a href="#" className="hover:text-blue-400">Smart Contracts</a></li>
              <li><a href="#" className="hover:text-blue-400">GitHub</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <MessageCircle size={20} />
              </a>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Powered by Cardano, Masumi Network & Sokosumi AI
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 CardanoVerse. Built with ❤️ for the Cardano Community.</p>
        </div>
      </div>
    </footer>
  );
};
