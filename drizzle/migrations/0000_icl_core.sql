create type public.app_role as enum ('admin','user');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text, email text, phone text, location text, headline text,
  cv_path text, cv_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "own roles read" on public.user_roles for select to authenticated using (user_id = auth.uid() or public.has_role(auth.uid(),'admin'));
create policy "admin manage roles" on public.user_roles for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create policy "own profile read" on public.profiles for select to authenticated using (id = auth.uid() or public.has_role(auth.uid(),'admin'));
create policy "own profile insert" on public.profiles for insert to authenticated with check (id = auth.uid());
create policy "own profile update" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, email) values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'), new.email);
  insert into public.user_roles (user_id, role) values (new.id, 'user');
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  end if;
  return new;
end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

create table public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null, company text not null default 'ICL Group Client',
  location text not null, job_type text not null default 'Full-time',
  category text not null default 'General', salary text,
  description text not null, requirements text,
  is_published boolean not null default true,
  deadline date,
  created_at timestamptz not null default now()
);
grant select on public.jobs to anon;
grant select, insert, update, delete on public.jobs to authenticated;
grant all on public.jobs to service_role;
alter table public.jobs enable row level security;
create policy "public read published" on public.jobs for select to anon, authenticated using (is_published or public.has_role(auth.uid(),'admin'));
create policy "admin write jobs" on public.jobs for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  user_id uuid not null,
  cover_letter text, cv_path text,
  status text not null default 'submitted',
  created_at timestamptz not null default now(),
  unique (job_id, user_id)
);
grant select, insert, update, delete on public.applications to authenticated;
grant all on public.applications to service_role;
alter table public.applications enable row level security;
create policy "own apps read" on public.applications for select to authenticated using (user_id = auth.uid() or public.has_role(auth.uid(),'admin'));
create policy "own apps insert" on public.applications for insert to authenticated with check (user_id = auth.uid() and status = 'submitted');
create policy "admin apps update" on public.applications for update to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admin apps delete" on public.applications for delete to authenticated using (public.has_role(auth.uid(),'admin'));

create table public.service_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null, email text not null, phone text, company text,
  service text not null, message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
grant insert on public.service_requests to anon;
grant select, insert, update, delete on public.service_requests to authenticated;
grant all on public.service_requests to service_role;
alter table public.service_requests enable row level security;
create policy "anyone submit" on public.service_requests for insert to anon, authenticated with check (status = 'new' and length(name) between 1 and 120 and length(email) between 3 and 255 and length(message) between 1 and 3000);
create policy "admin read requests" on public.service_requests for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admin update requests" on public.service_requests for update to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admin delete requests" on public.service_requests for delete to authenticated using (public.has_role(auth.uid(),'admin'));

insert into public.jobs (title, company, location, job_type, category, salary, description, requirements) values
('Senior Financial Analyst','Leading Pan-African Bank','Lagos, Nigeria','Full-time','Finance','Competitive','Drive financial planning, forecasting and performance reporting for a fast-growing banking group.','5+ years in FP&A; ACA/ACCA or CFA; advanced Excel and modelling.'),
('HR Business Partner','Manufacturing Group','Abuja, Nigeria','Full-time','Human Resources','Competitive','Partner with business leaders on talent, performance and organisational design.','CIPM/SHRM; 4+ years HR generalist experience.'),
('Customer Service Officer (Outsourced)','Telecoms Client','Port Harcourt, Nigeria','Contract','Outsourcing','Monthly retainer','Deliver first-class customer support across phone, email and chat channels.','OND/HND/BSc; excellent communication skills.'),
('Business Development Manager','ICL Group','Lagos, Nigeria','Full-time','Sales','Base + commission','Grow ICL Group''s consulting and outsourcing portfolio across corporate clients.','6+ years B2B sales in professional services.');