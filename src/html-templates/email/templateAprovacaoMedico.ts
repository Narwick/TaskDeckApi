import config from '../../infrastructure/database/config/config';
import estrutura from './estrutura';

export const templateAprovacaoMedico = async () => {
  const body = `
    <tr align="center">
    <td>
        Parabéns! <br />
        Sua solicitação foi aprovada. <br/>
        Parabéns! Você foi aprovado em nossa plataforma. Acesse o link a baixo e comece a acompanhar as oportunidades <br/>
        <a href="${config.urlWeb}"> Clique Aqui </a>
        <br/>
    </td>
</tr>

    `;

  const result = await estrutura(body);
  return result;
};

templateAprovacaoMedico().catch(() => {
  return false;
});

export default templateAprovacaoMedico;
