import estrutura from './estrutura';

export const templateUpdateFieldsDoctor = async (params: any) => {
  const { nome, med_id, textCrm, textEspecialty } = params;

  const body = `
    <tr align="center">
        <td>
          <p style="margin-bottom: 20px;">Houve alterações no cadastro do médico abaixo:</p>
          <p style="margin-bottom: 10px;">id: ${med_id} - Médico: ${nome}</p>
           ${textEspecialty || ''} ${textCrm || ''}
        </td>
    </tr>
    `;

  const result = await estrutura(body);
  return result;
};

templateUpdateFieldsDoctor('').catch(() => {
  return false;
});

export default templateUpdateFieldsDoctor;
