import { Resend } from "resend";

import { webinarDetails } from "@/lib/constants";

const resendApiKey = process.env.RESEND_API_KEY;
const emailFrom = process.env.EMAIL_FROM;

function getResendClient() {
  if (!resendApiKey || !emailFrom) {
    return null;
  }

  return new Resend(resendApiKey);
}

export async function sendConfirmationEmail({
  email,
  fullName
}: {
  email: string;
  fullName: string;
}) {
  const resend = getResendClient();

  if (!resend || !emailFrom) {
    return {
      skipped: true,
      reason: "Email service is not configured."
    };
  }

  const { error } = await resend.emails.send({
    from: emailFrom,
    to: email,
    subject: "Registration Confirmed - Micro SaaS Webinar",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #101828;">
        <h2>Registration Confirmed</h2>
        <p>Hi ${fullName},</p>
        <p>Thank you for registering for <strong>${webinarDetails.eventName}</strong>.</p>
        <p><strong>Date:</strong> ${webinarDetails.dateLabel}<br />
        <strong>Time:</strong> ${webinarDetails.timeLabel}</p>
        <p>Your payment has been verified successfully.</p>
        <p>Join the WhatsApp group for webinar updates and access instructions:</p>
        <p><a href="${webinarDetails.whatsappGroupLink}">${webinarDetails.whatsappGroupLink}</a></p>
      </div>
    `
  });

  if (error) {
    throw new Error(error.message);
  }

  return { skipped: false };
}
