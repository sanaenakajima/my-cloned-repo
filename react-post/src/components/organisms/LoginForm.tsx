// src/components/organisms/LoginForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { login, fetchUser } from '../../store/userSlice';
import LoginFormField from '../molecules/LoginFormField';
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
  const userInfo = useAppSelector((state) => state.user.userInfo);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitted(true);

    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);

    if (!emailValidationError && !passwordValidationError) {
      dispatch(login({ email, password })).unwrap()
        .then(() => {
          dispatch(fetchUser(localStorage.getItem('user_id') || '')); // ユーザー情報の取得
          navigate('/my-page');
        })
        .catch((error) => {
          console.error('Login failed:', error);
        });
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      setEmailError(validateEmail(email));
      setPasswordError(validatePassword(password));
    }
  }, [email, password, isSubmitted]);

  const isFormValid = !emailError && !passwordError;

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6 mt-10">
        <LoginFormField
          label="ログインID（メールアドレス）"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={isSubmitted ? emailError : ''}
        />
      </div>
      <div className="mb-8">
        <LoginFormField
          label="パスワード（英数8文字以上）"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={isSubmitted ? passwordError : ''}
        />
      </div>
      <div className="text-center mt-8">
        <LoginButton type="submit" disabled={authStatus === 'loading' || !isFormValid}>
          ログインする
        </LoginButton>
      </div>
      {authError && <ErrorMessage message={authError} className="text-sm mt-2" />}
    </form>
  );
};

export default LoginForm;
