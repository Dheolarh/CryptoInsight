'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';

interface MiniChartProps {
  data: { date: string; value: number }[];
  isPositive: boolean;
}

export function MiniChart({ data, isPositive }: MiniChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (chartRef.current) {
      gsap.fromTo(
        chartRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' }
      );
    }
  }, [data]);
  
  return (
    <div ref={chartRef} className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop 
                offset="5%" 
                stopColor={isPositive ? "rgb(52, 211, 153)" : "rgb(248, 113, 113)"} 
                stopOpacity={0.3} 
              />
              <stop 
                offset="95%" 
                stopColor={isPositive ? "rgb(52, 211, 153)" : "rgb(248, 113, 113)"} 
                stopOpacity={0} 
              />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={isPositive ? "rgb(52, 211, 153)" : "rgb(248, 113, 113)"}
            fillOpacity={1}
            fill="url(#colorUv)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}