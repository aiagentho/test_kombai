import { PlanType, PaymentStatus, UserRole, AuthProvider } from '../types/enums';

// Data for global state store
export const mockStore = {
  user: {
    id: "user-123",
    email: "john.doe@example.com",
    name: "John Doe",
    role: UserRole.USER as const,
    avatar: "https://i.pravatar.cc/150?img=1",
    plan: PlanType.PRO as const,
    credits: 2500,
    createdAt: "2024-01-15T10:30:00Z",
    lastLogin: "2024-12-20T14:22:00Z"
  },
  subscription: {
    id: "sub-456",
    planType: PlanType.PRO as const,
    status: "active" as const,
    currentPeriodStart: "2024-12-01T00:00:00Z",
    currentPeriodEnd: "2025-01-01T00:00:00Z",
    cancelAtPeriodEnd: false
  },
  usage: {
    currentMonth: {
      apiCalls: 15420,
      storage: 2.3,
      bandwidth: 45.7,
      users: 12
    },
    limits: {
      apiCalls: 50000,
      storage: 10,
      bandwidth: 100,
      users: 25
    }
  }
};

// Data returned by API queries
export const mockQuery = {
  usageStats: [
    {
      date: "2024-12-01T00:00:00Z",
      apiCalls: 1200,
      storage: 2.1,
      bandwidth: 3.2
    },
    {
      date: "2024-12-02T00:00:00Z",
      apiCalls: 1450,
      storage: 2.15,
      bandwidth: 3.8
    },
    {
      date: "2024-12-03T00:00:00Z",
      apiCalls: 1100,
      storage: 2.2,
      bandwidth: 2.9
    },
    {
      date: "2024-12-04T00:00:00Z",
      apiCalls: 1680,
      storage: 2.25,
      bandwidth: 4.1
    },
    {
      date: "2024-12-05T00:00:00Z",
      apiCalls: 1320,
      storage: 2.3,
      bandwidth: 3.5
    },
    {
      date: "2024-12-06T00:00:00Z",
      apiCalls: 1580,
      storage: 2.32,
      bandwidth: 4.2
    },
    {
      date: "2024-12-07T00:00:00Z",
      apiCalls: 1750,
      storage: 2.35,
      bandwidth: 4.8
    }
  ],
  paymentHistory: [
    {
      id: "pay-001",
      amount: 29.99,
      currency: "USD",
      status: PaymentStatus.COMPLETED as const,
      description: "Pro Plan - Monthly",
      date: "2024-12-01T10:30:00Z",
      invoiceUrl: "/invoices/inv-001.pdf"
    },
    {
      id: "pay-002",
      amount: 29.99,
      currency: "USD",
      status: PaymentStatus.COMPLETED as const,
      description: "Pro Plan - Monthly",
      date: "2024-11-01T10:30:00Z",
      invoiceUrl: "/invoices/inv-002.pdf"
    },
    {
      id: "pay-003",
      amount: 19.99,
      currency: "USD",
      status: PaymentStatus.COMPLETED as const,
      description: "Credits Purchase - 1000 credits",
      date: "2024-10-15T14:22:00Z",
      invoiceUrl: "/invoices/inv-003.pdf"
    }
  ],
  pricingPlans: [
    {
      id: "plan-free",
      name: "Free",
      type: PlanType.FREE as const,
      price: 0,
      currency: "USD",
      interval: "month" as const,
      features: [
        "1,000 API calls/month",
        "1 GB storage",
        "5 GB bandwidth",
        "Email support"
      ],
      limits: {
        apiCalls: 1000,
        storage: 1,
        bandwidth: 5,
        users: 1
      }
    },
    {
      id: "plan-starter",
      name: "Starter",
      type: PlanType.STARTER as const,
      price: 9.99,
      currency: "USD",
      interval: "month" as const,
      features: [
        "10,000 API calls/month",
        "5 GB storage",
        "25 GB bandwidth",
        "Priority email support",
        "Basic analytics"
      ],
      limits: {
        apiCalls: 10000,
        storage: 5,
        bandwidth: 25,
        users: 5
      }
    },
    {
      id: "plan-pro",
      name: "Pro",
      type: PlanType.PRO as const,
      price: 29.99,
      currency: "USD",
      interval: "month" as const,
      features: [
        "50,000 API calls/month",
        "10 GB storage",
        "100 GB bandwidth",
        "24/7 chat support",
        "Advanced analytics",
        "Custom integrations"
      ],
      limits: {
        apiCalls: 50000,
        storage: 10,
        bandwidth: 100,
        users: 25
      }
    }
  ]
};

// Data passed as props to the root component
export const mockRootProps = {
  initialTheme: "dark" as const,
  authProvider: AuthProvider.EMAIL as const
};