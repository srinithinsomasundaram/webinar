import { NextResponse } from "next/server";
import { z } from "zod";

import { sendConfirmationEmail } from "@/lib/email";
import { jsonError } from "@/lib/http";

const testEmailSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  fullName: z.string().trim().min(2).optional().default("Test User")
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = testEmailSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message || "Invalid test email payload.");
    }

    const result = await sendConfirmationEmail({
      email: parsed.data.email,
      fullName: parsed.data.fullName
    });

    return NextResponse.json({
      success: true,
      emailSent: !result.skipped,
      message: result.skipped
        ? "Email service is not configured."
        : `Test email sent to ${parsed.data.email}.`
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Test email could not be sent.";
    return jsonError(message, 500);
  }
}
