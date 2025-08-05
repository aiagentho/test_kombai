'use client';

import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Stack,
  Link,
  Alert,
  Box,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 400,
  width: '100%',
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
}));

interface AuthFormProps {
  mode: 'login' | 'signup' | 'reset';
  onSubmit: (data: any) => void;
  onModeChange: (mode: 'login' | 'signup' | 'reset') => void;
  loading?: boolean;
  error?: string;
}

export default function AuthForm({ mode, onSubmit, onModeChange, loading, error }: AuthFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (mode !== 'reset') {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (!validatePassword(formData.password)) {
        newErrors.password = 'Password must be at least 8 characters';
      }
    }

    if (mode === 'signup') {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getTitle = () => {
    switch (mode) {
      case 'login': return 'Sign In';
      case 'signup': return 'Sign Up';
      case 'reset': return 'Reset Password';
    }
  };

  const getButtonText = () => {
    switch (mode) {
      case 'login': return 'Sign In';
      case 'signup': return 'Create Account';
      case 'reset': return 'Send Reset Link';
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 2 }}>
      <StyledPaper elevation={3}>
        <Stack spacing={3}>
          <Typography variant="h4" align="center" color="primary">
            {getTitle()}
          </Typography>

          {error && (
            <Alert severity="error">{error}</Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              {mode === 'signup' && (
                <TextField
                  fullWidth
                  label="Name"
                  value={formData.name}
                  onChange={handleChange('name')}
                  error={!!errors.name}
                  helperText={errors.name}
                  required
                />
              )}

              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                error={!!errors.email}
                helperText={errors.email}
                required
              />

              {mode !== 'reset' && (
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange('password')}
                  error={!!errors.password}
                  helperText={errors.password}
                  required
                />
              )}

              {mode === 'signup' && (
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  required
                />
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? 'Loading...' : getButtonText()}
              </Button>
            </Stack>
          </form>

          <Divider />

          <Stack spacing={1} alignItems="center">
            {mode === 'login' && (
              <>
                <Link
                  component="button"
                  type="button"
                  onClick={() => onModeChange('reset')}
                  variant="body2"
                >
                  Forgot Password?
                </Link>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{' '}
                  <Link
                    component="button"
                    type="button"
                    onClick={() => onModeChange('signup')}
                  >
                    Sign Up
                  </Link>
                </Typography>
              </>
            )}

            {mode === 'signup' && (
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link
                  component="button"
                  type="button"
                  onClick={() => onModeChange('login')}
                >
                  Sign In
                </Link>
              </Typography>
            )}

            {mode === 'reset' && (
              <Link
                component="button"
                type="button"
                onClick={() => onModeChange('login')}
                variant="body2"
              >
                Back to Sign In
              </Link>
            )}
          </Stack>
        </Stack>
      </StyledPaper>
    </Box>
  );
}