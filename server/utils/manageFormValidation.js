const validateRegistrationForm = (userData) => {
  // Regular expression to check for special characters in the username
  const usernamePattern = /^[a-zA-Z0-9]+$/;
  // Regular expression to validate email format
  const emailPattern = /^[A-Za-z0-9._%-+]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

  // Validation flags for each field
  let isValid = true;
  let errorMessage = "";

  // Validate Username
  if (userData.userName === "") {
    isValid = false;
    errorMessage += "Username is required.\n";
  } else if (!usernamePattern.test(userData.userName)) {
    isValid = false;
    errorMessage += "Username should not contain special characters.\n";
  }

  // Validate First Name
  if (userData.firstName === "") {
    isValid = false;
    errorMessage += "First Name is required.\n";
  }

  // Validate Last Name
  if (userData.lastName === "") {
    isValid = false;
    errorMessage += "Last Name is required.\n";
  }

  // Validate Email
  if (userData.email === "") {
    isValid = false;
    errorMessage += "Email is required.\n";
  } else if (!emailPattern.test(userData.email)) {
    isValid = false;
    errorMessage += "Email is not valid.\n";
  }

  // Validate Password
  if (userData.password === "") {
    isValid = false;
    errorMessage += "Password is required.\n";
  } else if (userData.password.length < 6) {
    isValid = false;
    errorMessage += "Password should be at least 6 characters long.\n";
  }

  // Confirm Password validation
  if (userData.confirmPassword === "") {
    isValid = false;
    errorMessage += "Confirm Password is required.\n";
  } else if (userData.password !== userData.confirmPassword) {
    isValid = false;
    errorMessage += "Password does not match.\n";
  }

  return { isValid, errorMessage };
};

const validateLoginForm = (userData) => {
  // Validation flags for each field
  let isValid = true;
  let errorMessage = "";

  // Validate Username
  if (userData.userName === "") {
    isValid = false;
    errorMessage += "Username is required.\n";
  }

  // Validate Password
  if (userData.password === "") {
    isValid = false;
    errorMessage += "Password is required.\n";
  }

  return { isValid, errorMessage };
};

export { validateRegistrationForm, validateLoginForm };
