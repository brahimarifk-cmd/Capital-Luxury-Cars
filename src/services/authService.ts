import { UserState } from '../types';

export interface RegisteredUser {
  identifier: string;
  method: 'email' | 'phone';
  password: string;
  createdAt: number;
  userState?: UserState;
}

const REGISTERED_USERS_KEY = 'clc_registered_users_v1';

export function normalizeIdentifier(identifier: string, method: 'email' | 'phone'): string {
  if (method === 'email') {
    return identifier.trim().toLowerCase();
  }
  return identifier.trim();
}

export function getRegisteredUsers(): RegisteredUser[] {
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to read registered users', err);
  }

  // Initial seed user if none exists
  const defaultUser: RegisteredUser = {
    identifier: 'demo_user@luxurycars.vip',
    method: 'email',
    password: 'password123',
    createdAt: Date.now(),
    userState: {
      isAuthenticated: true,
      currentUser: 'demo_user@luxurycars.vip',
      userId: '7492105',
      userEmail: 'demo_user@luxurycars.vip',
      authMethod: 'email',
      balance: 15.50,
      rechargeAmount: 0.0,
      vipLevel: 'VIP0',
      taskCompletedAt: null,
      maxDailyTasks: 1,
      teamSize: 4,
      teamRecharge: 0.0,
      teamWithdraw: 0.0,
      inviteCode: 'CLC749210',
      luckyDrawRemaining: 1,
      luckyDrawLastUsedAt: null,
      records: [],
    },
  };

  try {
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify([defaultUser]));
  } catch {}

  return [defaultUser];
}

export function saveRegisteredUsers(users: RegisteredUser[]): void {
  try {
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to save registered users', err);
  }
}

export function findRegisteredUser(identifier: string): RegisteredUser | undefined {
  const users = getRegisteredUsers();
  const lower = identifier.trim().toLowerCase();
  return users.find((u) => u.identifier.trim().toLowerCase() === lower);
}

export function registerNewUser(
  rawIdentifier: string,
  method: 'email' | 'phone',
  password: string,
  inviteCode: string = '777777'
): { success: boolean; error?: string; user?: RegisteredUser } {
  const normalized = normalizeIdentifier(rawIdentifier, method);
  const users = getRegisteredUsers();

  const existing = users.find((u) => u.identifier.toLowerCase() === normalized.toLowerCase());
  if (existing) {
    return {
      success: false,
      error: 'EXISTS',
    };
  }

  const generatedUserId = String(Math.floor(1000000 + Math.random() * 9000000));
  const generatedInvite = 'CLC' + Math.floor(100000 + Math.random() * 900000);

  const newUser: RegisteredUser = {
    identifier: normalized,
    method,
    password: password.trim(),
    createdAt: Date.now(),
    userState: {
      isAuthenticated: true,
      currentUser: normalized,
      userId: generatedUserId,
      userEmail: normalized,
      authMethod: method,
      balance: 0.0,
      rechargeAmount: 0.0,
      vipLevel: 'VIP0',
      taskCompletedAt: null,
      maxDailyTasks: 1,
      teamSize: 0,
      teamRecharge: 0.0,
      teamWithdraw: 0.0,
      inviteCode: generatedInvite,
      luckyDrawRemaining: 1,
      luckyDrawLastUsedAt: null,
      records: [],
    },
  };

  const updated = [newUser, ...users];
  saveRegisteredUsers(updated);

  return {
    success: true,
    user: newUser,
  };
}

export function authenticateUser(
  rawIdentifier: string,
  password: string
): { success: boolean; error?: string; user?: RegisteredUser } {
  const trimmedId = rawIdentifier.trim();
  const trimmedPass = password.trim();
  const users = getRegisteredUsers();

  const user = users.find((u) => u.identifier.toLowerCase() === trimmedId.toLowerCase());
  if (!user) {
    return {
      success: false,
      error: 'NOT_FOUND',
    };
  }

  if (user.password !== trimmedPass) {
    return {
      success: false,
      error: 'WRONG_PASSWORD',
    };
  }

  return {
    success: true,
    user,
  };
}

export function updateUserStateInStorage(identifier: string, newState: UserState): void {
  try {
    const users = getRegisteredUsers();
    const index = users.findIndex(
      (u) => u.identifier.toLowerCase() === identifier.trim().toLowerCase()
    );
    if (index !== -1) {
      users[index].userState = newState;
      saveRegisteredUsers(users);
    }
  } catch (err) {
    console.error('Failed to update user state in storage', err);
  }
}
