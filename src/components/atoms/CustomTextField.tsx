// src/components/atoms/CustomTextField.tsx
import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomTextField = styled((props: TextFieldProps) => (
  <TextField {...props} />
))(({ theme }) => ({
  '& .MuiInput-underline:before': {
    borderBottomColor: '#EEEEEE',
  },
  '& .MuiInput-underline:hover:before': {
    borderBottomColor: '#FFA500',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#DC5F00',
  },
  '& .MuiInputLabel-root': {
    color: '#EEEEEE',
    fontSize: '0.75rem', // ラベルのフォントサイズを小さく
  },
  '& .MuiInputLabel-shrink': {
    color: '#EEEEEE', // フォーカス時のラベルの色を白に設定
    fontSize: '1.00rem', // フォーカス時のラベルのフォントサイズを大きく
  },
  '& .MuiInputBase-input': {
    color: '#EEEEEE',
    backgroundColor: '#1b263b', // 入力フィールドの背景色を設定
    padding: '10px', // 入力フィールドのパディングを設定
    borderRadius: '4px', // 入力フィールドの角を丸くする
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#EEEEEE',
    },
    '&:hover fieldset': {
      borderColor: '#DC5F00',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#EEEEE', // フォーカス時の枠の色を変更
    },
    backgroundColor: '#1b263b', // 入力フィールド全体の背景色を設定
    borderRadius: '4px', // 入力フィールド全体の角を丸くする
  },
}));

export default CustomTextField;
