import { transporter } from "../config/emailConfig";

interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

class EmailService {

  // sned email
  // sned email
  async sendEmail({
    to,
    subject,
    text,
    html,
  }: SendEmailOptions): Promise<void> {

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    };

    try {
      console.log('email send on proccess...');
      
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
    } catch (error) {
      console.log(error);
      
      console.error("Error sending email:", error);
    }
  }
}

export default new EmailService();
