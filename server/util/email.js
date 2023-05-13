import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
async function email(email, text) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "7338b00922a6a6", // generated ethereal user
      pass: "4b27b6811d3540", // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "<salah@moumni.com>", // sender address
    to: email, // list of receivers
    subject: "Request to Reset Password", // Subject line
    text: text, // plain text body
  });

  console.log(info);
}

export default email;
