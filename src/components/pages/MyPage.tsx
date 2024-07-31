// src/components/pages/MyPage.tsx
import React from 'react';
import { useAppSelector } from '../../store/store';
import { Container, Box, Typography, Avatar } from '@mui/material';

const MyPage: React.FC = () => {
  const userInfo = useAppSelector((state) => state.user.userInfo);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0d1b2a', pt: 10, color: 'white' }}>
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        My Page
        </Typography>
        {userInfo ? (
          <Box>
            <Typography variant="body1">ID/Mail: {userInfo.email}</Typography>
            <Avatar
              src={userInfo.representative_image ? `data:image/jpeg;base64,${userInfo.representative_image}` : '/images/icon.jpg'}
              alt="ユーザーアイコン"
              sx={{ width: 128, height: 128, mx: 'auto', mt: 4 }}
            />
          </Box>
        ) : (
          <Typography variant="body1">ユーザー情報がありません。</Typography>
        )}
      </Container>
    </Box>
  );
};

export default MyPage;
