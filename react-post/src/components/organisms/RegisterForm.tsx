// src/components/organisms/RegisterForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';
import RegisterFormFields from '../molecules/RegisterFormFields';
import { setUserIcon, setErrors, register } from '../../store/userSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import Button from '../atoms/Button';
import Title from '../atoms/Title';

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { email, password, passwordConfirm, nickname, userIcon, errors } = useSelector((state: RootState) => state.user);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(userIcon);
  const [isFormValid, setIsFormValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      validateForm();
    }
  }, [email, password, passwordConfirm, nickname, userIcon, isSubmitted]);

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

    if (!password) {
      newErrors.password = '入力してください';
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = '8文字以上で入力してください';
      isValid = false;
    }

    if (!passwordConfirm) {
      newErrors.passwordConfirm = '入力してください';
      isValid = false;
    } else if (password !== passwordConfirm) {
      newErrors.passwordConfirm = 'パスワードの値が一致しません';
      isValid = false;
    } else if (passwordConfirm.length < 8) {
      newErrors.passwordConfirm = '8文字以上で入力してください';
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

  const handleRegister = async () => {
    setIsSubmitted(true);
    if (!validateForm()) {
      return;
    }
    const userData = {
      name: nickname,
      email,
      password: password!,
      password_confirmation: passwordConfirm!,
      representative_image: userIcon ? userIcon.split(',')[1] : ''
    };
    console.log('Registering user:', userData);
  
    try {
      const result = await dispatch(register(userData)).unwrap();
      navigate('/my-page'); // トークンと認証状態が更新された後にナビゲート
    } catch (err) {
      console.error('Registration failed:', err);
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
      <div className="w-full max-w-lg text-center p-6">
        <Title text="会員登録" className="mb-7" />
        <RegisterFormFields
          email={email}
          password={password}
          passwordConfirm={passwordConfirm}
          nickname={nickname}
          imagePreviewUrl={imagePreviewUrl}
          errors={errors}
          onFieldChange={handleFieldChange}
          onFileChange={handleFileChange}
        />
        <Button
          onClick={handleRegister}
          disabled={!isFormValid}
          className={`bg-navy-700 hover:bg-navy-900 text-white font-bold py-3 px-6 rounded ${!isFormValid && 'opacity-50 cursor-not-allowed'}`}
        >
          登録する
        </Button>
      </div>
    </div>
  );
};

export default RegisterForm;






