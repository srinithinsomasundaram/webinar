import { getSupabaseAdmin } from "@/lib/supabase";

import type { RegistrationInput } from "@/lib/validation";

const TABLE_NAME = "webinar_registrations";

function formatSupabaseError(message: string) {
  if (message.includes(`'public.${TABLE_NAME}'`) || message.includes(TABLE_NAME)) {
    return `Supabase table '${TABLE_NAME}' was not found. Run the SQL from supabase/schema.sql in your Supabase project, then retry.`;
  }

  return message;
}

export async function findRegistrationByEmail(email: string) {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("id, payment_status")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    throw new Error(formatSupabaseError(error.message));
  }

  return data;
}

export async function findRegistrationByPaymentId(paymentId: string) {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("id, payment_id")
    .eq("payment_id", paymentId)
    .maybeSingle();

  if (error) {
    throw new Error(formatSupabaseError(error.message));
  }

  return data;
}

export async function savePaidRegistration(
  input: RegistrationInput & {
    paymentId: string;
  }
) {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return { stored: false, reason: "Supabase is not configured." };
  }

  const { error } = await supabase.from(TABLE_NAME).insert({
    full_name: input.fullName,
    email: input.email,
    phone: input.phone,
    payment_id: input.paymentId,
    payment_status: "paid"
  });

  if (error) {
    throw new Error(formatSupabaseError(error.message));
  }

  return { stored: true };
}
