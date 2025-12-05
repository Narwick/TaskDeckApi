function validarTelefone(numero: any) {
  const regex = /^\(?[1-9]{2}\)?\s?(9[0-9]{4})-?([0-9]{4})$/;
  return regex.test(numero);
}

export { validarTelefone };
