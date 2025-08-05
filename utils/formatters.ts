import { PlanType, PaymentStatus, UsageMetricType } from '../types/enums';

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const formatPlanType = (plan: PlanType): string => {
  switch (plan) {
    case PlanType.FREE:
      return 'Free';
    case PlanType.STARTER:
      return 'Starter';
    case PlanType.PRO:
      return 'Pro';
    case PlanType.ENTERPRISE:
      return 'Enterprise';
    default:
      return 'Unknown';
  }
};

export const formatPaymentStatus = (status: PaymentStatus): string => {
  switch (status) {
    case PaymentStatus.PENDING:
      return 'Pending';
    case PaymentStatus.COMPLETED:
      return 'Completed';
    case PaymentStatus.FAILED:
      return 'Failed';
    case PaymentStatus.CANCELLED:
      return 'Cancelled';
    default:
      return 'Unknown';
  }
};

export const formatUsageMetric = (type: UsageMetricType): string => {
  switch (type) {
    case UsageMetricType.API_CALLS:
      return 'API Calls';
    case UsageMetricType.STORAGE:
      return 'Storage';
    case UsageMetricType.BANDWIDTH:
      return 'Bandwidth';
    case UsageMetricType.USERS:
      return 'Users';
    default:
      return 'Unknown';
  }
};

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};