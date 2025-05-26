'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Simplified Web3 context for demo purposes
interface Web3ContextType {
  isConnected: boolean;
  account: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const Web3Context = createContext<Web3ContextType>({
  isConnected: false,
  account: null,
  connect: async () => {},
  disconnect: () => {},
});

export const useWeb3 = () => useContext(Web3Context);

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);

  // Mock connect function for demonstration
  const connect = useCallback(async () => {
    return new Promise<void>((resolve, reject) => {
      try {
        // Simulate connection delay
        setTimeout(() => {
          const mockAccount = '0x' + Math.random().toString(16).slice(2, 12) + Math.random().toString(16).slice(2, 12);
          setAccount(mockAccount);
          setIsConnected(true);
          resolve();
        }, 1000);
      } catch (error) {
        reject(error);
      }
    });
  }, []);

  const disconnect = useCallback(() => {
    setAccount(null);
    setIsConnected(false);
  }, []);

  // Check if window.ethereum is available in a real implementation
  useEffect(() => {
    const checkConnection = async () => {
      // This would use real web3 logic in a production app
      const hasRecentlyConnected = localStorage.getItem('walletConnected') === 'true';
      if (hasRecentlyConnected) {
        try {
          await connect();
        } catch (error) {
          console.error('Failed to reconnect wallet:', error);
        }
      }
    };

    checkConnection();
  }, [connect]);

  useEffect(() => {
    if (isConnected) {
      localStorage.setItem('walletConnected', 'true');
    } else {
      localStorage.removeItem('walletConnected');
    }
  }, [isConnected]);

  return (
    <Web3Context.Provider value={{ isConnected, account, connect, disconnect }}>
      {children}
    </Web3Context.Provider>
  );
}