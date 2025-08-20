"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emailConfig_1 = require("../config/emailConfig");
class EmailService {
    async sendEmail({ to, subject, text, html, }) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            html,
        };
        try {
            const info = await emailConfig_1.transporter.sendMail(mailOptions);
            console.log("Email sent: " + info.response);
        }
        catch (error) {
            console.error("Error sending email:", error);
        }
    }
}
exports.default = new EmailService();
