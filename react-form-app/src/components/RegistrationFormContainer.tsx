import React, { useState } from "react";
import axios from "axios";
import RegistrationForm from "./organisms/RegistrationForm";
import { useNavigate } from "react-router-dom";

const RegistrationFormContainer: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    postalCode: "",
    prefecture: "",
    city: "",
    address: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePostalCodeSearch = async () => {
    if (formData.postalCode.match(/^\d{7}$/)) {
      try {
        const response = await axios.get(`https://api.zipaddress.net/?zipcode=${formData.postalCode}`);
        if (response.data.code === 200) {
          setFormData(prevState => ({
            ...prevState,
            prefecture: response.data.data.pref,
            city: response.data.data.city,
            address: response.data.data.town
          }));
        } else {
          alert("郵便番号から住所を取得できませんでした。");
        }
      } catch (error) {
        alert("住所検索に失敗しました。");
      }
    } else {
      alert("有効な郵便番号を入力してください。ハイフン（-）なしで入力してください。");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      console.log(formData);
      navigate('/registration-complete');
    } else {
      setErrors(errors);
    }
  };

  const validateForm = (): Record<string, string> => {
    const validationErrors: Record<string, string> = {};

     // 名前の検証
  if (!formData.name.trim()) {
    validationErrors.name = "名前を入力してください";
  }

  // ユーザーネームの検証
  if (!formData.username.trim()) {
    validationErrors.username = "ユーザーネームを入力してください";
  }

  // メールアドレスの検証
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email.trim()) {
    validationErrors.email = "メールアドレスを入力してください";
  } else if (!emailRegex.test(formData.email)) {
    validationErrors.email = "有効なメールアドレスを入力してください";
  }

  // パスワードの検証
  if (!formData.password.trim()) {
    validationErrors.password = "パスワードを入力してください";
  }

  // パスワード確認の検証
  if (!formData.confirmPassword.trim()) {
    validationErrors.confirmPassword = "パスワード確認を入力してください";
  } else if (formData.password !== formData.confirmPassword) {
    validationErrors.confirmPassword = "パスワードが一致しません";
  }

  // 郵便番号の検証
  if (!formData.postalCode.trim()) {
    validationErrors.postalCode = "郵便番号を入力してください";
  }

  // 都道府県の検証
  if (!formData.prefecture.trim()) {
    validationErrors.prefecture = "都道府県を入力してください";
  }

  // 市または区の検証
  if (!formData.city.trim()) {
    validationErrors.city = "市または区を入力してください";
  }

  // 番地の検証
  if (!formData.address.trim()) {
    validationErrors.address = "番地を入力してください";
  }

  return validationErrors;
};

  return (
    <RegistrationForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handlePostalCodeSearch={handlePostalCodeSearch}
      errors={errors}
    />
  );
};

export default RegistrationFormContainer;
