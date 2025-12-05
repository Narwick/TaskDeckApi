import estrutura from './estrutura';

export const templateSendNotificationEmail = async (htmlBody: any) => {
  const body = `
    <tr align="center">
        <td>
          ${htmlBody}
        </td>
    </tr>
    `;

  const result = await estrutura(body);
  return result;
};

templateSendNotificationEmail('').catch(() => {
  return false;
});

export default templateSendNotificationEmail;
