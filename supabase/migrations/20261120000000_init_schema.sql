-- Mentally: catalogue (categories, therapists, courses, lessons) and learner data (profiles, enrollments, progress).

create type public.course_level as enum ('beginner', 'intermediate', 'advanced');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  position integer not null default 0
);

create table public.therapists (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  title text not null,
  bio text not null default '',
  photo_url text,
  specialties text[] not null default '{}',
  years_experience integer not null default 0 check (years_experience >= 0),
  created_at timestamptz not null default now()
);

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null default '',
  description text not null default '',
  cover_url text,
  category_id uuid references public.categories (id) on delete set null,
  therapist_id uuid references public.therapists (id) on delete set null,
  level public.course_level not null default 'beginner',
  outcomes text[] not null default '{}',
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create index courses_category_id_idx on public.courses (category_id);
create index courses_therapist_id_idx on public.courses (therapist_id);

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses (id) on delete cascade,
  position integer not null,
  title text not null,
  summary text not null default '',
  duration_seconds integer not null default 0 check (duration_seconds >= 0),
  -- Object path inside the `lesson-videos` bucket (or `lesson-previews` for free previews).
  video_path text,
  is_free_preview boolean not null default false,
  created_at timestamptz not null default now(),
  unique (course_id, position)
);

create table public.enrollments (
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id uuid not null references public.courses (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, course_id)
);

create index enrollments_course_id_idx on public.enrollments (course_id);

create table public.lesson_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  position_seconds integer not null default 0 check (position_seconds >= 0),
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

create index lesson_progress_lesson_id_idx on public.lesson_progress (lesson_id);

-- Create a profile row for every new auth user.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Trigger-only function: nobody should call it directly through the Data API.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
