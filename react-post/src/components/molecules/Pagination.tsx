import React from 'react';
import Button from '../atoms/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.min(5, totalPages); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center my-4">
      <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        ◀
      </Button>
      {pageNumbers.map(number => (
        <Button key={number} onClick={() => onPageChange(number)} disabled={number === currentPage}>
          {number}
        </Button>
      ))}
      <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        ▶
      </Button>
    </div>
  );
};

export default Pagination;


