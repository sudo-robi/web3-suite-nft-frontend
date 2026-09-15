import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';
import { shortenAddress } from '../lib/utils';
import {
  Home,
  Image,
  Store,
  FolderOpen,
  Wallet,
  LogOut,
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/gallery', label: 'Gallery', icon: Image },
  { path: '/marketplace', label: 'Marketplace', icon: Store },
  { path: '/collections', label: 'Collections', icon: FolderOpen },
];

export function Header() {
  const { isConnected, address, network, connect, disconnect } = useWallet();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-dark-800 bg-dark-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stellar-600">
            <span className="text-sm font-bold text-white">W3</span>
          </div>
          <span className="text-lg font-semibold">web3-suite</span>
          <span className="badge badge-active text-[10px]">NFT</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === path
                  ? 'bg-dark-800 text-white'
                  : 'text-dark-400 hover:text-white hover:bg-dark-800/50'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Wallet */}
        <div className="flex items-center gap-3">
          <span className="badge badge-inactive hidden sm:inline-flex">
            {network}
          </span>
          {isConnected ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-dark-300 hidden sm:inline">
                {shortenAddress(address!)}
              </span>
              <button onClick={disconnect} className="btn-secondary !px-3 !py-1.5">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button onClick={connect} className="btn-primary !py-1.5">
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
