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
  UserCircle2,
  Heart,
  Download,
  Package,
  BookOpen,
  HelpCircle,
  ExternalLink,
  Monitor,
  Moon,
  Sun
} from 'lucide-react';
import { CartButton } from '@/components/CartButton';
import GlobalSearchBar from '@/components/GlobalSearchBar';
import { useTheme } from 'next-themes';
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
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
  const { theme, setTheme } = useTheme();

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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

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

              {/* Cart Button (only when logged in) */}
              {user && <CartButton />}

              {/* User Account Dropdown or Login/SignUp */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="relative h-9 w-9 rounded-full hover:ring-2 hover:ring-primary/20 transition-all"
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="" alt={user.email || "User"} />
                        <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                          {user.email?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    className="w-64 p-2" 
                    align="end" 
                    forceMount
                    sideOffset={8}
                  >
                    {/* User Info Header */}
                    <div className="flex items-center gap-3 px-2 py-3 mb-1">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="" alt={user.email || "User"} />
                        <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                          {user.email?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col space-y-0.5 flex-1 min-w-0">
                        <p className="text-sm font-semibold leading-none truncate">
                          {user.email?.split('@')[0] || 'User'}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    
                    <DropdownMenuSeparator className="my-2" />
                    
                    {/* My Account */}
                    <DropdownMenuItem 
                      onClick={() => navigate('/dashboard?tab=settings')}
                      className="cursor-pointer py-2.5 px-2"
                    >
                      <UserCircle2 className="mr-3 h-4 w-4" />
                      <span className="font-medium">My Account</span>
                    </DropdownMenuItem>

                    {/* My Collections */}
                    <DropdownMenuItem 
                      onClick={() => navigate('/dashboard?tab=favorites')}
                      className="cursor-pointer py-2.5 px-2"
                    >
                      <Heart className="mr-3 h-4 w-4" />
                      <span className="font-medium">My Collections</span>
                    </DropdownMenuItem>

                    {/* My Downloads */}
                    <DropdownMenuItem 
                      onClick={() => navigate('/dashboard?tab=history')}
                      className="cursor-pointer py-2.5 px-2"
                    >
                      <Download className="mr-3 h-4 w-4" />
                      <span className="font-medium">My Downloads</span>
                    </DropdownMenuItem>

                    {/* Subscription */}
                    <DropdownMenuItem 
                      onClick={() => navigate('/pricing')}
                      className="cursor-pointer py-2.5 px-2"
                    >
                      <Package className="mr-3 h-4 w-4" />
                      <span className="font-medium">Subscription</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="my-2" />

                    {/* Blog - External Link */}
                    <DropdownMenuItem 
                      onClick={() => window.open('https://blog.motiomint.com', '_blank')}
                      className="cursor-pointer py-2.5 px-2"
                    >
                      <BookOpen className="mr-3 h-4 w-4" />
                      <span className="font-medium">Blog</span>
                      <ExternalLink className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
                    </DropdownMenuItem>

                    {/* Help Center - External Link */}
                    <DropdownMenuItem 
                      onClick={() => window.open('https://help.motiomint.com', '_blank')}
                      className="cursor-pointer py-2.5 px-2"
                    >
                      <HelpCircle className="mr-3 h-4 w-4" />
                      <span className="font-medium">Help Center</span>
                      <ExternalLink className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="my-2" />

                    {/* Theme Submenu */}
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger className="cursor-pointer py-2.5 px-2">
                        <Monitor className="mr-3 h-4 w-4" />
                        <span className="font-medium">Theme</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="min-w-[160px]">
                        <DropdownMenuItem
                          onClick={() => setTheme('light')}
                          className={`cursor-pointer py-2 px-2 ${theme === 'light' ? 'bg-accent' : ''}`}
                        >
                          <Sun className="mr-3 h-4 w-4" />
                          <span className="font-medium">Light</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setTheme('dark')}
                          className={`cursor-pointer py-2 px-2 ${theme === 'dark' ? 'bg-accent' : ''}`}
                        >
                          <Moon className="mr-3 h-4 w-4" />
                          <span className="font-medium">Dark</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setTheme('system')}
                          className={`cursor-pointer py-2 px-2 ${theme === 'system' ? 'bg-accent' : ''}`}
                        >
                          <Monitor className="mr-3 h-4 w-4" />
                          <span className="font-medium">System</span>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>

                    <DropdownMenuSeparator className="my-2" />

                    {/* Log Out */}
                    <DropdownMenuItem 
                      onClick={handleSignOut}
                      className="cursor-pointer py-2.5 px-2 text-destructive focus:text-destructive focus:bg-destructive/10"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      <span className="font-medium">Log Out</span>
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
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
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
        <div className="lg:hidden fixed inset-0 z-40 bg-background/98 backdrop-blur-xl pt-16 overflow-y-auto animate-in slide-in-from-right duration-300">
          <div className="container mx-auto px-4 py-6 space-y-6 max-w-md">
            {/* Mobile Search */}
            <div className="mb-6">
              <GlobalSearchBar variant="default" autoFocus={false} />
            </div>

            {/* User Profile Section (if logged in) */}
            {user && (
              <div className="mb-6 p-4 rounded-lg bg-accent/50 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" alt={user.email || "User"} />
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-lg">
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">
                      {user.email?.split('@')[0] || 'User'}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                
                {/* User Quick Actions */}
                <div className="space-y-2">
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-3 p-2.5 rounded-md hover:bg-accent transition-colors text-left w-full text-sm"
                  >
                    <UserCircle2 className="w-4 h-4 text-primary" />
                    <span className="font-medium">My Account</span>
                  </button>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-3 p-2.5 rounded-md hover:bg-accent transition-colors text-left w-full text-sm"
                  >
                    <Heart className="w-4 h-4 text-primary" />
                    <span className="font-medium">My Collections</span>
                  </button>
                  <button
                    onClick={() => navigate('/dashboard?tab=history')}
                    className="flex items-center gap-3 p-2.5 rounded-md hover:bg-accent transition-colors text-left w-full text-sm"
                  >
                    <Download className="w-4 h-4 text-primary" />
                    <span className="font-medium">My Downloads</span>
                  </button>
                </div>
              </div>
            )}

            {/* Categories Section */}
            <div>
              <h3 className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wider px-2">
                {t('nav.categories')}
              </h3>
              <div className="space-y-1">
                {animationCategories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => navigate(category.path)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/80 transition-colors text-left w-full group"
                  >
                    <category.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tools Section */}
            <div>
              <h3 className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wider px-2">
                {t('nav.tools')}
              </h3>
              <div className="space-y-1">
                {toolsItems.map((tool) => (
                  <button
                    key={tool.name}
                    onClick={() => navigate(tool.path)}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/80 transition-colors text-left w-full group"
                  >
                    <tool.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
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
              <h3 className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wider px-2">
                Quick Links
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => navigate('/pricing')}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/80 transition-colors text-left w-full"
                >
                  <CreditCard className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">{t('nav.pricing')}</span>
                </button>
                <button
                  onClick={() => window.open('https://blog.motiomint.com', '_blank')}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/80 transition-colors text-left w-full"
                >
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Blog</span>
                  <ExternalLink className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
                </button>
                <button
                  onClick={() => window.open('https://help.motiomint.com', '_blank')}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/80 transition-colors text-left w-full"
                >
                  <HelpCircle className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Help Center</span>
                  <ExternalLink className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Appearance Settings */}
            <div>
              <h3 className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wider px-2">
                Appearance
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-colors ${
                    theme === 'light' ? 'bg-accent/80 ring-2 ring-primary' : 'hover:bg-accent/50'
                  }`}
                >
                  <Sun className="w-5 h-5 text-primary" />
                  <span className="text-xs font-medium">Light</span>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-colors ${
                    theme === 'dark' ? 'bg-accent/80 ring-2 ring-primary' : 'hover:bg-accent/50'
                  }`}
                >
                  <Moon className="w-5 h-5 text-primary" />
                  <span className="text-xs font-medium">Dark</span>
                </button>
                <button
                  onClick={() => setTheme('system')}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-colors ${
                    theme === 'system' ? 'bg-accent/80 ring-2 ring-primary' : 'hover:bg-accent/50'
                  }`}
                >
                  <Monitor className="w-5 h-5 text-primary" />
                  <span className="text-xs font-medium">System</span>
                </button>
              </div>
            </div>

            {/* Call to Action & Auth Section */}
            <div className="pt-4 border-t border-border space-y-3">
              {user ? (
                <>
                  {/* Subscribe Button for logged in users */}
                  <Button 
                    variant="default" 
                    className="w-full justify-center gap-2 btn-glow h-12 text-base font-semibold"
                    onClick={() => navigate('/pricing')}
                  >
                    <Package className="w-5 h-5" />
                    Subscribe Now
                  </Button>
                  
                  {/* Logout Button */}
                  <Button 
                    variant="outline" 
                    className="w-full justify-center gap-2 h-11"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-5 h-5" />
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  {/* Subscribe Button for guests */}
                  <Button 
                    variant="default" 
                    className="w-full justify-center gap-2 btn-glow h-12 text-base font-semibold"
                    onClick={() => navigate('/pricing')}
                  >
                    <Package className="w-5 h-5" />
                    Subscribe Now
                  </Button>
                  
                  {/* Sign Up Button */}
                  <Button 
                    variant="default" 
                    className="w-full justify-center gap-2 h-11"
                    onClick={onSignUpClick}
                  >
                    <User className="w-5 h-5" />
                    {t('nav.signUp')}
                  </Button>
                  
                  {/* Login Button */}
                  <Button 
                    variant="outline" 
                    className="w-full justify-center gap-2 h-11"
                    onClick={onLoginClick}
                  >
                    <LogIn className="w-5 h-5" />
                    {t('nav.login')}
                  </Button>
                </>
              )}
            </div>

            {/* Bottom Spacing for Mobile Safari */}
            <div className="h-8" />
          </div>
        </div>
      )}
    </>
  );
}
