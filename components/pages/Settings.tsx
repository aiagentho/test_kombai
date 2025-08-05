'use client';

import React, { useState } from 'react';
import {
  Typography,
  Stack,
  Box,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  IconButton,
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PaletteIcon from '@mui/icons-material/Palette';
import LanguageIcon from '@mui/icons-material/Language';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SaveIcon from '@mui/icons-material/Save';
import SettingsSection from '../settings/SettingsSection';

const StyledGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  gridTemplateColumns: '1fr',
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
}));

export default function Settings() {
  const [settings, setSettings] = useState({
    // Account Settings
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    
    // Security Settings
    twoFactorEnabled: true,
    sessionTimeout: 30,
    loginNotifications: true,
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    securityAlerts: true,
    usageAlerts: true,
    
    // Appearance Settings
    theme: 'dark',
    compactMode: false,
    animations: true,
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [apiKeys, setApiKeys] = useState([
    { id: '1', name: 'Production API', key: 'sk_live_...', created: '2024-01-15', lastUsed: '2024-12-20' },
    { id: '2', name: 'Development API', key: 'sk_test_...', created: '2024-02-01', lastUsed: '2024-12-19' }
  ]);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [loading, setLoading] = useState(false);

  const handleSettingChange = (setting: string) => (event: any) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handlePasswordChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords(prev => ({ ...prev, [field]: event.target.value }));
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSnackbar({ open: true, message: 'Settings saved successfully!', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to save settings', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      setSnackbar({ open: true, message: 'Passwords do not match', severity: 'error' });
      return;
    }
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setSnackbar({ open: true, message: 'Password changed successfully!', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to change password', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    setDeleteDialogOpen(true);
  };

  const confirmDeleteAccount = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSnackbar({ open: true, message: 'Account deletion initiated', severity: 'success' });
      setDeleteDialogOpen(false);
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to delete account', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const generateApiKey = () => {
    const newKey = {
      id: Date.now().toString(),
      name: 'New API Key',
      key: 'sk_live_' + Math.random().toString(36).substring(2, 15),
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never'
    };
    setApiKeys(prev => [...prev, newKey]);
    setSnackbar({ open: true, message: 'API key generated successfully!', severity: 'success' });
  };

  const deleteApiKey = (id: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== id));
    setSnackbar({ open: true, message: 'API key deleted', severity: 'success' });
  };

  return (
    <Stack spacing={4}>
      {/* Header */}
      <Box>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your account preferences, security settings, and application configuration.
        </Typography>
      </Box>

      <StyledGrid>
        {/* Account Settings */}
        <SettingsSection 
          title="Account Preferences" 
          description="Configure your account language, timezone, and display preferences"
        >
          <Stack spacing={3}>
            <FormControl fullWidth>
              <InputLabel>Language</InputLabel>
              <Select
                value={settings.language}
                label="Language"
                onChange={handleSettingChange('language')}
                startAdornment={<LanguageIcon sx={{ mr: 1, color: 'text.secondary' }} />}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="es">Spanish</MenuItem>
                <MenuItem value="fr">French</MenuItem>
                <MenuItem value="de">German</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Timezone</InputLabel>
              <Select
                value={settings.timezone}
                label="Timezone"
                onChange={handleSettingChange('timezone')}
              >
                <MenuItem value="UTC">UTC</MenuItem>
                <MenuItem value="EST">Eastern Time</MenuItem>
                <MenuItem value="PST">Pacific Time</MenuItem>
                <MenuItem value="GMT">Greenwich Mean Time</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Date Format</InputLabel>
              <Select
                value={settings.dateFormat}
                label="Date Format"
                onChange={handleSettingChange('dateFormat')}
              >
                <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </SettingsSection>

        {/* Security Settings */}
        <SettingsSection 
          title="Security & Privacy" 
          description="Manage your security preferences and account protection"
        >
          <Stack spacing={3}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.twoFactorEnabled}
                  onChange={handleSettingChange('twoFactorEnabled')}
                  color="primary"
                />
              }
              label={
                <Box>
                  <Typography variant="body1">Two-Factor Authentication</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Add an extra layer of security to your account
                  </Typography>
                </Box>
              }
            />

            <FormControl fullWidth>
              <InputLabel>Session Timeout (minutes)</InputLabel>
              <Select
                value={settings.sessionTimeout}
                label="Session Timeout (minutes)"
                onChange={handleSettingChange('sessionTimeout')}
                startAdornment={<SecurityIcon sx={{ mr: 1, color: 'text.secondary' }} />}
              >
                <MenuItem value={15}>15 minutes</MenuItem>
                <MenuItem value={30}>30 minutes</MenuItem>
                <MenuItem value={60}>1 hour</MenuItem>
                <MenuItem value={240}>4 hours</MenuItem>
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Switch
                  checked={settings.loginNotifications}
                  onChange={handleSettingChange('loginNotifications')}
                  color="primary"
                />
              }
              label="Login Notifications"
            />
          </Stack>
        </SettingsSection>

        {/* Notification Settings */}
        <SettingsSection 
          title="Notifications" 
          description="Choose what notifications you want to receive"
        >
          <Stack spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.emailNotifications}
                  onChange={handleSettingChange('emailNotifications')}
                  color="primary"
                />
              }
              label={
                <Box>
                  <Typography variant="body1">Email Notifications</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Receive important updates via email
                  </Typography>
                </Box>
              }
            />

            <FormControlLabel
              control={
                <Switch
                  checked={settings.pushNotifications}
                  onChange={handleSettingChange('pushNotifications')}
                  color="primary"
                />
              }
              label="Push Notifications"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={settings.marketingEmails}
                  onChange={handleSettingChange('marketingEmails')}
                  color="primary"
                />
              }
              label="Marketing Emails"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={settings.securityAlerts}
                  onChange={handleSettingChange('securityAlerts')}
                  color="primary"
                />
              }
              label="Security Alerts"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={settings.usageAlerts}
                  onChange={handleSettingChange('usageAlerts')}
                  color="primary"
                />
              }
              label="Usage Alerts"
            />
          </Stack>
        </SettingsSection>

        {/* Appearance Settings */}
        <SettingsSection 
          title="Appearance" 
          description="Customize the look and feel of your dashboard"
        >
          <Stack spacing={3}>
            <FormControl fullWidth>
              <InputLabel>Theme</InputLabel>
              <Select
                value={settings.theme}
                label="Theme"
                onChange={handleSettingChange('theme')}
                startAdornment={<PaletteIcon sx={{ mr: 1, color: 'text.secondary' }} />}
              >
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
                <MenuItem value="auto">Auto</MenuItem>
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Switch
                  checked={settings.compactMode}
                  onChange={handleSettingChange('compactMode')}
                  color="primary"
                />
              }
              label="Compact Mode"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={settings.animations}
                  onChange={handleSettingChange('animations')}
                  color="primary"
                />
              }
              label="Enable Animations"
            />
          </Stack>
        </SettingsSection>
      </StyledGrid>

      {/* Password Change Section */}
      <SettingsSection 
        title="Change Password" 
        description="Update your account password for better security"
      >
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Current Password"
            type={showPasswords.current ? 'text' : 'password'}
            value={passwords.currentPassword}
            onChange={handlePasswordChange('currentPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => togglePasswordVisibility('current')}>
                    {showPasswords.current ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="New Password"
            type={showPasswords.new ? 'text' : 'password'}
            value={passwords.newPassword}
            onChange={handlePasswordChange('newPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => togglePasswordVisibility('new')}>
                    {showPasswords.new ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Confirm New Password"
            type={showPasswords.confirm ? 'text' : 'password'}
            value={passwords.confirmPassword}
            onChange={handlePasswordChange('confirmPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => togglePasswordVisibility('confirm')}>
                    {showPasswords.confirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            onClick={handleChangePassword}
            disabled={loading || !passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword}
            startIcon={<SaveIcon />}
          >
            Change Password
          </Button>
        </Stack>
      </SettingsSection>

      {/* API Keys Section */}
      <SettingsSection 
        title="API Keys" 
        description="Manage your API keys for integrations and development"
      >
        <Stack spacing={3}>
          <Button
            variant="outlined"
            onClick={generateApiKey}
            sx={{ alignSelf: 'flex-start' }}
          >
            Generate New API Key
          </Button>

          <Stack spacing={2}>
            {apiKeys.map((key) => (
              <Box
                key={key.id}
                sx={{
                  p: 2,
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">
                    {key.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" fontFamily="monospace">
                    {key.key}
                  </Typography>
                  <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                    <Chip label={`Created: ${key.created}`} size="small" variant="outlined" />
                    <Chip label={`Last used: ${key.lastUsed}`} size="small" variant="outlined" />
                  </Stack>
                </Box>
                <IconButton
                  color="error"
                  onClick={() => deleteApiKey(key.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Stack>
        </Stack>
      </SettingsSection>

      {/* Danger Zone */}
      <SettingsSection 
        title="Danger Zone" 
        description="Irreversible and destructive actions"
      >
        <Alert severity="warning" sx={{ mb: 3 }}>
          These actions cannot be undone. Please proceed with caution.
        </Alert>
        
        <Button
          variant="outlined"
          color="error"
          onClick={handleDeleteAccount}
          startIcon={<DeleteIcon />}
        >
          Delete Account
        </Button>
      </SettingsSection>

      {/* Save Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleSaveSettings}
          disabled={loading}
          startIcon={<SaveIcon />}
        >
          {loading ? 'Saving...' : 'Save Settings'}
        </Button>
      </Box>

      {/* Delete Account Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle color="error.main">
          Delete Account
        </DialogTitle>
        <DialogContent>
          <Alert severity="error" sx={{ mb: 2 }}>
            This action cannot be undone. All your data will be permanently deleted.
          </Alert>
          <Typography>
            Are you sure you want to delete your account? This will:
          </Typography>
          <Box component="ul" sx={{ mt: 1 }}>
            <li>Permanently delete all your data</li>
            <li>Cancel your subscription</li>
            <li>Remove access to all services</li>
            <li>Delete all API keys and integrations</li>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={confirmDeleteAccount}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete Account'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}