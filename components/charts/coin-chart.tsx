'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { gsap } from 'gsap';
import { format } from 'date-fns';
import { mockChartData } from '@/data/mock-data';
import { cn } from '@/lib/utils';

type TimeframeKey = '24h' | '7d' | '30d' | '90d' | '1y';
type CoinKey = 'bitcoin' | 'ethereum' | 'solana' | 'cardano';

const chartTimeframes = [
  { value: '24h', label: '24H' },
  { value: '7d', label: '7D' },
  { value: '30d', label: '30D' },
  { value: '90d', label: '90D' },
  { value: '1y', label: '1Y' },
] as const;

const coins = [
  { value: 'bitcoin', label: 'Bitcoin' },
  { value: 'ethereum', label: 'Ethereum' },
  { value: 'solana', label: 'Solana' },
  { value: 'cardano', label: 'Cardano' },
] as const;

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const date = new Date(label);
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-muted-foreground">
              Date
            </span>
            <span className="font-bold text-xs">
              {format(date, 'MMM dd, yyyy')}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-muted-foreground">
              Price
            </span>
            <span className="font-bold text-xs">
              ${payload[0].value?.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-muted-foreground">
              Volume
            </span>
            <span className="font-bold text-xs">
              ${payload[1]?.value?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export function CoinChart() {
  const [timeframe, setTimeframe] = useState<TimeframeKey>('7d');
  const [selectedCoin, setSelectedCoin] = useState<CoinKey>('bitcoin');
  const [chartType, setChartType] = useState('price');
  const [chartData, setChartData] = useState(mockChartData[selectedCoin][timeframe]);
  
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setChartData(mockChartData[selectedCoin][timeframe]);
    
    if (chartRef.current) {
      gsap.fromTo(
        chartRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [timeframe, selectedCoin, chartType]);

  return (
    <Card className="overflow-hidden backdrop-blur-sm bg-black/40 border-slate-800 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col">
            <CardTitle className="text-lg font-medium">{coins.find(c => c.value === selectedCoin)?.label} Chart</CardTitle>
            <p className="text-sm text-muted-foreground">
              {timeframe === '24h' ? 'Last 24 hours' : 
               timeframe === '7d' ? 'Last 7 days' : 
               timeframe === '30d' ? 'Last 30 days' : 
               timeframe === '90d' ? 'Last 90 days' : 'Last year'} price movement
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Select
              defaultValue={selectedCoin}
              onValueChange={(value) => setSelectedCoin(value as CoinKey)}
            >
              <SelectTrigger className="w-[130px] h-8 border-transparent bg-muted/30">
                <SelectValue placeholder="Select coin" />
              </SelectTrigger>
              <SelectContent>
                {coins.map(coin => (
                  <SelectItem key={coin.value} value={coin.value}>
                    {coin.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Tabs defaultValue="price" value={chartType} onValueChange={setChartType}>
              <TabsList className="h-8 bg-muted/30">
                <TabsTrigger value="price" className="h-7 text-xs">Price</TabsTrigger>
                <TabsTrigger value="volume" className="h-7 text-xs">Volume</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-end">
          <div className="flex items-center">
            {chartTimeframes.map((tf) => (
              <button
                key={tf.value}
                className={cn(
                  "px-3 py-1 text-xs rounded-md transition-colors",
                  timeframe === tf.value ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setTimeframe(tf.value as TimeframeKey)}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>
        
        <div ref={chartRef} className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" opacity={0.1} />
              <XAxis 
                dataKey="date" 
                tickFormatter={(tick) => format(new Date(tick), timeframe === '24h' ? 'HH:mm' : 'MMM dd')}
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                minTickGap={20}
              />
              <YAxis 
                domain={['auto', 'auto']}
                tickFormatter={(tick) => `$${tick.toLocaleString()}`} 
                width={60}
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              {chartType === 'price' ? (
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="hsl(var(--chart-1))" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: 'hsl(var(--chart-1))', strokeWidth: 0 }}
                  fill="url(#colorPrice)"
                />
              ) : (
                <Line 
                  type="monotone" 
                  dataKey="volume" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: 'hsl(var(--chart-2))', strokeWidth: 0 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}