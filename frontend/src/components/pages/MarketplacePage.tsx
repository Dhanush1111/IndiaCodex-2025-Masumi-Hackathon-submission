import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAccount } from 'wagmi';
import { paymentService } from '../../services/paymentService';

interface Card {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  price: number;
  image: string;
  owner: string;
  stats: {
    attack?: number;
    defense?: number;
    speed?: number;
  };
}

const rarityColors = {
  common: 'from-gray-400 to-gray-600',
  rare: 'from-blue-400 to-blue-600',
  epic: 'from-purple-400 to-purple-600',
  legendary: 'from-yellow-400 to-orange-600',
};

const mockCards: Card[] = [
  {
    id: '1',
    name: 'Legendary Dragon',
    rarity: 'legendary',
    price: 500,
    image: 'https://picsum.photos/seed/dragon/400/600',
    owner: 'addr_test1qz...',
    stats: { attack: 95, defense: 85, speed: 70 },
  },
  {
    id: '2',
    name: 'Epic Warrior',
    rarity: 'epic',
    price: 150,
    image: 'https://picsum.photos/seed/warrior/400/600',
    owner: 'addr_test1qy...',
    stats: { attack: 80, defense: 75, speed: 60 },
  },
  {
    id: '3',
    name: 'Rare Mage',
    rarity: 'rare',
    price: 75,
    image: 'https://picsum.photos/seed/mage/400/600',
    owner: 'addr_test1qx...',
    stats: { attack: 70, defense: 50, speed: 80 },
  },
  {
    id: '4',
    name: 'Common Knight',
    rarity: 'common',
    price: 25,
    image: 'https://picsum.photos/seed/knight/400/600',
    owner: 'addr_test1qw...',
    stats: { attack: 55, defense: 65, speed: 45 },
  },
  {
    id: '5',
    name: 'Mystic Phoenix',
    rarity: 'legendary',
    price: 750,
    image: 'https://picsum.photos/seed/phoenix/400/600',
    owner: 'addr_test1qv...',
    stats: { attack: 90, defense: 70, speed: 95 },
  },
  {
    id: '6',
    name: 'Shadow Assassin',
    rarity: 'epic',
    price: 200,
    image: 'https://picsum.photos/seed/assassin/400/600',
    owner: 'addr_test1qu...',
    stats: { attack: 85, defense: 60, speed: 90 },
  },
];

