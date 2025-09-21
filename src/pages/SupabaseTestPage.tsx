import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import SupabaseTest from '@/components/SupabaseTest';

const SupabaseTestPage = () => {
  return (
    <div className="min-h-screen bg-gradient-earth">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-primary mb-2">
            Supabase Setup Test
          </h1>
          <p className="text-muted-foreground">
            Use this page to verify your Supabase connection is working correctly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Test Component */}
          <div>
            <SupabaseTest />
          </div>

          {/* Setup Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Setup Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">1. Create Supabase Project</h3>
                <p className="text-sm text-muted-foreground">
                  Sign up at supabase.com and create a new project.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">2. Configure Environment</h3>
                <p className="text-sm text-muted-foreground">
                  Update your .env.local file with your Supabase URL and API key.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">3. Run Database Schema</h3>
                <p className="text-sm text-muted-foreground">
                  Execute the SQL in supabase-schema.sql in your Supabase SQL Editor.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">4. Test Connection</h3>
                <p className="text-sm text-muted-foreground">
                  Click "Run Connection Tests" to verify everything is working.
                </p>
              </div>

              <div className="pt-4 border-t">
                <a 
                  href="https://supabase.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-primary hover:underline"
                >
                  Visit Supabase
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Troubleshooting */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Troubleshooting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div>
                <strong>Database Connection Failed:</strong>
                <ul className="list-disc list-inside ml-4 text-muted-foreground">
                  <li>Check your VITE_SUPABASE_URL in .env.local</li>
                  <li>Check your VITE_SUPABASE_ANON_KEY in .env.local</li>
                  <li>Restart your development server after updating .env.local</li>
                </ul>
              </div>
              
              <div>
                <strong>Kasis Data Failed:</strong>
                <ul className="list-disc list-inside ml-4 text-muted-foreground">
                  <li>Make sure you ran the database schema SQL</li>
                  <li>Check that the 'kasis' table exists in your Supabase dashboard</li>
                  <li>Verify Row Level Security policies are enabled</li>
                </ul>
              </div>
              
              <div>
                <strong>Posts API Failed:</strong>
                <ul className="list-disc list-inside ml-4 text-muted-foreground">
                  <li>Ensure the 'posts' and 'comments' tables exist</li>
                  <li>Check browser console for detailed error messages</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupabaseTestPage;
