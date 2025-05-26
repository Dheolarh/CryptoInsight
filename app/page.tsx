import { DashboardHero } from '@/components/dashboard/dashboard-hero';
import { PriceOverview } from '@/components/dashboard/price-overview';
import { TokenStatistics } from '@/components/dashboard/token-statistics';
import { TransactionsTable } from '@/components/dashboard/transactions-table';
import { CoinChart } from '@/components/charts/coin-chart';
import { NetworkActivity } from '@/components/dashboard/network-activity';
import { TrendingCoins } from '@/components/dashboard/trending-coins';
import { WalletOverview } from '@/components/wallet/wallet-overview';
import { SwapInterface } from '@/components/swap/swap-interface';
import { BridgeInterface } from '@/components/bridge/bridge-interface';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col px-4 py-8 md:px-6 lg:px-8">
      <DashboardHero />
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
        <PriceOverview />
        <TokenStatistics />
        <NetworkActivity />
        <TrendingCoins />
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-8">
        <div className="lg:col-span-2">
          <CoinChart />
        </div>
        <div className="lg:col-span-1">
          <WalletOverview />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
        <SwapInterface />
        <BridgeInterface />
      </div>
      
      <div className="w-full">
        <TransactionsTable />
      </div>
    </main>
  );
}