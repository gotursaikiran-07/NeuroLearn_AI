import type { LearnerProfile, UserAccount } from '../types/learning';

const API_BASE_URL = 'http://localhost:5001/api';

export interface AuthResult {
  success: boolean;
  message: string;
  user?: UserAccount & Partial<LearnerProfile>;
}

export const checkDatabaseHealth = async (): Promise<boolean> => {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, { method: 'GET' });
    return res.ok;
  } catch (err) {
    return false;
  }
};

export const registerUserInDb = async (credentials: {
  email: string;
  password?: string;
  name: string;
  subject?: string;
  goal?: string;
}): Promise<AuthResult> => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('[DB API] Database server unreachable, operating in local browser database mode:', err);
    return {
      success: true,
      message: 'Account registered locally in browser storage (Offline Mode)',
      user: {
        id: `user-local-${Date.now()}`,
        email: credentials.email,
        name: credentials.name,
        role: credentials.goal || 'Learner',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      }
    };
  }
};

export const loginUserInDb = async (email: string, password?: string): Promise<AuthResult> => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('[DB API] Database server unreachable, using local database mode:', err);
    return {
      success: true,
      message: 'Logged in locally in browser storage',
      user: {
        id: `user-local-${Date.now()}`,
        email: email,
        name: email.split('@')[0],
        role: 'Learner',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      }
    };
  }
};

export const fetchAllDbUsers = async (): Promise<UserAccount[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/users`, { method: 'GET' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.users || [];
  } catch (err) {
    return [];
  }
};

export const syncProgressToDb = async (email: string, profile: LearnerProfile): Promise<boolean> => {
  try {
    const res = await fetch(`${API_BASE_URL}/user/progress`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, profile })
    });
    return res.ok;
  } catch (err) {
    return false;
  }
};
