'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, BarChart3, LineChart, Wallet, Compass, Settings, LogOut, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Search } from '@/components/ui/search';
import { WalletConnectButton } from '@/components/wallet/wallet-connect-button';

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-foreground">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] p-0 bg-background">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-lg font-bold mb-4" 
              onClick={() => setOpen(false)}
            >
              <BarChart3 className="h-5 w-5 text-primary" />
              <span>CryptoInsight</span>
            </Link>
            <Search />
          </div>
          
          <nav className="flex-1 overflow-auto py-4">
            <div className="px-4 mb-2 text-xs font-medium text-muted-foreground">
              Main
            </div>
            <Link 
              href="/" 
              className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link 
              href="#" 
              className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              <LineChart className="h-4 w-4" />
              <span>Markets</span>
            </Link>
            <Link 
              href="#" 
              className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              <Wallet className="h-4 w-4" />
              <span>Portfolio</span>
            </Link>
            <Link 
              href="#" 
              className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              <Compass className="h-4 w-4" />
              <span>Explorer</span>
            </Link>
            
            <div className="px-4 mt-6 mb-2 text-xs font-medium text-muted-foreground">
              Account
            </div>
            <Link 
              href="#" 
              className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </nav>
          
          <div className="p-4 border-t">
            <WalletConnectButton />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}