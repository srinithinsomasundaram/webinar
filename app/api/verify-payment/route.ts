import crypto from "crypto";
import { NextResponse } from "next/server";

import { webinarDetails } from "@/lib/constants";
import { sendConfirmationEmail } from "@/lib/email";
import { jsonError } from "@/lib/http";
import {
  findRegistrationByEmail,
  findRegistrationByPaymentId,
  savePaidRegistration
} from "@/lib/registrations";
import { paymentVerificationSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = paymentVerificationSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message || "Invalid verification payload.");
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
      return jsonError("Razorpay is not configured.", 500);
    }

    const {
      fullName,
      email,
      phone,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    } = parsed.data;

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return jsonError("Payment signature verification failed.", 400);
    }

    const existingPayment = await findRegistrationByPaymentId(razorpayPaymentId);

    if (existingPayment) {
      return NextResponse.json({
        success: true,
        alreadyProcessed: true,
        message: "Payment was already verified."
      });
    }

    const existingEmail = await findRegistrationByEmail(email);

    if (existingEmail) {
      return jsonError("This email is already registered for the webinar.", 409);
    }

    const storageResult = await savePaidRegistration({
      fullName,
      email,
      phone,
      paymentId: razorpayPaymentId
    });

    let emailSent = false;
    let emailStatusMessage = "Confirmation email is not configured.";

    try {
      const emailResult = await sendConfirmationEmail({
        email,
        fullName
      });

      emailSent = !emailResult.skipped;
      emailStatusMessage = emailResult.skipped
        ? "Payment verified. Email is not configured yet."
        : `Confirmation email sent to ${email}.`;
    } catch (error) {
      console.error("Confirmation email failed:", error);
      emailStatusMessage = "Payment verified, but the confirmation email could not be sent.";
    }

    return NextResponse.json({
      success: true,
      webinar: webinarDetails.eventName,
      stored: storageResult.stored,
      emailSent,
      emailStatusMessage
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Payment verification failed.";
    return jsonError(message, 500);
  }
}
