# Supabase Setup Guide for Kasi Lami

This guide will help you connect your Kasi Lami project to a Supabase backend.

## Prerequisites

- A Supabase account (sign up at [supabase.com](https://supabase.com))
- Node.js and npm installed
- Your Kasi Lami project cloned locally

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `kasi-lami` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest to your users (e.g., `af-south-1` for South Africa)
5. Click "Create new project"
6. Wait for the project to be created (this takes a few minutes)

## Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **anon public** key (the long string under "Project API keys")

## Step 3: Configure Environment Variables

1. For local development, create/update `.env.local` (recommended) or `.env` in the project root:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

2. Replace the placeholder values with your actual Supabase credentials

### Vercel (Production)

Vercel will not read your local `.env` file. Add the same variables in:
**Vercel 71 Project 71 Settings 71 Environment Variables**

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Step 4: Set Up the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the entire contents of `supabase-schema.sql` from your project root
4. Click "Run" to execute the SQL
5. You should see success messages for each table creation

### Recommended: Production Constraints

After the base schema is running, execute `supabase-hardening.sql` to add length limits and non-empty constraints that match the UI.

## Step 5: Enable Real-time (Optional but Recommended)

1. In your Supabase dashboard, go to **Database** → **Replication**
2. Find the tables: `posts`, `comments`, `kasis`
3. Toggle "Enable" for each table to enable real-time subscriptions
4. This allows live updates when new posts or comments are added

## Step 6: Test the Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your browser to `http://localhost:8080`

3. Test the following features:
   - **View Communities**: The home page should load communities from Supabase
   - **Create a Post**: Try creating a post in any section
   - **Add Comments**: Add comments to posts
   - **Real-time Updates**: Open the same page in two browser tabs and see live updates

## Step 7: Verify Database Content

1. In Supabase dashboard, go to **Database** → **Table Editor**
2. Check the following tables:
   - **kasis**: Should contain the South African townships
   - **posts**: Should show any posts you created
   - **comments**: Should show any comments you added

## Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables" error**:
   - Check that your `.env.local` (or `.env`) file has the correct variable names
   - Restart your development server after updating environment variables
   - On Vercel, verify the Environment Variables are set for **Production** (and **Preview** if needed)

2. **Database connection errors**:
   - Verify your Project URL and API key are correct
   - Check that your Supabase project is active (not paused)

3. **Posts/comments not appearing**:
   - Check the browser console for errors
   - Verify the database schema was created correctly
   - Check Row Level Security policies are enabled

4. **Real-time not working**:
   - Ensure real-time is enabled for your tables in Supabase dashboard
   - Check browser console for WebSocket connection errors

### Development vs Production

- The current setup uses the `anon` key which is safe for client-side use
- For production, consider implementing user authentication
- Row Level Security (RLS) policies are already configured for public access

## Next Steps

Once everything is working:

1. **Add Authentication** (optional): Implement Supabase Auth for user accounts
2. **Deploy**: Deploy your app to Vercel, Netlify, or your preferred platform
3. **Monitor**: Use Supabase dashboard to monitor usage and performance
4. **Scale**: Upgrade your Supabase plan as your community grows

## Support

If you encounter issues:
1. Check the Supabase documentation: [supabase.com/docs](https://supabase.com/docs)
2. Review the browser console for error messages
3. Check the Supabase dashboard logs under **Logs** → **Database**

Your Kasi Lami community platform is now powered by Supabase! 🎉
