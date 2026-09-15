import { useState, useEffect } from 'react';
import { useWallet } from '../hooks/useWallet';
import { listListings, buyNFT, type MarketplaceListing } from '../services/api';
import { formatStroops, shortenAddress, formatBps } from '../lib/utils';
import { ShoppingCart, Tag, Search } from 'lucide-react';

export function MarketplacePage() {
  const { isConnected, address } = useWallet();
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const items = await listListings();
        setListings(items);
      } catch (err) {
        console.error('Failed to load listings:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleBuy = async (listingId: number) => {
    if (!address) return;
    setBuying(listingId);
    try {
      await buyNFT({ buyer: address, listingId });
      setListings((prev) => prev.filter((l) => l.listingId !== listingId));
    } catch (err) {
      console.error('Purchase failed:', err);
    } finally {
      setBuying(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Marketplace</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-500" />
          <input
            type="text"
            placeholder="Search listings..."
            className="input !w-64 !pl-10"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="aspect-square rounded-lg bg-dark-800" />
              <div className="mt-3 h-4 w-3/4 rounded bg-dark-800" />
              <div className="mt-2 h-6 w-1/3 rounded bg-dark-800" />
            </div>
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="card text-center py-16">
          <Tag className="mx-auto h-12 w-12 text-dark-600 mb-4" />
          <p className="text-dark-400 text-lg">No active listings</p>
          <p className="text-dark-500 text-sm mt-2">
            Be the first to list an NFT for sale.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <div key={listing.listingId} className="card group hover:border-stellar-700 transition-colors">
              {/* NFT Image */}
              <div className="aspect-square rounded-lg bg-dark-800 flex items-center justify-center">
                <span className="text-4xl text-dark-600">#{listing.tokenId}</span>
              </div>

              {/* Listing Info */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="badge badge-active">Active</span>
                  <span className="text-xs text-dark-500">
                    #{listing.listingId}
                  </span>
                </div>

                <div>
                  <div className="text-xs text-dark-500">Price</div>
                  <div className="text-lg font-bold text-stellar-400">
                    {formatStroops(listing.price)} XLM
                  </div>
                </div>

                <div className="text-xs text-dark-500">
                  Seller: {shortenAddress(listing.seller)}
                </div>

                {/* Buy Button */}
                {isConnected && address !== listing.seller && (
                  <button
                    onClick={() => handleBuy(listing.listingId)}
                    disabled={buying === listing.listingId}
                    className="btn-primary w-full mt-2"
                  >
                    {buying === listing.listingId ? (
                      'Processing...'
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Buy Now
                      </>
                    )}
                  </button>
                )}

                {!isConnected && (
                  <p className="text-xs text-dark-500 text-center mt-2">
                    Connect wallet to buy
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
