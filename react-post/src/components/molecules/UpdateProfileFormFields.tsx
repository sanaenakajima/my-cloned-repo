// src/components/molecules/UpdateProfileFormFields.tsx
import React from 'react';
import { PayloadAction } from '@reduxjs/toolkit';
import InputField from '../atoms/InputField';
import FileUploadButton from './FileUploadButton';
import { setEmail, setNickname } from '../../store/userSlice';

interface UpdateProfileFormFieldsProps {
  email: string;
  nickname: string;
  imagePreviewUrl: string | null;
  errors: {
    email: string;
    nickname: string;
    userIcon: string;
  };
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement>, action: (value: string) => PayloadAction<string>) => void;
  onFileChange: (base64: string | null, fileName: string | null) => void;
}

const UpdateProfileFormFields: React.FC<UpdateProfileFormFieldsProps> = ({
  email,
  nickname,
  imagePreviewUrl,
  errors,
  onFieldChange,
  onFileChange
}) => {
  const initialImageUrl = imagePreviewUrl || "/icons/usericon2.png";

  return (
    <>
      <InputField
        label="ログインID（メールアドレス）"
        type="email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFieldChange(e, setEmail)}
        error={errors.email}
        className="mb-6"
      />
      <InputField
        label="ニックネーム（8文字以上）"
        type="text"
        value={nickname}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFieldChange(e, setNickname)}
        error={errors.nickname}
        className="mb-6"
      />
      <FileUploadButton
        onFileSelect={(base64, fileName) => onFileChange(base64, fileName)}
        imageUrl={initialImageUrl}
        error={errors.userIcon}
        className="mb-8"
      />
    </>
  );
};

export default UpdateProfileFormFields;