export const MarketplacePage = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price' | 'rarity' | 'name'>('price');

  useEffect(() => {
    // Simulate API call
    setCards(mockCards);
  }, []);

  const filteredCards = cards
    .filter(card => 
      card.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedRarity === 'all' || card.rarity === selectedRarity)
    )
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rarity') {
        const rarityOrder = { common: 0, rare: 1, epic: 2, legendary: 3 };
        return rarityOrder[b.rarity] - rarityOrder[a.rarity];
      }
      return a.name.localeCompare(b.name);
    });

  const { address, isConnected } = useAccount();
  const [purchasing, setPurchasing] = useState<string | null>(null);

  const handlePurchase = async (card: Card) => {
    if (!isConnected || !address) {
      toast.error('Please connect your wallet first');
      return;
    }

    setPurchasing(card.id);
    
    try {
      toast.loading(`🤖 AI analyzing purchase for ${card.name}...`, { id: 'ai-purchase' });
      
      const result = await paymentService.purchaseCardWithAI({
        cardId: card.id,
        buyerAddress: address,
        autoPayment: true,
      });

      toast.dismiss('ai-purchase');
      
      if (result.success) {
        toast.success(
          <div>
            <div className="font-bold">✅ Purchase Successful!</div>
            <div className="text-sm">Card: {card.name}</div>
            <div className="text-xs text-gray-400">
              Method: {result.payment?.method === 'masumi-ai-automated' ? '🤖 Masumi AI Payment' : 'Manual'}
            </div>
            <div className="text-xs text-gray-400">TX: {result.txHash.substring(0, 16)}...</div>
          </div>,
          { duration: 5000 }
        );
      }
    } catch (error: any) {
      toast.error(error.message || 'Purchase failed');
    } finally {
      setPurchasing(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-5xl md:text-6xl font-black mb-4">
          <span className="text-gradient text-glow">Marketplace</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Browse and purchase trading cards powered by <span className="text-blue-400 font-semibold">AI analysis</span> and <span className="text-purple-400 font-semibold">Cardano blockchain</span>
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <span className="px-4 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-sm font-medium text-blue-400">
            🤖 AI-Powered
          </span>
          <span className="px-4 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm font-medium text-purple-400">
            ⚡ Instant Buy
          </span>
          <span className="px-4 py-1.5 bg-pink-500/10 border border-pink-500/30 rounded-full text-sm font-medium text-pink-400">
            🔒 Secure
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-effect gradient-border p-8 rounded-2xl space-y-4 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors" size={22} />
            <input
              type="text"
              placeholder="Search for legendary cards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white/5 rounded-xl border-2 border-white/10 focus:border-blue-500 focus:bg-white/10 focus:outline-none transition-all text-lg placeholder:text-gray-500"
            />
          </div>

          {/* Rarity Filter */}
          <div className="flex items-center space-x-3 bg-white/5 px-4 py-2 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all">
            <Filter size={22} className="text-purple-400" />
            <select
              value={selectedRarity}
              onChange={(e) => setSelectedRarity(e.target.value)}
              className="bg-transparent py-1.5 px-2 focus:outline-none cursor-pointer text-base font-medium"
            >
              <option value="all" className="bg-gray-900">All Rarities</option>
              <option value="common" className="bg-gray-900">Common</option>
              <option value="rare" className="bg-gray-900">Rare</option>
              <option value="epic" className="bg-gray-900">Epic</option>
              <option value="legendary" className="bg-gray-900">Legendary</option>
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-3 bg-white/5 px-4 py-2 rounded-xl border border-white/10 hover:border-green-500/50 transition-all">
            <TrendingUp size={22} className="text-green-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent py-1.5 px-2 focus:outline-none cursor-pointer text-base font-medium"
            >
              <option value="price" className="bg-gray-900">Price</option>
              <option value="rarity" className="bg-gray-900">Rarity</option>
              <option value="name" className="bg-gray-900">Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredCards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="glass-effect rounded-2xl overflow-hidden hover-lift card-shimmer"
          >
            <Link to={`/card/${card.id}`} className="block">
              {/* Card Image */}
              <div className="relative aspect-[2/3] overflow-hidden group">
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className={`absolute top-3 right-3 px-4 py-1.5 rounded-full bg-gradient-to-r ${rarityColors[card.rarity]} text-xs font-bold uppercase shadow-lg backdrop-blur-sm`}>
                  {card.rarity}
                </div>
              </div>

              {/* Card Info */}
              <div className="p-5 space-y-4 bg-gradient-to-b from-transparent to-black/30">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-white">{card.name}</h3>
                  <Star className="text-yellow-400 fill-yellow-400" size={22} />
                </div>

                {/* Stats */}
                {card.stats && (
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-red-500/10 backdrop-blur-sm rounded-lg p-2 text-center border border-red-500/20">
                      <div className="text-xs text-red-300 uppercase mb-1">ATK</div>
                      <div className="text-lg font-bold text-red-400">{card.stats.attack}</div>
                    </div>
                    <div className="bg-blue-500/10 backdrop-blur-sm rounded-lg p-2 text-center border border-blue-500/20">
                      <div className="text-xs text-blue-300 uppercase mb-1">DEF</div>
                      <div className="text-lg font-bold text-blue-400">{card.stats.defense}</div>
                    </div>
                    <div className="bg-green-500/10 backdrop-blur-sm rounded-lg p-2 text-center border border-green-500/20">
                      <div className="text-xs text-green-300 uppercase mb-1">SPD</div>
                      <div className="text-lg font-bold text-green-400">{card.stats.speed}</div>
                    </div>
                  </div>
                )}

                {/* Price */}
                <div className="flex justify-between items-center pt-3 border-t border-white/20">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 uppercase">Price</span>
                    <span className="text-2xl font-bold text-gradient">{card.price} ₳</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handlePurchase(card);
                    }}
                    disabled={purchasing === card.id}
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 group"
                  >
                    {purchasing === card.id ? (
                      <>
                        <Sparkles size={16} className="animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
                        <span>AI Buy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredCards.length === 0 && (
        <div className="text-center py-12 glass-effect rounded-xl">
          <p className="text-gray-400 text-lg">No cards found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};
