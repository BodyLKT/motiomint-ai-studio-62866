import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  ChevronDown,
  User,
  LogIn,
  LayoutDashboard,
  ShoppingCart,
  LogOut,
  Search,
  Sparkles,
  Palette,
  Briefcase,
  Plane,
  Activity,
  Zap,
  Film,
  Wand2,
  Settings,
  CreditCard,
  UserCircle2
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { CartButton } from '@/components/CartButton';
import GlobalSearchBar from '@/components/GlobalSearchBar';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';

interface MainNavigationProps {
  onLoginClick?: () => void;
  onSignUpClick?: () => void;
}

export default function MainNavigation({ onLoginClick, onSignUpClick }: MainNavigationProps) {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const animationCategories = [
    { name: 'Tech & Futuristic', icon: Zap, path: '/category/Tech & Futuristic' },
    { name: 'Fitness & Lifestyle', icon: Activity, path: '/category/Fitness & Lifestyle' },
    { name: 'Business & Finance', icon: Briefcase, path: '/category/Business & Finance' },
    { name: 'Travel & Nature', icon: Plane, path: '/category/Travel & Nature' },
    { name: 'Abstract Backgrounds', icon: Palette, path: '/category/Abstract Backgrounds' },
    { name: 'Social Media Hooks', icon: Sparkles, path: '/category/Social Media Hooks' },
  ];

  const toolsItems = [
    { name: t('tools.library'), icon: Film, path: '/dashboard', description: 'Browse all animations' },
    { name: t('tools.editShare'), icon: Wand2, path: '/dashboard', description: 'Customize animations' },
    { name: t('tools.cart'), icon: ShoppingCart, path: '/cart', description: 'View your cart' },
  ];

  return (
    <>
      {/* Main Navigation */}
      <nav className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "glass border-b border-border/50 shadow-lg" : "bg-background/80 backdrop-blur-sm border-b border-border/30"
      )}>
        <div className="container mx-auto px-4 py-3">
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between gap-6">
            {/* Logo - Left */}
            <button
              onClick={handleLogoClick}
              className="font-bold text-2xl gradient-text hover:opacity-80 transition-opacity whitespace-nowrap flex-shrink-0"
            >
              motiomint
            </button>

            {/* Desktop Menu - Center/Left */}
            <div className="flex items-center gap-6">
              <NavigationMenu>
                <NavigationMenuList>
                  {/* Categories Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm font-medium">
                      {t('nav.categories')}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[500px] gap-3 p-6 bg-popover">
                        <div className="mb-2">
                          <h4 className="text-sm font-semibold text-foreground mb-1">
                            {t('nav.exploreCategories')}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {t('nav.exploreCategoriesDesc')}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {animationCategories.map((category) => (
                            <button
                              key={category.name}
                              onClick={() => navigate(category.path)}
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left group"
                            >
                              <category.icon className="w-5 h-5 text-primary flex-shrink-0" />
                              <span className="text-sm font-medium group-hover:text-primary transition-colors">
                                {category.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Tools Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm font-medium">
                      {t('nav.tools')}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[400px] p-6 bg-popover">
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-foreground mb-1">
                            {t('nav.platformTools')}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {t('nav.platformToolsDesc')}
                          </p>
                        </div>
                        <div className="space-y-2">
                          {toolsItems.map((tool) => (
                            <button
                              key={tool.name}
                              onClick={() => navigate(tool.path)}
                              className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left w-full group"
                            >
                              <tool.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              <div>
                                <div className="text-sm font-medium group-hover:text-primary transition-colors">
                                  {tool.name}
                                </div>
                                <div className="text-xs text-muted-foreground mt-0.5">
                                  {tool.description}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Right Side Actions */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {/* Business Link */}
              <button
                onClick={() => navigate('/dashboard')}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Business
              </button>

              {/* Pricing Link */}
              <button
                onClick={() => navigate('/pricing')}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('nav.pricing')}
              </button>

              {/* Subscribe Now Button */}
              <Button 
                variant="default" 
                size="sm" 
                className="btn-glow font-semibold px-6"
                onClick={() => navigate('/pricing')}
              >
                Subscribe Now
              </Button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Cart Button (only when logged in) */}
              {user && <CartButton />}

              {/* User Account Dropdown or Login/SignUp */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="relative h-9 w-9 rounded-full"
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="" alt={user.email || "User"} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user.email?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.email}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/pricing')}>
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Subscription</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={onLoginClick}
                  >
                    {t('nav.login')}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={onSignUpClick}
                  >
                    {t('nav.signUp')}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between">
              <button
                onClick={handleLogoClick}
                className="font-bold text-xl gradient-text hover:opacity-80 transition-opacity"
              >
                motiomint
              </button>
              
              <div className="flex items-center gap-2">
                {user && <CartButton />}
                <ThemeToggle />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar Row (Desktop & Tablet) */}
        <div className="hidden md:block border-t border-border/30 bg-background/50">
          <div className="container mx-auto px-4 py-2">
            <div className="max-w-3xl mx-auto">
              <GlobalSearchBar variant="default" autoFocus={false} />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-lg pt-20 overflow-y-auto">
          <div className="container mx-auto px-4 py-6 space-y-6">
            {/* Mobile Search */}
            <div className="mb-6">
              <GlobalSearchBar variant="default" autoFocus={false} />
            </div>

            {/* Categories Section */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                {t('nav.categories')}
              </h3>
              <div className="space-y-2">
                {animationCategories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => navigate(category.path)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left w-full"
                  >
                    <category.icon className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tools Section */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                {t('nav.tools')}
              </h3>
              <div className="space-y-2">
                {toolsItems.map((tool) => (
                  <button
                    key={tool.name}
                    onClick={() => navigate(tool.path)}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left w-full"
                  >
                    <tool.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">{tool.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{tool.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                {t('nav.quickLinks')}
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    const pricingSection = document.getElementById('pricing');
                    if (pricingSection) {
                      pricingSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="flex items-center p-3 rounded-lg hover:bg-accent transition-colors text-left w-full text-sm font-medium"
                >
                  {t('nav.pricing')}
                </button>
              </div>
            </div>

            {/* User Actions */}
            <div className="pt-4 border-t border-border">
              {user ? (
                <div className="space-y-2">
                  <Button 
                    variant="default" 
                    className="w-full justify-start gap-3"
                    onClick={() => navigate('/dashboard')}
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    {t('nav.dashboard')}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-3"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-5 h-5" />
                    {t('nav.logout')}
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button 
                    variant="default" 
                    className="w-full justify-start gap-3 btn-glow"
                    onClick={onSignUpClick}
                  >
                    <User className="w-5 h-5" />
                    {t('nav.signUp')}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-3"
                    onClick={onLoginClick}
                  >
                    <LogIn className="w-5 h-5" />
                    {t('nav.login')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
