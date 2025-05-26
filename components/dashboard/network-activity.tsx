'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { InfoIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';

export function NetworkActivity() {
  const [activeNetworks, setActiveNetworks] = useState([
    { id: 'ethereum', name: 'Ethereum', tps: 15, maxTps: 20, load: 75, color: 'bg-blue-500' },
    { id: 'polygon', name: 'Polygon', tps: 1250, maxTps: 7000, load: 18, color: 'bg-purple-500' },
    { id: 'solana', name: 'Solana', tps: 1800, maxTps: 50000, load: 4, color: 'bg-emerald-500' },
    { id: 'avalanche', name: 'Avalanche', tps: 4500, maxTps: 6500, load: 69, color: 'bg-red-500' }
  ]);
  
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    progressRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { width: 0 },
          { 
            width: `${activeNetworks[index].load}%`, 
            duration: 1.5, 
            ease: 'power3.out' 
          }
        );
      }
    });
  }, []);

  return (
    <Card className="overflow-hidden backdrop-blur-sm bg-black/40 border-slate-800 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium">Network Activity</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-[200px]">
                  Real-time blockchain network activity showing current transaction load relative to maximum capacity.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {activeNetworks.map((network, index) => (
          <div key={network.id} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>{network.name}</span>
              <span className="text-muted-foreground">
                {network.tps} / {network.maxTps} TPS
              </span>
            </div>
            <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
              <div 
                ref={el => progressRefs.current[index] = el}
                className={cn("h-full rounded-full", network.color)}
                style={{ width: `${network.load}%` }}
              />
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Current Load</span>
              <span className={cn(
                network.load > 80 ? "text-red-400" : 
                network.load > 50 ? "text-amber-400" : 
                "text-emerald-400"
              )}>
                {network.load}%
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}