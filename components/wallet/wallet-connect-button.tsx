'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, ChevronDown } from 'lucide-react';
import { useWeb3 } from '@/context/web3-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

export function WalletConnectButton() {
  const { isConnected, account, connect, disconnect } = useWeb3();

  const handleConnect = async () => {
    try {
      await connect();
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been connected successfully.",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Could not connect to wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  if (!isConnected) {
    return (
      <Button 
        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0"
        onClick={handleConnect}
      >
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-slate-700 bg-slate-800/50">
          <Wallet className="mr-2 h-4 w-4" />
          {account?.substring(0, 6)}...{account?.substring(account.length - 4)}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[220px]">
        <DropdownMenuLabel>My Wallet</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          View Account
        </DropdownMenuItem>
        <DropdownMenuItem>
          Transaction History
        </DropdownMenuItem>
        <DropdownMenuItem>
          Portfolio
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDisconnect} className="text-destructive focus:text-destructive">
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}