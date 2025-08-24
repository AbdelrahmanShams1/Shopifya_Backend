import nodemailer from "nodemailer";
import { eamilTemplate } from "./emailTemplate.js";

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abodashams0@gmail.com",
    pass: "tbns tpws sjyf udlr",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendMail = async (email) => {
  const info = await transporter.sendMail({
    from: '"NTIG13" <abodashams0@gmail.com>',
    to: email,
    subject: "Hello in Shopifya",
    text: "Confirmed Mail",
    html: eamilTemplate(email),
  });

  console.log("Message sent:", info.messageId);
};
