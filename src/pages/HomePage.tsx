import { Link } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';
import { ArrowRight, Store, Image, Shield } from 'lucide-react';

const features = [
  {
    icon: Image,
    title: 'NFT Gallery',
    description: 'Browse and manage your NFT collection on Stellar. View metadata, ownership, and transaction history.',
    href: '/gallery',
  },
  {
    icon: Store,
    title: 'Marketplace',
    description: 'List, buy, and trade NFTs with trustless peer-to-peer transactions enforced by smart contracts.',
    href: '/marketplace',
  },
  {
    icon: Shield,
    title: 'Royalties',
    description: 'Creator royalties are enforced on-chain, ensuring artists earn from every secondary sale.',
    href: '/collections',
  },
];

export function HomePage() {
  const { isConnected, connect } = useWallet();

  return (
    <div className="space-y-16 py-8">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          NFT Marketplace on{' '}
          <span className="text-stellar-400">Stellar</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-dark-300">
          A complete NFT infrastructure layer powered by Soroban smart contracts.
          Mint, trade, and earn royalties — all on the Stellar network.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          {isConnected ? (
            <>
              <Link to="/gallery" className="btn-primary">
                View Gallery
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link to="/marketplace" className="btn-secondary">
                Browse Marketplace
              </Link>
            </>
          ) : (
            <button onClick={connect} className="btn-primary">
              Connect Wallet to Start
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-8">
        {[
          { label: 'Collections', value: '—' },
          { label: 'NFTs Minted', value: '—' },
          { label: 'Total Volume', value: '— XLM' },
        ].map(({ label, value }) => (
          <div key={label} className="card text-center">
            <div className="text-3xl font-bold text-stellar-400">{value}</div>
            <div className="mt-1 text-sm text-dark-400">{label}</div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section>
        <h2 className="text-2xl font-semibold text-center mb-8">Platform Features</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description, href }) => (
            <Link key={title} to={href} className="card group hover:border-stellar-700 transition-colors">
              <Icon className="h-8 w-8 text-stellar-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm text-dark-400">{description}</p>
              <div className="mt-4 text-sm text-stellar-400 group-hover:text-stellar-300 flex items-center">
                Learn more <ArrowRight className="ml-1 h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section className="card">
        <h2 className="text-xl font-semibold mb-4">Architecture</h2>
        <pre className="overflow-x-auto text-sm text-dark-300 font-mono">
{`┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React + Vite)                   │
│  Gallery │ Marketplace │ Collection Manager │ Wallet Connect │
└─────────────────────────────┬───────────────────────────────┘
                              │ REST API
┌─────────────────────────────▼───────────────────────────────┐
│                  Backend API (Express.js)                    │
│  Collection Routes │ Marketplace Routes │ Royalty Routes    │
└─────────────────────────────┬───────────────────────────────┘
                              │ Soroban RPC
┌─────────────────────────────▼───────────────────────────────┐
│              Soroban Smart Contracts (Rust/WASM)            │
│  Collection │ Marketplace │ Royalty Distribution             │
└─────────────────────────────┬───────────────────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │ Stellar Blockchain │
                    └───────────────────┘`}
        </pre>
      </section>
    </div>
  );
}
