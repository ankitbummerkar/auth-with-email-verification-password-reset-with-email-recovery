import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const sendVerificationEmail = async (email, code) => {
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

        subject: "Verify Your Email",

        htmlContent: `
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

    console.log("Verification Email Sent");
  } catch (error) {
    console.error(error.response?.data || error.message);

    throw error;
  }
};
