import config from '../../infrastructure/database/config/config';
import estrutura from './estrutura';

export const templateNotificaCobertura = async (key: any, tipo: any) => {
  const messageInicio = 'Acesse o sistema e inicie o plantão <br />';
  const messageFim = 'Acesse o sistema e faça a passagem do plantão <br />';
  const body = `
    <tr align="center">
        <td>
            ${tipo === 'inicio' ? messageInicio : messageFim}
            <br/>
            ${key}
            <br/>
            Acesse o site no link abaixo para conferir <br>
            <a href="${config.urlWeb}">Clique aqui</a> <br/>
        </td>
    </tr>
    `;

  const result = await estrutura(body);
  return result;
};

templateNotificaCobertura('','').catch(() => {
  return false;
});

export default templateNotificaCobertura;
