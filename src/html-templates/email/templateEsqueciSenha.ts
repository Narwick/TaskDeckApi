import config from '../../infrastructure/database/config/config';
import estrutura from './estrutura';

export const templateEsqueciSenha = async (key: any) => {
  const body = `
    <tr align="center">
      <td>
        Para redefinir o acesso à sua conta, clique no link abaixo:
        <br />
        <a href="${config.urlWeb}/reset-senha/${key}">Recuperar minha senha</a>
        <br />
        <br />
        Se você não solicitou essa alteração, ignore esta mensagem.
      </td>
    </tr>
    `;

  const result = await estrutura(body);
  return result;
};

templateEsqueciSenha('').catch(() => {
  return false;
});

export default templateEsqueciSenha;
