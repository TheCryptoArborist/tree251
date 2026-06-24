# Consult Request

Professional consultation request website for Peter Toler, ISA Certified Consulting Arborist.

The site positions Consult Request as a professional arborist consulting platform first. TREE Verified appears as a secondary verification and timestamping layer for reports and consultation records.

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

The consultation form stores requests in `consultation_requests` from a server
action. Report lookup reads public-safe verification records from
`consultation_reports`.

Keep `SUPABASE_SERVICE_ROLE_KEY` server-side only. Do not expose it with a
`NEXT_PUBLIC_` prefix.

## Current Homepage Focus

- Professional arborist consulting
- Tree risk assessments
- Tree health evaluations
- Development and permit consulting
- Storm damage assessments
- Expert recommendations
- Report verification powered by TREE, without requiring cryptocurrency knowledge
