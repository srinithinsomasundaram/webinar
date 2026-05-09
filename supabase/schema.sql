create extension if not exists "pgcrypto";

create table if not exists public.webinar_registrations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null unique,
  phone text not null,
  payment_id text not null unique,
  payment_status text not null default 'paid',
  created_at timestamptz not null default now()
);
