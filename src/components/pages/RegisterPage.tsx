// src/components/pages/RegisterPage.tsx
import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import RegisterForm from '../organisms/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0d1b2a', pt: 10 }}>
      <Container maxWidth="sm" sx={{ bgcolor: 'transparent' }}>
        <Typography variant="h4" align="center" sx={{ color: 'white', mb: 4 }}>
        Sign Up
        </Typography>
        <RegisterForm />
      </Container>
    </Box>
  );
};

export default RegisterPage;
