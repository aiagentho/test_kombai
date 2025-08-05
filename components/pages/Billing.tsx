'use client';

import React, { useState } from 'react';
import {
  Typography,
  Stack,
  Box,
  Button,
  Paper,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import PricingCard from '../billing/PricingCard';
import DataTable from '../tables/DataTable';
import StatsWidget from '../dashboard/StatsWidget';
import { mockStore, mockQuery } from '../../data/saasMockData';
import { formatCurrency, formatDate, formatPlanType } from '../../utils/formatters';
import { PlanType } from '../../types/enums';

const StyledGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
}));

const PricingGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
}));

const SubscriptionCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${theme.palette.divider}`,
}));

export default function Billing() {
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { user, subscription } = mockStore;
  const { paymentHistory, pricingPlans } = mockQuery;

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setUpgradeDialogOpen(true);
  };

  const handleUpgradeConfirm = async () => {
    setLoading(true);
    // Simulate plan upgrade
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setUpgradeDialogOpen(false);
  };

  const handleDownloadInvoice = (record: any) => {
    console.log('Downloading invoice:', record.id);
  };

  const handleViewDetails = (record: any) => {
    console.log('Viewing details:', record.id);
  };

  const currentPlan = pricingPlans.find(plan => plan.type === user.plan);
  const selectedPlanDetails = pricingPlans.find(plan => plan.id === selectedPlan);

  return (
    <Stack spacing={4}>
      {/* Header */}
      <Box>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Billing & Subscription
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your subscription, view billing history, and upgrade your plan.
        </Typography>
      </Box>

      {/* Current Subscription */}
      <Box>
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
          Current Subscription
        </Typography>
        
        <SubscriptionCard>
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {formatPlanType(user.plan)} Plan
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {currentPlan?.price === 0 
                    ? 'Free forever' 
                    : `${formatCurrency(currentPlan?.price || 0)}/month`
                  }
                </Typography>
              </Box>
              <Chip
                label={subscription.status}
                color="success"
                variant="filled"
              />
            </Stack>

            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  Current Period:
                </Typography>
                <Typography variant="body2">
                  {formatDate(new Date(subscription.currentPeriodStart))} - {formatDate(new Date(subscription.currentPeriodEnd))}
                </Typography>
              </Stack>
              
              {subscription.cancelAtPeriodEnd && (
                <Alert severity="warning">
                  Your subscription will be cancelled at the end of the current period.
                </Alert>
              )}
            </Stack>

            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                startIcon={<UpgradeIcon />}
                onClick={() => {/* Scroll to pricing */}}
              >
                Upgrade Plan
              </Button>
              <Button
                variant="outlined"
                color="error"
              >
                Cancel Subscription
              </Button>
            </Stack>
          </Stack>
        </SubscriptionCard>
      </Box>

      {/* Billing Overview */}
      <Box>
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
          Billing Overview
        </Typography>
        
        <StyledGrid>
          <StatsWidget
            title="Next Payment"
            value={formatCurrency(currentPlan?.price || 0)}
            subtitle={`Due ${formatDate(new Date(subscription.currentPeriodEnd))}`}
            icon={<CreditCardIcon />}
            color="primary"
            progressType="none"
          />

          <StatsWidget
            title="Total Spent"
            value={formatCurrency(89.97)}
            subtitle="Last 3 months"
            icon={<ReceiptIcon />}
            color="secondary"
            progressType="none"
            trend={{
              value: 12.5,
              isPositive: true,
              period: "vs previous period"
            }}
          />

          <StatsWidget
            title="Payment Method"
            value="•••• 4242"
            subtitle="Visa ending in 4242"
            color="info"
            progressType="none"
          />
        </StyledGrid>
      </Box>

      {/* Pricing Plans */}
      <Box>
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
          Available Plans
        </Typography>
        
        <PricingGrid>
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              currentPlan={user.plan}
              onSelect={handlePlanSelect}
              loading={loading}
              featured={plan.type === PlanType.PRO}
            />
          ))}
        </PricingGrid>
      </Box>

      {/* Payment History */}
      <Box>
        <DataTable
          data={paymentHistory}
          title="Payment History"
          onDownload={handleDownloadInvoice}
          onView={handleViewDetails}
        />
      </Box>

      {/* Upgrade Confirmation Dialog */}
      <Dialog
        open={upgradeDialogOpen}
        onClose={() => setUpgradeDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Confirm Plan Upgrade
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            {selectedPlanDetails && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Upgrade to {selectedPlanDetails.name} Plan
                </Typography>
                <Paper sx={{ p: 2, bgcolor: 'grey.900' }}>
                  <Stack spacing={1}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography>Monthly Price:</Typography>
                      <Typography fontWeight="bold">
                        {formatCurrency(selectedPlanDetails.price)}
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography>Billing Cycle:</Typography>
                      <Typography>Monthly</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography>Next Payment:</Typography>
                      <Typography>
                        {formatDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))}
                      </Typography>
                    </Stack>
                  </Stack>
                </Paper>
                
                <Alert severity="info" sx={{ mt: 2 }}>
                  You'll be charged immediately for the prorated amount for the remaining period.
                </Alert>
              </Box>
            )}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setUpgradeDialogOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleUpgradeConfirm}
            disabled={loading}
            size="large"
          >
            {loading ? 'Processing...' : 'Confirm Upgrade'}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}