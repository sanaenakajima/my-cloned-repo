import React, { useState, useEffect, ReactNode } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { logout } from '../../store/userSlice';
import useAuth from '../../hooks/useAuth';
import { AppBar, Toolbar, Box, Drawer, List, ListItem, ListItemText, styled, Typography, ListItemProps } from '@mui/material';
import { motion } from 'framer-motion';
import Button from '../atoms/Button';

const CustomIconButton = styled(motion.div)(({ theme }) => ({
  width: '30px',
  height: '30px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  zIndex: 1500,
  '& div': {
    width: '100%',
    height: '2px',
    backgroundColor: '#FFFFFF',
    margin: '4px 0',
    transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
  },
}));

const CloseButton = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  top: '65px', 
  right: '35px', 
  zIndex: 1600,
  cursor: 'pointer',
}));

interface ListItemWithAnimationProps extends ListItemProps {
  children: ReactNode;
  component?: any;
  to?: string;
  onClick?: () => void;
}

const ListItemWithAnimation = styled(({ children, ...props }: ListItemWithAnimationProps) => (
  <ListItem {...props}>
    {children}
  </ListItem>
))(({ theme }) => ({
  position: 'relative',
  '&:hover': {
    '&::after': {
      width: '100%',
      left: 0,
    },
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: '0%',
    height: '2px',
    backgroundColor: '#1b2a3a',
    transition: 'width 0.3s ease-in-out, left 0.3s ease-in-out',
  },
}));

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showLine, setShowLine] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const renderLinks = () => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {!isAuthenticated ? (
        <>
          <Button to="/register">Sign Up</Button>
          <Button to="/login">Log In</Button>
        </>
      ) : (
        <>
          <Button to="/create-article">Create Article</Button>
          <Button to="/article-list">Article List</Button>
          <Button to="/update-profile">Update Profile</Button>
          <Button to="/my-page">My Page</Button>
          <Button onClick={handleLogout}>Log Out</Button>
        </>
      )}
    </Box>
  );

  const iconVariants = {
    open: { rotate: 45 },
    closed: { rotate: 0 }
  };

  const line1Variants = {
    open: { d: "M3 3L21 21", transition: { duration: 1 } },
    closed: { d: "M3 6h18", transition: { duration: 1 } }
  };

  const line2Variants = {
    open: { opacity: 0, transition: { duration: 0.5 } },
    closed: { opacity: 1, transition: { duration: 0.5 } }
  };

  const line3Variants = {
    open: { d: "M3 21L21 3", transition: { duration: 1 } },
    closed: { d: "M3 18h18", transition: { duration: 1 } }
  };

  useEffect(() => {
    setShowLine(true);
  }, []);

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#0d1b2a', height: '150px' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', height: '100%' }}>
          <Box>
            <RouterLink to="/">
              <img src="/images/logo.png" alt="Logo" style={{ height: '100px' }} />
            </RouterLink>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {renderLinks()}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, zIndex: 1500 }}>
            <CustomIconButton
              onClick={toggleDrawer}
              initial="closed"
              animate={drawerOpen ? "open" : "closed"}
              variants={iconVariants}
              transition={{ duration: 0.5 }}
            >
              <svg width="30" height="30" viewBox="0 0 24 24">
                <motion.path
                  d="M3 6h18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={line1Variants}
                />
                <motion.path
                  d="M3 12h18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={line2Variants}
                />
                <motion.path
                  d="M3 18h18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={line3Variants}
                />
              </svg>
            </CustomIconButton>
          </Box>
        </Toolbar>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: showLine ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          style={{ originX: 0, backgroundColor: '#DC5F00', height: '1px', width: '100%' }}
        />
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            backgroundColor: '#DC5F00',
            color: '#1b2a3a', // 濃いめのネイビー色
            width: 250,
            position: 'fixed',
            right: 0,
          },
        }}
      >
        <CloseButton
          initial={{ opacity: 0 }}
          animate={{ opacity: drawerOpen ? 1 : 0 }}
          transition={{ duration: 1 }}
          onClick={toggleDrawer}
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <motion.path
              d="M3 3L21 21"
              stroke="#1b2a3a"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 1 } }}
            />
            <motion.path
              d="M3 21L21 3"
              stroke="#1b2a3a"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 1 } }}
            />
          </svg>
        </CloseButton>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 20,
          }}
          role="presentation"
          onClick={toggleDrawer}
        >
          <List>
            {!isAuthenticated ? (
              <>
                <ListItemWithAnimation component={RouterLink} to="/register">
                  <ListItemText primary={<Typography variant="h6" sx={{ color: '#1b2a3a' }}>Sign Up</Typography>} />
                </ListItemWithAnimation>
                <ListItemWithAnimation component={RouterLink} to="/login">
                  <ListItemText primary={<Typography variant="h6" sx={{ color: '#1b2a3a' }}>Log In</Typography>} />
                </ListItemWithAnimation>
              </>
            ) : (
              <>
                <ListItemWithAnimation component={RouterLink} to="/create-article">
                  <ListItemText primary={<Typography variant="h6" sx={{ color: '#1b2a3a' }}>Create Article</Typography>} />
                </ListItemWithAnimation>
                <ListItemWithAnimation component={RouterLink} to="/article-list">
                  <ListItemText primary={<Typography variant="h6" sx={{ color: '#1b2a3a' }}>Article List</Typography>} />
                </ListItemWithAnimation>
                <ListItemWithAnimation component={RouterLink} to="/update-profile">
                  <ListItemText primary={<Typography variant="h6" sx={{ color: '#1b2a3a' }}>Update Profile</Typography>} />
                </ListItemWithAnimation>
                <ListItemWithAnimation component={RouterLink} to="/my-page">
                  <ListItemText primary={<Typography variant="h6" sx={{ color: '#1b2a3a' }}>My Page</Typography>} />
                </ListItemWithAnimation>
                <ListItemWithAnimation onClick={handleLogout}>
                  <ListItemText primary={<Typography variant="h6" sx={{ color: '#1b2a3a' }}>Log Out</Typography>} />
                </ListItemWithAnimation>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
