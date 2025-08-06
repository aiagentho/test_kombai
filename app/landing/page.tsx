'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
  AppBar,
  Toolbar,
  Link as MuiLink,
  IconButton,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import PricingCard from '../../components/billing/PricingCard';
import { mockQuery } from '../../data/saasMockData';
import { loadStripe } from '@stripe/stripe-js';
import { supabase } from '../../utils/supabase/client';
import { ColorModeContext } from '../../theme/ThemeRegistry'; // Import ColorModeContext

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  background: theme.palette.background.default,
  color: theme.palette.text.primary,
  padding: theme.spacing(8, 2),
}));

const FeatureSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 2),
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
}));

const PricingSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 2),
  background: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

const Footer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 2),
  background: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  textAlign: 'center',
  borderTop: `1px solid ${theme.palette.divider}`,
}));

export default function LandingPage() {
  const theme = useTheme();
  const { pricingPlans } = mockQuery;
  const [loading, setLoading] = useState(false);
  const colorMode = React.useContext(ColorModeContext); // Use the context

  const handleCheckout = async (priceId: string) => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('Please sign in to subscribe.');
        window.location.href = '/login'; // Redirect to login page
        return;
      }

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId, userId: user.id }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error('Stripe checkout error:', error);
          alert(error.message);
        }
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            SaaS App
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <MuiLink href="/login" color="inherit" underline="none">Sign In</MuiLink>
            <Button variant="contained" href="/signup">Sign Up</Button>
            <IconButton onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <HeroSection>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
            Your Ultimate SaaS Solution
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Streamline your workflow, boost productivity, and achieve your goals with our powerful and intuitive platform.
          </Typography>
          <Button variant="contained" size="large" sx={{ mt: 3 }} href="/signup">
            Get Started for Free
          </Button>
        </Container>
      </HeroSection>

      <FeatureSection>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
            Key Features
          </Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ mt: 4 }}>
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Typography variant="h6" fontWeight="bold">Feature One</Typography>
              <Typography color="text.secondary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </Box>
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Typography variant="h6" fontWeight="bold">Feature Two</Typography>
              <Typography color="text.secondary">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Typography>
            </Box>
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Typography variant="h6" fontWeight="bold">Feature Three</Typography>
              <Typography color="text.secondary">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </Typography>
            </Box>
          </Stack>
        </Container>
      </FeatureSection>

      <PricingSection>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
            Simple & Transparent Pricing
          </Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} justifyContent="center" sx={{ mt: 4 }}>
            {pricingPlans.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                featured={plan.name === 'Pro'} // Assuming 'Pro' is the most popular plan
                onSelect={handleCheckout}
                loading={loading}
              />
            ))}
          </Stack>
        </Container>
      </PricingSection>

      <Footer>
        <Typography variant="body2">
          © {new Date().getFullYear()} SaaS App. All rights reserved.
        </Typography>
      </Footer>
    </Box>
  );
}