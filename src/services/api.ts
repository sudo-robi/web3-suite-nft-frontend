const API_BASE = import.meta.env.VITE_API_URL || '/api/v1';

export interface NFTCollection {
  id: string;
  contractId: string;
  name: string;
  symbol: string;
  baseUri: string;
  maxSupply: number;
  totalSupply: number;
}

export interface NFTToken {
  id: string;
  collectionId: string;
  tokenId: number;
  owner: string;
  uri: string;
  name?: string;
  image?: string;
}

export interface MarketplaceListing {
  id: string;
  listingId: number;
  seller: string;
  collection: string;
  tokenId: number;
  price: string;
  active: boolean;
  nft?: NFTToken;
}

export interface RoyaltyConfig {
  collection: string;
  royaltyBps: number;
  creators: Array<{ address: string; shareBps: number }>;
  totalPaid: string;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'API request failed');
  return data.data;
}

// ── Collections ───────────────────────────────────────────────────────────────

export async function listCollections(): Promise<NFTCollection[]> {
  return request('/collections');
}

export async function getCollection(id: string): Promise<NFTCollection> {
  return request(`/collections/${id}`);
}

export async function listTokens(
  collectionId: string,
  page = 1,
  limit = 20,
): Promise<NFTToken[]> {
  return request(`/collections/${collectionId}/tokens?page=${page}&limit=${limit}`);
}

// ── Marketplace ───────────────────────────────────────────────────────────────

export async function listListings(
  page = 1,
  limit = 20,
  collection?: string,
): Promise<MarketplaceListing[]> {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (collection) params.set('collection', collection);
  return request(`/marketplace/listings?${params}`);
}

export async function getListing(id: number): Promise<MarketplaceListing> {
  return request(`/marketplace/listings/${id}`);
}

export async function createListing(params: {
  seller: string;
  collection: string;
  tokenId: number;
  price: number;
}): Promise<{ listingId: number; txHash: string }> {
  return request('/marketplace/list', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function buyNFT(params: {
  buyer: string;
  listingId: number;
}): Promise<{ txHash: string }> {
  return request('/marketplace/buy', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

// ── Royalties ─────────────────────────────────────────────────────────────────

export async function getRoyaltyConfig(collection: string): Promise<RoyaltyConfig> {
  return request(`/royalties/${collection}`);
}
