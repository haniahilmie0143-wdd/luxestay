# LuxeStay 🏡

A premium property rental platform built with Next.js 15, Supabase, and TanStack Query.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS v4
- **UI**: Custom glassmorphism design, Framer Motion, Lucide Icons
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **State**: TanStack Query v5
- **Validation**: Zod v3

## Setup

### 1. Clone and install

```bash
git clone <your-repo>
cd luxestay
npm install
```

### 2. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the entire contents of `supabase/schema.sql`
3. Go to **Storage** → Create a new **public** bucket named `listing-images`
4. In the SQL editor, also run the two storage policy statements (commented at the bottom of schema.sql)
5. Go to **Authentication → URL Configuration** → add `http://localhost:3000/**` to Redirect URLs

### 3. Configure environment

```bash
cp .env.local.example .env.local
```

Fill in your Supabase URL and anon key from **Project Settings → API**.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Add environment variables: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Add your Vercel URL to Supabase **Authentication → URL Configuration → Site URL** and Redirect URLs
5. Deploy

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage with search
│   ├── auth/               # Login, register, callback
│   ├── listings/[id]/      # Property detail page
│   └── dashboard/          # Guest & host dashboard
├── actions/                # Server Actions (auth, bookings)
├── components/
│   ├── bookings/           # BookingWidget with calendar
│   ├── dashboard/          # Host & guest dashboards
│   ├── layout/             # Navbar, Hero, BentoStats
│   └── listings/           # ListingCard, ListingsGrid, Skeleton
├── hooks/                  # useListings, useBookings, useAuth
├── lib/
│   ├── supabase/           # client.ts + server.ts
│   ├── query-provider.tsx
│   ├── upload.ts
│   └── utils.ts
└── types/index.ts
```
