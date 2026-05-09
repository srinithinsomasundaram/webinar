import { FadeSection } from "@/components/fade-section";
import { RegistrationForm } from "@/components/registration-form";
import { faqs, webinarDetails } from "@/lib/constants";

const keyPoints = [
  "Build a micro SaaS faster with AI",
  "See the full stack from idea to launch",
  "Understand payments, deployment, and onboarding",
  "Get post-payment confirmation and WhatsApp access"
];

const flowSteps = [
  "Fill in your name, email, and WhatsApp number",
  "Pay ₹99 in Razorpay checkout",
  "Payment is verified on the backend",
  "Registration is saved, email is sent, and WhatsApp link is unlocked"
];

export default function HomePage() {
  return (
    <main className="section-grid relative overflow-hidden">
      <div className="absolute left-[-8rem] top-24 h-56 w-56 rounded-full bg-brand-500/20 blur-3xl sm:h-72 sm:w-72" />
      <div className="absolute bottom-0 right-[-6rem] h-64 w-64 rounded-full bg-sky-500/10 blur-3xl sm:h-80 sm:w-80" />

      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-8 sm:py-8 lg:px-10">
        <header className="rounded-[1.75rem] border border-white/10 bg-white/5 px-4 py-3 backdrop-blur sm:rounded-full sm:px-5 sm:py-4">
          <div className="flex items-center justify-between gap-3 sm:hidden">
            <div>
              <p className="font-display text-xs uppercase tracking-[0.22em] text-brand-200">
                Micro SaaS Webinar
              </p>
              <p className="mt-1 text-xs text-white/50">Live workshop · ₹{webinarDetails.amountInRupees}</p>
            </div>
            <a
              href="#register"
              className="shrink-0 rounded-full bg-white/8 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/12 hover:text-white"
            >
              Register
            </a>
          </div>

          <div className="hidden items-center justify-between gap-3 sm:flex">
            <p className="font-display text-sm uppercase tracking-[0.26em] text-brand-200">
              Micro SaaS Webinar
            </p>
            <a
              href="#register"
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/75 transition hover:border-brand-300 hover:text-white"
            >
              Register
            </a>
          </div>
        </header>

        <section className="grid gap-10 pb-14 pt-12 sm:gap-12 sm:pb-16 sm:pt-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="order-2 lg:order-1">
            <p className="inline-flex rounded-full border border-brand-300/30 bg-brand-400/10 px-4 py-2 text-xs text-brand-200 sm:text-sm">
              Live workshop · ₹{webinarDetails.amountInRupees} only
            </p>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight text-white sm:mt-8 sm:text-5xl md:text-6xl">
              Build and deploy a micro SaaS using AI.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/72 sm:mt-6 sm:text-lg sm:leading-8">
              A simple live session for builders who want a clear path from idea to launch.
            </p>

            <div className="mt-8 grid gap-3 sm:mt-10 sm:gap-4 sm:grid-cols-3">
              <div className="glass-panel rounded-[1.5rem] p-4 sm:rounded-3xl sm:p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-white/45">Date</p>
                <p className="mt-2 font-display text-lg text-white sm:mt-3 sm:text-xl">{webinarDetails.dateLabel}</p>
              </div>
              <div className="glass-panel rounded-[1.5rem] p-4 sm:rounded-3xl sm:p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-white/45">Time</p>
                <p className="mt-2 font-display text-lg text-white sm:mt-3 sm:text-xl">{webinarDetails.timeLabel}</p>
              </div>
              <div className="glass-panel rounded-[1.5rem] p-4 sm:rounded-3xl sm:p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-white/45">Format</p>
                <p className="mt-2 font-display text-lg text-white sm:mt-3 sm:text-xl">Online webinar</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2">
              {keyPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm leading-6 text-white/78 sm:rounded-2xl"
                >
                  {point}
                </div>
              ))}
            </div>
          </div>

          <div id="register" className="order-1 lg:order-2">
            <RegistrationForm />
          </div>
        </section>

        <FadeSection className="grid gap-5 pb-16 sm:gap-6 sm:pb-20 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="glass-panel rounded-[1.75rem] p-6 sm:rounded-[2rem] sm:p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-brand-200">Why join</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-white sm:mt-4 sm:text-3xl">
              Clean, practical, point-wise learning.
            </h2>
            <p className="mt-4 leading-7 text-white/70">
              No filler. Just the steps, tools, and decisions needed to get moving.
            </p>
          </div>

          <div className="glass-panel rounded-[1.75rem] p-6 sm:rounded-[2rem] sm:p-8">
            <ul className="space-y-3 text-sm leading-7 text-white/78 sm:space-y-4 sm:text-base">
              <li>1. How to choose a small SaaS idea you can ship fast.</li>
              <li>2. How to use AI to speed up planning, building, and deployment.</li>
              <li>3. How to connect payments, onboarding, and simple launch flow.</li>
              <li>4. What to do next after your first version is live.</li>
            </ul>
          </div>
        </FadeSection>

        <FadeSection className="grid gap-5 pb-16 sm:gap-6 sm:pb-20 lg:grid-cols-[1fr_0.9fr]">
          <div className="glass-panel rounded-[1.75rem] p-6 sm:rounded-[2rem] sm:p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-brand-200">What happens</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-white sm:mt-4 sm:text-3xl">
              Simple payment and confirmation flow.
            </h2>
            <p className="mt-4 max-w-2xl leading-8 text-white/70">
              Your seat is confirmed only after payment verification. That is when the confirmation
              email is sent and the WhatsApp group link is shown.
            </p>
          </div>

          <div className="glass-panel rounded-[1.75rem] p-6 sm:rounded-[2rem] sm:p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-brand-200">Flow</p>
            <ol className="mt-4 space-y-3 text-sm leading-7 text-white/75 sm:mt-5 sm:space-y-4 sm:text-base">
              {flowSteps.map((step, index) => (
                <li key={step}>
                  {index + 1}. {step}
                </li>
              ))}
            </ol>
          </div>
        </FadeSection>

        <FadeSection className="pb-16 sm:pb-20">
          <div className="glass-panel rounded-[1.75rem] p-6 sm:rounded-[2rem] sm:p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-brand-200">Quick answers</p>
            <div className="mt-5 grid gap-4 sm:mt-6 sm:gap-5 md:grid-cols-3">
              {faqs.map((faq) => (
                <article key={faq.question} className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5 sm:rounded-[1.75rem] sm:p-6">
                  <h3 className="font-display text-lg text-white sm:text-xl">{faq.question}</h3>
                  <p className="mt-4 leading-7 text-white/70">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </FadeSection>

        <footer className="border-t border-white/10 py-8 text-sm text-white/45">
          <p>{webinarDetails.eventName}</p>
        </footer>
      </div>
    </main>
  );
}
