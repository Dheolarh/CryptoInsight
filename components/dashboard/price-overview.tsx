'use client';

import { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { MiniChart } from '@/components/charts/mini-chart';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/formatters';
import { mockCryptoPrices } from '@/data/mock-data';

export function PriceOverview() {
  const [timeframe, setTimeframe] = useState('24h');
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [priceData, setPriceData] = useState(mockCryptoPrices.BTC);
  
  useEffect(() => {
    // In a real app, this would fetch real data based on the selected coin
    setPriceData(mockCryptoPrices[selectedCoin as keyof typeof mockCryptoPrices]);
  }, [selectedCoin]);
  
  const priceChange = priceData.priceChange;
  const isPositive = priceChange >= 0;

  return (
    <Card className="overflow-hidden backdrop-blur-sm bg-black/40 border-slate-800 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Price Overview</CardTitle>
        <Select
          defaultValue={selectedCoin}
          onValueChange={setSelectedCoin}
        >
          <SelectTrigger className="w-[110px] h-8 border-transparent bg-muted/30">
            <SelectValue placeholder="Select coin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="BTC">Bitcoin</SelectItem>
            <SelectItem value="ETH">Ethereum</SelectItem>
            <SelectItem value="SOL">Solana</SelectItem>
            <SelectItem value="DOGE">Dogecoin</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{formatCurrency(priceData.price)}</h2>
              <Badge 
                variant={isPositive ? "outline" : "destructive"} 
                className={cn(
                  "flex items-center gap-1",
                  isPositive ? "text-emerald-500 border-emerald-500/20" : ""
                )}
              >
                {isPositive ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {Math.abs(priceChange).toFixed(2)}%
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Updated {timeframe === '24h' ? '2 mins ago' : '5 mins ago'}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              className={cn(
                "text-xs px-2 py-1 rounded-md transition-colors",
                timeframe === '1h' ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-primary"
              )}
              onClick={() => setTimeframe('1h')}
            >
              1H
            </button>
            <button 
              className={cn(
                "text-xs px-2 py-1 rounded-md transition-colors",
                timeframe === '24h' ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-primary"
              )}
              onClick={() => setTimeframe('24h')}
            >
              24H
            </button>
            <button 
              className={cn(
                "text-xs px-2 py-1 rounded-md transition-colors",
                timeframe === '7d' ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-primary"
              )}
              onClick={() => setTimeframe('7d')}
            >
              7D
            </button>
          </div>
        </div>
        
        <div className="h-[110px] mt-4">
          <MiniChart data={priceData.chartData} isPositive={isPositive} />
        </div>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3">
          <div className="flex justify-between">
            <span className="text-xs text-muted-foreground">24h High</span>
            <span className="text-xs font-medium">{formatCurrency(priceData.high24h)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-muted-foreground">24h Low</span>
            <span className="text-xs font-medium">{formatCurrency(priceData.low24h)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-muted-foreground">Market Cap</span>
            <span className="text-xs font-medium">{priceData.marketCap}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-muted-foreground">24h Volume</span>
            <span className="text-xs font-medium">{priceData.volume24h}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}