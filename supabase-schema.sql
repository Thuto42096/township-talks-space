-- Kasi Lami Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create kasis table
CREATE TABLE IF NOT EXISTS kasis (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    display_name VARCHAR(100) NOT NULL,
    kasi VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    section VARCHAR(50) NOT NULL CHECK (section IN ('events', 'businesses', 'news', 'chat')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    display_name VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_kasi ON posts(kasi);
CREATE INDEX IF NOT EXISTS idx_posts_section ON posts(section);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);

-- Insert initial kasi data
INSERT INTO kasis (name, description) VALUES
    ('Soweto', 'South Western Townships'),
    ('Alexandra', 'Alex Township'),
    ('Tembisa', 'Ekurhuleni Township'),
    ('Katlehong', 'East Rand Township'),
    ('Evaton', 'Vaal Triangle Township'),
    ('Sebokeng', 'Sedibeng District'),
    ('Daveyton', 'Benoni Township'),
    ('Diepsloot', 'Johannesburg Township'),
    ('Mamelodi', 'Pretoria Township'),
    ('Lenasia', 'South of Johannesburg'),
    ('Khayelitsha', 'Cape Town Township'),
    ('Gugulethu', 'Cape Town Township'),
    ('Langa', 'Cape Town Township'),
    ('Nyanga', 'Cape Town Township'),
    ('Soshanguve', 'Pretoria Township'),
    ('Atteridgeville', 'Pretoria Township'),
    ('Vosloorus', 'Ekurhuleni Township'),
    ('Thokoza', 'Ekurhuleni Township'),
    ('Botshabelo', 'Free State Township'),
    ('Mdantsane', 'Eastern Cape Township'),
    ('KwaMashu', 'KwaZulu-Natal Township'),
    ('Umlazi', 'KwaZulu-Natal Township'),
    ('Chatsworth', 'KwaZulu-Natal Township'),
    ('Phoenix', 'KwaZulu-Natal Township'),
    ('Verulam', 'KwaZulu-Natal Township')
ON CONFLICT (name) DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE kasis ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public read access (since no authentication is required)
-- Anyone can read kasis
CREATE POLICY "Anyone can view kasis" ON kasis
    FOR SELECT USING (true);

-- Anyone can read posts
CREATE POLICY "Anyone can view posts" ON posts
    FOR SELECT USING (true);

-- Anyone can create posts
CREATE POLICY "Anyone can create posts" ON posts
    FOR INSERT WITH CHECK (true);

-- Anyone can read comments
CREATE POLICY "Anyone can view comments" ON comments
    FOR SELECT USING (true);

-- Anyone can create comments
CREATE POLICY "Anyone can create comments" ON comments
    FOR INSERT WITH CHECK (true);

-- Create a function to get posts with comment counts
CREATE OR REPLACE FUNCTION get_posts_with_comment_count(
    p_kasi TEXT DEFAULT NULL,
    p_section TEXT DEFAULT NULL
)
RETURNS TABLE (
    id UUID,
    display_name VARCHAR,
    kasi VARCHAR,
    content TEXT,
    section VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE,
    comment_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.display_name,
        p.kasi,
        p.content,
        p.section,
        p.created_at,
        COUNT(c.id) as comment_count
    FROM posts p
    LEFT JOIN comments c ON p.id = c.post_id
    WHERE 
        (p_kasi IS NULL OR p.kasi = p_kasi) AND
        (p_section IS NULL OR p.section = p_section)
    GROUP BY p.id, p.display_name, p.kasi, p.content, p.section, p.created_at
    ORDER BY p.created_at DESC;
END;
$$ LANGUAGE plpgsql;
