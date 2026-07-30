import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const sendResetPasswordEmail = async (email, resetLink) => {
  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: process.env.EMAIL_FROM_NAME,
          email: process.env.EMAIL_FROM,
        },

        to: [
          {
            email,
          },
        ],

        subject: "Reset Your Password",

        htmlContent: `
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
              border-radius:6px;
            "
          >
            Reset Password
          </a>

          <p>This link expires in 10 minutes.</p>

          <p>If you didn't request this, you can safely ignore this email.</p>

        </div>
        `,
      },
      {
        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },
      },
    );

    console.log("Reset Email Sent");
  } catch (error) {
    console.error("Reset Email Error:", error.response?.data || error.message);
    throw error;
  }
};
