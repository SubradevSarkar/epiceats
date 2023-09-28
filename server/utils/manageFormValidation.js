const validateForm = (userData) => {
  // Regular expression to check for special characters in the username
  const usernamePattern = /^[a-zA-Z0-9]+$/;
  // Regular expression to validate email format
  const emailPattern = /^[A-Za-z0-9._%-+]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

  // Validation flags for each field
  let isValid = true;
  let errorMessage = "";

  // Validate Username
  if (userData.hasOwnProperty("userName")) {
    if (userData.userName === "") {
      isValid = false;
      errorMessage += "Username is required.\n";
    } else if (!usernamePattern.test(userData.userName)) {
      isValid = false;
      errorMessage += "Username should not contain special characters.\n";
    }
  }

  // Validate First Name
  if (userData.hasOwnProperty("firstName")) {
    if (userData.firstName === "") {
      isValid = false;
      errorMessage += "First Name is required.\n";
    }
  }

  // Validate Last Name
  if (userData.hasOwnProperty("lastName")) {
    if (userData.lastName === "") {
      isValid = false;
      errorMessage += "Last Name is required.\n";
    }
  }

  // Validate Email
  if (userData.hasOwnProperty("email")) {
    if (userData.email === "") {
      isValid = false;
      errorMessage += "Email is required.\n";
    } else if (!emailPattern.test(userData.email)) {
      isValid = false;
      errorMessage += "Email is not valid.\n";
    }
  }

  // Validate Password
  if (userData.hasOwnProperty("password")) {
    if (userData.password === "") {
      isValid = false;
      errorMessage += "Password is required.\n";
    } else if (userData.password.length < 6) {
      isValid = false;
      errorMessage += "Password should be at least 6 characters long.\n";
    }
  }

  // Confirm Password validation
  if (userData.hasOwnProperty("confirmPassword")) {
    if (userData.confirmPassword === "") {
      isValid = false;
      errorMessage += "Confirm Password is required.\n";
    } else if (userData.password !== userData.confirmPassword) {
      isValid = false;
      errorMessage += "Password does not match.\n";
    }
  }

  return { isValid, errorMessage };
};

export { validateForm };
