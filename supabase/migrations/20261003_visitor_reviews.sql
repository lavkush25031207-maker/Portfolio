create table if not exists public.visitor_reviews (
  id uuid primary key default gen_random_uuid(),
  display_name text not null check (char_length(display_name) between 1 and 80),
  rating smallint check (rating between 1 and 5),
  message text not null check (char_length(message) between 1 and 1500),
  email text,
  public_consent boolean not null default false,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

alter table public.visitor_reviews enable row level security;

-- No anonymous table policies: browsers cannot read emails, pending reviews, or mutate reviews.
create or replace view public.public_reviews as
  select id, display_name, rating, message, created_at
  from public.visitor_reviews
  where status = 'approved' and public_consent = true;

revoke all on public.visitor_reviews from anon, authenticated;
grant select on public.public_reviews to anon, authenticated;
