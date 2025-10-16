import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Activity, Star, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAccount } from 'wagmi';
import { paymentService } from '../../services/paymentService';

interface CardData {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  price: number;
  image: string;
  description: string;
  owner: string;
  stats: {
    attack: number;
    defense: number;
    speed: number;
  };
  attributes: { trait: string; value: string }[];
  history: { event: string; price: number; date: string }[];
}

const rarityColors = {
  common: 'from-gray-400 to-gray-600',
  rare: 'from-blue-400 to-blue-600',
  epic: 'from-purple-400 to-purple-600',
  legendary: 'from-yellow-400 to-orange-600',
};

const mockCardData: CardData = {
  id: '1',
  name: 'Legendary Dragon',
  rarity: 'legendary',
  price: 500,
  image: 'https://picsum.photos/seed/dragon/400/600',
  description: 'A powerful dragon that commands fire and fury. One of the rarest cards in the entire collection with exceptional stats.',
  owner: 'addr_test1qz7xn...',
  stats: { attack: 95, defense: 85, speed: 70 },
  attributes: [
    { trait: 'Element', value: 'Fire' },
    { trait: 'Class', value: 'Beast' },
    { trait: 'Edition', value: 'First Edition' },
    { trait: 'Artist', value: 'CardanoArt' },
  ],
  history: [
    { event: 'Listed for Sale', price: 500, date: '2025-10-10' },
    { event: 'Purchased', price: 450, date: '2025-09-15' },
    { event: 'Minted', price: 100, date: '2025-08-01' },
  ],
};

export const CardDetailPage = () => {
  const { cardId } = useParams();
  const { address, isConnected } = useAccount();
  const [card, setCard] = useState<CardData | null>(null);
  const [aiValuation, setAiValuation] = useState<number | null>(null);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch card details
    setCard(mockCardData);
    
    // Get AI valuation from backend
    if (cardId) {
      paymentService.getAIValuation(cardId)
        .then(result => setAiValuation(result.aiValuation))
        .catch(() => setAiValuation(520)); // Fallback
    }
  }, [cardId]);

  const handlePurchase = async () => {
    if (!isConnected || !address) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!card) return;

    setPurchasing(true);
    
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
      toast.dismiss('ai-purchase');
      toast.error(error.message || 'Purchase failed');
    } finally {
      setPurchasing(false);
    }
  };

  const handleMakeOffer = () => {
    if (!isConnected || !address) {
      toast.error('Please connect your wallet first');
      return;
    }
    toast.success('Offer submitted!');
  };

  if (!card) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400">Loading card details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link
        to="/marketplace"
        className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to Marketplace</span>
      </Link>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Card Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-effect rounded-2xl overflow-hidden"
        >
          <div className="relative aspect-[2/3]">
            <img
              src={card.image}
              alt={card.name}
              className="w-full h-full object-cover"
            />
            <div className={`absolute top-4 right-4 px-4 py-2 rounded-full bg-gradient-to-r ${rarityColors[card.rarity]} text-sm font-bold uppercase`}>
              {card.rarity}
            </div>
          </div>
        </motion.div>

        {/* Card Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Title & Price */}
          <div>
            <h1 className="text-4xl font-bold mb-2">{card.name}</h1>
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gradient">{card.price} ₳</span>
              {aiValuation && (
                <span className="text-sm text-gray-400">
                  AI Estimate: {aiValuation} ₳
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="glass-effect p-4 rounded-xl">
            <p className="text-gray-300">{card.description}</p>
          </div>

          {/* Stats */}
          <div className="glass-effect p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <Activity size={24} className="text-blue-400" />
              <span>Card Stats</span>
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">Attack</span>
                  <span className="text-sm font-bold text-red-400">{card.stats.attack}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-red-600"
                    style={{ width: `${card.stats.attack}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">Defense</span>
                  <span className="text-sm font-bold text-blue-400">{card.stats.defense}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                    style={{ width: `${card.stats.defense}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">Speed</span>
                  <span className="text-sm font-bold text-green-400">{card.stats.speed}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-600"
                    style={{ width: `${card.stats.speed}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handlePurchase}
              disabled={purchasing}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart size={20} className={purchasing ? 'animate-bounce' : ''} />
              <span>{purchasing ? 'AI Processing...' : 'Buy Now'}</span>
            </button>
            <button
              onClick={handleMakeOffer}
              className="flex-1 px-6 py-3 glass-effect rounded-lg hover:bg-white/10 transition-all font-semibold"
            >
              Make Offer
            </button>
          </div>
        </motion.div>
      </div>

      {/* Additional Info Tabs */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Attributes */}
        <div className="glass-effect p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
            <Star size={24} className="text-yellow-400" />
            <span>Attributes</span>
          </h3>
          <div className="space-y-2">
            {card.attributes.map((attr, index) => (
              <div key={index} className="flex justify-between p-2 bg-white/5 rounded">
                <span className="text-gray-400">{attr.trait}</span>
                <span className="font-semibold">{attr.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <div className="glass-effect p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
            <TrendingUp size={24} className="text-green-400" />
            <span>Transaction History</span>
          </h3>
          <div className="space-y-3">
            {card.history.map((item, index) => (
              <div key={index} className="border-l-2 border-blue-500 pl-4 py-2">
                <div className="font-semibold">{item.event}</div>
                <div className="text-sm text-gray-400 flex justify-between">
                  <span>{item.price} ₳</span>
                  <span>{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
