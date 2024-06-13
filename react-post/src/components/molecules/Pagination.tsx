// src/components/molecules/Pagination.tsx
import React from 'react';
import Button from '../atoms/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  firstPageUrl: string | null;
  lastPageUrl: string | null;
  prevPageUrl: string | null;
  nextPageUrl: string | null;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, firstPageUrl, lastPageUrl, prevPageUrl, nextPageUrl }) => {
  const pageNumbers = [];
  const startPage = Math.max(1, currentPage - 2); 
  const endPage = Math.min(totalPages, startPage + 4); 

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center my-4">
      <Button onClick={() => onPageChange(currentPage - 1)} disabled={!prevPageUrl}>
        ◀
      </Button>
      {pageNumbers.map(number => (
        <Button key={number} onClick={() => onPageChange(number)} disabled={number === currentPage}>
          {number}
        </Button>
      ))}
      <Button onClick={() => onPageChange(currentPage + 1)} disabled={!nextPageUrl}>
        ▶
      </Button>
    </div>
  );
};

export default Pagination;






