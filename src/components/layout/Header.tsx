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
  const [time, setTime] = useState<string>('');
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
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

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
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            display: { xs: 'none', sm: 'block' }
          }}
        >
          {time}
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