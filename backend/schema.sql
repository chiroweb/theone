-- Create Posts Table
create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  author_id uuid references auth.users(id) on delete cascade not null,
  category text not null,
  views integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Comments Table
create table if not exists comments (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references posts(id) on delete cascade not null,
  author_id uuid references auth.users(id) on delete cascade not null,
  content text not null,
  parent_id uuid references comments(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Tags Table
create table if not exists tags (
  id uuid default gen_random_uuid() primary key,
  name text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Post_Tags Junction Table
create table if not exists post_tags (
  post_id uuid references posts(id) on delete cascade not null,
  tag_id uuid references tags(id) on delete cascade not null,
  primary key (post_id, tag_id)
);

-- Create Post_Images Table
create table if not exists post_images (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references posts(id) on delete cascade not null,
  url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table posts enable row level security;
alter table comments enable row level security;
alter table tags enable row level security;
alter table post_tags enable row level security;
alter table post_images enable row level security;

-- Create Policies (Simple public read, authenticated write for now)
create policy "Public posts are viewable by everyone." on posts for select using (true);
create policy "Users can insert their own posts." on posts for insert with check (auth.uid() = author_id);
create policy "Users can update their own posts." on posts for update using (auth.uid() = author_id);
create policy "Users can delete their own posts." on posts for delete using (auth.uid() = author_id);

create policy "Public comments are viewable by everyone." on comments for select using (true);
create policy "Users can insert their own comments." on comments for insert with check (auth.uid() = author_id);
create policy "Users can update their own comments." on comments for update using (auth.uid() = author_id);
create policy "Users can delete their own comments." on comments for delete using (auth.uid() = author_id);

create policy "Tags are viewable by everyone." on tags for select using (true);
create policy "Authenticated users can insert tags." on tags for insert with check (auth.role() = 'authenticated');

create policy "Post tags are viewable by everyone." on post_tags for select using (true);
create policy "Authenticated users can insert post tags." on post_tags for insert with check (auth.role() = 'authenticated');

create policy "Post images are viewable by everyone." on post_images for select using (true);
create policy "Authenticated users can insert post images." on post_images for insert with check (auth.role() = 'authenticated');
