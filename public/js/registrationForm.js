"use strict";

// Wait for the DOM to be fully loaded before attaching event listeners
document.addEventListener("DOMContentLoaded", () => {
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
  let regOtpForm = elementId("reg-otpform");
  let confirmPassword = "";
  let password = "";

  if (query.get("regstep") == 2) {
    otpCount();
  }

  // handle Registration form submission event =================================================================
  let registerForm = elementId("reg-form");
  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent form submission if validation fails
      const formData = new FormData(registerForm);
      const bodyData = new URLSearchParams(formData);

      if (isFormValid()) {
        try {
          loader.show();

          const res = await fetch(`${baseUrl}/user/register`, {
            method: "POST",
            body: bodyData,
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message);
          }

          redirect(data.redirect);

          loader.hide();
        } catch (error) {
          redirect("/user/register");
          loader.hide();
        }
      }
    });
  }

  // check password and confirm password match against =================================================================
  if (confirmPasswordField) {
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
  }

  if (passwordField) {
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
  }

  function isFormValid() {
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

  if (regOtpForm) {
    regOtpForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const endpoint = regOtpForm.dataset.actionRoute;

      const formData = new FormData(regOtpForm);
      const data = new URLSearchParams(formData);

      try {
        loader.show();
        const res = await fetch(`${baseUrl}${endpoint}`, {
          method: "POST",
          body: data,
        });

        const resData = await res.json();
        if (!res.ok) {
          throw new Error(resData?.message);
        }
        redirect(resData.redirect);
        loader.hide();
      } catch (error) {
        redirect("/user/register?regstep=2");
        loader.hide();
      }
    });
  }
  function otpCount() {
    let limit = 45;

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
    loader.show();
    try {
      const res = await fetch(`${baseUrl}/user/send-otp`, {
        method: "POST",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      showToastMessage({
        message: data.message,
        type: "warning",
      });
      loader.hide();
    } catch (error) {
      loader.hide();
      showToastMessage({
        message: error.message,
        type: "danger",
      });
    }
  }
});
