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

export const sendResetPasswordEmail = async (email, resetLink) => {
  try {
    await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Reset Your Password",

      html: `
      <div style="max-width:500px;margin:auto;font-family:Arial,sans-serif;border:1px solid #ddd;padding:30px;border-radius:8px;">

        <h2>Reset Your Password</h2>

        <p>Click the button below to reset your password.</p>

        <a
          href="${resetLink}"
          style="
            display:inline-block;
            padding:12px 20px;
            background:#2563eb;
            color:white;
            text-decoration:none;
            border-radius:5px;
          "
        >
          Reset Password
        </a>

        <p>This link expires in 10 minutes.</p>

      </div>
      `,
    });

    console.log("Reset email sent successfully");
  } catch (error) {
    console.error("Reset Email Error:", error);
    throw error;
  }
};
