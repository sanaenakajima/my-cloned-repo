// src/components/molecules/RegisterFormFields.tsx
import React from 'react';
import { PayloadAction } from '@reduxjs/toolkit';
import InputField from '../atoms/InputField';
import FileUploadButton from './FileUploadButton';
import { setEmail, setPassword, setPasswordConfirm, setNickname } from '../../store/userSlice';

interface RegisterFormFieldsProps {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  imagePreviewUrl: string | null;
  errors: {
    email: string;
    password: string;
    passwordConfirm: string;
    nickname: string;
    userIcon: string;
  };
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement>, action: (value: string) => PayloadAction<string>) => void;
  onFileChange: (base64: string | null, fileName: string | null) => void;
}

const RegisterFormFields: React.FC<RegisterFormFieldsProps> = ({
  email,
  password,
  passwordConfirm,
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
        label="パスワード（英数8文字以上）"
        type="password"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFieldChange(e, setPassword)}
        error={errors.password}
        className="mb-6"
      />
      <InputField
        label="パスワード確認"
        type="password"
        value={passwordConfirm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFieldChange(e, setPasswordConfirm)}
        error={errors.passwordConfirm}
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

export default RegisterFormFields;


