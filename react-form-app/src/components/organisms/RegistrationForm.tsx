// components/organisms/RegistrationForm.tsx
import React from "react";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";

// FormDataの型定義
interface FormData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  postalCode: string;
  prefecture: string;
  city: string;
  address: string;
}

// Errorsオブジェクトの型定義
interface Errors {
  [key: string]: string;
}

// RegistrationFormのProps型定義
interface RegistrationFormProps {
  formData: FormData;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handlePostalCodeSearch: () => Promise<void>;
  errors: Errors;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  formData,
  handleChange,
  handleSubmit,
  handlePostalCodeSearch,
  errors
}) => {
  return (
    <form onSubmit={handleSubmit} className="formContainer">
      <h1>登録フォーム</h1>
      <hr />
      <div className="uniForm">
        <FormField type="text" id="name" placeholder="名前" name="name"
                   value={formData.name} onChange={handleChange} error={errors.name} />
        <FormField type="text" id="username" placeholder="ユーザーネーム" name="username"
                   value={formData.username} onChange={handleChange} error={errors.username} />
        <FormField type="email" id="email" placeholder="メールアドレス" name="email"
                   value={formData.email} onChange={handleChange} error={errors.email} />
        <FormField type="password" id="password" placeholder="パスワード" name="password"
                   value={formData.password} onChange={handleChange} error={errors.password} />
        <FormField type="password" id="confirmPassword" placeholder="パスワード確認" name="confirmPassword"
                   value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />
        <FormField type="text" id="postalCode" placeholder="郵便番号" name="postalCode"
                   value={formData.postalCode} onChange={handleChange} error={errors.postalCode} />
        <Button type="button" onClick={handlePostalCodeSearch}>住所検索</Button>
        <FormField type="text" id="prefecture" placeholder="都道府県" name="prefecture"
                   value={formData.prefecture} onChange={handleChange} error={errors.prefecture} />
        <FormField type="text" id="city" placeholder="区または市" name="city"
                   value={formData.city} onChange={handleChange} error={errors.city} />
        <FormField type="text" id="address" placeholder="番地" name="address"
                   value={formData.address} onChange={handleChange} error={errors.address} />
        <Button type="submit">登録</Button>
      </div>
    </form>
  );
};

export default RegistrationForm;

