import { combineReducers } from '@reduxjs/toolkit';

// 仮のリデューサー
const placeholderReducer = (state = {}, action: any) => state;

const rootReducer = combineReducers({
  placeholder: placeholderReducer,
  // 他のリデューサーをここに追加
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
