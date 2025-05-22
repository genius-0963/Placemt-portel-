import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Paper, Container, Typography, useTheme, useMediaQuery } from '@mui/material';

const AuthLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: '#f9fafb',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background decorations */}
      <Box
        sx={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          backgroundColor: 'primary.main',
          borderRadius: '50%',
          opacity: 0.05,
          top: '-100px',
          left: '-100px',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          backgroundColor: 'secondary.main',
          borderRadius: '50%',
          opacity: 0.05,
          bottom: '-200px',
          right: '-200px',
        }}
      />
      
      <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box 
          sx={{
            display: 'flex',
            width: '100%',
            height: isMobile ? 'auto' : '600px',
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Left side - Branding */}
          {!isMobile && (
            <Box
              sx={{
                flex: '1 1 45%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'primary.main',
                color: 'white',
                p: 6,
                position: 'relative',
                backgroundImage: 'linear-gradient(135deg, rgba(26, 86, 219, 1) 0%, rgba(24, 78, 196, 1) 100%)',
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <img src="/logo.svg" alt="Amity University" width={80} height={80} />
                </Box>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
                  Amity University
                </Typography>
                <Typography variant="h5" sx={{ mb: 4 }}>
                  Placement Portal
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
                  Connect with top companies, track your placement progress, and maximize your career opportunities.
                </Typography>
                <Box sx={{ mt: 6 }}>
                  <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>
                    Trusted by 500+ companies
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 2 }}>
                    {/* Company logos would go here */}
                    <Box sx={{ width: 40, height: 40, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '50%' }} />
                    <Box sx={{ width: 40, height: 40, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '50%' }} />
                    <Box sx={{ width: 40, height: 40, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '50%' }} />
                  </Box>
                </Box>
              </Box>
              
              {/* Abstract shapes for decoration */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '300px',
                  height: '300px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  opacity: 0.1,
                  top: '-100px',
                  right: '-100px',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  width: '200px',
                  height: '200px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  opacity: 0.1,
                  bottom: '-50px',
                  left: '-50px',
                }}
              />
            </Box>
          )}
          
          {/* Right side - Auth form */}
          <Paper 
            elevation={0}
            sx={{
              flex: isMobile ? '1 1 100%' : '1 1 55%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              p: { xs: 3, sm: 6 },
              backgroundColor: 'white',
            }}
          >
            <Outlet />
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default AuthLayout;