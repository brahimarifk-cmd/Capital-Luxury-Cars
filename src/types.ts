export type TabType = 'home' | 'task' | 'team' | 'vip' | 'me';
export type Language = 'ar' | 'en';

export interface VIPTier {
  level: string;
  price: number;
  daily: number;
  total: number;
  car: string;
  image: string;
}

export interface PaymentRequest {
  level: string;
  cost: number;
  type: 'upgrade' | 'recharge';
}

export interface TransactionRecord {
  id: string;
  type: string;
  amount: number;
  date: string;
  status: 'Success' | 'Pending' | 'Rejected' | 'Pending (24h)';
  note?: string;
}

export interface LivePayout {
  id: number;
  user: string;
  vip: string;
  amount: number;
}

export interface CryptoWallet {
  name: string;
  network: string;
  address: string;
  iconName: string;
  color: string;
}

export interface UserState {
  isAuthenticated: boolean;
  currentUser: string | null;
  userId: string;
  userEmail: string;
  authMethod: 'email' | 'phone';
  balance: number;
  rechargeAmount: number;
  vipLevel: string; // 'VIP0', 'VIP1', etc.
  taskCompletedAt: number | null;
  maxDailyTasks: number;
  teamSize: number;
  teamRecharge: number;
  teamWithdraw: number;
  inviteCode: string;
  luckyDrawRemaining: number;
  luckyDrawLastUsedAt: number | null;
  records: TransactionRecord[];
}
