import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import CodeIcon from '@mui/icons-material/Code';
import WorkIcon from '@mui/icons-material/Work';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';

const TimeDisplay = () => {
  const [dateTime, setDateTime] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const day = now.toLocaleDateString('en-US', { weekday: 'short' });
      const time = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
      });
      setDateTime(`${day} ${time}`);
    };

    // Update time immediately and every minute
    updateDateTime();
    const timer = setInterval(updateDateTime, 60000);

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
          );
          const data = await response.json();
          setLocation(`${data.city}, ${data.countryName}`);
        } catch (error) {
          console.error('Error getting location:', error);
          setLocation('Location not available');
        }
      }, () => {
        setLocation('Location not available');
      });
    }

    return () => clearInterval(timer);
  }, []);

  return (
    <Typography variant="body2" sx={{ 
      mr: 2, 
      display: { xs: 'none', sm: 'block' },
      fontWeight: 'bold'
    }}>
      {dateTime}{location ? `, ${location}` : ''}
    </Typography>
  );
};

const Navbar = ({ toggleTheme }: { toggleTheme: () => void }) => {
  const theme = useTheme();

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>
        <TimeDisplay />
        
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <IconButton
            component={RouterLink}
            to="/"
            color="inherit"
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <HomeIcon />
            <Typography variant="caption">Home</Typography>
          </IconButton>

          <IconButton
            component={RouterLink}
            to="/skills"
            color="inherit"
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <CodeIcon />
            <Typography variant="caption">Skills</Typography>
          </IconButton>

          <IconButton
            component={RouterLink}
            to="/experience"
            color="inherit"
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <WorkIcon />
            <Typography variant="caption">Experience</Typography>
          </IconButton>

          <IconButton
            component={RouterLink}
            to="/projects"
            color="inherit"
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <AccountTreeIcon />
            <Typography variant="caption">Projects</Typography>
          </IconButton>

          <IconButton
            component={RouterLink}
            to="/contact"
            color="inherit"
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <ContactMailIcon />
            <Typography variant="caption">Contact</Typography>
          </IconButton>
        </Box>

        <IconButton onClick={toggleTheme} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 