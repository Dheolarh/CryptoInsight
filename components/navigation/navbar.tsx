'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search } from '@/components/ui/search';
import { MobileMenu } from '@/components/navigation/mobile-menu';
import { BarChart3, Bell, Wallet, Menu } from 'lucide-react';
import { WalletConnectButton } from '@/components/wallet/wallet-connect-button';
import { useWeb3 } from '@/context/web3-context';
import { NotificationsPopover } from '@/components/navigation/notifications-popover';

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isConnected, account } = useWeb3();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-lg border-b' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="hidden md:inline-block">CryptoInsight</span>
          </Link>
          
          <nav className="ml-8 hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Markets
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Portfolio
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Explorer
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Search />
          <NotificationsPopover />
          <WalletConnectButton />
        </div>

        <div className="flex md:hidden items-center gap-2">
          <Button variant="ghost" size="icon" className="text-foreground">
            <Bell className="h-5 w-5" />
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}