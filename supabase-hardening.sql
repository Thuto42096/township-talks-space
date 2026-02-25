-- Kasi Lami - Production Hardening
-- Run this AFTER supabase-schema.sql
-- Adds basic constraints to reduce spam/abuse (still recommended: CAPTCHA/rate limiting via Edge Functions)

DO $$
BEGIN
  -- posts
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'posts_display_name_len') THEN
    ALTER TABLE public.posts
      ADD CONSTRAINT posts_display_name_len CHECK (char_length(display_name) <= 50);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'posts_content_len') THEN
    ALTER TABLE public.posts
      ADD CONSTRAINT posts_content_len CHECK (char_length(content) <= 2000);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'posts_display_name_not_blank') THEN
    ALTER TABLE public.posts
      ADD CONSTRAINT posts_display_name_not_blank CHECK (char_length(btrim(display_name)) > 0);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'posts_content_not_blank') THEN
    ALTER TABLE public.posts
      ADD CONSTRAINT posts_content_not_blank CHECK (char_length(btrim(content)) > 0);
  END IF;

  -- comments
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'comments_display_name_len') THEN
    ALTER TABLE public.comments
      ADD CONSTRAINT comments_display_name_len CHECK (char_length(display_name) <= 50);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'comments_content_len') THEN
    ALTER TABLE public.comments
      ADD CONSTRAINT comments_content_len CHECK (char_length(content) <= 1000);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'comments_display_name_not_blank') THEN
    ALTER TABLE public.comments
      ADD CONSTRAINT comments_display_name_not_blank CHECK (char_length(btrim(display_name)) > 0);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'comments_content_not_blank') THEN
    ALTER TABLE public.comments
      ADD CONSTRAINT comments_content_not_blank CHECK (char_length(btrim(content)) > 0);
  END IF;

  -- kasis
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'kasis_name_not_blank') THEN
    ALTER TABLE public.kasis
      ADD CONSTRAINT kasis_name_not_blank CHECK (char_length(btrim(name)) > 0);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'kasis_description_len') THEN
    ALTER TABLE public.kasis
      ADD CONSTRAINT kasis_description_len CHECK (
        description IS NULL OR char_length(description) <= 500
      );
  END IF;
END $$;

