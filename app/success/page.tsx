import Link from "next/link";

import { webinarDetails } from "@/lib/constants";

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

function readParam(value: string | string[] | undefined, fallback: string) {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value) && value[0]) {
    return value[0];
  }

  return fallback;
}

export default async function SuccessPage({
  searchParams
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const name = readParam(params.name, "there");
  const paymentId = readParam(params.payment, "generated after checkout");

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
      <div className="glass-panel w-full max-w-2xl rounded-[2rem] p-5 text-center shadow-glow sm:rounded-[2.5rem] sm:p-10">
        <p className="text-xs uppercase tracking-[0.22em] text-brand-200 sm:text-sm sm:tracking-[0.28em]">Registration complete</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-white sm:mt-5 sm:text-4xl">
          Your seat is confirmed, {name}.
        </h1>
        <p className="mt-4 text-base leading-7 text-white/70 sm:mt-5 sm:text-lg sm:leading-8">
          Payment has been verified successfully. Keep your payment reference for support if needed.
        </p>

        <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 text-left sm:mt-8 sm:rounded-[1.75rem] sm:p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-white/45">Payment ID</p>
          <p className="mt-3 break-all font-display text-lg text-white sm:text-xl">{paymentId}</p>
          <p className="mt-6 text-sm leading-7 text-white/65">
            Webinar: {webinarDetails.eventName}
            <br />
            Date: {webinarDetails.dateLabel}
            <br />
            Time: {webinarDetails.timeLabel}
          </p>
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-emerald-400/20 bg-emerald-400/10 p-5 text-left sm:mt-6 sm:rounded-[1.75rem] sm:p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">WhatsApp group</p>
          <p className="mt-3 text-sm leading-7 text-white/75">
            Your payment is confirmed. You can now join the WhatsApp group for webinar updates and
            access instructions.
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

        <Link
          href="/"
          className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm text-white/75 transition hover:border-brand-300 hover:text-white sm:mt-8 sm:w-auto"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
