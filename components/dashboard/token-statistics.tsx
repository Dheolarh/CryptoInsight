'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { gsap } from 'gsap';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockTokenStats } from '@/data/mock-data';

export function TokenStatistics() {
  const [currentStat, setCurrentStat] = useState('bitcoin');
  const statsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (statsRef.current) {
      gsap.from(statsRef.current.querySelectorAll('.stat-item'), {
        y: 20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }
  }, [currentStat]);

  return (
    <Card className="overflow-hidden backdrop-blur-sm bg-black/40 border-slate-800 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium">Token Statistics</CardTitle>
          <div className="flex space-x-1">
            <button
              className={cn(
                "px-2 py-1 text-xs rounded-md transition-colors",
                currentStat === 'bitcoin' ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setCurrentStat('bitcoin')}
            >
              Bitcoin
            </button>
            <button
              className={cn(
                "px-2 py-1 text-xs rounded-md transition-colors",
                currentStat === 'ethereum' ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setCurrentStat('ethereum')}
            >
              Ethereum
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div ref={statsRef} className="space-y-3">
          {mockTokenStats[currentStat as keyof typeof mockTokenStats].map((stat, index) => (
            <div key={index} className="stat-item flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">{stat.label}</span>
                <span className="font-medium">{stat.value}</span>
              </div>
              <div className={cn(
                "flex items-center text-xs gap-1",
                stat.change > 0 ? "text-emerald-500" : "text-red-500"
              )}>
                {stat.change > 0 ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {Math.abs(stat.change).toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}