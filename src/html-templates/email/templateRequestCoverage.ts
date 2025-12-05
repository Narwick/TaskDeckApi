// const config = require('../../infrastructure/database/config/config');
import estrutura from './estrutura';

export const templateRequestCoverage = async (data: any) => {
  const { municipio, unidade, periodo, modalidade, categoria, especialidade, horario } = data;
  const body = `
    <tr align="center">
        <td>
            <h3>Solicitação de Cobertura</h3>
            <p><strong>Município:</strong> ${municipio}</p>
            <p><strong>Unidade:</strong> ${unidade}</p>
            <p><strong>Data (Período):</strong> ${periodo}</p>
            <p><strong>Modalidade:</strong> ${modalidade}</p>
            <p><strong>Categoria:</strong> ${categoria}</p>
            <p><strong>Especialidade:</strong> ${especialidade}</p>
            <p><strong>Horário:</strong> ${horario}</p>
        </td>
    </tr>
  `;

  const result = await estrutura(body);
  return result;
};

templateRequestCoverage('').catch(() => {
  return false;
});

export default templateRequestCoverage;
