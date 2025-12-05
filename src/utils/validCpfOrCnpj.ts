function validCpf(cpf: any) {
  // Remove pontos e traço, se presentes
  const cpfNumeros = cpf.replace(/[^\d]/g, '');

  // Verifica se o CPF possui 11 dígitos numéricos
  if (!/^\d{11}$/.test(cpfNumeros)) {
    return false; // Formato inválido
  }

  // Calcula o primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpfNumeros.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  const digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;

  // Calcula o segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpfNumeros.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  const digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;

  // Verifica se os dígitos verificadores calculados são iguais aos informados no CPF
  if (
    parseInt(cpfNumeros.charAt(9)) !== digitoVerificador1 ||
    parseInt(cpfNumeros.charAt(10)) !== digitoVerificador2
  ) {
    return false; // Dígitos verificadores inválidos
  }

  return true; // CPF válido
}

function validCnpj(cnpj: string): boolean {
  // Remove pontos, traços e barras
  const cnpjNumeros = cnpj.replace(/[^\d]/g, '');

  // Verifica se o CNPJ possui 14 dígitos numéricos
  if (!/^\d{14}$/.test(cnpjNumeros)) {
    return false; // Formato inválido
  }

  // Calcula o primeiro dígito verificador
  let soma = 0;
  let peso = 5;
  for (let i = 0; i < 12; i++) {
    soma += parseInt(cnpjNumeros.charAt(i)) * peso;
    peso = peso === 2 ? 9 : peso - 1;
  }
  let resto = soma % 11;
  const digitoVerificador1 = resto < 2 ? 0 : 11 - resto;

  // Calcula o segundo dígito verificador
  soma = 0;
  peso = 6;
  for (let i = 0; i < 13; i++) {
    soma += parseInt(cnpjNumeros.charAt(i)) * peso;
    peso = peso === 2 ? 9 : peso - 1;
  }
  resto = soma % 11;
  const digitoVerificador2 = resto < 2 ? 0 : 11 - resto;

  // Verifica se os dígitos verificadores calculados são iguais aos informados no CNPJ
  if (
    parseInt(cnpjNumeros.charAt(12)) !== digitoVerificador1 ||
    parseInt(cnpjNumeros.charAt(13)) !== digitoVerificador2
  ) {
    return false; // Dígitos verificadores inválidos
  }

  return true; // CNPJ válido
}

function validCpfOrCnpj(documento: string): boolean {
  const numeros = documento.replace(/[^\d]/g, '');
  if (numeros.length === 11) {
    return validCpf(numeros); // Valida CPF
  } else if (numeros.length === 14) {
    return validCnpj(numeros); // Valida CNPJ
  }
  return false; // Formato inválido
}

export { validCpf, validCnpj, validCpfOrCnpj };
