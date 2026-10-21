create table public.cromwell_halloween_2026 (
 id uuid primary key default gen_random_uuid(),
 address text not null check (length(address) between 5 and 110),
 address_key text generated always as (lower(regexp_replace(address, '\s+', '', 'g'))) stored unique,
 lat double precision not null check (lat between 30.6835 and 30.6892),
 lng double precision not null check (lng between -88.113 and -88.1055),
 status text not null check (status in ('candy','treats','out')),
 hours text not null default '' check (length(hours) <= 80),
 notes text not null default '' check (length(notes) <= 300),
 edit_hash text not null check (edit_hash ~ '^[a-f0-9]{64}$'),
 created_at timestamptz not null default now()
);
alter table public.cromwell_halloween_2026 enable row level security;
revoke all on public.cromwell_halloween_2026 from anon, authenticated;
grant select (id,address,lat,lng,status,hours,notes) on public.cromwell_halloween_2026 to anon;
grant insert (address,lat,lng,status,hours,notes,edit_hash) on public.cromwell_halloween_2026 to anon;
grant update (status,hours,notes) on public.cromwell_halloween_2026 to anon;
grant delete on public.cromwell_halloween_2026 to anon;
create policy "Public neighborhood listings" on public.cromwell_halloween_2026 for select to anon using (true);
create policy "Add house with edit credential" on public.cromwell_halloween_2026 for insert to anon
with check (edit_hash = (nullif(current_setting('request.headers',true),'')::jsonb ->> 'x-cromwell-edit-hash'));
create policy "Edit only with private credential" on public.cromwell_halloween_2026 for update to anon
using (edit_hash = (nullif(current_setting('request.headers',true),'')::jsonb ->> 'x-cromwell-edit-hash'))
with check (edit_hash = (nullif(current_setting('request.headers',true),'')::jsonb ->> 'x-cromwell-edit-hash'));
create policy "Remove only with private credential" on public.cromwell_halloween_2026 for delete to anon
using (edit_hash = (nullif(current_setting('request.headers',true),'')::jsonb ->> 'x-cromwell-edit-hash'));

