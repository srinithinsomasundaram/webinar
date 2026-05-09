# Micro SaaS Webinar Registration Platform

A simple webinar registration app built with Next.js 15, Tailwind CSS, Framer Motion, Razorpay, Supabase, and Resend.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment file and fill in your keys:

   ```bash
   cp .env.example .env.local
   ```

3. Create the Supabase table by running the SQL in [supabase/schema.sql](/Users/srinithinsomasundaram/Downloads/microsass%20registration/supabase/schema.sql:1).

4. Start development:

   ```bash
   npm run dev
   ```

## Current payment setup

The registration form uses custom Razorpay checkout from [components/registration-form.tsx](/Users/srinithinsomasundaram/Downloads/microsass registration/components/registration-form.tsx:1). The flow is:

1. `POST /api/create-order`
2. Open Razorpay checkout
3. `POST /api/verify-payment`
4. Save successful registration to Supabase
5. Send confirmation email and show the WhatsApp group link

## Required environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

RESEND_API_KEY=
EMAIL_FROM=Webinar Team <webinar@example.com>
```

`SUPABASE_SERVICE_ROLE_KEY` is recommended for secure inserts from the backend. If it is omitted, the app falls back to the anon key, which requires compatible RLS policies.

## Features

- Single-page landing page with webinar details, benefits, FAQ, and registration form
- Razorpay order creation and payment signature verification
- Duplicate registration blocking by email
- Supabase persistence after successful payment
- Confirmation email sent after verified payment
- Success page with payment reference
