import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, useTheme, Alert, Grid, Link } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
import { sendMessage, getProfile } from '../services/api';
import { IProfile } from '../types/profile';

const Contact = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [profile, setProfile] = useState<IProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        setProfile(profileData);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    try {
      await sendMessage(formData);
      setAlert({ type: 'success', message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const socialIcons = {
    github: <GitHubIcon sx={{ fontSize: 35 }} />,
    linkedin: <LinkedInIcon sx={{ fontSize: 35 }} />,
    x: <XIcon sx={{ fontSize: 35 }} />,
    facebook: <FacebookIcon sx={{ fontSize: 35 }} />,
    instagram: <InstagramIcon sx={{ fontSize: 35 }} />,
    youtube: <YouTubeIcon sx={{ fontSize: 35 }} />,
    telegram: <TelegramIcon sx={{ fontSize: 35 }} />
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography 
          variant="h5" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            mb: 4,
            textAlign: 'center'
          }}
        >
          Contact Form
        </Typography>

        <Grid container spacing={4}>
          {/* Left Section - Engagement Message */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4
              }}
            >
              <Box>
                <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', color: theme.palette.text.secondary }}>
                I'd love to hear from you! Whether you have a question, feedback, or just want to connect, feel free to reach out. You can contact me through the options below or fill out the form to send a message directly.
                </Typography>

                <Typography variant="body1" sx={{ fontSize: '1.1rem', color: theme.palette.text.secondary }}>
                  Feel free to reach out through the form or connect with me directly on social media.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', mb: 2 }}>
                  Find me on
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                  {profile?.socialLinks && Object.entries(profile.socialLinks).map(([platform, url]) => {
                    if (!url) return null;
                    return (
                      <Link
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          color: 'inherit',
                          transition: 'transform 0.2s, color 0.2s',
                          '&:hover': {
                            transform: 'scale(1.1)',
                            color: theme.palette.primary.main
                          }
                        }}
                      >
                        {socialIcons[platform as keyof typeof socialIcons]}
                      </Link>
                    );
                  })}
                  {profile?.email && (
                    <Link 
                      href={`mailto:${profile.email}`}
                      sx={{ 
                        color: 'inherit',
                        transition: 'transform 0.2s, color 0.2s',
                        '&:hover': {
                          transform: 'scale(1.1)',
                          color: theme.palette.primary.main
                        }
                      }}
                    >
                      <EmailIcon sx={{ fontSize: 35 }} />
                    </Link>
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Right Section - Contact Form */}
          <Grid item xs={12} md={7}>
            {alert && (
              <Alert 
                severity={alert.type}
                sx={{ width: '100%', mb: 3 }}
              >
                {alert.message}
              </Alert>
            )}

            <Box 
              component="form" 
              onSubmit={handleSubmit}
              sx={{
                width: '100%',
                '& .MuiTextField-root': {
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                },
              }}
            >
              <TextField
                fullWidth
                label="Full name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{
                  '& .MuiInputLabel-root': {
                    color: theme.palette.text.secondary,
                  },
                }}
              />

              <TextField
                fullWidth
                label="Email address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{
                  '& .MuiInputLabel-root': {
                    color: theme.palette.text.secondary,
                  },
                }}
              />

              <TextField
                fullWidth
                label="Your Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                multiline
                rows={6}
                variant="outlined"
                sx={{
                  '& .MuiInputLabel-root': {
                    color: theme.palette.text.secondary,
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                endIcon={<SendIcon />}
                sx={{
                  float: 'right',
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  '&:hover': {
                    bgcolor: theme.palette.primary.dark,
                  },
                }}
              >
                Send Message
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Contact; 