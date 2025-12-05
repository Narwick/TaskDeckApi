import fs from 'fs';

export const estrutura = async (conteudo: any): Promise<any> => {
  const attach: any = [
    {
      filename: 'logo.png',
      content: fs.createReadStream('./src/html-templates/email/logo.png'),
      cid: 'logo',
    },
    {
      filename: 'email.png',
      content: fs.createReadStream('./src/html-templates/email/email.png'),
      cid: 'email-ceafa',
    },
  ];

  const body = `
        <!DOCTYPE html>
        <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Palanquin:wght@500&family=Roboto:wght@300;700&display=swap" rel="stylesheet">

            <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="x-apple-disable-message-reformatting">
            <title>Document</title>
            <style>
                /* Estilos de lista personalizados */
                ul {
                    list-style-type: none;
                    margin: 0;
                    padding: 0;
                }
                ul li {
                    margin-bottom: 10px;
                }
                ul li:before {
                    content: "\x2022";  /* Adiciona um marcador de ponto (bullet) */
                    color: #000000;  /* Cor do marcador */
                    display: inline-block;
                    width: 1em;
                    margin-left: -1em;
                    font-size: 1.2em;
                }
            </style>
        </head>

        <body style="margin: 0;font-size: 13px;">
            <div>
            <table style="padding: 20px; width: 100%; font-family: 'Palanquin', sans-serif; font-style: normal; font-weight: 500; font-size: 16px; line-height: 1.6; color: #000000;">
              <tr align="center">
                <td>
                  <img width="154" height="98" style="padding-top: 10px; padding-bottom: 30px;" src="cid:logo">
                </td>
              </tr>
                ${conteudo}
            </table>

            </div>
        </body>
        </html>
    `;
  return { body, attach };
};

estrutura('').catch(() => {
  return false;
});

export default estrutura;
