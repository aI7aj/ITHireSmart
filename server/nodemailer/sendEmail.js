import {
    VERIFICATION_EMAIL_TEMPLATE,
    COMPANY_VERIFICATION_EMAIL_TEMPLATE,
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";
import { transporter } from "./nodemailer.config.js";

const sender = `"ITHireSmart" <${process.env.SMTP_USER}>`;

export const sendVerificationEmail = async (firstName,email, verificationURL,role) => {
    try {
        const template = role === "user"
            ? VERIFICATION_EMAIL_TEMPLATE
            : COMPANY_VERIFICATION_EMAIL_TEMPLATE;

        const personalizedHTML = template
            .replace(/%%VERIFICATION_URL%%/g, verificationURL)
            .replace(/%%FIRST_NAME%%/g, firstName);
        
        await transporter.sendMail({
            from: sender,
            to: email,
            subject: "Verify your email",
            html: personalizedHTML,
        });
    } catch (error) {
        console.error("failed to send verification email:", error);
    }
};

export const sendPasswordResetEmail = async (firstName, email, resetURL) => {
    try {
        const personalizedHTML = PASSWORD_RESET_REQUEST_TEMPLATE
            .replace(/%%RESET_URL%%/g, resetURL)
            .replace(/%%FIRST_NAME%%/g, firstName);

        await transporter.sendMail({
            from: sender,
            to: email,
            subject: "Reset your password",
            html: personalizedHTML,
        });
    } catch (error) {
        console.error("failed to send password reset email:", error);
    }
};

export const sendResetSuccessEmail = async (firstName, email) => {
    try {
        const personalizedHTML = PASSWORD_RESET_SUCCESS_TEMPLATE
            .replace(/%%FIRST_NAME%%/g, firstName);

        await transporter.sendMail({
            from: sender,
            to: email,
            subject: "Password Reset Successful",
            html: personalizedHTML,
        });
    } catch (error) {
        console.error("failed to send password reset success email:", error);
    }
};
