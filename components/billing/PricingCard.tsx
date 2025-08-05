'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Stack,
  Box,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import { formatCurrency } from '../../utils/formatters';
import { PlanType } from '../../types/enums';

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'featured'
})<{ featured?: boolean }>(({ theme, featured }) => ({
  position: 'relative',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.background.paper,
  border: featured 
    ? `2px solid ${theme.palette.primary.main}` 
    : `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
  ...(featured && {
    transform: 'scale(1.05)',
    zIndex: 1,
  }),
}));

const FeaturedBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: -12,
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontWeight: 'bold',
  zIndex: 2,
}));

interface PricingPlan {
  id: string;
  name: string;
  type: PlanType;
  price: number;
  currency: string;
  interval: string;
  features: string[];
  limits: {
    apiCalls: number;
    storage: number;
    bandwidth: number;
    users: number;
  };
}

interface PricingCardProps {
  plan: PricingPlan;
  currentPlan?: PlanType;
  onSelect: (planId: string) => void;
  loading?: boolean;
  featured?: boolean;
}

export default function PricingCard({ 
  plan, 
  currentPlan, 
  onSelect, 
  loading, 
  featured 
}: PricingCardProps) {
  const isCurrentPlan = currentPlan === plan.type;

  const getButtonText = () => {
    if (isCurrentPlan) return 'Current Plan';
    if (plan.type === PlanType.FREE) return 'Get Started';
    return 'Upgrade';
  };

  const getButtonColor = () => {
    if (isCurrentPlan) return 'inherit';
    if (featured) return 'primary';
    return 'primary';
  };

  return (
    <StyledCard featured={featured}>
      {featured && <FeaturedBadge label="Most Popular" />}
      
      <CardContent sx={{ flex: 1, pt: featured ? 4 : 3 }}>
        <Stack spacing={3}>
          {/* Header */}
          <Box textAlign="center">
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {plan.name}
            </Typography>
            <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={0.5}>
              <Typography variant="h3" fontWeight="bold" color="primary">
                {plan.price === 0 ? 'Free' : formatCurrency(plan.price)}
              </Typography>
              {plan.price > 0 && (
                <Typography variant="body1" color="text.secondary">
                  /{plan.interval}
                </Typography>
              )}
            </Stack>
          </Box>

          {/* Features */}
          <List dense sx={{ py: 0 }}>
            {plan.features.map((feature, index) => (
              <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <CheckIcon color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary={feature}
                  primaryTypographyProps={{
                    variant: 'body2',
                    color: 'text.primary'
                  }}
                />
              </ListItem>
            ))}
          </List>

          {/* Usage Limits */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Usage Limits:
            </Typography>
            <Stack spacing={0.5}>
              <Typography variant="body2" color="text.secondary">
                • {plan.limits.apiCalls.toLocaleString()} API calls/month
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • {plan.limits.storage} GB storage
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • {plan.limits.bandwidth} GB bandwidth
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • {plan.limits.users} user{plan.limits.users > 1 ? 's' : ''}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </CardContent>

      <CardActions sx={{ p: 3, pt: 0 }}>
        <Button
          fullWidth
          variant={featured || isCurrentPlan ? 'contained' : 'outlined'}
          color={getButtonColor()}
          size="large"
          onClick={() => onSelect(plan.id)}
          disabled={loading || isCurrentPlan}
          sx={{
            py: 1.5,
            fontWeight: 'bold',
            ...(isCurrentPlan && {
              backgroundColor: 'success.main',
              color: 'success.contrastText',
              '&:hover': {
                backgroundColor: 'success.dark',
              },
            }),
          }}
        >
          {loading ? 'Processing...' : getButtonText()}
        </Button>
      </CardActions>
    </StyledCard>
  );
}