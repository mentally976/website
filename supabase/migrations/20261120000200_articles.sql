-- Research-backed psychology articles ("Судалгааны баримт"), readable by signed-in students only.
-- Mirrors the `Fact` type in packages/db/src/fact.ts.

create type public.article_category as enum ('numbers', 'brain', 'habits', 'connection', 'tools');

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category public.article_category not null,
  stat_value text not null,
  stat_label text not null,
  title text not null,
  summary text not null,
  body text[] not null default '{}',
  takeaways text[] not null default '{}',
  source_citation text not null,
  source_short text not null,
  source_url text not null,
  image_url text,
  image_alt text not null default '',
  read_minutes integer not null default 2 check (read_minutes > 0),
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create index articles_category_idx on public.articles (category);

alter table public.articles enable row level security;

grant select on public.articles to authenticated;

create policy "Signed-in users read published articles" on public.articles
  for select to authenticated using (is_published);
