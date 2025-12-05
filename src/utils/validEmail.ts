import createError from 'http-errors';

export const validEmail = (email: any) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@.]+$/;
  const emailIsValid = emailRegex.test(email);
  if (!emailIsValid) {
    throw createError(404, 'Email inválido');
  }
};

const password = 'agSAfds*af4';
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&()*!])[0-9a-zA-Z@#$%^&()*!]{6,}$/;
const passwordValidator = passwordRegex.test(password);
console.log(passwordValidator);
