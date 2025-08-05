'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  }
}));

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  progress?: number;
  progressLabel?: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function DashboardCard({
  title,
  value,
  subtitle,
  icon,
  progress,
  progressLabel,
  color = 'primary',
  trend
}: DashboardCardProps) {
  return (
    <StyledCard>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {title}
              </Typography>
              <Typography variant="h4" color={`${color}.main`} fontWeight="bold">
                {value}
              </Typography>
              {subtitle && (
                <Typography variant="body2" color="text.secondary">
                  {subtitle}
                </Typography>
              )}
            </Box>
            {icon && (
              <Box sx={{ color: `${color}.main`, fontSize: 32 }}>
                {icon}
              </Box>
            )}
          </Stack>

          {trend && (
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography
                variant="body2"
                color={trend.isPositive ? 'success.main' : 'error.main'}
                fontWeight="medium"
              >
                {trend.isPositive ? '+' : ''}{trend.value}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                from last month
              </Typography>
            </Stack>
          )}

          {progress !== undefined && (
            <Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="body2" color="text.secondary">
                  {progressLabel || 'Usage'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {Math.round(progress)}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={progress}
                color={color}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: 'grey.800'
                }}
              />
            </Box>
          )}
        </Stack>
      </CardContent>
    </StyledCard>
  );
}