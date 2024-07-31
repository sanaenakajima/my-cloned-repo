// src/components/molecules/Pagination.tsx
import React from 'react';
import { Box, Button } from '@mui/material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
      {currentPage > 1 && (
        <Button 
          onClick={() => onPageChange(currentPage - 1)} 
          variant="contained" 
          sx={{
            backgroundColor: '#DC5F00',
            color: '#EEEEEE',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#FF8C00',
              textDecoration: 'underline',
            },
          }}
        >
          Previous
        </Button>
      )}
      {pages.map(page => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          variant={page === currentPage ? 'contained' : 'outlined'}
          sx={{
            backgroundColor: page === currentPage ? '#DC5F00' : 'transparent',
            color: page === currentPage ? '#EEEEEE' : '#DC5F00',
            borderColor: '#DC5F00',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: page === currentPage ? '#FF8C00' : 'transparent',
              borderColor: '#FF8C00',
              color: '#FF8C00',
              textDecoration: page !== currentPage ? 'underline' : 'none',
            },
          }}
        >
          {page}
        </Button>
      ))}
      {currentPage < totalPages && (
        <Button 
          onClick={() => onPageChange(currentPage + 1)} 
          variant="contained" 
          sx={{
            backgroundColor: '#DC5F00',
            color: '#EEEEEE',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#FF8C00',
              textDecoration: 'underline',
            },
          }}
        >
          Next
        </Button>
      )}
    </Box>
  );
};

export default Pagination;
