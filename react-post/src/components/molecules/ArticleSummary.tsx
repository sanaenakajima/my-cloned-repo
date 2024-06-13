import React from 'react';

interface ArticleSummaryProps {
  title: string;
  content: string;
  onClick: () => void;
}

const ArticleSummary: React.FC<ArticleSummaryProps> = ({ title, content, onClick }) => {
  return (
    <tr className="border-b border-gray-200">
      <td className="py-2 px-4 text-left border-r border-gray-200">{title}</td>
      <td className="py-2 px-4 text-left cursor-pointer text-navy-600 underline" onClick={onClick}>{content}</td>
    </tr>
  );
};

export default ArticleSummary;








