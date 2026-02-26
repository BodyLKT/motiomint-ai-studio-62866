/**
 * Admin page for thumbnail management
 * Server-side role check via user_roles table
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import MainNavigation from '@/components/navigation/MainNavigation';
import ThumbnailAdminPanel from '@/components/admin/ThumbnailAdminPanel';
import { Loader2, ShieldAlert } from 'lucide-react';

export default function AdminThumbnails() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
      return;
    }

    if (user) {
      supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle()
        .then(({ data }) => {
          setIsAdmin(!!data);
        });
    }
  }, [user, loading, navigate]);

  if (loading || (user && isAdmin === null)) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-dark">
        <MainNavigation />
        <main className="container mx-auto px-4 pt-32 pb-12 text-center">
          <ShieldAlert className="h-12 w-12 mx-auto mb-4 text-destructive" />
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground">You do not have admin privileges.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      <MainNavigation />
      
      <main className="container mx-auto px-4 pt-32 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin: Thumbnail Management</h1>
            <p className="text-muted-foreground">
              Extract real frames from MP4 videos for use as thumbnails. No AI-generated images.
            </p>
          </div>
          
          <ThumbnailAdminPanel />
          
          <div className="mt-8 p-4 bg-muted/30 rounded-lg">
            <h3 className="font-medium mb-2">Technical Details</h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Thumbnails are extracted using browser canvas API (client-side)</li>
              <li>Frame captured at 1.0s (with fallback to 0.5s, 0.2s, 0s)</li>
              <li>Two sizes generated: 600x600 (card) and 1280x720 (poster)</li>
              <li>Stored in Lovable Cloud storage bucket "thumbnails"</li>
              <li>Database tracks: thumb_source = "extracted_frame", thumb_status = "ready"</li>
              <li>Placeholder URLs (placehold.co) are skipped - marked as fallback</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
