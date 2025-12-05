import config from '../../infrastructure/database/config/config';
import estrutura from './estrutura';

export const templateCreateSubscriber = async () => {
  const body = `
    <tr align="center">
    <td>
        Nova inscrição feita<br/>
        Um novo assinante acaba de assinar o sistema <br/>
        <a href="${config.urlWeb}"> Clique Aqui </a>
        <br/>
    </td>
</tr>

    `;

  const result = await estrutura(body);
  return result;
};

templateCreateSubscriber().catch(() => {
  return false;
});

export default templateCreateSubscriber;
