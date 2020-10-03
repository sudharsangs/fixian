const mailer = require("nodemailer");
const { resetPass } = require("./resetpass_template");
require("dotenv").config({ path: __dirname + "/.env" });
const EMAIL_PASS = process.env.EMAIL_PASS;

const getEmailData = (to, name, type, actionData) => {
  let data = null;

  switch (type) {
    case "reset_password":
      data = {
        from: "Kevin <g.s.sudharsan99@gmail.com>",
        to,
        subject: `Hey ${name}, reset your password`,
        html: resetPass(actionData),
      };
      break;
    default:
      data;
  }
  return data;
};

const sendEmail = (to, name, type, actionData = null) => {
  const smtpTransport = mailer.createTransport({
    service: "smtp.gmail.com",
    auth: {
      user: "g.s.sudharsan99@gmail.com",
      pass: EMAIL_PASS,
    },
  });

  const mail = getEmailData(to, name, type, actionData);

  smtpTransport.sendMail(mail, function (error, response) {
    if (error) {
      console.log(error);
    } else {
    }
    smtpTransport.close();
  });
};

module.exports = { sendEmail };
