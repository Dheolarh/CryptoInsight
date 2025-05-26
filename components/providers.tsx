'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { NavBar } from '@/components/navigation/navbar';
import { Web3Provider } from '@/context/web3-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Web3Provider>
        <div className="relative flex min-h-screen flex-col">
          <NavBar />
          <div className="flex-1">{children}</div>
          <Toaster />
        </div>
      </Web3Provider>
    </ThemeProvider>
  );
}