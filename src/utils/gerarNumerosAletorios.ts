/* eslint-disable no-plusplus */
// Gerar 6 números aleatórios entre 0 e 9
function gerarNumerosAleatorios(amount = 6) {
  const numeros = [];
  for (let i = 0; i < amount; i++) {
    numeros.push(Math.floor(Math.random() * 10));
  }
  return numeros.join('');
}

function gerarSenha(minLength = 8, maxLength = 12) {
  const caracteresNumericos = '0123456789';
  const caracteresAlfabeticos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const caracteresEspeciais = '!@#$%^&*()-_+=';
  const tamanhoSenha = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  let senha = '';

  // Adiciona pelo menos um caractere numérico e um alfabético à senha
  senha += caracteresNumericos.charAt(Math.floor(Math.random() * caracteresNumericos.length));
  senha += caracteresAlfabeticos.charAt(Math.floor(Math.random() * caracteresAlfabeticos.length));

  // Preenche o restante da senha com caracteres aleatórios
  for (let i = 2; i < tamanhoSenha; i++) {
    const caracteres = caracteresNumericos + caracteresAlfabeticos + caracteresEspeciais;
    const indice = Math.floor(Math.random() * caracteres.length);
    senha += caracteres.charAt(indice);
  }

  // Embaralha a senha para que a posição dos caracteres adicionais não seja previsível
  senha = senha
    .split('')
    .sort(function () {
      return 0.5 - Math.random();
    })
    .join('');

  return senha;
}
export  { gerarNumerosAleatorios, gerarSenha };
