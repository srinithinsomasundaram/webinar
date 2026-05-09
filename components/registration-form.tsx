"use client";

import Script from "next/script";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

import { webinarDetails } from "@/lib/constants";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
};

const initialState: FormState = {
  fullName: "",
  email: "",
  phone: ""
};

type SuccessState = {
  name: string;
  email: string;
  paymentId: string;
  emailSent: boolean;
  emailStatusMessage: string;
};

export function RegistrationForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [successState, setSuccessState] = useState<SuccessState | null>(null);

  function handlePhoneChange(value: string) {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
    setForm((current) => ({ ...current, phone: digitsOnly }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const orderResult = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderResult.message || "Could not start payment.");
      }

      if (!window.Razorpay) {
        throw new Error("Razorpay checkout did not load.");
      }

      const razorpay = new window.Razorpay({
        key: orderResult.keyId,
        amount: orderResult.order.amount,
        currency: orderResult.order.currency,
        name: webinarDetails.eventName,
        description: "Webinar seat booking",
        order_id: orderResult.order.id,
        theme: {
          color: "#7c3aed"
        },
        prefill: {
          name: form.fullName,
          email: form.email,
          contact: `+91${form.phone}`
        },
        handler: async (paymentResponse: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const verifyResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                ...form,
                razorpayOrderId: paymentResponse.razorpay_order_id,
                razorpayPaymentId: paymentResponse.razorpay_payment_id,
                razorpaySignature: paymentResponse.razorpay_signature
              })
            });

            const verifyResult = await verifyResponse.json();

            if (!verifyResponse.ok) {
              throw new Error(verifyResult.message || "Payment verification failed.");
            }

            setSuccessState({
              name: form.fullName,
              email: form.email,
              paymentId: paymentResponse.razorpay_payment_id,
              emailSent: Boolean(verifyResult.emailSent),
              emailStatusMessage:
                verifyResult.emailStatusMessage || "Payment verified successfully."
            });
            setIsSubmitting(false);
            setMessage(null);
          } catch (error) {
            const errorMessage =
              error instanceof Error ? error.message : "Payment verification failed.";

            setMessage(errorMessage);
            setIsSubmitting(false);
          }
        },
        modal: {
          ondismiss: () => {
            setMessage("Payment was cancelled before completion.");
            setIsSubmitting(false);
          }
        }
      });

      razorpay.open();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong. Please try again.";

      setMessage(errorMessage);
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <motion.div
        className="glass-panel relative overflow-hidden rounded-[1.75rem] p-5 shadow-glow sm:rounded-[2rem] sm:p-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
      >
        <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent opacity-70 sm:inset-x-10" />

        {successState ? (
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-brand-200 sm:text-sm sm:tracking-[0.28em]">
              Registration complete
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">
              Your seat is confirmed, {successState.name}.
            </h3>
            <p className="mt-3 text-sm leading-6 text-white/70">
              Payment was verified successfully on this page.
            </p>

            <div
              className={`mt-5 rounded-[1.5rem] border p-4 text-left text-sm leading-6 sm:rounded-[1.75rem] ${
                successState.emailSent
                  ? "border-sky-400/20 bg-sky-400/10 text-sky-100"
                  : "border-amber-400/20 bg-amber-400/10 text-amber-100"
              }`}
            >
              <p className="font-medium">
                {successState.emailSent ? "Email sent" : "Email update"}
              </p>
              <p className="mt-1">
                {successState.emailStatusMessage}
                {successState.emailSent ? ` Please check ${successState.email}.` : ""}
              </p>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 text-left sm:rounded-[1.75rem] sm:p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-white/45">Payment ID</p>
              <p className="mt-3 break-all font-display text-lg text-white sm:text-xl">
                {successState.paymentId}
              </p>
              <p className="mt-5 text-sm leading-7 text-white/65">
                Webinar: {webinarDetails.eventName}
                <br />
                Date: {webinarDetails.dateLabel}
                <br />
                Time: {webinarDetails.timeLabel}
              </p>
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-emerald-400/20 bg-emerald-400/10 p-5 text-left sm:rounded-[1.75rem] sm:p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">WhatsApp group</p>
              <p className="mt-3 text-sm leading-7 text-white/75">
                Join the WhatsApp group for webinar updates and access instructions.
              </p>
              <a
                href={webinarDetails.whatsappGroupLink}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 sm:w-auto"
              >
                Join WhatsApp Group
              </a>
            </div>

            <button
              type="button"
              onClick={() => {
                setForm(initialState);
                setSuccessState(null);
                setMessage(null);
              }}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm text-white/75 transition hover:border-brand-300 hover:text-white sm:w-auto"
            >
              Register another seat
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-6 sm:mb-8">
              <p className="text-xs uppercase tracking-[0.22em] text-brand-200 sm:text-sm sm:tracking-[0.28em]">
                Reserve your seat
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">
                Secure access for just ₹{webinarDetails.amountInRupees}
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/70">
                Enter your details, complete payment, and get your confirmation email after
                verification.
              </p>
            </div>

            <div className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/80">Full Name</span>
                <input
                  required
                  type="text"
                  value={form.fullName}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, fullName: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-brand-400 focus:bg-white/[0.07]"
                  placeholder="Enter your name"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/80">Email Address</span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, email: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-brand-400 focus:bg-white/[0.07]"
                  placeholder="name@example.com"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/80">Phone Number</span>
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/45">
                  Please enter WhatsApp number
                </p>
                <div className="flex items-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition focus-within:border-brand-400 focus-within:bg-white/[0.07]">
                  <span className="border-r border-white/10 px-3 py-3 text-sm font-semibold text-white/80 sm:px-4">
                    +91
                  </span>
                  <input
                    required
                    type="tel"
                    inputMode="numeric"
                    pattern="[6-9][0-9]{9}"
                    maxLength={10}
                    value={form.phone}
                    onChange={(event) => handlePhoneChange(event.target.value)}
                    className="w-full min-w-0 bg-transparent px-3 py-3 text-white outline-none sm:px-4"
                    placeholder="9876543210"
                  />
                </div>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-brand-500 to-fuchsia-500 px-5 py-4 text-sm font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70 sm:mt-8"
            >
              {isSubmitting ? "Processing..." : "Register Now"}
            </button>

            {message ? <p className="mt-4 text-sm text-rose-300">{message}</p> : null}
          </form>
        )}
      </motion.div>
    </>
  );
}
