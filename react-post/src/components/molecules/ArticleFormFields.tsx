// src/components/molecules/ArticleFormFields.tsx
import React from 'react';
import InputField from '../atoms/InputField';
import TextAreaField from '../atoms/TextAreaField';

interface ArticleFormFieldsProps {
  title: string;
  content: string;
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ArticleFormFields: React.FC<ArticleFormFieldsProps> = ({ title, content, onFieldChange }) => {
  return (
    <div className="form-fields-container">
      <InputField
        placeholder="タイトル"
        type="text"
        name="title"
        value={title}
        onChange={onFieldChange}
        className="mb-6 title-input"
      />
      <TextAreaField
        label="投稿内容"
        name="content"
        value={content}
        onChange={onFieldChange}
        className="mb-6 content-textarea"
      />
    </div>
  );
};

export default ArticleFormFields;










