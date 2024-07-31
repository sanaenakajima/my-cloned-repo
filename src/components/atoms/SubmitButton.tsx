import React from 'react';
import { Button as MUIButton, ButtonProps as MUIButtonProps } from '@mui/material';

interface SubmitButtonProps extends MUIButtonProps {
  children: React.ReactNode;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ children, ...props }) => (
  <MUIButton
    {...props}
    type="submit" // 'submit' を明示的に指定
    sx={{
      color: 'white',
      textTransform: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
      ...props.sx,
    }}
  >
    {children}
  </MUIButton>
);

export default SubmitButton;
