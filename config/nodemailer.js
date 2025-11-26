import nodemailer from "nodemailer";

export const sendMail = async (to, text, subject) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_SMTP_HOST,
            port: process.env.MAILTRAP_SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.MAILTRAP_SMTP_USER,
                pass: process.env.MAILTRAP_SMTP_PASS
            }
        });

        await transporter.sendMail({
            from: '"Divyanshu Sindhu" <divyanshu.sindhu@gmail.com>',
            to,
            subject,
            text
        });

        console.log("Mail sent successfully");
    } catch (error) {
        console.error("Mail error:", error);
    }
};
