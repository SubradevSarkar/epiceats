// Wait for the DOM to be fully loaded before attaching event listeners
document.addEventListener("DOMContentLoaded", () => {
  const elementId = (id) => document.getElementById(id);
  let userNameField = elementId("reg-userName");
  let firstNameField = elementId("reg-firstName");
  let lastNameField = elementId("reg-lastName");
  let emailField = elementId("reg-email");
  let passwordField = elementId("reg-password");
  let confirmPasswordField = elementId("reg-conPassword");
  let errorAlert = elementId("reg-alert");
  let otpResendField = elementId("reg-otpbtn");
  let otpTimeField = elementId("reg-otpcontent");
  let otpTimeCountField = elementId("reg-otptime");
  let confirmPassword = "";
  let password = "";

  const url = window.location.origin;
  const query = window.location.search.split("=")[1];
  if (query == 2) {
    otpCount();
  }

  let registerForm = elementId("reg-form");
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission if validation fails
    if (validateForm()) {
      registerForm.submit();
    }
  });

  confirmPasswordField.addEventListener("input", () => {
    confirmPassword = confirmPasswordField.value;
    password = passwordField.value;

    // Check if the passwords match
    const passwordsMatch = confirmPassword === password;

    if (!passwordsMatch) {
      confirmPasswordField.classList.add("border-error");
    } else {
      confirmPasswordField.classList.remove("border-error");
    }
  });

  passwordField.addEventListener("input", () => {
    // confirmPassword = confirmPasswordField.value;
    password = passwordField.value;

    // Check if the passwords match
    const passwordsMatch = confirmPassword === password;

    if (!!confirmPassword && !passwordsMatch) {
      confirmPasswordField.classList.add("border-error");
    } else {
      confirmPasswordField.classList.remove("border-error");
    }
  });

  function validateForm() {
    const userData = {
      userName: userNameField.value,
      firstName: firstNameField.value,
      lastName: lastNameField.value,
      email: emailField.value,
      password,
      confirmPassword,
    };

    const { isValid, errorMessage } = validateRegistrationForm(userData);

    // Display error message if any field is invalid
    if (!isValid) {
      errorAlert.innerText = errorMessage;
      errorAlert.style.display = "block";
    }

    return isValid;
  }

  function otpCount() {
    let limit = 10;

    let interval = setInterval(otpCountDown, 1000);
    function otpCountDown() {
      otpTimeCountField.innerHTML = limit;
      if (limit < 1) {
        clearInterval(interval);
        otpTimeField.innerHTML = "OTP";
        otpResendField.style.cursor = "pointer";
        otpResendField.addEventListener("click", resendOtp);
      }
      limit--;
    }
  }

  async function resendOtp() {
    const response = await fetch(`${url}/user/otp-resend`, {
      method: "POST",
    });
    const content = await response.json();
    if (content) {
      console.log(content);
      otpCount();
      console.log("first");
    }
  }
});
