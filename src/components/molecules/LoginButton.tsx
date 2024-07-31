// src/components/molecules/LoginButton.tsx
import React from 'react';
import { Button as MUIButton, ButtonProps as MUIButtonProps } from '@mui/material';

interface LoginButtonProps extends MUIButtonProps {
  children: React.ReactNode;
}

const LoginButton: React.FC<LoginButtonProps> = ({ children, ...props }) => (
  <MUIButton
  {...props}
  sx={{
    position: 'relative',
    color: '#EEEEEE',
    textTransform: 'none',
    backgroundColor: 'transparent',
    border: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
      '&::after': {
        transform: 'scaleX(1)',
      }
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-1px', 
      left: '0',
      width: '100%',
      height: '2px',
      backgroundColor: '#EEEEEE',
      transform: 'scaleX(0)',
      transformOrigin: 'center',
      transition: 'transform 0.3s ease',
    },
    ...props.sx,
  }}
>
    {children}
  </MUIButton>
);

export default LoginButton;
