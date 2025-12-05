const nodemailer = require('nodemailer');

const sendEmail = {
  main: async (usr_email: any, subject: string, html: string, attachments: any) => {
    if (!usr_email) return false;
    if (!html) return false;
    if (!subject) return false;

    const transporter = nodemailer.createTransport({
      host: 'email-ssl.com.br',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SEND_USER_EMAIL,
        pass: process.env.SEND_PASS_EMAIL,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // enviar sendEmail
    await transporter.sendMail({
      from: '"SuinTech" <noreplay@techlise.com>', // remetente
      to: usr_email, // receptores
      subject, // assunto
      html, // html body
      attachments,
    });
    return true;
  },
};

export { sendEmail };
