// src/components/organisms/LoginForm.tsx
import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { login } from '../../store/userSlice';
import CustomTextField from '../atoms/CustomTextField';
import LoginButton from '../molecules/LoginButton';
import ErrorMessage from '../atoms/ErrorMessage';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authStatus = useAppSelector((state) => state.user.status);
  const authError = useAppSelector((state) => state.user.errors.general);

  const validateEmail = (email: string): string => {
    if (!email) {
      return '入力してください';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      return '正しいメールアドレスを入力してください';
    }
    return '';
  };

  const validatePassword = (password: string): string => {
    if (!password) {
      return '入力してください';
    } else if (password.length < 8) {
      return '英数8文字以上入力してください';
    }
    return '';
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (isSubmitted) {
      setEmailError(validateEmail(e.target.value));
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (isSubmitted) {
      setPasswordError(validatePassword(e.target.value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitted(true);

    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);

    if (!emailValidationError && !passwordValidationError) {
      try {
        await dispatch(login({ email, password })).unwrap();
        navigate('/my-page');
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6 mt-10">
        <CustomTextField
          label="ログインID（メールアドレス）"
          type="email"
          value={email}
          onChange={handleEmailChange}
          fullWidth
          margin="normal"
          error={!!emailError}
          helperText={emailError}
        />
      </div>
      <div className="mb-8">
        <CustomTextField
          label="パスワード（英数8文字以上）"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          fullWidth
          margin="normal"
          error={!!passwordError}
          helperText={passwordError}
        />
      </div>
      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <LoginButton type="submit" disabled={authStatus === 'loading'}>
          Log in
        </LoginButton>
      </div>
      {authError && <ErrorMessage message={authError} className="text-sm mt-2" />}
    </form>
  );
};

export default LoginForm;
