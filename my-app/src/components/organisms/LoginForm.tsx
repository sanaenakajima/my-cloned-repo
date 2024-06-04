// src/components/organisms/LoginForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { login } from '../../store/userSlice';
import LoginFormField from '../molecules/LoginFormField';
import LoginButton from '../atoms/LoginButton';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitted(true);

    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);

    if (!emailValidationError && !passwordValidationError) {
      console.log('Dispatching login with:', { email, password });
      dispatch(login({ email, password })).unwrap()
        .then(() => {
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
      <div className="mb-6">
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
      {authError && <p className="text-red-500 text-sm mt-2">{authError}</p>}
    </form>
  );
};

export default LoginForm;




