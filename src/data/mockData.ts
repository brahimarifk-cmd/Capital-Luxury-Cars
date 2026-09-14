import { VIPTier, CryptoWallet, LivePayout } from '../types';

export const MIN_WITHDRAWAL_AMOUNT = 10; // 10 USDT minimum
export const WITHDRAWAL_REQUIRED_VIP = 'VIP1'; // VIP1 upgrade required

export const VIP_TIERS: VIPTier[] = [
  {
    level: 'VIP0',
    price: 0,
    daily: 1.50,
    total: 150.00,
    car: 'Toyota GR Supra',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80',
  },
  {
    level: 'VIP1',
    price: 15.00,
    daily: 7.50,
    total: 750.00,
    car: 'Mercedes-AMG GT',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80',
  },
  {
    level: 'VIP2',
    price: 60.00,
    daily: 32.00,
    total: 3200.00,
    car: 'Porsche 911 GT3',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=600&q=80',
  },
  {
    level: 'VIP3',
    price: 200.00,
    daily: 105.00,
    total: 10500.00,
    car: 'Ferrari F8 Tributo',
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=600&q=80',
  },
  {
    level: 'VIP4',
    price: 550.00,
    daily: 310.00,
    total: 31000.00,
    car: 'Lamborghini Huracán',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=600&q=80',
  },
  {
    level: 'VIP5',
    price: 1500.00,
    daily: 900.00,
    total: 90000.00,
    car: 'McLaren 720S',
    image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=600&q=80',
  },
  {
    level: 'VIP6',
    price: 4000.00,
    daily: 2500.00,
    total: 250000.00,
    car: 'Bugatti Chiron',
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=600&q=80',
  },
  {
    level: 'VIP7',
    price: 10000.00,
    daily: 6800.00,
    total: 680000.00,
    car: 'Koenigsegg Jesko',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80',
  },
  {
    level: 'VIP8',
    price: 25000.00,
    daily: 18000.00,
    total: 1800000.00,
    car: 'Pagani Huayra R',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
  },
  {
    level: 'VIP9',
    price: 60000.00,
    daily: 45000.00,
    total: 4500000.00,
    car: 'Rolls-Royce Boat Tail',
    image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=600&q=80',
  },
];

export const CRYPTO_WALLETS: CryptoWallet[] = [
  {
    name: 'Solana / Crypto',
    network: 'SOL',
    address: '2gftizUow1pj1Zxm4tenpPg9uUM2MbnCrBfVTR2fM7sk',
    iconName: 'Sun',
    color: 'purple',
  },
  {
    name: 'Ethereum / EVM',
    network: 'ERC20 / BEP20',
    address: '0x1d0e4b1da6a359323b8062d0db620fb86a054535',
    iconName: 'Gem',
    color: 'blue',
  },
  {
    name: 'Tron / TRC20',
    network: 'TRC20',
    address: 'TZ59apGTCsnp3X3gz2PiBh26QVW5K2aq9Q',
    iconName: 'Zap',
    color: 'red',
  },
];

export const INITIAL_PAYOUTS: LivePayout[] = [
  { id: 1, user: '+447******8124', vip: 'VIP4', amount: 1460.00 },
  { id: 2, user: '+120******9311', vip: 'VIP2', amount: 96.00 },
  { id: 3, user: 'ale******@gmail.com', vip: 'VIP7', amount: 12450.00 },
  { id: 4, user: '+971******4492', vip: 'VIP5', amount: 2850.00 },
  { id: 5, user: 'moh******@yahoo.com', vip: 'VIP1', amount: 25.50 },
];
