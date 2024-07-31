// src/components/atoms/Button.tsx
import React from 'react';
import { Button as MUIButton, ButtonProps as MUIButtonProps } from '@mui/material';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

interface ButtonProps extends MUIButtonProps {
  to?: RouterLinkProps['to'];
}

const Button: React.FC<ButtonProps> = ({ children, to, ...props }) => {
  const Component = to ? RouterLink : 'button';

  return (
    <MUIButton
      component={Component}
      to={to}
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
          bottom: '-1px', // 文字の下に余白を持たせる
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
};

export default Button;
