import config from '../../infrastructure/database/config/config';
import estrutura from './estrutura';

export const templateReprovacaoMedico = async () => {
  const body = `
    <tr align="center">
    <td>
        Sua solicitação foi reprovada. <br/>
        A sua solicitação de cadastro precisa de sua atenção, acesse o link abaixo e verifique as pendências. <br/>
        <a href="${config.urlWeb}"> Clique Aqui </a>
        <br/>
    </td>
</tr>

    `;

  const result = await estrutura(body);
  return result;
};

templateReprovacaoMedico().catch(() => {
  return false;
});

export default templateReprovacaoMedico;
