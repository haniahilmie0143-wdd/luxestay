-- ============================================================
-- LuxeStay Database Schema
-- Run this entire file in your Supabase SQL Editor
-- ============================================================

create extension if not exists "uuid-ossp";
create extension if not exists btree_gist;

-- ============================================================
-- PROFILES
-- ============================================================
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  avatar_url text,
  is_host boolean default false,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Anyone can view profiles" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- LISTINGS (includes lat/lng for map)
-- ============================================================
create table if not exists public.listings (
  id uuid default uuid_generate_v4() primary key,
  host_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  city text not null,
  country text not null,
  address text,
  price_per_night numeric(10, 2) not null check (price_per_night > 0),
  max_guests integer not null default 1,
  bedrooms integer default 1,
  bathrooms integer default 1,
  cover_image_url text,
  image_urls text[] default '{}',
  amenities text[] default '{}',
  rating numeric(3, 2) default 0 check (rating >= 0 and rating <= 5),
  review_count integer default 0,
  lat numeric(9, 6),
  lng numeric(9, 6),
  is_active boolean default true,
  created_at timestamptz default now()
);

alter table public.listings enable row level security;

create policy "Anyone can view active listings" on public.listings for select using (is_active = true);
create policy "Hosts can insert own listings" on public.listings for insert with check (auth.uid() = host_id);
create policy "Hosts can update own listings" on public.listings for update using (auth.uid() = host_id);
create policy "Hosts can delete own listings" on public.listings for delete using (auth.uid() = host_id);

-- ============================================================
-- BOOKINGS
-- ============================================================
create table if not exists public.bookings (
  id uuid default uuid_generate_v4() primary key,
  listing_id uuid references public.listings(id) on delete cascade not null,
  guest_id uuid references public.profiles(id) on delete cascade not null,
  check_in date not null,
  check_out date not null,
  total_price numeric(10, 2) not null,
  guest_count integer not null default 1,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at timestamptz default now(),
  constraint check_dates check (check_out > check_in),
  constraint no_overlap exclude using gist (
    listing_id with =,
    daterange(check_in, check_out, '[)') with &&
  ) where (status not in ('cancelled'))
);

alter table public.bookings enable row level security;

create policy "Guests can view own bookings" on public.bookings for select using (auth.uid() = guest_id);
create policy "Hosts can view bookings for their listings" on public.bookings for select
  using (exists (select 1 from public.listings where listings.id = listing_id and listings.host_id = auth.uid()));
create policy "Authenticated users can create bookings" on public.bookings for insert with check (auth.uid() = guest_id);
create policy "Guests can update own bookings" on public.bookings for update using (auth.uid() = guest_id);

-- ============================================================
-- AVAILABILITY CHECK FUNCTION
-- ============================================================
create or replace function check_availability(
  p_listing_id uuid,
  p_check_in date,
  p_check_out date
) returns boolean as $$
begin
  return not exists (
    select 1 from public.bookings
    where listing_id = p_listing_id
      and status not in ('cancelled')
      and daterange(check_in, check_out, '[)') && daterange(p_check_in, p_check_out, '[)')
  );
end;
$$ language plpgsql security definer;

-- ============================================================
-- STORAGE POLICIES
-- Create bucket "listing-images" (public) in Supabase Dashboard first, then run:
-- ============================================================
-- create policy "Authenticated users can upload images"
--   on storage.objects for insert
--   with check (bucket_id = 'listing-images' and auth.role() = 'authenticated');
-- create policy "Public can view images"
--   on storage.objects for select
--   using (bucket_id = 'listing-images');
