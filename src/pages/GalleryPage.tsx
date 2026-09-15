import { useState, useEffect } from 'react';
import { useWallet } from '../hooks/useWallet';
import { listCollections, listTokens, type NFTToken, type NFTCollection } from '../services/api';
import { shortenAddress, formatStroops } from '../lib/utils';
import { ExternalLink, Filter } from 'lucide-react';

export function GalleryPage() {
  const { isConnected, address } = useWallet();
  const [collections, setCollections] = useState<NFTCollection[]>([]);
  const [tokens, setTokens] = useState<NFTToken[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const cols = await listCollections();
        setCollections(cols);
        if (cols.length > 0) {
          const toks = await listTokens(cols[0].id);
          setTokens(toks);
        }
      } catch (err) {
        console.error('Failed to load gallery:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <h1 className="text-2xl font-semibold mb-4">NFT Gallery</h1>
        <p className="text-dark-400">Connect your wallet to view your NFTs.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">NFT Gallery</h1>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-dark-400" />
          <select
            value={selectedCollection}
            onChange={(e) => setSelectedCollection(e.target.value)}
            className="input !w-auto"
          >
            <option value="all">All Collections</option>
            {collections.map((col) => (
              <option key={col.id} value={col.id}>
                {col.name} ({col.symbol})
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="aspect-square rounded-lg bg-dark-800" />
              <div className="mt-3 h-4 w-3/4 rounded bg-dark-800" />
              <div className="mt-2 h-3 w-1/2 rounded bg-dark-800" />
            </div>
          ))}
        </div>
      ) : tokens.length === 0 ? (
        <div className="card text-center py-16">
          <p className="text-dark-400 text-lg">No NFTs found</p>
          <p className="text-dark-500 text-sm mt-2">
            Mint your first NFT or browse the marketplace.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {tokens.map((token) => (
            <div key={token.id} className="card group hover:border-stellar-700 transition-colors cursor-pointer">
              {/* NFT Image Placeholder */}
              <div className="aspect-square rounded-lg bg-dark-800 flex items-center justify-center overflow-hidden">
                {token.image ? (
                  <img src={token.image} alt={token.name || `#${token.tokenId}`} className="h-full w-full object-cover" />
                ) : (
                  <div className="text-4xl text-dark-600">#{token.tokenId}</div>
                )}
              </div>
              {/* Info */}
              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm truncate">
                    {token.name || `Token #${token.tokenId}`}
                  </h3>
                  <ExternalLink className="h-3 w-3 text-dark-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="mt-1 text-xs text-dark-500">
                  Owner: {shortenAddress(token.owner)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
