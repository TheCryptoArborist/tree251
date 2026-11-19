# Preview contact paths — 19 November 2026

Scope: optional end-of-screening contact choices, not changes to any permit,
root-protection, land-disturbance, GIS or contractor decision rules. Existing
Forestry draft builder and its button are retained, not cloned.

## Project-owner-approved City routing

- Tree-permitting questions: forestry@cityofmobile.gov.
- Existing approved site/tree/landscape plans: planning@cityofmobile.gov,
  copied to forestry@cityofmobile.gov.
- Land-disturbance inquiry: land.disturbance@cityofmobile.gov, no automatic CC.
- Do not use City .org email addresses as fallback contacts.
- No separate Engineering ROW inbox has been verified. Keep the Engineering
  application-information link; do not invent an inbox or silently equate ROW
  and land-disturbance applications.

Planning and land-disturbance inquiries are editable, locally composed drafts.
They request guidance/records, not a permit issuance or authorization. Unknown
answers stay unknown. Long mailto links are disabled in favor of copying the
complete draft. Changes to answers invalidate contact drafts. No message sends
automatically, and no visitor contact information is required to see results.

## Arborist callback

The primary optional consulting path opens the existing Request Arborist
Services form, https://form.jotform.com/221198646412861. The account's form was
inspected through the Jotform connector before integration. Existing questions,
notification settings, historical submissions and production intake are not
modified. No new form or test submission is created.

This version uses explicit review/copy/paste for screening context: the visitor
copies the summary and pastes it in the existing additional-details field. The
page says exactly that. It does NOT claim automatic prefill, attachment or
callback creation. No property details, names, phone numbers or reports are put
in a Jotform URL. No iframe, third-party requests, storage or tracking is loaded
merely by screening or opening the local callback summary. The visitor must
complete and submit Jotform to request contact. Delivery of notification emails
is not verified by UI tests.

Private consultation is optional; scope/fees are discussed before engagement.
An existing safety warning stays above the contact choices. Callback copy for
reported root damage does not ask the visitor to wait for urgent action.

## Validation

- Node contact tests cover recipient/CC routing, unknowns, zero vs missing area,
  header injection, callback context, and absence of data-bearing form URLs.
- Local browser fixture tests exercise the exact contact module and existing
  final-result module, preserving the original Forestry event handler.
- Hosted CI verifies the exact deployed modules, department switching, retained
  edits, stale-result clearing, legacy Forestry editor, optional no-permit
  callback, no outbound contact requests, and 320/390/820/1200px layouts.
- Browser tests never send an email or submit Jotform. Physical iPhone Safari,
  mailbox delivery and callback notification delivery remain unverified.
- Draft PR #9 and its existing preview only. Do not merge automatically.
