const validatePassword = (password: any) => {
  const passwordRegex = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z\W]{3,}$/;

  return passwordRegex.test(password);
};

export { validatePassword };
