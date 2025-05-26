'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  Cell, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Legend, 
  Tooltip 
} from 'recharts';
import { useWeb3 } from '@/context/web3-context';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';
import { Wallet, PieChart as PieChartIcon, LineChart } from 'lucide-react';

const mockAssets = [
  { name: 'ETH', value: 45, color: 'hsl(var(--chart-1))' },
  { name: 'BTC', value: 30, color: 'hsl(var(--chart-2))' },
  { name: 'SOL', value: 15, color: 'hsl(var(--chart-3))' },
  { name: 'USDT', value: 10, color: 'hsl(var(--chart-4))' }
];

export function WalletOverview() {
  const { isConnected, connect } = useWeb3();
  const chartRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    if (chartRef.current && isConnected) {
      gsap.fromTo(
        chartRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
      );
    }
  }, [isConnected]);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  if (!isConnected) {
    return (
      <Card className="overflow-hidden backdrop-blur-sm bg-black/40 border-slate-800 shadow-lg h-full flex flex-col justify-center">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-muted/20 mb-4">
            <Wallet className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">Connect Your Wallet</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Connect your wallet to view your assets, transactions, and portfolio allocation.
          </p>
          <Button 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0"
            onClick={connect}
          >
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden backdrop-blur-sm bg-black/40 border-slate-800 shadow-lg h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Portfolio Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pie">
          <TabsList className="grid grid-cols-2 h-8 bg-muted/30 mb-4">
            <TabsTrigger value="pie" className="h-7 text-xs">
              <PieChartIcon className="h-3 w-3 mr-1" />
              Pie Chart
            </TabsTrigger>
            <TabsTrigger value="bar" className="h-7 text-xs">
              <LineChart className="h-3 w-3 mr-1" />
              Bar Chart
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pie" className="mt-0">
            <div ref={chartRef} className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={mockAssets}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                  >
                    {mockAssets.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    iconSize={8}
                    iconType="circle"
                    formatter={(value: string) => (
                      <span className="text-xs">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="bar" className="mt-0">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mockAssets}
                  margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                >
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, 'Allocation']}
                    cursor={{ fill: 'hsl(var(--muted))' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {mockAssets.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="p-3 rounded-lg bg-muted/20">
            <p className="text-xs text-muted-foreground">Total Value</p>
            <p className="text-lg font-medium">$12,450.85</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/20">
            <p className="text-xs text-muted-foreground">24h Change</p>
            <p className="text-lg font-medium text-emerald-500">+$547.23</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;

  return (
    <>
      <g>
        <text x={cx} y={cy} dy={-15} textAnchor="middle" fill="hsl(var(--foreground))" className="text-sm">
          {payload.name}
        </text>
        <text x={cx} y={cy} dy={15} textAnchor="middle" fill="hsl(var(--foreground))" className="text-lg font-bold">
          {`${value}%`}
        </text>
      </g>
      <path
        d={`M${cx},${cy - outerRadius - 8} L${cx},${cy - outerRadius - 15}`}
        stroke={fill}
        fill="none"
      />
    </>
  );
};