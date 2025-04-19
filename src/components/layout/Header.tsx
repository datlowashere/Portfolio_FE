import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, useTheme as useMuiTheme, Typography, useMediaQuery, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import HomeIcon from '@mui/icons-material/Home';
import CodeIcon from '@mui/icons-material/Code';
import WorkIcon from '@mui/icons-material/Work';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import DescriptionIcon from '@mui/icons-material/Description';
import { useTheme } from '../../contexts/ThemeContext';
import { getProfile } from '../../services/api';

interface Profile {
  resumeLink: string;
}

interface HeaderProps {
  onNavigate: (ref: React.RefObject<HTMLDivElement>) => void;
  refs: {
    homeRef: React.RefObject<HTMLDivElement>;
    skillsRef: React.RefObject<HTMLDivElement>;
    experienceRef: React.RefObject<HTMLDivElement>;
    projectsRef: React.RefObject<HTMLDivElement>;
    contactRef: React.RefObject<HTMLDivElement>;
  };
}

const Header = ({ onNavigate, refs }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(muiTheme.breakpoints.between('sm', 'md'));
  const [dateTime, setDateTime] = useState<string>('');
  const [profile, setProfile] = useState<Profile | null>(null);

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
    const updateDateTime = () => {
      const now = new Date();
      const day = now.toLocaleDateString('en-US', { weekday: 'short' });
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      
      if (isTablet) {
        setDateTime(`${day} ${hours}:${minutes}`);
      } else {
        setDateTime(`${day} ${hours}:${minutes}, Da Nang, Viet Nam`);
      }
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, [isTablet]);

  const handleResumeClick = () => {
    if (profile?.resumeLink) {
      window.open(profile.resumeLink, '_blank');
    }
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, ref: refs.homeRef },
    { text: 'Skills', icon: <CodeIcon />, ref: refs.skillsRef },
    { text: 'Experience', icon: <WorkIcon />, ref: refs.experienceRef },
    { text: 'Projects', icon: <AccountTreeIcon />, ref: refs.projectsRef },
    { text: 'Contact', icon: <ContactMailIcon />, ref: refs.contactRef },
  ];

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        bgcolor: muiTheme.palette.background.default,
        color: muiTheme.palette.text.primary,
        boxShadow: 'none',
        borderBottom: `1px solid ${muiTheme.palette.divider}`
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Time Display */}
        <Typography
          sx={{
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
            fontSize: '1.125rem',
            fontWeight: 500,
            letterSpacing: '0.02em',
            display: { xs: 'none', sm: 'block' },
            color: 'inherit'
          }}
        >
          {dateTime}
        </Typography>

        {/* Navigation Menu */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flex: 1 }}>
          {menuItems.map((item) => (
            <Tooltip key={item.text} title={isMobile ? item.text : ''}>
              <Button
                color="inherit"
                onClick={() => onNavigate(item.ref)}
                sx={{
                  minWidth: isMobile ? '40px' : 'auto',
                  px: isMobile ? 1 : 2
                }}
              >
                {item.icon}
                {!isMobile && (
                  <Typography sx={{ ml: 1 }}>
                    {item.text}
                  </Typography>
                )}
              </Button>
            </Tooltip>
          ))}
        </Box>

        {/* Right Side Controls */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {profile?.resumeLink && (
            <Tooltip title="View Resume">
              <IconButton 
                onClick={handleResumeClick} 
                color="inherit"
              >
                <DescriptionIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            <IconButton 
              onClick={toggleTheme} 
              color="inherit"
            >
              {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 