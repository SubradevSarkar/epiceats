// Wait for the DOM to be fully loaded before attaching event listeners
document.addEventListener("DOMContentLoaded", () => {
  let username = document.getElementById("reg-username");
  let firstName = document.getElementById("reg-fname");
  let lastName = document.getElementById("reg-lname");
  let email = document.getElementById("reg-email");
  let passwordField = document.getElementById("reg-password");
  let confirmPasswordField = document.getElementById("reg-conPassword");
  let errorAlert = document.getElementById("reg-alert");
  let confirmPassword = "";
  let password = "";

  const registerForm = document.getElementById("reg-form");
  registerForm.addEventListener("submit", (event) => {
    if (!validateRegistrationForm()) {
      event.preventDefault(); // Prevent form submission if validation fails
    }
  });

  function validateRegistrationForm() {
    username = username.value;
    firstName = firstName.value;
    lastName = lastName.value;
    email = email.value;
    // Regular expression to check for special characters in the username
    const usernamePattern = /^[a-zA-Z0-9]+$/;
    // Regular expression to validate email format
    const emailPattern = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    // Validation flags for each field
    let isValid = true;
    let errorMessage = "";

    // // Validate Username
    // if (username === "") {
    //   isValid = false;
    //   errorMessage += "Username is required.\n";
    // } else if (!usernamePattern.test(username)) {
    //   isValid = false;
    //   errorMessage += "Username should not contain special characters.\n";
    // }

    // Validate First Name
    if (firstName === "") {
      isValid = false;
      errorMessage += "First Name is required.\n";
    }

    // Validate Last Name
    if (lastName === "") {
      isValid = false;
      errorMessage += "Last Name is required.\n";
    }

    // Validate Email
    if (email === "") {
      isValid = false;
      errorMessage += "Email is required.\n";
    } else if (!emailPattern.test(email)) {
      isValid = false;
      errorMessage += "Email is not valid.\n";
    }

    // Validate Password
    if (password === "") {
      isValid = false;
      errorMessage += "Password is required.\n";
    } else if (password.length < 8) {
      isValid = false;
      errorMessage += "Password should be at least 8 characters long.\n";
    }

    // Confirm Password validation
    if (confirmPassword === "") {
      isValid = false;
      errorMessage += "Confirm Password is required.\n";
    } else if (password !== confirmPassword) {
      isValid = false;
      errorMessage += "Passwords do not match.\n";
    }

    // Display error message if any field is invalid
    if (!isValid) {
      errorAlert.innerText = errorMessage;
      errorAlert.style.display = "block";
    }

    return isValid;
  }

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
});
