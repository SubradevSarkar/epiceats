import nodemailer from "nodemailer";
import { otpEmailTemplate } from "../utils/emailTemplate/index.js";

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

const emailTopic = {
  RegOtp: "regOtp",
};

const emailSubject = {
  [emailTopic.RegOtp]: "Verify Your Identity with This OTP 🛡️",
};

const emailTemplate = (data, topic) => {
  const template = {
    [emailTopic.RegOtp]: () => otpEmailTemplate(data),
  };
  return template[topic]();
};

const sendEmail = async (data) => {
  const { email, topic } = data;
  data.siteUrl = process.env.EPIC_SITE_URL;
  data.logo = process.env.EPIC_EMAIL_LOGO;
  try {
    await transport.sendMail({
      from: `Epiceats <${senderEmail}>`, // sender address
      to: `${email}`, // list of receivers
      subject: emailSubject[topic], // Subject line
      html: emailTemplate(data, topic), // html body
    });
    console.log("email sent");
  } catch (error) {
    console.log(":( email sent error");
    throw new Error(error.message);
  }
};

export { sendEmail, emailTopic };
