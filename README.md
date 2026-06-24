# The Arborist

Primary business website for Peter Toler, ISA Certified Arborist in Mobile, Alabama.

The site is built around one lead-generation message:

> Get an independent tree assessment before paying for tree work.

This website is intentionally separate from permit trackers, emergency dashboards, public records
tools, or 311 hazard maps. The main conversion path is a tree assessment request, with secondary
paths for Calendly scheduling, photo submission, and ISA credential verification.

## Run Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Verification

```bash
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
```

## Supabase

The assessment form stores requests in `consultation_requests` from a server action. Report lookup
reads public-safe verification records from `consultation_reports`.

Required Netlify variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Legacy fallback:

- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Optional server-only variables:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

The request form can submit with the anon key through row-level security. Keep
`SUPABASE_SERVICE_ROLE_KEY` server-side only. Do not expose it with a `NEXT_PUBLIC_` prefix.

## Calendly

Phone consultation scheduling uses Peter Toler's active Calendly event type:

- `NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/pbtau63/30min`

## Current Homepage Focus

- Independent tree assessments
- Tree risk assessments
- Storm damage evaluations
- Work prioritization
- Second opinions before hiring a tree service
- Tree preservation guidance
- Permit and Tree Commission guidance
- Property owner consultations
