import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { kasisApi, postsApi } from '@/lib/api';

const SupabaseTest = () => {
  const [testResults, setTestResults] = useState<{
    connection: 'pending' | 'success' | 'error';
    kasis: 'pending' | 'success' | 'error';
    posts: 'pending' | 'success' | 'error';
  }>({
    connection: 'pending',
    kasis: 'pending',
    posts: 'pending'
  });
  const [isRunning, setIsRunning] = useState(false);

  const runTests = async () => {
    setIsRunning(true);
    setTestResults({
      connection: 'pending',
      kasis: 'pending',
      posts: 'pending'
    });

    // Test 1: Basic connection
    try {
      const { data, error } = await supabase.from('kasis').select('count').limit(1);
      if (error) throw error;
      setTestResults(prev => ({ ...prev, connection: 'success' }));
    } catch (error) {
      console.error('Connection test failed:', error);
      setTestResults(prev => ({ ...prev, connection: 'error' }));
    }

    // Test 2: Fetch kasis
    try {
      const kasis = await kasisApi.getKasis();
      if (kasis.length > 0) {
        setTestResults(prev => ({ ...prev, kasis: 'success' }));
      } else {
        setTestResults(prev => ({ ...prev, kasis: 'error' }));
      }
    } catch (error) {
      console.error('Kasis test failed:', error);
      setTestResults(prev => ({ ...prev, kasis: 'error' }));
    }

    // Test 3: Fetch posts
    try {
      const posts = await postsApi.getPosts();
      setTestResults(prev => ({ ...prev, posts: 'success' }));
    } catch (error) {
      console.error('Posts test failed:', error);
      setTestResults(prev => ({ ...prev, posts: 'error' }));
    }

    setIsRunning(false);
  };

  const getStatusIcon = (status: 'pending' | 'success' | 'error') => {
    switch (status) {
      case 'pending':
        return <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusText = (status: 'pending' | 'success' | 'error') => {
    switch (status) {
      case 'pending':
        return 'Testing...';
      case 'success':
        return 'Success';
      case 'error':
        return 'Failed';
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Supabase Connection Test
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span>Database Connection</span>
            <div className="flex items-center gap-2">
              {getStatusIcon(testResults.connection)}
              <span className="text-sm">{getStatusText(testResults.connection)}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span>Kasis Data</span>
            <div className="flex items-center gap-2">
              {getStatusIcon(testResults.kasis)}
              <span className="text-sm">{getStatusText(testResults.kasis)}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span>Posts API</span>
            <div className="flex items-center gap-2">
              {getStatusIcon(testResults.posts)}
              <span className="text-sm">{getStatusText(testResults.posts)}</span>
            </div>
          </div>
        </div>

        <Button 
          onClick={runTests} 
          disabled={isRunning}
          className="w-full"
        >
          {isRunning ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Running Tests...
            </>
          ) : (
            'Run Connection Tests'
          )}
        </Button>

        <div className="text-xs text-muted-foreground">
          <p>This test verifies your Supabase connection is working correctly.</p>
          <p className="mt-1">Make sure you've set up your environment variables and database schema.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupabaseTest;
