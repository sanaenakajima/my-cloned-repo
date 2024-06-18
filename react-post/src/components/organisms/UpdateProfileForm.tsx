// src/components/organisms/UpdateProfileForm.tsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';
import { setEmail, setNickname, setUserIcon, setErrors, updateUser } from '../../store/userSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import Button from '../atoms/Button';
import UpdateProfileFormFields from '../molecules/UpdateProfileFormFields';
import Title from '../atoms/Title';

const UpdateProfileForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { email, nickname, userIcon, errors } = useSelector((state: RootState) => state.user);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(userIcon);
  const [isFormValid, setIsFormValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isSubmitted) {
      validateForm();
    }
  }, [email, nickname, userIcon]);

  const handleFileChange = (base64: string | null, fileName: string | null) => {
    setImagePreviewUrl(base64);
    dispatch(setUserIcon(base64));
    if (fileName && !fileName.endsWith('.jpg')) {
      dispatch(setErrors({ ...errors, userIcon: '.jpg形式のファイルを選択してください' }));
    } else {
      dispatch(setErrors({ ...errors, userIcon: '' }));
    }
    if (isSubmitted) {
      validateForm();
    }
  };

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
      passwordConfirm: '',
      nickname: '',
      userIcon: '',
      general: ''
    };
    let isValid = true;

    if (!email) {
      newErrors.email = '入力してください';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'メールアドレスの形式が正しくありません';
      isValid = false;
    }

    if (!nickname) {
      newErrors.nickname = '入力してください';
      isValid = false;
    } else if (nickname.length < 8) {
      newErrors.nickname = '8文字以上で入力してください';
      isValid = false;
    }

    if (userIcon && !userIcon.startsWith('data:image/jpeg')) {
      newErrors.userIcon = '.jpg形式のファイルを選択してください';
      isValid = false;
    }

    dispatch(setErrors(newErrors));
    setIsFormValid(isValid);
    return isValid;
  };

  const handleUpdate = async () => {
    setIsSubmitted(true);
    if (!validateForm()) {
      return;
    }
    const userData = {
      email,
      nickname,
      representative_image: userIcon ? userIcon.split(',')[1] : ''
    };
    console.log('Updating user:', userData);

    try {
      await dispatch(updateUser(userData)).unwrap();
      navigate('/my-page'); // 成功時にマイページに遷移
    } catch (err) {
      console.error('Update failed:', err);
      setMessage('更新に失敗しました。再度お試しください。');
    }
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>, action: (value: string) => PayloadAction<string>) => {
    dispatch(action(e.target.value));
    if (isSubmitted) {
      validateForm();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-20">
      <Title text="会員情報変更" className="mb-8 text-center" />
      <div className="w-full max-w-lg text-center p-6">
        {message && <p className="mb-4 text-red-600">{message}</p>}
        <UpdateProfileFormFields
          email={email}
          nickname={nickname}
          imagePreviewUrl={imagePreviewUrl}
          errors={errors}
          onFieldChange={handleFieldChange}
          onFileChange={handleFileChange}
        />
        <Button
          onClick={handleUpdate}
          disabled={!isFormValid}
          className={`bg-navy-700 hover:bg-navy-900 text-white font-bold py-3 px-6 rounded ${!isFormValid && 'opacity-50 cursor-not-allowed'}`}
        >
          変更する
        </Button>
      </div>
    </div>
  );
};

export default UpdateProfileForm;






