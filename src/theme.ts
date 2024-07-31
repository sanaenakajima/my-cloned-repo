import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#DC5F00', // プライマリカラーを設定
    },
    secondary: {
      main: '#FFA500', // セカンダリカラーを設定
    },
  },
  typography: {
    fontFamily: '游ゴシック, sans-serif',
    h6: {
      fontFamily: 'Impact, sans-serif',
      fontSize: '2.00rem',
    },
    h4: {
      fontFamily: 'Impact, sans-serif',
      fontSize: '4.00rem'
    },
},
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'white', // 通常時のラベルの色を設定
          fontSize: '0.75rem', // ラベルのフォントサイズを小さく
        },
        shrink: {
          color: 'white', // フォーカス時のラベルの色を設定
          fontSize: '0.75rem', // フォーカス時のラベルのフォントサイズを大きく
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Impact, sans-serif',
          fontSize: '1.50rem',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#DC5F00', // フォーカス時の枠の色を設定
          },
          backgroundColor: '#1b263b', // 入力フィールド全体の背景色を設定
          borderRadius: '4px', // 入力フィールド全体の角を丸くする
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: 'white', // 入力文字の色を設定
          backgroundColor: '#1b263b', // 入力フィールドの背景色を設定
          padding: '10px', // 入力フィールドのパディングを設定
          borderRadius: '4px', // 入力フィールドの角を丸くする
        },
      },
    },
  },
});

export default theme;
