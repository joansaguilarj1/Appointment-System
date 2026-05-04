export const userRegisterValidation = (inputs) => {
  const errors = {};

  /*NAME*/
  if (!inputs.name || inputs.name.length === 0) {
    errors.name = "name is required";
  } else if (inputs.name.length < 5) {
    errors.name = "name must have at least 5 characters";
  }

  /*EMAIL*/
  if (!inputs.email || inputs.email.length === 0) {
    errors.email = "email is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email)) {
      errors.email = "email format is invalid";
    }
  }

  /*BIRTHDATE*/
  if (!inputs.birthdate || inputs.birthdate.length === 0) {
    errors.birthdate = "birthdate is required";
  } else {
    const birthDate = new Date(inputs.birthdate);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (age < 18) {
      errors.birthdate = "you must be at least 18 years old";
    }
  }

  /*DNI*/
  let nDniErrors = "";
  if (!inputs.nDni || inputs.nDni.length === 0) {
    nDniErrors += "dni is required";
  } else {
    if (!/^\d+$/.test(inputs.nDni)) {
      nDniErrors += "dni must contain only numbers <br>";
    }
    if (inputs.nDni.length < 5) {
      nDniErrors += "dni must have at least 5 characters <br>";
    }
    if (nDniErrors !== "") {
      errors.nDni = nDniErrors;
    }
  }

  /*USERNAME*/
  if (!inputs.username || inputs.username.length === 0) {
    errors.username = "username is required";
  } else if (inputs.username.length < 5) {
    errors.username = "username must have at least 5 characters";
  }

  /*PASSWORD*/
  let passwordErrors = "";

  if (!inputs.password || inputs.password.length === 0) {
    passwordErrors += "password is required";
  } else {
    if (inputs.password.length < 8) {
      passwordErrors += "password must be at least 8 characters long <br>";
    }
    if (!/[A-Z]/.test(inputs.password)) {
      passwordErrors +=
        "password must include at least one uppercase letter <br>";
    }
    if (!/[a-z]/.test(inputs.password)) {
      passwordErrors +=
        "password must include at least one lowercase letter <br>";
    }
    if (!/\d/.test(inputs.password)) {
      passwordErrors += "password must include at least one number <br>";
    }
    if (!/[\W_]/.test(inputs.password)) {
      passwordErrors +=
        "password must include at least one special character <br>";
    }
  }
  if (passwordErrors !== "") {
    errors.password = passwordErrors;
  }

  return errors;
};

export const userLoginValidation = (inputs) => {
  const errors = {};
  /*USERNAME*/
  if (!inputs.username || inputs.username.length === 0) {
    errors.username = "username is required";
  } else if (inputs.username.length < 5) {
    errors.username = "username must have at least 5 characters";
  }

  /*PASSWORD*/
  let passwordErrors = "";

  if (!inputs.password || inputs.password.length === 0) {
    passwordErrors += "password is required";
  } else {
    if (inputs.password.length < 8) {
      passwordErrors += "password must be at least 8 characters long <br>";
    }
    if (!/[A-Z]/.test(inputs.password)) {
      passwordErrors +=
        "password must include at least one uppercase letter <br>";
    }
    if (!/[a-z]/.test(inputs.password)) {
      passwordErrors +=
        "password must include at least one lowercase letter <br>";
    }
    if (!/\d/.test(inputs.password)) {
      passwordErrors += "password must include at least one number <br>";
    }
    if (!/[\W_]/.test(inputs.password)) {
      passwordErrors +=
        "password must include at least one special character <br>";
    }
  }
  if (passwordErrors !== "") {
    errors.password = passwordErrors;
  }
  return errors;
};

export const appointmentValidates = (inputs) => {
  const errors = {};

  /* SUBJECT */
  if (!inputs.subject || inputs.subject.length === 0) {
    errors.subject = "Subject is required";
  } else if (inputs.subject.length < 5) {
    errors.subject = "Subject must be at least 5 characters";
  }

  /* DATE */
  if (!inputs.date || inputs.date.length === 0) {
    errors.date = "Date is required";
  } else {
    const selectedDate = new Date(inputs.date);
    const today = new Date();

    // remove time from today
    today.setHours(0, 0, 0, 0);

    /* DATE - PAST */
    if (selectedDate < today) {
      errors.date = "Date cannot be in the past";
    }

    /* DATE - WEEKEND */
    const day = selectedDate.getDay(); // 0 = Sunday, 6 = Saturday
    if (day === 5 || day === 6) {
      errors.date = "Appointments are not available on weekends";
    }
  }

  /* TIME */
  if (!inputs.time || inputs.time.length === 0) {
    errors.time = "Time is required";
  } else {
    const [hour, minute] = inputs.time.split(":").map(Number);

    /* TIME - BEFORE 8 AM */
    if (hour < 8) {
      errors.time = "Appointments start at 8:00 AM";
    }

    /* TIME - AFTER 6 PM */
    if (hour > 18 || (hour === 18 && minute > 0)) {
      errors.time = "Appointments end at 6:00 PM";
    }
  }

  return errors;
};
