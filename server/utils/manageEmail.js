import nodemailer from "nodemailer";

const smtp = {
  gmail: {
    host: `${process.env.GMAIL_SMTP_HOST}`,
    port: process.env.GMAIL_SMTP_PORT,
    secure: true,
    auth: {
      user: `${process.env.GMAIL_SMTP_USERID}`,
      pass: `${process.env.GMAIL_SMTP_PASSWORD}`,
    },
  },
  mailtrap: {
    host: `${process.env.MAILTRAP_SMTP_HOST}`,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: `${process.env.MAILTRAP_SMTP_USERID}`,
      pass: `${process.env.MAILTRAP_SMTP_PASSWORD}`,
    },
  },
};
const server =
  process.env.NODE_ENV !== "production" ? smtp.mailtrap : smtp.gmail;

const transport = nodemailer.createTransport(server);

const senderEmail = `${process.env.OFFICIAL_EMAIL}`;

const sendEmail = async (data) => {
  const { email, context } = data;
  console.log(data);
  try {
    await transport.sendMail({
      from: senderEmail, // sender address
      to: `${email}`, // list of receivers
      subject: "Verify Your Identity with This OTP 🛡️", // Subject line
      text: `${context}`, // plain text body
      html: `<b>${context}</b>`, // html body
    });
    console.log("email sent");
  } catch (error) {
    console.log("🔴 error sent");
    throw new Error(error.message);
  }
};

export { sendEmail };
