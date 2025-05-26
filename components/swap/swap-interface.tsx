'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDownUp } from 'lucide-react';
import { useWeb3 } from '@/context/web3-context';
import { COIN_IMAGES } from '@/lib/constants';

export function SwapInterface() {
  const { isConnected } = useWeb3();
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('BTC');
  const [amount, setAmount] = useState('');

  if (!isConnected) {
    return null;
  }

  return (
    <Card className="overflow-hidden backdrop-blur-sm bg-black/40 border-slate-800 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Swap Tokens</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">From</label>
            <div className="flex gap-2">
              <Select value={fromToken} onValueChange={setFromToken}>
                <SelectTrigger className="w-[120px]">
                  <div className="flex items-center gap-2">
                    <Image
                      src={COIN_IMAGES[fromToken as keyof typeof COIN_IMAGES]}
                      alt={fromToken}
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

          <div className="flex justify-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => {
                const temp = fromToken;
                setFromToken(toToken);
                setToToken(temp);
              }}
            >
              <ArrowDownUp className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">To</label>
            <div className="flex gap-2">
              <Select value={toToken} onValueChange={setToToken}>
                <SelectTrigger className="w-[120px]">
                  <div className="flex items-center gap-2">
                    <Image
                      src={COIN_IMAGES[toToken as keyof typeof COIN_IMAGES]}
                      alt={toToken}
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
                value={amount ? (Number(amount) * 0.99).toFixed(6) : ''} 
                disabled
                className="flex-1"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              Swap Tokens
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}