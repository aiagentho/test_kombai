'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Dashboard from '../components/pages/Dashboard';
import Analytics from '../components/pages/Analytics';
import Credits from '../components/pages/Credits';
import Billing from '../components/pages/Billing';
import Settings from '../components/pages/Settings';
import Profile from '../components/pages/Profile';
import { supabase } from '../utils/supabase/client';
import { User } from '@supabase/supabase-js';
import LandingPage from './landing/page'; // Import the new LandingPage
import LoginPage from './login/page'; // Import the LoginPage
import SignUpPage from './signup/page'; // Import the SignUpPage

type Page = 'dashboard' | 'analytics' | 'credits' | 'billing' | 'settings' | 'profile';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    setAuthLoading(true);
    setAuthError('');
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setCurrentPage('dashboard');
    } catch (error: any) {
      setAuthError(error.message || 'Logout failed.');
    } finally {
      setAuthLoading(false);
    }
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
        return <Settings />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  // This component now acts as a router based on authentication status
  if (!user) {
    // If not authenticated, render the LandingPage
    return <LandingPage />;
  }

  return (
    <DashboardLayout
      user={{
        name: user.user_metadata?.name || user.email || 'User',
        email: user.email || '',
        avatar: user.user_metadata?.avatar_url || '',
        plan: 'Free' // Placeholder, integrate with actual plan later
      }}
      currentPath={`/${currentPage}`}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
    >
      {renderCurrentPage()}
    </DashboardLayout>
  );
}