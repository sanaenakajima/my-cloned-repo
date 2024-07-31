// src/components/organisms/UpdateProfileForm.tsx
import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';
import { setUserIcon, setErrors, updateUserThunk, setEmail, setNickname } from '../../store/userSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { Avatar, Typography } from '@mui/material';
import Button from '../atoms/Button';
import UpdateProfileFormFields from '../molecules/UpdateProfileFormFields';

const UpdateProfileForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { email, nickname, userIcon, errors, userInfo } = useSelector((state: RootState) => state.user);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(userIcon);
  const [isFormValid, setIsFormValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (userInfo) {
      dispatch(setEmail(userInfo.email));
      dispatch(setNickname(userInfo.nickname));
      setImagePreviewUrl(userInfo.representative_image ? `data:image/jpeg;base64,${userInfo.representative_image}` : null);
    }
  }, [userInfo, dispatch]);

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
      await dispatch(updateUserThunk(userData)).unwrap();
      navigate('/my-page');
    } catch (err) {
      console.error('Update failed:', err);
      setMessage('更新に失敗しました。再度お試しください。');
    }
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, action: (value: string) => PayloadAction<string>) => {
    dispatch(action(e.target.value));
    if (isSubmitted) {
      validateForm();
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div style={{ backgroundColor: '#0d1b2a', padding: '2rem', minHeight: '100vh', color: 'white' }}>
      {message && <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>}
      <UpdateProfileFormFields
        email={email}
        nickname={nickname}
        errors={errors}
        onFieldChange={handleFieldChange}
      />
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <label htmlFor="icon-upload" style={{ cursor: 'pointer' }}>
          <Avatar
            src={imagePreviewUrl || '/images/icon.jpg'}
            sx={{ width: 150, height: 150, margin: '0 auto', cursor: 'pointer' }}
          />
          <Typography variant="body2" color="textSecondary" style={{ color: 'white', marginTop: '1rem' }}>
            タップして画像を変更
          </Typography>
        </label>
        <input
          type="file"
          id="icon-upload"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept=".jpg"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                handleFileChange(reader.result as string, file.name);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
      </div>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Button
          onClick={handleUpdate}
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
          bottom: '-1px', // 文字の下に余白を持たせる
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
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default UpdateProfileForm;
