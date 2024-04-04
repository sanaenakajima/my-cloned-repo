document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.getElementById("submitButton");
  submitButton.addEventListener("click", event => {
      event.preventDefault();

      const nickname = document.getElementById("nickname").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const inquiry = document.getElementById("inquiry").value.trim();

      clearErrors();
     
if (nickname === "") {
    displayError("nicknameError", "お名前を入力してください");
}

if (email === "") {
    displayError("emailError", "メールアドレスを入力してください");
} else if (!isValidEmail(email)) {
    displayError("emailError", "有効なメールアドレスを入力してください");
}

if (phone === "") {
    displayError("phoneError", "電話番号を入力してください");
} else if (!isValidPhone(phone)) {
    displayError("phoneError", "有効な電話番号を入力してください");
}

if (inquiry === "") {
    displayError("inquiryError", "問い合わせ内容を入力してください");
}

if (nickname !== "" && email !== "" && isValidEmail(email) && phone !== "" && isValidPhone(phone) && inquiry !== "") {
    document.getElementById("successMessage").textContent = "投稿完了です！";
    clearFields();
}
  });

  const displayError = (errorId, errorMessage) => {
      const errorElement = document.getElementById(errorId);
      errorElement.textContent = errorMessage;
  };

  const clearErrors = () => {
      const errorElements = document.querySelectorAll(".error");
      errorElements.forEach(element => {
          element.textContent = "";
      });
      document.getElementById("successMessage").textContent = "";
  };

  const clearFields = () => {
      document.getElementById("nickname").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("inquiry").value = "";
  };

  const isValidEmail = email => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  };

  const isValidPhone = phone => {
      const phoneRegex = /^[0-9]{10,11}$/;
      return phoneRegex.test(phone);
  };
});
