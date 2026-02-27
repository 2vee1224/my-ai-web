-- ============================================================
-- Travel Log (mini_sns) Supabase DB 설정 SQL
-- Supabase Dashboard > SQL Editor 에서 실행하세요
-- ============================================================

-- 1. sns_users (프로필 테이블)
CREATE TABLE IF NOT EXISTS sns_users (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username text UNIQUE NOT NULL,
  display_name text NOT NULL,
  bio text DEFAULT '',
  avatar_url text DEFAULT '',
  followers_count integer DEFAULT 0,
  following_count integer DEFAULT 0,
  posts_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE sns_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sns_users_select_all" ON sns_users FOR SELECT USING (true);
CREATE POLICY "sns_users_insert_own" ON sns_users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "sns_users_update_own" ON sns_users FOR UPDATE USING (auth.uid() = id);

-- 2. sns_posts (게시물 테이블)
CREATE TABLE IF NOT EXISTS sns_posts (
  id bigserial PRIMARY KEY,
  user_id uuid REFERENCES sns_users(id) ON DELETE CASCADE NOT NULL,
  caption text NOT NULL,
  image_url text,
  likes_count integer DEFAULT 0,
  comments_count integer DEFAULT 0,
  region text CHECK (region IN ('국내', '해외')),
  themes text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE sns_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sns_posts_select_all" ON sns_posts FOR SELECT USING (true);
CREATE POLICY "sns_posts_insert_own" ON sns_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "sns_posts_update_own" ON sns_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "sns_posts_delete_own" ON sns_posts FOR DELETE USING (auth.uid() = user_id);

-- 3. sns_comments (댓글 테이블)
CREATE TABLE IF NOT EXISTS sns_comments (
  id bigserial PRIMARY KEY,
  post_id bigint REFERENCES sns_posts(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES sns_users(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE sns_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sns_comments_select_all" ON sns_comments FOR SELECT USING (true);
CREATE POLICY "sns_comments_insert_own" ON sns_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "sns_comments_delete_own" ON sns_comments FOR DELETE USING (auth.uid() = user_id);

-- 4. sns_likes (좋아요 테이블)
CREATE TABLE IF NOT EXISTS sns_likes (
  id bigserial PRIMARY KEY,
  post_id bigint REFERENCES sns_posts(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES sns_users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(post_id, user_id)
);

ALTER TABLE sns_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sns_likes_select_all" ON sns_likes FOR SELECT USING (true);
CREATE POLICY "sns_likes_insert_own" ON sns_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "sns_likes_delete_own" ON sns_likes FOR DELETE USING (auth.uid() = user_id);

-- 5. sns_follows (팔로우 테이블)
CREATE TABLE IF NOT EXISTS sns_follows (
  id bigserial PRIMARY KEY,
  follower_id uuid REFERENCES sns_users(id) ON DELETE CASCADE NOT NULL,
  following_id uuid REFERENCES sns_users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(follower_id, following_id)
);

ALTER TABLE sns_follows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sns_follows_select_all" ON sns_follows FOR SELECT USING (true);
CREATE POLICY "sns_follows_insert_own" ON sns_follows FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "sns_follows_delete_own" ON sns_follows FOR DELETE USING (auth.uid() = follower_id);

-- 6. sns_bookmarks (북마크/스크랩 테이블)
CREATE TABLE IF NOT EXISTS sns_bookmarks (
  id bigserial PRIMARY KEY,
  post_id bigint REFERENCES sns_posts(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES sns_users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(post_id, user_id)
);

ALTER TABLE sns_bookmarks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sns_bookmarks_select_own" ON sns_bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "sns_bookmarks_insert_own" ON sns_bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "sns_bookmarks_delete_own" ON sns_bookmarks FOR DELETE USING (auth.uid() = user_id);

-- 7. sns_notifications (알림 테이블)
CREATE TABLE IF NOT EXISTS sns_notifications (
  id bigserial PRIMARY KEY,
  user_id uuid REFERENCES sns_users(id) ON DELETE CASCADE NOT NULL,
  actor_id uuid REFERENCES sns_users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('like', 'comment', 'follow')),
  post_id bigint REFERENCES sns_posts(id) ON DELETE CASCADE,
  message text,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE sns_notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sns_notifications_select_own" ON sns_notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "sns_notifications_update_own" ON sns_notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "sns_notifications_insert_system" ON sns_notifications FOR INSERT WITH CHECK (true);
