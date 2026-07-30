import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendVerificationEmail = async (email, code) => {
  try {
    await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Verify Your Email",

      html: `
      <div style="max-width:500px;margin:auto;font-family:Arial,sans-serif;border:1px solid #ddd;padding:30px;border-radius:8px;">

        <h2 style="text-align:center;">
          Verify Your Email
        </h2>

        <p>Hello,</p>

        <p>Thank you for signing up.</p>

        <p>Please use the verification code below:</p>

        <div
          style="
            text-align:center;
            font-size:32px;
            font-weight:bold;
            letter-spacing:8px;
            padding:20px;
            background:#f4f4f4;
            margin:20px 0;
          "
        >
          ${code}
        </div>

        <p>This code is valid for 24 hours.</p>

        <p>If you didn't create this account, you can ignore this email.</p>

      </div>
      `,
    });

    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Verification Email Error:", error);
    throw error;
  }
};
