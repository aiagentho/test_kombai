'use client';

import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Stack,
  useMediaQuery,
  useTheme,
  Badge,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import NavigationSidebar from '../navigation/NavigationSidebar';

const DRAWER_WIDTH = 280;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  [theme.breakpoints.up('md')]: {
    marginLeft: open ? DRAWER_WIDTH : 0,
  },
}));

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.up('md')]: {
    width: open ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%',
    marginLeft: open ? DRAWER_WIDTH : 0,
  },
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
}));

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: {
    name: string;
    email: string;
    avatar: string;
    plan: string;
  };
  currentPath: string;
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

export default function DashboardLayout({
  children,
  user,
  currentPath,
  onNavigate,
  onLogout
}: DashboardLayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleProfileClick = () => {
    onNavigate('/profile');
    handleUserMenuClose();
  };

  const handleSettingsClick = () => {
    onNavigate('/settings');
    handleUserMenuClose();
  };

  const handleLogoutClick = () => {
    onLogout();
    handleUserMenuClose();
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* App Bar */}
      <StyledAppBar position="fixed" open={sidebarOpen && !isMobile}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle sidebar"
            onClick={handleSidebarToggle}
            edge="start"
            sx={{ mr: 2, color: 'text.primary' }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: 'text.primary' }}>
            Dashboard
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Notifications">
              <IconButton color="inherit" sx={{ color: 'text.primary' }}>
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Account">
              <IconButton
                onClick={handleUserMenuOpen}
                sx={{ p: 0.5 }}
              >
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  sx={{ width: 32, height: 32 }}
                />
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      </StyledAppBar>

      {/* Navigation Sidebar */}
      <NavigationSidebar
        open={sidebarOpen}
        onClose={handleSidebarClose}
        onToggle={handleSidebarToggle}
        currentPath={currentPath}
        onNavigate={onNavigate}
        user={user}
        onLogout={onLogout}
        variant={isMobile ? 'temporary' : 'permanent'}
      />

      {/* Main Content */}
      <Main open={sidebarOpen && !isMobile}>
        <Toolbar /> {/* Spacer for fixed AppBar */}
        {children}
      </Main>

      {/* User Menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{ mt: 1 }}
      >
        <MenuItem onClick={handleProfileClick}>
          <Stack direction="row" spacing={2} alignItems="center">
            <PersonIcon fontSize="small" />
            <Typography variant="body2">Profile</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleSettingsClick}>
          <Stack direction="row" spacing={2} alignItems="center">
            <SettingsIcon fontSize="small" />
            <Typography variant="body2">Settings</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleLogoutClick} sx={{ color: 'error.main' }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <LogoutIcon fontSize="small" />
            <Typography variant="body2">Logout</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </Box>
  );
}