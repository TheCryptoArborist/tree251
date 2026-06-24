drop policy if exists "Public can create consultation requests"
  on consultation_requests;

create policy "Public can create valid consultation requests"
  on consultation_requests
  for insert
  to anon, authenticated
  with check (
    length(btrim(full_name)) between 2 and 160
    and length(btrim(email)) between 5 and 320
    and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    and length(btrim(tree_concern)) between 8 and 5000
    and coalesce(status, 'new') = 'new'
    and coalesce(length(phone), 0) <= 80
    and coalesce(length(organization), 0) <= 180
    and coalesce(length(requester_type), 0) <= 80
    and coalesce(length(property_address), 0) <= 240
    and coalesce(length(consultation_type), 0) <= 120
    and coalesce(length(urgency), 0) <= 120
    and coalesce(length(decision_context), 0) <= 5000
    and coalesce(length(wallet_address), 0) <= 180
    and coalesce(length(source_path), 0) <= 240
  );
