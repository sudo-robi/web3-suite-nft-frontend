import { useState, useEffect } from 'react';
import { useWallet } from '../hooks/useWallet';
import { listCollections, type NFTCollection } from '../services/api';
import { shortenAddress, formatBps } from '../lib/utils';
import { Plus, Settings, Users, Coins } from 'lucide-react';

export function CollectionManagerPage() {
  const { isConnected, address } = useWallet();
  const [collections, setCollections] = useState<NFTCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  // Form state
  const [formName, setFormName] = useState('');
  const [formSymbol, setFormSymbol] = useState('');
  const [formBaseUri, setFormBaseUri] = useState('');
  const [formMaxSupply, setFormMaxSupply] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const cols = await listCollections();
        setCollections(cols);
      } catch (err) {
        console.error('Failed to load collections:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <h1 className="text-2xl font-semibold mb-4">Collection Manager</h1>
        <p className="text-dark-400">Connect your wallet to manage collections.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Collection Manager</h1>
        <button onClick={() => setShowCreate(!showCreate)} className="btn-primary">
          <Plus className="mr-2 h-4 w-4" />
          New Collection
        </button>
      </div>

      {/* Create Collection Form */}
      {showCreate && (
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Create New Collection</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: Integrate with API
              console.log('Creating collection:', {
                name: formName,
                symbol: formSymbol,
                baseUri: formBaseUri,
                maxSupply: formMaxSupply,
              });
            }}
            className="grid gap-4 sm:grid-cols-2"
          >
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">
                Collection Name
              </label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="My NFT Collection"
                className="input"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">
                Symbol
              </label>
              <input
                type="text"
                value={formSymbol}
                onChange={(e) => setFormSymbol(e.target.value)}
                placeholder="MNFT"
                className="input"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">
                Base URI
              </label>
              <input
                type="url"
                value={formBaseUri}
                onChange={(e) => setFormBaseUri(e.target.value)}
                placeholder="https://ipfs.io/ipfs/..."
                className="input"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">
                Max Supply
              </label>
              <input
                type="number"
                value={formMaxSupply}
                onChange={(e) => setFormMaxSupply(e.target.value)}
                placeholder="1000"
                className="input"
                min="1"
                required
              />
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" className="btn-primary">
                Deploy Contract
              </button>
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Collections List */}
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-6 w-1/3 rounded bg-dark-800" />
              <div className="mt-2 h-4 w-1/2 rounded bg-dark-800" />
            </div>
          ))}
        </div>
      ) : collections.length === 0 ? (
        <div className="card text-center py-16">
          <Coins className="mx-auto h-12 w-12 text-dark-600 mb-4" />
          <p className="text-dark-400 text-lg">No collections yet</p>
          <p className="text-dark-500 text-sm mt-2">
            Deploy your first NFT collection to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {collections.map((col) => (
            <div key={col.id} className="card hover:border-dark-700 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{col.name}</h3>
                  <p className="text-sm text-dark-400 mt-1">
                    {col.symbol} · {col.totalSupply}/{col.maxSupply} minted
                  </p>
                  <p className="text-xs text-dark-500 mt-2">
                    Contract: {shortenAddress(col.contractId)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="btn-secondary !px-3 !py-1.5" title="Manage">
                    <Settings className="h-4 w-4" />
                  </button>
                  <button className="btn-secondary !px-3 !py-1.5" title="Creators">
                    <Users className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-dark-500 mb-1">
                  <span>Minted</span>
                  <span>{((col.totalSupply / col.maxSupply) * 100).toFixed(0)}%</span>
                </div>
                <div className="h-2 rounded-full bg-dark-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-stellar-600 transition-all"
                    style={{ width: `${(col.totalSupply / col.maxSupply) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
