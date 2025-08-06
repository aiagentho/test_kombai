'use client';

import React from 'react';
import { Box, Link as MuiLink } from '@mui/material';
import AuthForm from '../../components/auth/AuthForm';
import { supabase } from '../../utils/supabase/client';

export default function LoginPage() {
  const handleLogin = async (data: any) => {
    const { email, password } = data;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      window.location.href = '/dashboard'; // Redirect to dashboard on successful login
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', p: 2 }}>
      <AuthForm
        mode="login"
        onSubmit={handleLogin}
        onModeChange={(mode) => {
          if (mode === 'signup') {
            window.location.href = '/signup';
          } else if (mode === 'reset') {
            // Handle password reset
            alert('Password reset functionality not yet implemented.');
          }
        }}
      />
      <MuiLink href="/" sx={{ mt: 2 }}>Back to Homepage</MuiLink>
    </Box>
  );
}