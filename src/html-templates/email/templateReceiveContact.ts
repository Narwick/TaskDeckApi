import config from '../../infrastructure/database/config/config';
import estrutura from './estrutura';
const moment = require('moment'); // ou diretamente no navegador, incluindo a biblioteca via CDN

export const templateReceiveContact = async (params: any) => {
  const body = `
    <tr align="center">
      <td>
        Olá Administrador,
        <br />
        Você recebeu um novo contato. <br />Seguem os detalhes fornecidos pelo usuário:
        <br />
        Nome: ${params.name}
        <br />
        E-mail: ${params.email}
        <br />
        Telefone: ${params.phone}
        <br />
        Mensagem: ${params.text}
        <br />
        Data e Hora do Envio: ${moment().format("DD/MM/YYYY HH:mm:ss")}
      </td>
    </tr>
    `;

  const result = await estrutura(body);
  return result;
};

templateReceiveContact('').catch(() => {
  return false;
});

export default templateReceiveContact;
