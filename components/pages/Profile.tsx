'use client';

import React, { useState } from 'react';
import {
  Typography,
  Stack,
  Box,
  TextField,
  Button,
  Avatar,
  IconButton,
  Alert,
  Snackbar,
  Chip,
  Divider,
  LinearProgress,
  Card,
  CardContent
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import VerifiedIcon from '@mui/icons-material/Verified';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SettingsSection from '../settings/SettingsSection';
import { mockStore } from '../../data/saasMockData';
import { formatDate, formatPlanType } from '../../utils/formatters';

const StyledGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  gridTemplateColumns: '1fr',
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: '1fr 2fr',
  },
}));

const ProfileCard = styled(Card)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${theme.palette.divider}`,
  textAlign: 'center',
}));

const AvatarContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  '& .avatar-overlay': {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    padding: theme.spacing(0.5),
    border: `2px solid ${theme.palette.background.paper}`,
  }
}));

const StatsCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius * 2,
}));

export default function Profile() {
  const { user } = mockStore;
  
  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    company: 'Tech Startup Inc.',
    bio: 'Full-stack developer passionate about building scalable applications and great user experiences.',
    website: 'https://johndoe.dev',
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfile(prev => ({ ...prev, [field]: event.target.value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
      setSnackbar({ open: true, message: 'Profile updated successfully!', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to update profile', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset to original values
    setProfile({
      name: user.name,
      email: user.email,
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      company: 'Tech Startup Inc.',
      bio: 'Full-stack developer passionate about building scalable applications and great user experiences.',
      website: 'https://johndoe.dev',
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
    });
    setIsEditing(false);
  };

  const handleAvatarChange = () => {
    // Simulate file upload
    setSnackbar({ open: true, message: 'Avatar upload feature coming soon!', severity: 'success' });
  };

  const accountStats = [
    { label: 'Member Since', value: formatDate(new Date(user.createdAt)), icon: <CalendarTodayIcon /> },
    { label: 'Last Login', value: formatDate(new Date(user.lastLogin)), icon: <CalendarTodayIcon /> },
    { label: 'Current Plan', value: formatPlanType(user.plan), icon: <BusinessIcon /> },
    { label: 'Credits', value: user.credits.toLocaleString(), icon: <BusinessIcon /> },
  ];

  const profileCompletion = 85; // Mock completion percentage

  return (
    <Stack spacing={4}>
      {/* Header */}
      <Box>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Profile
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your personal information and account details.
        </Typography>
      </Box>

      <StyledGrid>
        {/* Profile Overview */}
        <Stack spacing={3}>
          <ProfileCard>
            <CardContent sx={{ p: 4 }}>
              <AvatarContainer>
                <Avatar
                  src={user.avatar}
                  alt={profile.name}
                  sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                />
                <IconButton
                  className="avatar-overlay"
                  onClick={handleAvatarChange}
                  size="small"
                >
                  <PhotoCameraIcon fontSize="small" />
                </IconButton>
              </AvatarContainer>

              <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mb: 1 }}>
                <Typography variant="h5" fontWeight="bold">
                  {profile.name}
                </Typography>
                <VerifiedIcon color="primary" fontSize="small" />
              </Stack>

              <Typography variant="body2" color="text.secondary" gutterBottom>
                {profile.email}
              </Typography>

              <Chip
                label={`${formatPlanType(user.plan)} Member`}
                color="primary"
                variant="filled"
                sx={{ mt: 1 }}
              />

              <Divider sx={{ my: 3 }} />

              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Profile Completion
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={profileCompletion}
                  color="primary"
                  sx={{ height: 8, borderRadius: 4, mb: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {profileCompletion}% complete
                </Typography>
              </Box>
            </CardContent>
          </ProfileCard>

          {/* Account Stats */}
          <StatsCard>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Account Statistics
              </Typography>
              <Stack spacing={2}>
                {accountStats.map((stat, index) => (
                  <Stack key={index} direction="row" alignItems="center" spacing={2}>
                    <Box sx={{ color: 'primary.main' }}>
                      {stat.icon}
                    </Box>
                    <Box flex={1}>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {stat.value}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </StatsCard>
        </Stack>

        {/* Profile Details */}
        <Stack spacing={3}>
          <SettingsSection
            title="Personal Information"
            description="Update your personal details and contact information"
          >
            <Stack spacing={3}>
              <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                  fullWidth
                  label="Full Name"
                  value={profile.name}
                  onChange={handleInputChange('name')}
                  disabled={!isEditing}
                  InputProps={{
                    startAdornment: <EditIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />
              </Stack>

              <TextField
                fullWidth
                label="Email Address"
                value={profile.email}
                onChange={handleInputChange('email')}
                disabled={!isEditing}
                InputProps={{
                  startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />

              <TextField
                fullWidth
                label="Phone Number"
                value={profile.phone}
                onChange={handleInputChange('phone')}
                disabled={!isEditing}
                InputProps={{
                  startAdornment: <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />

              <TextField
                fullWidth
                label="Location"
                value={profile.location}
                onChange={handleInputChange('location')}
                disabled={!isEditing}
                InputProps={{
                  startAdornment: <LocationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />

              <TextField
                fullWidth
                label="Company"
                value={profile.company}
                onChange={handleInputChange('company')}
                disabled={!isEditing}
                InputProps={{
                  startAdornment: <BusinessIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />

              <TextField
                fullWidth
                label="Bio"
                value={profile.bio}
                onChange={handleInputChange('bio')}
                disabled={!isEditing}
                multiline
                rows={3}
                placeholder="Tell us about yourself..."
              />
            </Stack>
          </SettingsSection>

          <SettingsSection
            title="Social Links"
            description="Add your social media and professional profiles"
          >
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Website"
                value={profile.website}
                onChange={handleInputChange('website')}
                disabled={!isEditing}
                placeholder="https://yourwebsite.com"
              />

              <TextField
                fullWidth
                label="LinkedIn"
                value={profile.linkedin}
                onChange={handleInputChange('linkedin')}
                disabled={!isEditing}
                placeholder="https://linkedin.com/in/yourprofile"
              />

              <TextField
                fullWidth
                label="GitHub"
                value={profile.github}
                onChange={handleInputChange('github')}
                disabled={!isEditing}
                placeholder="https://github.com/yourusername"
              />
            </Stack>
          </SettingsSection>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            {isEditing ? (
              <>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  disabled={loading}
                  startIcon={<CancelIcon />}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  disabled={loading}
                  startIcon={<SaveIcon />}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                onClick={() => setIsEditing(true)}
                startIcon={<EditIcon />}
              >
                Edit Profile
              </Button>
            )}
          </Box>
        </Stack>
      </StyledGrid>

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