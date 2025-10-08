import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, LogOut } from 'lucide-react';

export default function Dashboard() {
  const { user, session, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !session) {
      navigate('/');
    }
  }, [session, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

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
      {/* Header */}
      <header className="border-b border-primary/20 bg-background/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            BrandName
          </button>
          <Button
            onClick={handleSignOut}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Hi {user.user_metadata?.full_name || 'there'}, welcome back 👋
            </h1>
            <p className="text-muted-foreground text-lg">
              Access your animation library, manage subscriptions, and download your favorite content.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
              <h3 className="text-sm text-muted-foreground mb-2">Subscription</h3>
              <p className="text-2xl font-bold">Free Plan</p>
            </Card>
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
              <h3 className="text-sm text-muted-foreground mb-2">Downloads Available</h3>
              <p className="text-2xl font-bold">10</p>
            </Card>
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
              <h3 className="text-sm text-muted-foreground mb-2">Last Download</h3>
              <p className="text-2xl font-bold">-</p>
            </Card>
          </div>

          {/* Coming Soon Message */}
          <Card className="p-12 text-center bg-card/50 backdrop-blur-sm border-primary/20">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Dashboard Under Construction
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              We're building an amazing experience for you. The full dashboard with animation library,
              favorites, and subscription management is coming soon!
            </p>
            <Button
              onClick={() => navigate('/')}
              variant="hero"
              size="lg"
            >
              Back to Home
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
}
