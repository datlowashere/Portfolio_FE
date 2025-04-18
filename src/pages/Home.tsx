import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Button, Avatar, Grid, Link, Chip, IconButton, Tooltip, useTheme, useMediaQuery, Card, Stack, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../services/api';
import { IProfile } from '../types/profile';
import { GitHub, LinkedIn, Instagram, Facebook } from '@mui/icons-material';
import { LocationOn } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import XIcon from '@mui/icons-material/X';
import TelegramIcon from '@mui/icons-material/Telegram';
import EmailIcon from '@mui/icons-material/Email';

const MainLayout = ({ profile }: { profile: IProfile }) => {
  const theme = useTheme();
  
  return (
    <Stack spacing={6} sx={{ p: { xs: 2, md: 4 }, maxWidth: 'lg', mx: 'auto' }}>
      {/* Profile Section */}
      <Box>
        <Stack spacing={3} alignItems="center">
          <Avatar
            src={profile.image}
            alt={profile.name}
            sx={{ 
              width: { xs: 150, md: 180 }, 
              height: { xs: 150, md: 180 },
              border: `4px solid ${theme.palette.primary.main}`
            }}
          />
          <Box textAlign="center">
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {profile.name}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {profile.title}
            </Typography>
          </Box>

          {/* Location and Social Links Row */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            width: '100%',
            mt: 2,
            flexWrap: 'wrap'
          }}>
            {/* Location */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <LocationOn sx={{ color: theme.palette.primary.main }} />
              <Typography>{profile.location}</Typography>
            </Box>

            {/* Divider */}
            <Box sx={{ 
              width: '1px', 
              height: '20px', 
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            }} />

            {/* Social Links */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              {profile.email && (
                <Tooltip title="Email">
                  <Link
                    href={`mailto:${profile.email}`}
                    color="inherit"
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                  >
                    <EmailIcon sx={{ color: theme.palette.primary.main }} />
                    <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
                      E-mail
                    </Typography>
                  </Link>
                </Tooltip>
              )}
              {profile.socialLinks.github && (
                <Tooltip title="GitHub">
                  <Link
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="inherit"
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                  >
                    <GitHub sx={{ color: theme.palette.primary.main }} />
                    <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
                      GitHub
                    </Typography>
                  </Link>
                </Tooltip>
              )}
              {profile.socialLinks.telegram && (
                <Tooltip title="Telegram">
                  <Link
                    href={profile.socialLinks.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="inherit"
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                  >
                    <TelegramIcon sx={{ color: theme.palette.primary.main }} />
                    <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
                      Telegram
                    </Typography>
                  </Link>
                </Tooltip>
              )}
              {profile.socialLinks.x && (
                <Tooltip title="X">
                  <Link
                    href={profile.socialLinks.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="inherit"
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                  >
                    <XIcon sx={{ color: theme.palette.primary.main }} />
                    <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
                      X
                    </Typography>
                  </Link>
                </Tooltip>
              )}
              {profile.socialLinks.linkedin && (
                <Tooltip title="LinkedIn">
                  <Link
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="inherit"
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                  >
                    <LinkedIn sx={{ color: theme.palette.primary.main }} />
                    <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
                      LinkedIn
                    </Typography>
                  </Link>
                </Tooltip>
              )}
              {profile.socialLinks.instagram && (
                <Tooltip title="Instagram">
                  <Link
                    href={profile.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="inherit"
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                  >
                    <Instagram sx={{ color: theme.palette.primary.main }} />
                    <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
                      Instagram
                    </Typography>
                  </Link>
                </Tooltip>
              )}   
              {profile.socialLinks.facebook && (
                <Tooltip title="Facebook">
                  <Link
                    href={profile.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="inherit"
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                  >
                    <Facebook sx={{ color: theme.palette.primary.main }} />
                    <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
                      Facebook
                    </Typography>
                  </Link>
                </Tooltip>
              )}                          
            </Box>
          </Box>
        </Stack>
      </Box>

      {/* About Me Section */}
      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 2 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          About Me
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
          {profile.bio}
        </Typography>
      </Box>
    </Stack>
  );
};

const Home = () => {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !profile) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography color="error">{error || 'Profile not found'}</Typography>
      </Box>
    );
  }

  return <MainLayout profile={profile} />;
};

export default Home; 