import { useState, useEffect } from 'react';
import { User, Award, TrendingUp, Activity, ExternalLink } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useWallet } from '../../hooks/useWallet';
import { motion } from 'framer-motion';

interface UserProfile {
  address: string;
  username: string;
  joinedDate: string;
  totalCards: number;
  totalValue: number;
  totalTrades: number;
  achievements: { name: string; icon: string; earned: string }[];
  recentActivity: { action: string; cardName: string; date: string; amount?: number }[];
}

const mockProfile: UserProfile = {
  address: 'addr_test1qz7xnk...',
  username: 'CardanoCollector',
  joinedDate: '2025-08-01',
  totalCards: 15,
  totalValue: 2500,
  totalTrades: 42,
  achievements: [
    { name: 'First Trade', icon: '🎯', earned: '2025-08-05' },
    { name: 'Legendary Hunter', icon: '🏆', earned: '2025-09-10' },
    { name: 'Master Trader', icon: '💎', earned: '2025-10-01' },
  ],
  recentActivity: [
    { action: 'Purchased', cardName: 'Legendary Dragon', date: '2025-10-10', amount: 500 },
    { action: 'Listed', cardName: 'Epic Warrior', date: '2025-10-08', amount: 150 },
    { action: 'Minted', cardName: 'Custom Card', date: '2025-10-05', amount: 5 },
  ],
};

export const ProfilePage = () => {
  const { address: paramAddress } = useParams();
  const { connected, address: walletAddress } = useWallet();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    // Check if viewing own profile
    const viewingAddress = paramAddress || walletAddress;
    setIsOwnProfile(!paramAddress || paramAddress === walletAddress);
    
    if (viewingAddress) {
      // Simulate API call to fetch profile
      setProfile(mockProfile);
    }
  }, [paramAddress, walletAddress]);

  if (!profile) {
    return (
      <div className="text-center py-20">
        <User size={64} className="mx-auto mb-4 text-gray-400" />
        <h2 className="text-3xl font-bold mb-4">Profile Not Found</h2>
        <p className="text-gray-400">
          {connected ? 'Loading profile...' : 'Connect your wallet to view your profile'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect p-8 rounded-2xl"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User size={48} />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{profile.username}</h1>
              <div className="flex items-center space-x-2 text-gray-400 mb-2">
                <span className="text-sm">{profile.address}</span>
                <button className="hover:text-white transition-colors">
                  <ExternalLink size={16} />
                </button>
              </div>
              <p className="text-sm text-gray-400">Member since {profile.joinedDate}</p>
            </div>
          </div>
          {isOwnProfile && (
            <button className="px-4 py-2 glass-effect rounded-lg hover:bg-white/10 transition-all">
              Edit Profile
            </button>
          )}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-effect p-6 rounded-xl"
        >
          <div className="flex items-center space-x-3 mb-2">
            <Award className="text-yellow-400" size={24} />
            <h3 className="text-lg font-semibold">Total Cards</h3>
          </div>
          <p className="text-3xl font-bold text-gradient">{profile.totalCards}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect p-6 rounded-xl"
        >
          <div className="flex items-center space-x-3 mb-2">
            <TrendingUp className="text-green-400" size={24} />
            <h3 className="text-lg font-semibold">Portfolio Value</h3>
          </div>
          <p className="text-3xl font-bold text-gradient">{profile.totalValue} ₳</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect p-6 rounded-xl"
        >
          <div className="flex items-center space-x-3 mb-2">
            <Activity className="text-blue-400" size={24} />
            <h3 className="text-lg font-semibold">Total Trades</h3>
          </div>
          <p className="text-3xl font-bold text-gradient">{profile.totalTrades}</p>
        </motion.div>
      </div>

      {/* Achievements & Activity Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect p-6 rounded-xl"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
            <Award className="text-yellow-400" size={24} />
            <span>Achievements</span>
          </h3>
          <div className="space-y-3">
            {profile.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg">
                <span className="text-3xl">{achievement.icon}</span>
                <div className="flex-1">
                  <h4 className="font-semibold">{achievement.name}</h4>
                  <p className="text-xs text-gray-400">Earned on {achievement.earned}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-effect p-6 rounded-xl"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
            <Activity className="text-blue-400" size={24} />
            <span>Recent Activity</span>
          </h3>
          <div className="space-y-3">
            {profile.recentActivity.map((activity, index) => (
              <div key={index} className="border-l-2 border-blue-500 pl-4 py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-semibold">{activity.action}</span>
                    <span className="text-gray-400"> {activity.cardName}</span>
                  </div>
                  {activity.amount && (
                    <span className="text-sm font-bold text-gradient">{activity.amount} ₳</span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">{activity.date}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
