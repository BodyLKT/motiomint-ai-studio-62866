import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-background border-t border-border/20">
      <div className="container mx-auto px-4 py-16">
        {/* Newsletter Section */}
        <div className="max-w-md mx-auto mb-16">
          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-center">{t('newsletter.title')}</h3>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder={t('newsletter.placeholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Button className="btn-glow">
                  {t('newsletter.subscribe')}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                {t('newsletter.noSpam')}
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Footer Links - Multi-column SaaS Layout */}
        <div className="border-t border-border/20 pt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 max-w-6xl mx-auto">
            {/* Column 1 - Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="font-bold text-2xl gradient-text mb-3">
                motiomint
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Empowering creators with AI-powered animations.
              </p>
              <p className="text-xs text-muted-foreground mb-2">
                © 2025 MotioMint
              </p>
              <p className="text-xs text-muted-foreground/70 leading-relaxed">
                MotioMint is not affiliated with or endorsed by Canva, CapCut, VEED, or any other third-party editor 
                mentioned on this site. All trademarks are the property of their respective owners.
              </p>
            </div>

            {/* Column 2 - Product */}
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button onClick={() => navigate('/dashboard')} className="hover:text-foreground transition-colors">
                    Browse Animations
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/dashboard')} className="hover:text-foreground transition-colors">
                    Categories
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/pricing')} className="hover:text-foreground transition-colors">
                    Pricing
                  </button>
                </li>
                <li>
                  <button onClick={() => user ? navigate('/dashboard') : navigate('/')} className="hover:text-foreground transition-colors">
                    Download Free Pack
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3 - Company */}
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button onClick={() => navigate('/about')} className="hover:text-foreground transition-colors">
                    About
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/contact')} className="hover:text-foreground transition-colors">
                    Contact
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/privacy-policy')} className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/terms-of-service')} className="hover:text-foreground transition-colors">
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4 - Account */}
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Account</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button onClick={() => navigate('/')} className="hover:text-foreground transition-colors">
                    {user ? 'Dashboard' : 'Login / Sign Up'}
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/dashboard')} className="hover:text-foreground transition-colors">
                    My Library
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/dashboard')} className="hover:text-foreground transition-colors">
                    My Subscriptions
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
