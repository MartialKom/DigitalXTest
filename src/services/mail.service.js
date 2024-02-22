const nodemailer = require("nodemailer");

module.exports.sendMail =  async (destinataire, code) =>{
    console.log("In send mail");
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
        port: 465, // Port for SMTP (usually 465)
        secure: true, // Usually true if connecting to port 465
        auth: {
          user: process.env.MAIL, // Your email address
          pass: process.env.MAIL_PASSWORD, // Password (for gmail, your app password)
          // ⚠️ For better security, use environment variables set on the server for these values when deploying
        },
      });
      
      let info = await transporter.sendMail({
        from: '"Martial Kom" '+process.env.MAIL,
        to: destinataire,
        subject: "CODE DE VERIFICATION",
        html: `
          <h1>Votre code de validation: <b>`+code+`</b> </h1>
          <p>Il est valide durant 2 minutes</p>
          `,
      });
      
      console.log(info.messageId);
}
