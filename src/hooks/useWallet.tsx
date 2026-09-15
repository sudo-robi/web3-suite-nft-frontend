import React, { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import * as StellarSdk from '@stellar/stellar-sdk';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  balance: string | null;
  network: string;
  connect: () => Promise<void>;
  disconnect: () => void;
  signTransaction: (tx: string) => Promise<string>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const STELLAR_NETWORK = import.meta.env.VITE_STELLAR_NETWORK || 'testnet';
const PASSPHRASE =
  STELLAR_NETWORK === 'mainnet'
    ? StellarSdk.Networks.PUBLIC
    : StellarSdk.Networks.TESTNET;

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  const connect = useCallback(async () => {
    // In production, integrate with Freighter, Albedo, orLOBSTR
    // For now, simulate wallet connection
    try {
      if (typeof window !== 'undefined' && (window as any).freighter) {
        const freighter = (window as any).freighter;
        const addr = await freighter.getAddress();
        setAddress(addr);
        setIsConnected(true);
      } else {
        // Demo mode — use a test address
        console.warn('Freighter not detected. Using demo mode.');
        setAddress('GDEMO...');
        setIsConnected(true);
      }
    } catch (err) {
      console.error('Wallet connection failed:', err);
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
    setBalance(null);
    setIsConnected(false);
  }, []);

  const signTransaction = useCallback(
    async (txXdr: string): Promise<string> => {
      if (!address) throw new Error('Wallet not connected');

      if (typeof window !== 'undefined' && (window as any).freighter) {
        const signed = await (window as any).freighter.signTransaction(txXdr, {
          network: PASSPHRASE,
        });
        return signed;
      }

      // Demo mode — return unsigned
      console.warn('Demo mode: returning unsigned transaction');
      return txXdr;
    },
    [address],
  );

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        balance,
        network: STELLAR_NETWORK,
        connect,
        disconnect,
        signTransaction,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet(): WalletContextType {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
