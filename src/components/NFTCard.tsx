import { shortenAddress } from '../lib/utils';
import { ExternalLink } from 'lucide-react';
import type { NFTToken } from '../services/api';

interface NFTCardProps {
  token: NFTToken;
  onClick?: () => void;
}

export function NFTCard({ token, onClick }: NFTCardProps) {
  return (
    <div
      onClick={onClick}
      className="card group hover:border-stellar-700 transition-colors cursor-pointer"
    >
      {/* NFT Image */}
      <div className="aspect-square rounded-lg bg-dark-800 flex items-center justify-center overflow-hidden">
        {token.image ? (
          <img
            src={token.image}
            alt={token.name || `#${token.tokenId}`}
            className="h-full w-full object-cover"
          />
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
  );
}
