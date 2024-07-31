// src/components/molecules/ArticleFormFields.tsx
import React from 'react';
import { TextField, Box } from '@mui/material';
import CustomTextField from '../atoms/CustomTextField';

interface ArticleFormFieldsProps {
  title: string;
  content: string;
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ArticleFormFields: React.FC<ArticleFormFieldsProps> = ({ title, content, onFieldChange }) => (
  <Box sx={{ mb: 4 }}>
    <CustomTextField
      label="Title"
      name="title"
      value={title}
      onChange={onFieldChange}
      fullWidth
      margin="normal"
      variant="outlined"
    />
    <CustomTextField
      label="Content"
      name="content"
      value={content}
      onChange={onFieldChange}
      fullWidth
      margin="normal"
      variant="outlined"
      multiline
      rows={6}
    />
  </Box>
);

export default ArticleFormFields;
