# ICL Group — Talent and Services

Professional website for ICL Group: business consulting, recruitment, outsourcing, and corporate support.

## Features

- Marketing site (home, about, services, contact)
- Job board with account-based applications and CV upload
- Employer “post a job” requests
- Enquiry forms for consulting services
- Admin dashboard for jobs, applications, requests, and users

## Stack

- [TanStack Start](https://tanstack.com/start) (React 19, Vite, Nitro)
- [Supabase](https://supabase.com) (Auth, Postgres, Storage, RLS)
- Tailwind CSS + shadcn/ui

## Setup

1. Install dependencies:

```sh
npm install
```

2. Copy env template and fill in your Supabase project values:

```sh
cp .env.example .env
```

3. Start the dev server:

```sh
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local development server |
| `npm run build` | Production build |
| `npm start` | Run the production server (after build) |
| `npm test` | Run tests |
| `npm run lint` | ESLint |
