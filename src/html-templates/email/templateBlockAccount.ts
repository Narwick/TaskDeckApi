import estrutura from './estrutura';

import config from '../../infrastructure/database/config/config';

export const templateBlockAccount = async (token: any) => {
  const body = `
    <tr align="center">
        <td>
            sua senha foi redefinida com sucesso! <br /><br />
            Caso não reconheça a ação clique
            no link a seguir para bloquear sua conta

            <a href="${config.urlApi}/${token}" style="display: inline-block; background-color: #0E4681; color: #ffffff; text-decoration: none; font-family: 'Noto Sans', sans-serif; font-size: 14px; font-weight: 500; line-height: 40px; width: 209px; height: 40px; border-radius: 100px; margin-top: 8px;">
                Bloquear Conta
            </a>

        </td>
    </tr>
    `;

  const result = await estrutura(body);
  return result;
};

templateBlockAccount('').catch(() => {
  return false;
});

export default templateBlockAccount;
