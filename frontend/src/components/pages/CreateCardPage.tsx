import { useState } from 'react';
import { Sparkles, Upload, Wand2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useWallet } from '../../hooks/useWallet';

export const CreateCardPage = () => {
  const { connected } = useWallet();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    rarity: 'common',
    attack: 50,
    defense: 50,
    speed: 50,
    element: '',
    class: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [minting, setMinting] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!connected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!imagePreview) {
      toast.error('Please upload an image for your card');
      return;
    }

    setMinting(true);
    
    // Simulate minting process
    setTimeout(() => {
      toast.success('Card minted successfully!');
      setMinting(false);
      // Reset form
      setFormData({
        name: '',
        description: '',
        rarity: 'common',
        attack: 50,
        defense: 50,
        speed: 50,
        element: '',
        class: '',
      });
      setImagePreview(null);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4 flex items-center space-x-3">
          <Sparkles className="text-yellow-400" size={40} />
          <span>Create Trading Card</span>
        </h1>
        <p className="text-gray-400">Design and mint your own trading cards as Cardano NFTs.</p>
      </div>

      <form onSubmit={handleMint} className="grid md:grid-cols-2 gap-8">
        {/* Card Preview */}
        <div className="space-y-4">
          <div className="glass-effect rounded-2xl overflow-hidden">
            {imagePreview ? (
              <div className="relative aspect-[2/3]">
                <img
                  src={imagePreview}
                  alt="Card preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-2xl font-bold mb-2">{formData.name || 'Card Name'}</h3>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center bg-red-500/20 rounded p-2">
                      <div className="text-gray-300">ATK</div>
                      <div className="font-bold text-red-400">{formData.attack}</div>
                    </div>
                    <div className="text-center bg-blue-500/20 rounded p-2">
                      <div className="text-gray-300">DEF</div>
                      <div className="font-bold text-blue-400">{formData.defense}</div>
                    </div>
                    <div className="text-center bg-green-500/20 rounded p-2">
                      <div className="text-gray-300">SPD</div>
                      <div className="font-bold text-green-400">{formData.speed}</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-[2/3] flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                <Upload size={48} className="text-gray-600 mb-4" />
                <p className="text-gray-500">Upload an image to preview your card</p>
              </div>
            )}
          </div>

          {/* Image Upload */}
          <label className="block">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <div className="glass-effect p-4 rounded-xl cursor-pointer hover:bg-white/10 transition-all text-center">
              <Upload className="mx-auto mb-2" size={24} />
              <span className="text-sm">Click to upload card artwork</span>
            </div>
          </label>
        </div>

        {/* Card Form */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="glass-effect p-6 rounded-xl space-y-4">
            <h3 className="text-xl font-bold mb-4">Card Details</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">Card Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none"
                placeholder="Enter card name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none h-24"
                placeholder="Describe your card"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Element</label>
                <input
                  type="text"
                  value={formData.element}
                  onChange={(e) => setFormData({ ...formData, element: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none"
                  placeholder="Fire, Water, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Class</label>
                <input
                  type="text"
                  value={formData.class}
                  onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none"
                  placeholder="Warrior, Mage, etc."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Rarity</label>
              <select
                value={formData.rarity}
                onChange={(e) => setFormData({ ...formData, rarity: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none"
              >
                <option value="common">Common</option>
                <option value="rare">Rare</option>
                <option value="epic">Epic</option>
                <option value="legendary">Legendary</option>
              </select>
            </div>
          </div>

          {/* Stats */}
          <div className="glass-effect p-6 rounded-xl space-y-4">
            <h3 className="text-xl font-bold mb-4">Card Stats</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Attack: {formData.attack}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.attack}
                onChange={(e) => setFormData({ ...formData, attack: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Defense: {formData.defense}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.defense}
                onChange={(e) => setFormData({ ...formData, defense: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Speed: {formData.speed}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.speed}
                onChange={(e) => setFormData({ ...formData, speed: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>

          {/* Mint Button */}
          <button
            type="submit"
            disabled={minting || !connected}
            className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Wand2 size={20} />
            <span>{minting ? 'Minting...' : 'Mint as NFT'}</span>
          </button>

          {!connected && (
            <p className="text-center text-sm text-yellow-400">
              Connect your wallet to mint cards
            </p>
          )}

          <p className="text-xs text-gray-400 text-center">
            Minting fee: 5 ADA (includes IPFS storage & blockchain transaction)
          </p>
        </div>
      </form>
    </div>
  );
};
