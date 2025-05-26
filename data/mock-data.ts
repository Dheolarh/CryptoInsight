// Mock data for the application
// In a real application, this would be replaced with API calls to fetch real data

// Price overview data
export const mockCryptoPrices = {
  BTC: {
    price: 53256.78,
    priceChange: 2.34,
    high24h: 54123.45,
    low24h: 52198.76,
    marketCap: '$1.02T',
    volume24h: '$24.8B',
    chartData: Array.from({ length: 24 }, (_, i) => ({
      date: new Date(Date.now() - (24 - i) * 3600000).toISOString(),
      value: 52000 + Math.random() * 2000,
    })),
  },
  ETH: {
    price: 3456.23,
    priceChange: -1.23,
    high24h: 3512.45,
    low24h: 3405.67,
    marketCap: '$416.2B',
    volume24h: '$12.4B',
    chartData: Array.from({ length: 24 }, (_, i) => ({
      date: new Date(Date.now() - (24 - i) * 3600000).toISOString(),
      value: 3400 + Math.random() * 200,
    })),
  },
  SOL: {
    price: 124.56,
    priceChange: 5.67,
    high24h: 128.90,
    low24h: 118.34,
    marketCap: '$54.3B',
    volume24h: '$3.2B',
    chartData: Array.from({ length: 24 }, (_, i) => ({
      date: new Date(Date.now() - (24 - i) * 3600000).toISOString(),
      value: 115 + Math.random() * 15,
    })),
  },
  DOGE: {
    price: 0.123,
    priceChange: 12.34,
    high24h: 0.135,
    low24h: 0.112,
    marketCap: '$17.5B',
    volume24h: '$2.1B',
    chartData: Array.from({ length: 24 }, (_, i) => ({
      date: new Date(Date.now() - (24 - i) * 3600000).toISOString(),
      value: 0.11 + Math.random() * 0.03,
    })),
  },
};

// Token statistics data
export const mockTokenStats = {
  bitcoin: [
    { label: 'Market Cap', value: '$1.02T', change: 2.34 },
    { label: 'Volume (24h)', value: '$24.8B', change: 5.67 },
    { label: 'Circulating Supply', value: '19.45M BTC', change: 0.12 },
    { label: 'Max Supply', value: '21M BTC', change: 0 },
    { label: 'Fully Diluted Valuation', value: '$1.12T', change: 2.34 },
  ],
  ethereum: [
    { label: 'Market Cap', value: '$416.2B', change: -1.23 },
    { label: 'Volume (24h)', value: '$12.4B', change: -3.45 },
    { label: 'Circulating Supply', value: '120.5M ETH', change: 0.35 },
    { label: 'Max Supply', value: 'Unlimited', change: 0 },
    { label: 'Fully Diluted Valuation', value: 'N/A', change: 0 },
  ],
};

// Trending coins data
export const mockTrendingCoins = [
  { name: 'Bitcoin', symbol: 'BTC', price: 53256.78, change: 2.34 },
  { name: 'Ethereum', symbol: 'ETH', price: 3456.23, change: -1.23 },
  { name: 'Solana', symbol: 'SOL', price: 124.56, change: 5.67 },
  { name: 'Cardano', symbol: 'ADA', price: 0.45, change: -2.34 },
  { name: 'Dogecoin', symbol: 'DOGE', price: 0.123, change: 12.34 },
];

// Transaction data
export const mockTransactions = [
  {
    id: '1',
    hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    type: 'transfer',
    asset: 'ETH',
    amount: 0.5,
    amountUsd: '1,728.12',
    address: '0xabcdef1234567890abcdef1234567890abcdef12',
    time: '10 mins ago',
    status: 'confirmed',
  },
  {
    id: '2',
    hash: '0x2345678901abcdef2345678901abcdef2345678901abcdef2345678901abcdef',
    type: 'swap',
    asset: 'ETH',
    amount: 0.25,
    amountUsd: '864.06',
    address: '0xbcdef1234567890abcdef1234567890abcdef123',
    time: '25 mins ago',
    status: 'confirmed',
  },
  {
    id: '3',
    hash: '0x3456789012abcdef3456789012abcdef3456789012abcdef3456789012abcdef',
    type: 'transfer',
    asset: 'BTC',
    amount: 0.02,
    amountUsd: '1,065.14',
    address: '0xcdef1234567890abcdef1234567890abcdef1234',
    time: '1 hour ago',
    status: 'confirmed',
  },
  {
    id: '4',
    hash: '0x4567890123abcdef4567890123abcdef4567890123abcdef4567890123abcdef',
    type: 'swap',
    asset: 'SOL',
    amount: 10,
    amountUsd: '1,245.60',
    address: '0xdef1234567890abcdef1234567890abcdef12345',
    time: '2 hours ago',
    status: 'confirmed',
  },
  {
    id: '5',
    hash: '0x5678901234abcdef5678901234abcdef5678901234abcdef5678901234abcdef',
    type: 'transfer',
    asset: 'USDT',
    amount: 1000,
    amountUsd: '1,000.00',
    address: '0xef1234567890abcdef1234567890abcdef123456',
    time: '3 hours ago',
    status: 'pending',
  },
  {
    id: '6',
    hash: '0x6789012345abcdef6789012345abcdef6789012345abcdef6789012345abcdef',
    type: 'transfer',
    asset: 'ETH',
    amount: 1.5,
    amountUsd: '5,184.35',
    address: '0xf1234567890abcdef1234567890abcdef1234567',
    time: '5 hours ago',
    status: 'confirmed',
  },
  {
    id: '7',
    hash: '0x7890123456abcdef7890123456abcdef7890123456abcdef7890123456abcdef',
    type: 'swap',
    asset: 'BTC',
    amount: 0.05,
    amountUsd: '2,662.84',
    address: '0x1234567890abcdef1234567890abcdef12345678',
    time: '6 hours ago',
    status: 'failed',
  },
];

// Chart data
export const generateChartData = (basePrice: number, volatility: number, days: number) => {
  const data = [];
  const now = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - (days - i));
    
    const price = basePrice + (Math.random() - 0.5) * 2 * volatility * basePrice;
    const volume = Math.random() * basePrice * 50000;
    
    data.push({
      date: date.toISOString(),
      price,
      volume,
    });
  }
  
  return data;
};

// Chart data for different coins and timeframes
export const mockChartData = {
  bitcoin: {
    '24h': generateChartData(53000, 0.02, 24),
    '7d': generateChartData(53000, 0.05, 7),
    '30d': generateChartData(53000, 0.1, 30),
    '90d': generateChartData(53000, 0.2, 90),
    '1y': generateChartData(53000, 0.5, 365),
  },
  ethereum: {
    '24h': generateChartData(3400, 0.02, 24),
    '7d': generateChartData(3400, 0.05, 7),
    '30d': generateChartData(3400, 0.1, 30),
    '90d': generateChartData(3400, 0.2, 90),
    '1y': generateChartData(3400, 0.5, 365),
  },
  solana: {
    '24h': generateChartData(120, 0.03, 24),
    '7d': generateChartData(120, 0.06, 7),
    '30d': generateChartData(120, 0.12, 30),
    '90d': generateChartData(120, 0.25, 90),
    '1y': generateChartData(120, 0.6, 365),
  },
  cardano: {
    '24h': generateChartData(0.45, 0.03, 24),
    '7d': generateChartData(0.45, 0.06, 7),
    '30d': generateChartData(0.45, 0.12, 30),
    '90d': generateChartData(0.45, 0.25, 90),
    '1y': generateChartData(0.45, 0.6, 365),
  }
};