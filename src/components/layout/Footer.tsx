import React from 'react';
import { Box, Typography, Container, useTheme } from '@mui/material';

const Footer = () => {
  const theme = useTheme();
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        mt: 'auto', 
        backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
        color: theme.palette.text.primary,
        borderTop: `1px solid ${theme.palette.divider}`
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} datlowashere.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 