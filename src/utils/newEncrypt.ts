const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const secretKey: any = process.env.ENCRYPTION_SECRET;
const PREFIX = process.env.ENCRYPTION_PREFIX || 'ENC:'; // Prefixo padrão, caso não definido

if (!secretKey || secretKey.length !== 32) {
  throw new Error('A chave secreta (ENCRYPTION_SECRET) deve ter 32 caracteres.');
}

// Função de hash para gerar IV determinístico
function generateIV(text: any) {
  return crypto.createHash('md5').update(text).digest().slice(0, 16); // Gera IV fixo de 16 bytes
}

function encrypt(text: any) {
  // Verifica se o valor já está criptografado
  if (text && text.startsWith(PREFIX)) {
    return text; // Retorna o valor original se já estiver criptografado
  }

  const iv = generateIV(text); // Gera IV determinístico
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  let encrypted = cipher.update(text, 'utf8');
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  // Formata o resultado: <PREFIX><IV>:<EncryptedText>
  return `${PREFIX}${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

function decrypt(text: any) {
  // Verifica se o valor contém o prefixo
  if (!text || !text.startsWith(PREFIX)) {
    return text; // Retorna o valor original se não estiver criptografado
  }
  // Remove o prefixo para processar a descriptografia
  const encryptedData = text.slice(PREFIX.length);
  const [iv, encryptedText] = encryptedData.split(':');

  // Valida IV e texto criptografado
  if (!iv || !encryptedText) {
    throw new Error(
      'O texto criptografado está em um formato inválido. Deve conter IV e texto criptografado separados por ":".',
    );
  }

  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey),
    Buffer.from(iv, 'hex'),
  );

  let decrypted = decipher.update(Buffer.from(encryptedText, 'hex'));
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

export { encrypt, decrypt };
