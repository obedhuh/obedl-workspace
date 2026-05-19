-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql/new)

-- 1. PROFILES table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  display_name TEXT,
  age INT,
  height DECIMAL,
  height_unit TEXT DEFAULT 'cm',
  weight DECIMAL,
  weight_unit TEXT DEFAULT 'kg',
  sex TEXT,
  diet_mode TEXT DEFAULT '',
  goal_cal INT DEFAULT 2000,
  goal_protein INT DEFAULT 150,
  goal_carbs INT DEFAULT 200,
  goal_fat INT DEFAULT 65,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. MEALS table
CREATE TABLE IF NOT EXISTS meals (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  calories DECIMAL DEFAULT 0,
  protein DECIMAL DEFAULT 0,
  carbs DECIMAL DEFAULT 0,
  fat DECIMAL DEFAULT 0,
  fiber DECIMAL DEFAULT 0,
  sugar DECIMAL DEFAULT 0,
  meal_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. INDEXES for fast queries
CREATE INDEX IF NOT EXISTS idx_meals_user_date ON meals(user_id, meal_date);
CREATE INDEX IF NOT EXISTS idx_meals_user_id ON meals(user_id);

-- 4. ENABLE ROW LEVEL SECURITY
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE meals ENABLE ROW LEVEL SECURITY;

-- 5. RLS POLICIES
-- Profiles: users can only see/edit their own
CREATE POLICY "profiles_select_own" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Meals: users can only see/edit their own
CREATE POLICY "meals_select_own" ON meals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "meals_insert_own" ON meals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "meals_update_own" ON meals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "meals_delete_own" ON meals FOR DELETE USING (auth.uid() = user_id);

-- 6. AUTO-CREATE PROFILE on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'username');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
