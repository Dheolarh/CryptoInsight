'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight } from 'lucide-react';
import { useWeb3 } from '@/context/web3-context';
import { COIN_IMAGES, NETWORK_IMAGES } from '@/lib/constants';

export function BridgeInterface() {
  const { isConnected } = useWeb3();
  const [fromNetwork, setFromNetwork] = useState('Ethereum');
  const [toNetwork, setToNetwork] = useState('Solana');
  const [token, setToken] = useState('ETH');
  const [amount, setAmount] = useState('');

  if (!isConnected) {
    return null;
  }

  return (
    <Card className="overflow-hidden backdrop-blur-sm bg-black/40 border-slate-800 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Bridge Assets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">From Network</label>
            <Select value={fromNetwork} onValueChange={setFromNetwork}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Image
                    src={NETWORK_IMAGES[fromNetwork as keyof typeof NETWORK_IMAGES]}
                    alt={fromNetwork}
                    width={20}
                    height={20}
                  />
                  <SelectValue placeholder="Select network" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {Object.entries(NETWORK_IMAGES).map(([network, image]) => (
                  <SelectItem key={network} value={network}>
                    <div className="flex items-center gap-2">
                      <Image
                        src={image}
                        alt={network}
                        width={20}
                        height={20}
                      />
                      {network}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">To Network</label>
            <Select value={toNetwork} onValueChange={setToNetwork}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Image
                    src={NETWORK_IMAGES[toNetwork as keyof typeof NETWORK_IMAGES]}
                    alt={toNetwork}
                    width={20}
                    height={20}
                  />
                  <SelectValue placeholder="Select network" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {Object.entries(NETWORK_IMAGES).map(([network, image]) => (
                  <SelectItem key={network} value={network}>
                    <div className="flex items-center gap-2">
                      <Image
                        src={image}
                        alt={network}
                        width={20}
                        height={20}
                      />
                      {network}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Token</label>
            <div className="flex gap-2">
              <Select value={token} onValueChange={setToken}>
                <SelectTrigger className="w-[120px]">
                  <div className="flex items-center gap-2">
                    <Image
                      src={COIN_IMAGES[token as keyof typeof COIN_IMAGES]}
                      alt={token}
                      width={20}
                      height={20}
                    />
                    <SelectValue placeholder="Select token" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(COIN_IMAGES).map(([symbol, image]) => (
                    <SelectItem key={symbol} value={symbol}>
                      <div className="flex items-center gap-2">
                        <Image
                          src={image}
                          alt={symbol}
                          width={20}
                          height={20}
                        />
                        {symbol}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input 
                type="number" 
                placeholder="0.0" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              Bridge Assets
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}