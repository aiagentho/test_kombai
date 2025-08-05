'use client';

import React, { useState } from 'react';
import {
  Typography,
  Stack,
  Box,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';
import StatsWidget from '../dashboard/StatsWidget';
import DataTable from '../tables/DataTable';
import { mockStore, mockQuery } from '../../data/saasMockData';
import { formatCurrency } from '../../utils/formatters';

const StyledGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
}));

const CreditPackage = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${theme.palette.divider}`,
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
    borderColor: theme.palette.primary.main,
  },
}));

const creditPackages = [
  { credits: 1000, price: 10, bonus: 0 },
  { credits: 5000, price: 45, bonus: 500 },
  { credits: 10000, price: 85, bonus: 1500 },
  { credits: 25000, price: 200, bonus: 5000 },
];

export default function Credits() {
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<typeof creditPackages[0] | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);

  const { user } = mockStore;
  const { paymentHistory } = mockQuery;

  const handlePurchaseClick = (pkg: typeof creditPackages[0]) => {
    setSelectedPackage(pkg);
    setPurchaseDialogOpen(true);
  };

  const handlePurchaseConfirm = async () => {
    setLoading(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setPurchaseDialogOpen(false);
    // Show success message
  };

  const handleDownloadInvoice = (record: any) => {
    // Simulate invoice download
    console.log('Downloading invoice:', record.id);
  };

  const handleViewDetails = (record: any) => {
    // Show payment details
    console.log('Viewing details:', record.id);
  };

  const creditUsagePercentage = 65; // Mock percentage

  return (
    <Stack spacing={4}>
      {/* Header */}
      <Box>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Credits Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Purchase and manage your API credits. Credits are used for API calls and other services.
        </Typography>
      </Box>

      {/* Current Credits Overview */}
      <StyledGrid>
        <StatsWidget
          title="Current Balance"
          value={user.credits.toLocaleString()}
          subtitle="Credits available"
          icon={<AccountBalanceWalletIcon />}
          color="primary"
          progressType="circular"
          progressValue={user.credits}
          maxValue={5000}
        />

        <StatsWidget
          title="Monthly Usage"
          value="1,250"
          subtitle="Credits consumed this month"
          color="secondary"
          progressType="linear"
          progressValue={1250}
          maxValue={2000}
          trend={{
            value: 8.5,
            isPositive: true,
            period: "vs last month"
          }}
        />

        <StatsWidget
          title="Estimated Remaining"
          value="12 days"
          subtitle="At current usage rate"
          color="warning"
          progressType="none"
          trend={{
            value: 15,
            isPositive: false,
            period: "vs last month"
          }}
        />
      </StyledGrid>

      {/* Purchase Credits */}
      <Box>
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
          Purchase Credits
        </Typography>
        
        <StyledGrid>
          {creditPackages.map((pkg, index) => (
            <CreditPackage
              key={index}
              onClick={() => handlePurchaseClick(pkg)}
            >
              <Stack spacing={2} alignItems="center" textAlign="center">
                <Typography variant="h4" color="primary" fontWeight="bold">
                  {pkg.credits.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Credits
                </Typography>
                {pkg.bonus > 0 && (
                  <Alert severity="success" sx={{ width: '100%' }}>
                    +{pkg.bonus.toLocaleString()} bonus credits!
                  </Alert>
                )}
                <Typography variant="h6" fontWeight="bold">
                  {formatCurrency(pkg.price)}
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  fullWidth
                  size="large"
                >
                  Purchase
                </Button>
              </Stack>
            </CreditPackage>
          ))}
        </StyledGrid>
      </Box>

      {/* Payment History */}
      <Box>
        <DataTable
          data={paymentHistory.filter(record => 
            record.description.toLowerCase().includes('credit')
          )}
          title="Credit Purchase History"
          onDownload={handleDownloadInvoice}
          onView={handleViewDetails}
        />
      </Box>

      {/* Purchase Dialog */}
      <Dialog
        open={purchaseDialogOpen}
        onClose={() => setPurchaseDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Purchase Credits
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            {selectedPackage && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Package Details
                </Typography>
                <Paper sx={{ p: 2, bgcolor: 'grey.900' }}>
                  <Stack spacing={1}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography>Credits:</Typography>
                      <Typography fontWeight="bold">
                        {selectedPackage.credits.toLocaleString()}
                      </Typography>
                    </Stack>
                    {selectedPackage.bonus > 0 && (
                      <Stack direction="row" justifyContent="space-between">
                        <Typography color="success.main">Bonus:</Typography>
                        <Typography color="success.main" fontWeight="bold">
                          +{selectedPackage.bonus.toLocaleString()}
                        </Typography>
                      </Stack>
                    )}
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="h6">Total:</Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {formatCurrency(selectedPackage.price)}
                      </Typography>
                    </Stack>
                  </Stack>
                </Paper>
              </Box>
            )}

            <FormControl fullWidth>
              <InputLabel>Payment Method</InputLabel>
              <Select
                value={paymentMethod}
                label="Payment Method"
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <MenuItem value="card">Credit/Debit Card</MenuItem>
                <MenuItem value="paypal">PayPal</MenuItem>
                <MenuItem value="bank">Bank Transfer</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Promo Code (Optional)"
              placeholder="Enter promo code"
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setPurchaseDialogOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handlePurchaseConfirm}
            disabled={loading}
            size="large"
          >
            {loading ? 'Processing...' : `Pay ${selectedPackage ? formatCurrency(selectedPackage.price) : ''}`}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}