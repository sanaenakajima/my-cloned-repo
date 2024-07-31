// src/components/organisms/RegisterForm.tsx
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setEmail, setPassword, setPasswordConfirm, setNickname, setUserIcon, setErrors, register } from '../../store/userSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { Typography, Avatar, Box } from '@mui/material';
import Button from '../atoms/Button';
import CustomTextField from '../atoms/CustomTextField';

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { email, password, passwordConfirm, nickname, userIcon, errors } = useAppSelector((state) => state.user);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(userIcon || '/images/icon.jpg');
  const [isFormValid, setIsFormValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      validateForm();
    }
  }, [email, password, passwordConfirm, nickname, userIcon, isSubmitted]);

  const handleFileChange = (base64: string | null, fileName: string | null) => {
    if (base64) {
      setImagePreviewUrl(base64);
      dispatch(setUserIcon(base64));
      dispatch(setErrors({ ...errors, userIcon: '' }));
    } else {
      setImagePreviewUrl('/images/icon.jpg');
      dispatch(setUserIcon(null));
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
      nickname,
      email,
      password: password!,
      password_confirmation: passwordConfirm!,
      representative_image: userIcon ? userIcon.split(',')[1] : ''
    };
    console.log('Registering user:', userData);

    try {
      const result = await dispatch(register(userData)).unwrap();
      navigate('/my-page');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, action: (value: string) => PayloadAction<string>) => {
    dispatch(action(e.target.value));
    if (isSubmitted) {
      validateForm();
    }
  };

  return (
    <div style={{ backgroundColor: '#0d1b2a', padding: '2rem', minHeight: '100vh', color: 'white' }}>
      <CustomTextField
        label="ログインID（メールアドレス）"
        type="email"
        value={email}
        onChange={(e) => handleFieldChange(e, setEmail)}
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email}
      />
      <CustomTextField
        label="パスワード（英数8文字以上）"
        type="password"
        value={password}
        onChange={(e) => handleFieldChange(e, setPassword)}
        fullWidth
        margin="normal"
        error={!!errors.password}
        helperText={errors.password}
      />
      <CustomTextField
        label="パスワード確認"
        type="password"
        value={passwordConfirm}
        onChange={(e) => handleFieldChange(e, setPasswordConfirm)}
        fullWidth
        margin="normal"
        error={!!errors.passwordConfirm}
        helperText={errors.passwordConfirm}
      />
      <CustomTextField
        label="ニックネーム（8文字以上）"
        type="text"
        value={nickname}
        onChange={(e) => handleFieldChange(e, setNickname)}
        fullWidth
        margin="normal"
        error={!!errors.nickname}
        helperText={errors.nickname}
      />
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <label htmlFor="icon-upload">
          <Avatar
            src={imagePreviewUrl}
            sx={{ width: 150, height: 150, margin: '0 auto', cursor: 'pointer' }}
          />
          <input
            type="file"
            id="icon-upload"
            style={{ display: 'none' }}
            onChange={(e) => {
              if (e.target.files) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onloadend = () => {
                  handleFileChange(reader.result as string, file.name);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </label>
        <Typography variant="body2" sx={{ color: '#ffffff', mt: 1 }}>
          タップして選択してください
        </Typography>
        {errors.userIcon && (
          <Typography variant="body2" color="error">
            {errors.userIcon}
          </Typography>
        )}
      </div>
      <Box display="flex" justifyContent="center" mt={3}>
        <Button
          onClick={handleRegister}
          disabled={!isFormValid}
          sx={{
            position: 'relative',
        color: '#EEEEEE',
        textTransform: 'none',
        backgroundColor: 'transparent',
        border: 'none',
        '&:hover': {
          backgroundColor: 'transparent',
          '&::after': {
            transform: 'scaleX(1)',
          }
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-1px',
          left: '0',
          width: '100%',
          height: '2px',
          backgroundColor: '#EEEEEE',
          transform: 'scaleX(0)',
          transformOrigin: 'center',
          transition: 'transform 0.3s ease',
            },
          }}
        >
          Register
        </Button>
      </Box>
    </div>
  );
};

export default RegisterForm;
