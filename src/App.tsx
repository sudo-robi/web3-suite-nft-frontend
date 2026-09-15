import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { GalleryPage } from './pages/GalleryPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { CollectionManagerPage } from './pages/CollectionManagerPage';
import { WalletProvider } from './hooks/useWallet';

export default function App() {
  return (
    <WalletProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/collections" element={<CollectionManagerPage />} />
        </Routes>
      </Layout>
    </WalletProvider>
  );
}
