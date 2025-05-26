'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownRight, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';
import { mockTrendingCoins } from '@/data/mock-data';

export function TrendingCoins() {
  const listRef = useRef<HTMLUListElement>(null);
  
  useEffect(() => {
    if (listRef.current) {
      gsap.from(listRef.current.children, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }
  }, []);

  return (
    <Card className="overflow-hidden backdrop-blur-sm bg-black/40 border-slate-800 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium">Trending Coins</CardTitle>
          <Badge 
            variant="outline" 
            className="text-xs font-normal text-muted-foreground border-muted/50"
          >
            24h Change
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-2">
        <ul ref={listRef} className="divide-y divide-border/10">
          {mockTrendingCoins.map((coin) => (
            <li key={coin.symbol} className="flex items-center justify-between py-2 px-2 hover:bg-muted/20 rounded-md cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-muted/30 flex items-center justify-center">
                  <span className="text-xs font-medium">{coin.symbol}</span>
                </div>
                <div>
                  <div className="text-sm font-medium">{coin.name}</div>
                  <div className="text-xs text-muted-foreground">${coin.price.toFixed(2)}</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className={cn(
                  "flex items-center text-xs gap-0.5",
                  coin.change > 0 ? "text-emerald-500" : "text-red-500"
                )}>
                  {coin.change > 0 ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {Math.abs(coin.change).toFixed(2)}%
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground ml-2" />
              </div>
            </li>
          ))}
        </ul>
        <button className="w-full text-center text-xs text-muted-foreground hover:text-primary py-2 transition-colors">
          View All Markets
        </button>
      </CardContent>
    </Card>
  );
}