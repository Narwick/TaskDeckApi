import estrutura from './estrutura';

export const templateSendPassword = async (key: any) => {
  const body = `
    <tr align="center">
        <td>
            Segue abaixo sua senha para acesso ao sistema. <br />
            Senha: ${key} <br/><br/>
            Para garantir a segurança da sua conta, solicitamos que você troque sua senha após realizar seu primeiro login. <br/>
            Caso desconheça essa informação, gentileza desconsiderar<br/>
        </td>
    </tr>
    `;

  const result = await estrutura(body);
  return result;
};

templateSendPassword('').catch(() => {
  return false;
});

export default templateSendPassword;
