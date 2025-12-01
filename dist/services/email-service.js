"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emailConfig_1 = require("../config/emailConfig");
class EmailService {
    // sned email
    // sned email
    async sendEmail({ to, subject, text, html, }) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            html,
        };
        try {
            console.log('email send on proccess...');
            const info = await emailConfig_1.transporter.sendMail(mailOptions);
            console.log("Email sent: " + info.response);
        }
        catch (error) {
            console.log(error);
            console.error("Error sending email:", error);
        }
    }
}
exports.default = new EmailService();
