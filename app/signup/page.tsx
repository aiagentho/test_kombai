'use client';

import React from 'react';
import { Box, Link as MuiLink } from '@mui/material';
import AuthForm from '../../components/auth/AuthForm';
import { supabase } from '../../utils/supabase/client';

export default function SignUpPage() {
  const handleSignUp = async (data: any) => {
    const { email, password, name } = data;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      alert(error.message);
    } else {
      alert('Check your email for the confirmation link!');
      window.location.href = '/login';
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', p: 2 }}>
      <AuthForm
        mode="signup"
        onSubmit={handleSignUp}
        onModeChange={(mode) => {
          if (mode === 'login') {
            window.location.href = '/login';
          }
        }}
      />
      <MuiLink href="/" sx={{ mt: 2 }}>Back to Homepage</MuiLink>
    </Box>
  );
}