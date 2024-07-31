// src/components/pages/LoginPage.tsx
import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import LoginForm from '../organisms/LoginForm';

const LoginPage: React.FC = () => (
  <Box sx={{ minHeight: '100vh', bgcolor: '#0d1b2a', pt: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" sx={{ color: 'white', mb: 4 }}>
        Log In
      </Typography>
      <LoginForm />
    </Container>
  </Box>
);

export default LoginPage;
