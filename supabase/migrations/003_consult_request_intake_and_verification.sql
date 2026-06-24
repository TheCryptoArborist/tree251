create extension if not exists "pgcrypto";

create table if not exists consultation_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  organization text,
  requester_type text,
  property_address text,
  consultation_type text,
  urgency text,
  tree_concern text not null,
  decision_context text,
  has_photos boolean default false,
  wants_tree_verified boolean default true,
  wallet_address text,
  source_path text,
  status text default 'new',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists consultation_reports (
  id uuid primary key default gen_random_uuid(),
  verification_code text unique not null,
  report_title text,
  consultation_type text,
  public_client_label text,
  public_property_reference text,
  issued_at timestamp with time zone,
  report_hash text,
  hash_algorithm text default 'SHA-256',
  tree_verified_status text default 'pending',
  tree_timestamp timestamp with time zone,
  tree_tx_hash text,
  tree_explorer_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index if not exists consultation_requests_created_idx
  on consultation_requests(created_at desc);

create index if not exists consultation_requests_status_idx
  on consultation_requests(status);

create index if not exists consultation_reports_code_idx
  on consultation_reports(verification_code);

create index if not exists consultation_reports_issued_idx
  on consultation_reports(issued_at desc);

alter table consultation_requests enable row level security;
alter table consultation_reports enable row level security;

grant insert on table consultation_requests to anon, authenticated;
grant select, insert, update, delete on table consultation_requests to service_role;

grant select on table consultation_reports to anon, authenticated;
grant select, insert, update, delete on table consultation_reports to service_role;

create policy "Public can create consultation requests"
  on consultation_requests
  for insert
  to anon, authenticated
  with check (true);

create policy "Public can verify published consultation reports"
  on consultation_reports
  for select
  to anon, authenticated
  using (true);
