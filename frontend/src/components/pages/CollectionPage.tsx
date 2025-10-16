import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWallet } from '../../hooks/useWallet';
import toast from 'react-hot-toast';

interface Card {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  price: number;
  image: string;
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

const mockCollectionCards: Card[] = [
  {
    id: '1',
    name: 'Legendary Dragon',
    rarity: 'legendary',
    price: 500,
    image: 'https://picsum.photos/seed/dragon/400/600',
    stats: { attack: 95, defense: 85, speed: 70 },
  },
  {
    id: '3',
    name: 'Rare Mage',
    rarity: 'rare',
    price: 75,
    image: 'https://picsum.photos/seed/mage/400/600',
    stats: { attack: 70, defense: 50, speed: 80 },
  },
  {
    id: '4',
    name: 'Common Knight',
    rarity: 'common',
    price: 25,
    image: 'https://picsum.photos/seed/knight/400/600',
    stats: { attack: 55, defense: 65, speed: 45 },
  },
];

export const CollectionPage = () => {
  const { connected } = useWallet();
  const [cards, setCards] = useState<Card[]>([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    if (connected) {
      // Simulate API call to fetch user's collection
      setCards(mockCollectionCards);
      const value = mockCollectionCards.reduce((sum, card) => sum + card.price, 0);
      setTotalValue(value);
    }
  }, [connected]);

  const handleSell = (card: Card) => {
    toast.success(`Listed ${card.name} for sale!`);
  };

  if (!connected) {
    return (
      <div className="text-center py-20">
        <Package size={64} className="mx-auto mb-4 text-gray-400" />
        <h2 className="text-3xl font-bold mb-4">Connect Your Wallet</h2>
        <p className="text-gray-400 mb-8">
          Connect your Cardano wallet to view your trading card collection.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4">My Collection</h1>
        <p className="text-gray-400">View and manage your trading card collection.</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass-effect p-6 rounded-xl">
          <div className="flex items-center space-x-3 mb-2">
            <Package className="text-blue-400" size={24} />
            <h3 className="text-lg font-semibold">Total Cards</h3>
          </div>
          <p className="text-3xl font-bold text-gradient">{cards.length}</p>
        </div>

        <div className="glass-effect p-6 rounded-xl">
          <div className="flex items-center space-x-3 mb-2">
            <TrendingUp className="text-green-400" size={24} />
            <h3 className="text-lg font-semibold">Portfolio Value</h3>
          </div>
          <p className="text-3xl font-bold text-gradient">{totalValue} ₳</p>
        </div>

        <div className="glass-effect p-6 rounded-xl">
          <div className="flex items-center space-x-3 mb-2">
            <Star className="text-yellow-400" size={24} />
            <h3 className="text-lg font-semibold">Legendary Cards</h3>
          </div>
          <p className="text-3xl font-bold text-gradient">
            {cards.filter(c => c.rarity === 'legendary').length}
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      {cards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-effect rounded-xl overflow-hidden hover:scale-105 transition-transform"
            >
              <Link to={`/card/${card.id}`}>
                {/* Card Image */}
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute top-2 right-2 px-3 py-1 rounded-full bg-gradient-to-r ${rarityColors[card.rarity]} text-xs font-bold uppercase`}>
                    {card.rarity}
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold">{card.name}</h3>
                    <Star className="text-yellow-400" size={20} />
                  </div>

                  {/* Stats */}
                  {card.stats && (
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center">
                        <div className="text-gray-400">ATK</div>
                        <div className="font-bold text-red-400">{card.stats.attack}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-400">DEF</div>
                        <div className="font-bold text-blue-400">{card.stats.defense}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-400">SPD</div>
                        <div className="font-bold text-green-400">{card.stats.speed}</div>
                      </div>
                    </div>
                  )}

                  {/* Value & Action */}
                  <div className="flex justify-between items-center pt-2 border-t border-white/10">
                    <span className="text-lg font-bold text-gradient">{card.price} ₳</span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleSell(card);
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all text-sm font-medium"
                    >
                      List for Sale
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 glass-effect rounded-xl">
          <Package size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-400 text-lg mb-4">Your collection is empty.</p>
          <Link
            to="/marketplace"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
          >
            Browse Marketplace
          </Link>
        </div>
      )}
    </div>
  );
};
