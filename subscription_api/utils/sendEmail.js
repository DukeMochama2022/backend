import { transporter } from "../config/nodemailer.js";

export const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"Subscription Tracker" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log("Email sent to", to);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};



