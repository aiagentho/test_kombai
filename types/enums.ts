// Plan types for subscription management
export enum PlanType {
  FREE = 'free',
  STARTER = 'starter',
  PRO = 'pro',
  ENTERPRISE = 'enterprise'
}

// Payment status for transactions
export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

// User roles and permissions
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator'
}

// Usage metric types
export enum UsageMetricType {
  API_CALLS = 'api_calls',
  STORAGE = 'storage',
  BANDWIDTH = 'bandwidth',
  USERS = 'users'
}

// Authentication providers
export enum AuthProvider {
  EMAIL = 'email',
  GOOGLE = 'google',
  GITHUB = 'github'
}