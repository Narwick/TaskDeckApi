import estrutura from './estrutura';
import config from '../../infrastructure/database/config/config';


export const templateConfirmRegister = async () => {
  const body = `
    <tr align="center">
        <td>
            Parabéns! Sua conta foi criada na Avante Social. <br />           
            <a href="${config.urlWeb}">Clique aqui</a> <br/>
            Caso desconheça essa informação, gentileza nos sinalizar.<br/>
        </td>
    </tr>
    `;

  const result = await estrutura(body);
  return result;
};

templateConfirmRegister().catch(() => {
  return false;
});

export default templateConfirmRegister;
