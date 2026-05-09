import { z } from "zod";

const indianPhoneRegex = /^[6-9]\d{9}$/;

export const registrationSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .regex(indianPhoneRegex, "Enter a valid 10-digit WhatsApp number.")
});

export const paymentVerificationSchema = registrationSchema.extend({
  razorpayOrderId: z.string().min(1, "Missing order ID."),
  razorpayPaymentId: z.string().min(1, "Missing payment ID."),
  razorpaySignature: z.string().min(1, "Missing payment signature.")
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
export type PaymentVerificationInput = z.infer<typeof paymentVerificationSchema>;
