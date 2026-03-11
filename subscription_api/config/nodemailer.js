import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dukemochama21@gmail.com",
    pass: "ktqb ilkj ygxi tpul",
  },
});
