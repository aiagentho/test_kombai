import { PlanType, PaymentStatus, UserRole } from './enums';

// Props types (data passed to components)
export interface PropTypes {
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    avatar: string;
    plan: PlanType;
    credits: number;
    createdAt: string;
    lastLogin: string;
  };
  
  subscription: {
    id: string;
    planType: PlanType;
    status: string;
    currentPeriodStart: string;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
  };
  
  pricingPlan: {
    id: string;
    name: string;
    type: PlanType;
    price: number;
    currency: string;
    interval: string;
    features: string[];
    limits: UsageLimits;
  };
  
  paymentRecord: {
    id: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    description: string;
    date: string;
    invoiceUrl: string;
  };
}

// Store types (global state data)
export interface StoreTypes {
  auth: {
    user: PropTypes['user'] | null;
    isAuthenticated: boolean;
    loading: boolean;
  };
  
  billing: {
    subscription: PropTypes['subscription'] | null;
    credits: number;
    usage: UsageData;
    limits: UsageLimits;
  };
  
  ui: {
    sidebarOpen: boolean;
    theme: 'light' | 'dark';
    notifications: Notification[];
  };
}

// Query types (API response data)
export interface QueryTypes {
  usageStats: {
    date: string;
    apiCalls: number;
    storage: number;
    bandwidth: number;
  }[];
  
  paymentHistory: PropTypes['paymentRecord'][];
  
  pricingPlans: PropTypes['pricingPlan'][];
  
  userProfile: PropTypes['user'];
  
  subscriptionDetails: PropTypes['subscription'];
}

// Supporting interfaces
interface UsageData {
  currentMonth: {
    apiCalls: number;
    storage: number;
    bandwidth: number;
    users: number;
  };
}

interface UsageLimits {
  apiCalls: number;
  storage: number;
  bandwidth: number;
  users: number;
}

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: string;
  read: boolean;
}