import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import UpdateProfileForm from '../organisms/UpdateProfileForm';

const UpdateProfilePage: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0d1b2a', pt: 10 }}>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" sx={{ color: 'white', mb: 4 }}>
        Update Profile
        </Typography>
        <UpdateProfileForm />
      </Container>
    </Box>
  );
};

export default UpdateProfilePage;
