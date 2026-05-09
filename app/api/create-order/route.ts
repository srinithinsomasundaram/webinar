import { NextResponse } from "next/server";

import { jsonError } from "@/lib/http";
import { findRegistrationByEmail } from "@/lib/registrations";
import { getRazorpayClient, getRazorpayPublicConfig } from "@/lib/razorpay";
import { getSupabaseAdmin } from "@/lib/supabase";
import { registrationSchema } from "@/lib/validation";
import { webinarDetails } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registrationSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message || "Invalid registration details.");
    }

    const existingRegistration = await findRegistrationByEmail(parsed.data.email);

    if (existingRegistration) {
      return jsonError("This email is already registered for the webinar.", 409);
    }

    const razorpay = getRazorpayClient();
    const publicConfig = getRazorpayPublicConfig();
    const supabase = getSupabaseAdmin();

    if (!razorpay || !publicConfig || !supabase) {
      return jsonError(
        "The registration system is not fully configured yet. Add Razorpay and Supabase credentials before taking payments.",
        500
      );
    }

    const order = await razorpay.orders.create({
      amount: webinarDetails.amountInPaise,
      currency: "INR",
      receipt: `webinar_${Date.now()}`,
      notes: {
        email: parsed.data.email,
        fullName: parsed.data.fullName
      }
    });

    return NextResponse.json({
      success: true,
      keyId: publicConfig.keyId,
      order
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create payment order.";
    return jsonError(message, 500);
  }
}
