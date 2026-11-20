-- Row Level Security: the catalogue is public, learner data belongs to its owner.

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.therapists enable row level security;
alter table public.courses enable row level security;
alter table public.lessons enable row level security;
alter table public.enrollments enable row level security;
alter table public.lesson_progress enable row level security;

grant select on public.categories, public.therapists, public.courses, public.lessons to anon, authenticated;
grant select, update on public.profiles to authenticated;
grant select, insert, delete on public.enrollments to authenticated;
grant select, insert, update on public.lesson_progress to authenticated;

create policy "Categories are public" on public.categories
  for select to anon, authenticated using (true);

create policy "Therapists are public" on public.therapists
  for select to anon, authenticated using (true);

create policy "Published courses are public" on public.courses
  for select to anon, authenticated using (is_published);

create policy "Lessons of published courses are public" on public.lessons
  for select to anon, authenticated
  using (exists (select 1 from public.courses c where c.id = course_id and c.is_published));

create policy "Users read their profile" on public.profiles
  for select to authenticated using ((select auth.uid()) = id);

create policy "Users update their profile" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy "Users read their enrollments" on public.enrollments
  for select to authenticated using ((select auth.uid()) = user_id);

create policy "Users enroll themselves" on public.enrollments
  for insert to authenticated with check ((select auth.uid()) = user_id);

create policy "Users leave their courses" on public.enrollments
  for delete to authenticated using ((select auth.uid()) = user_id);

create policy "Users read their progress" on public.lesson_progress
  for select to authenticated using ((select auth.uid()) = user_id);

create policy "Users record their progress" on public.lesson_progress
  for insert to authenticated with check ((select auth.uid()) = user_id);

create policy "Users update their progress" on public.lesson_progress
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- Storage: full lessons are private (signed URLs), previews and covers are public.
insert into storage.buckets (id, name, public)
values
  ('lesson-videos', 'lesson-videos', false),
  ('lesson-previews', 'lesson-previews', true),
  ('course-covers', 'course-covers', true)
on conflict (id) do nothing;

create policy "Signed-in users stream lesson videos" on storage.objects
  for select to authenticated using (bucket_id = 'lesson-videos');
