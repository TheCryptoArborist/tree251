revoke all on table consultation_requests from anon, authenticated;
revoke all on table consultation_reports from anon, authenticated;

grant insert on table consultation_requests to anon, authenticated;
grant select on table consultation_reports to anon, authenticated;

grant select, insert, update, delete on table consultation_requests to service_role;
grant select, insert, update, delete on table consultation_reports to service_role;
