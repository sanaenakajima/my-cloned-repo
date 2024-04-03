document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", function(event) {
      event.preventDefault();

const nickname = document.getElementById("nickname").value.trim();
const email = document.getElementById("email").value.trim();
const phone = document.getElementById("phone").value.trim();
const inquiry = document.getElementById("inquiry").value.trim();

const numberCodeRegex =/^[0-9]+$/;
const data = 'nickname,email,phone,inquiry';
console.log(numberCodeRegx.test(data))

clearErrors();
if (nickname === "") {
  displayError("nicknameError", "お名前を入力してください");
}
if (email === "" || !isValidEmail(email)) {
  displayError("emailError", "メールアドレスを入力してください");
}
if (phone === "" || !isValidPhone(phone)) {
  displayError("phoneError", "電話番号を入力してください");
}
if (inquiry === "") {
  displayError("inquiryError", "問い合わせ内容を入力してください");
}
if (nickname !== "" && email !== "" && isValidEmail(email) && phone !== "" && isValidPhone(phone) && inquiry !== "") {
  document.getElementById("successMessage").textContent = "投稿完了です！";
  clearFields();
}
});

function displayError(errorId, errorMessage) {
const errorElement = document.getElementById(errorId);
errorElement.textContent = errorMessage;
}

function clearErrors() {
const errorElements = document.querySelectorAll(".error");
errorElements.forEach(function(element) {
  element.textContent = "";
});
document.getElementById("successMessage").textContent = "";
}

function clearFields() {
document.getElementById("nickname").value = "";
document.getElementById("email").value = "";
document.getElementById("phone").value = "";
document.getElementById("inquiry").value = "";
}

function isValidEmail(email) {
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return emailRegex.test(email);
}

function isValidPhone(phone) {
const phoneRegex = /^[0-9]{10,11}$/;
return phoneRegex.test(phone);
}
});

