import { Routes, Route } from 'react-router-dom';
import { Header } from '@components/layout/Header';
import { Footer } from '@components/layout/Footer';
import { HomePage } from '@components/pages/HomePage';
import { MarketplacePage } from '@components/pages/MarketplacePage';
import { CollectionPage } from '@components/pages/CollectionPage';
import { CardDetailPage } from '@components/pages/CardDetailPage';
import { ProfilePage } from '@components/pages/ProfilePage';
import { CreateCardPage } from '@components/pages/CreateCardPage';
import { AIInsightsPage } from '@components/pages/AIInsightsPage';
import { P2PTradingPage } from '@components/pages/P2PTradingPage';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8 min-h-[calc(100vh-200px)]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/card/:cardId" element={<CardDetailPage />} />
          <Route path="/profile/:address?" element={<ProfilePage />} />
          <Route path="/create" element={<CreateCardPage />} />
          <Route path="/ai-insights" element={<AIInsightsPage />} />
          <Route path="/p2p-trading" element={<P2PTradingPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
