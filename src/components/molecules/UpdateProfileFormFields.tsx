import React, { ChangeEvent } from 'react';
import CustomTextField from '../atoms/CustomTextField';

interface UpdateProfileFormFieldsProps {
  email: string;
  nickname: string;
  errors: {
    email: string;
    password: string;
    passwordConfirm: string;
    nickname: string;
    userIcon: string;
    general: string;
  };
  onFieldChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, action: (value: string) => { payload: string; type: string }) => void;
}

const UpdateProfileFormFields: React.FC<UpdateProfileFormFieldsProps> = ({
  email,
  nickname,
  errors,
  onFieldChange,
}) => {
  return (
    <div>
      <CustomTextField
        label="メールアドレス"
        type="email"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onFieldChange(e, (value: string) => ({ type: 'user/setEmail', payload: value }))}
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email}
      />
      <CustomTextField
        label="ニックネーム"
        type="text"
        value={nickname}
        onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onFieldChange(e, (value: string) => ({ type: 'user/setNickname', payload: value }))}
        fullWidth
        margin="normal"
        error={!!errors.nickname}
        helperText={errors.nickname}
      />
    </div>
  );
};

export default UpdateProfileFormFields;
