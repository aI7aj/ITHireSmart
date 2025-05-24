import {
    VERIFICATION_EMAIL_TEMPLATE,
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationURL) => {
    const recipient = [{ email }];

    const response = await mailtrapClient.send({
        from: sender,
        to: recipient,
        subject: "Verify your email",
        html: VERIFICATION_EMAIL_TEMPLATE.replace(/%%VERIFICATION_URL%%/g, verificationURL),
        category: "Email Verification",
    });
};


export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }];

    const response = await mailtrapClient.send({
        from: sender,
        to: recipient,
        subject: "Reset your password",
        html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(/%%RESET_URL%%/g, resetURL),
        category: "Password Reset",
    });
};


export const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }];

    const response = await mailtrapClient.send({
        from: sender,
        to: recipient,
        subject: "Password Reset Successful",
        html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        category: "Password Reset",
    });
};

