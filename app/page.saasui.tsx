'use client';

import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import theme from '../theme/theme';
import DashboardLayout from '../components/layout/DashboardLayout';
import AuthForm from '../components/auth/AuthForm';
import Dashboard from '../components/pages/Dashboard';
import Analytics from '../components/pages/Analytics';
import Credits from '../components/pages/Credits';
import Billing from '../components/pages/Billing';
import { mockStore } from '../data/saasMockData';

const createEmotionCache = () => {
  return createCache({
    key: "mui",
    prepend: true,
  });
};

const emotionCache = createEmotionCache();

type AuthMode = 'login' | 'signup' | 'reset';
type Page = 'dashboard' | 'analytics' | 'credits' | 'billing' | 'settings' | 'profile';

export default function SaaSUI() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true for demo
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const { user } = mockStore;

  const handleAuth = async (data: any) => {
    setAuthLoading(true);
    setAuthError('');
    
    try {
      // Simulate authentication
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsAuthenticated(true);
    } catch (error) {
      setAuthError('Authentication failed. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (path: string) => {
    const page = path.replace('/', '') as Page;
    setCurrentPage(page || 'dashboard');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'analytics':
        return <Analytics />;
      case 'credits':
        return <Credits />;
      case 'billing':
        return <Billing />;
      case 'settings':
        return <Dashboard />; // Placeholder
      case 'profile':
        return <Dashboard />; // Placeholder
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return (
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthForm
            mode={authMode}
            onSubmit={handleAuth}
            onModeChange={setAuthMode}
            loading={authLoading}
            error={authError}
          />
        </ThemeProvider>
      </CacheProvider>
    );
  }

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DashboardLayout
          user={{
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            plan: user.plan.charAt(0).toUpperCase() + user.plan.slice(1)
          }}
          currentPath={`/${currentPage}`}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        >
          {renderCurrentPage()}
        </DashboardLayout>
      </ThemeProvider>
    </CacheProvider>
  );
}