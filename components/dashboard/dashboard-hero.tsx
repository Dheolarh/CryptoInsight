'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { ArrowRight, Coins, TrendingUp, Globe, Shield } from 'lucide-react';
import { useWeb3 } from '@/context/web3-context';

export function DashboardHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { isConnected } = useWeb3();
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.from('.hero-title', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      });
      
      tl.from('.hero-subtitle', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.3');
      
      tl.from('.hero-buttons', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.3');
      
      tl.from('.hero-stat', {
        y: 20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out'
      }, '-=0.3');
      
    }, heroRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={heroRef}
      className="mb-12 mt-6 w-full rounded-xl overflow-hidden"
    >
      <div className="relative flex flex-col items-center text-center p-8 md:p-12 rounded-xl bg-gradient-to-br from-indigo-950/70 via-violet-900/60 to-slate-900/70 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:16px] opacity-20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-full h-full bg-gradient-radial from-indigo-500/10 via-transparent to-transparent opacity-80 blur-2xl"></div>
          <div className="absolute w-full h-full bg-gradient-radial from-purple-500/5 via-transparent to-transparent opacity-80 blur-3xl"></div>
        </div>
        
        <h1 className="hero-title text-3xl md:text-4xl lg:text-5xl font-bold mb-4 z-10">
          Real-time Blockchain Analytics
        </h1>
        <p className="hero-subtitle max-w-2xl mb-8 text-md md:text-lg text-muted-foreground z-10">
          Dive into comprehensive data analytics, real-time market trends, and blockchain insights with our advanced dashboards and interactive tools.
        </p>
        
        {!isConnected && (
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 mb-10 z-10">
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0">
              Connect Wallet
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="border-white/20 hover:bg-white/10">
              Explore Markets
            </Button>
          </div>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-4xl z-10">
          <div className="hero-stat flex flex-col items-center p-4 rounded-lg bg-white/5 backdrop-blur-sm">
            <Coins className="h-6 w-6 mb-2 text-indigo-400" />
            <p className="text-sm text-muted-foreground">Active Markets</p>
            <p className="text-2xl font-bold">100+</p>
          </div>
          <div className="hero-stat flex flex-col items-center p-4 rounded-lg bg-white/5 backdrop-blur-sm">
            <TrendingUp className="h-6 w-6 mb-2 text-purple-400" />
            <p className="text-sm text-muted-foreground">24h Volume</p>
            <p className="text-2xl font-bold">$24.6B</p>
          </div>
          <div className="hero-stat flex flex-col items-center p-4 rounded-lg bg-white/5 backdrop-blur-sm">
            <Globe className="h-6 w-6 mb-2 text-blue-400" />
            <p className="text-sm text-muted-foreground">Global Users</p>
            <p className="text-2xl font-bold">3.2M+</p>
          </div>
          <div className="hero-stat flex flex-col items-center p-4 rounded-lg bg-white/5 backdrop-blur-sm">
            <Shield className="h-6 w-6 mb-2 text-emerald-400" />
            <p className="text-sm text-muted-foreground">Secure Protocols</p>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>
      </div>
    </div>
  );
}