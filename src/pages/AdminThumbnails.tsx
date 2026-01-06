/**
 * Admin page for thumbnail management
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MainNavigation from '@/components/navigation/MainNavigation';
import ThumbnailAdminPanel from '@/components/admin/ThumbnailAdminPanel';
import { Loader2 } from 'lucide-react';

export default function AdminThumbnails() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
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
              <li>Stored in Supabase storage bucket "thumbnails"</li>
              <li>Database tracks: thumb_source = "extracted_frame", thumb_status = "ready"</li>
              <li>Placeholder URLs (placehold.co) are skipped - marked as fallback</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
