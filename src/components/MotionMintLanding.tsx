import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Download, 
  Star, 
  ArrowRight, 
  CheckCircle, 
  Zap, 
  Smartphone, 
  Users,
  Gift,
  Quote,
  Clock,
  TrendingUp,
  DollarSign,
  User,
  LogIn,
  LayoutDashboard
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginModal } from '@/components/auth/LoginModal';
import { SignUpModal } from '@/components/auth/SignUpModal';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSelector } from '@/components/LanguageSelector';
import VideoPreview from '@/components/ui/VideoPreview';
import heroImage from '@/assets/hero-bg.jpg';
import phoneMockup from '@/assets/phone-mockup.jpg';
import techAnimation from '@/assets/tech-animation.jpg';
import fitnessAnimation from '@/assets/fitness-animation.jpg';

const MotionMintLanding = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [selectedPricingTab, setSelectedPricingTab] = useState<'oneTime' | 'subscription'>('oneTime');
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const categories = [
    {
      title: 'Tech & Futuristic',
      description: 'Holographic interfaces, circuit patterns, AI visuals',
      image: techAnimation,
      video: techAnimation, // Will be replaced with actual video URLs when available
      count: '120+ animations'
    },
    {
      title: 'Fitness & Lifestyle',
      description: 'Workout graphics, health metrics, energy flows',
      image: fitnessAnimation,
      video: fitnessAnimation,
      count: '85+ animations'
    },
    {
      title: 'Business & Finance',
      description: 'Charts, graphs, corporate motion graphics',
      image: techAnimation,
      video: techAnimation,
      count: '95+ animations'
    },
    {
      title: 'Travel & Nature',
      description: 'Landscapes, travel routes, nature elements',
      image: fitnessAnimation,
      video: fitnessAnimation,
      count: '110+ animations'
    },
    {
      title: 'Abstract Backgrounds',
      description: 'Flowing shapes, particles, gradient motions',
      image: techAnimation,
      video: techAnimation,
      count: '200+ animations'
    },
    {
      title: 'Social Media Hooks',
      description: 'Attention-grabbing intros and transitions',
      image: fitnessAnimation,
      video: fitnessAnimation,
      count: '150+ animations'
    }
  ];

  const pricingPlans = {
    oneTime: [
      {
        name: 'Starter',
        price: '29€',
        description: '20 animations to get started',
        features: ['20 Premium Animations', 'HD Quality Downloads', 'Commercial License', 'Email Support'],
        popular: false
      },
      {
        name: 'Mega',
        price: '79€',
        description: '50 animations - most popular',
        features: ['50 Premium Animations', '4K Quality Downloads', 'Extended Commercial License', 'Priority Support', 'Bonus Content'],
        popular: true
      },
      {
        name: 'Agency',
        price: '129€',
        description: '100 animations for teams',
        features: ['100 Premium Animations', '4K Quality Downloads', 'Team License (5 users)', 'Priority Support', 'Custom Requests'],
        popular: false
      }
    ],
    subscription: [
      {
        name: 'Basic',
        price: '9€/mo',
        description: 'Essential animations monthly',
        features: ['20 New Animations/Month', 'HD Downloads', 'Commercial License', 'Cancel Anytime'],
        popular: false
      },
      {
        name: 'Pro',
        price: '19€/mo',
        description: 'Power user plan',
        features: ['50 New Animations/Month', '4K Downloads', 'Priority Access', 'Custom Requests', 'Analytics Dashboard'],
        popular: true
      },
      {
        name: 'Agency',
        price: '49€/mo',
        description: 'Unlimited + 4K + white-label',
        features: ['Unlimited Downloads', 'Team Management', 'White Label License', 'API Access', 'Dedicated Support'],
        popular: false
      }
    ]
  };

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Content Creator',
      content: 'These animations doubled my engagement on Instagram. Game changer for my content!',
      avatar: '👩‍💼'
    },
    {
      name: 'Marcus Rivera',
      role: 'Marketing Agency Owner',
      content: 'Much cheaper and faster than hiring a motion designer. Our clients love the results.',
      avatar: '👨‍💻'
    },
    {
      name: 'Elena Kozlov',
      role: 'Freelance Video Editor',
      content: 'Finally found animations that match my vision. The quality is incredible and saves me hours.',
      avatar: '👩‍🎨'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={handleLogoClick}
            className="font-bold text-2xl gradient-text hover:opacity-80 transition-opacity"
          >
            motiomint
          </button>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#benefits" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.benefits')}
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.howItWorks')}
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.pricing')}
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <LanguageSelector />
            <ThemeToggle />
            {user ? (
              <Button 
                variant="hero" 
                size="sm"
                onClick={() => navigate('/dashboard')}
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                {t('nav.dashboard')}
              </Button>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowLoginModal(true)}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  {t('nav.login')}
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="btn-glow"
                  onClick={() => setShowSignUpModal(true)}
                >
                  <User className="w-4 h-4 mr-2" />
                  {t('nav.signUp')}
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Auth Modals */}
      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToSignUp={() => {
          setShowLoginModal(false);
          setShowSignUpModal(true);
        }}
      />
      <SignUpModal
        open={showSignUpModal}
        onClose={() => setShowSignUpModal(false)}
        onSwitchToLogin={() => {
          setShowSignUpModal(false);
          setShowLoginModal(true);
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3
          }}
        />
        <div className="absolute inset-0 animated-gradient z-0" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="mb-6 bg-primary/20 text-primary border-primary/30">
                {t('hero.badge')}
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
                {t('hero.title')}
                <span className="gradient-text block">
                  {t('hero.titleHighlight')}
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl">
                {t('hero.subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="btn-glow text-lg px-8 py-4"
                  onClick={() => user ? navigate('/dashboard') : setShowSignUpModal(true)}
                >
                  <Gift className="w-5 h-5 mr-2" />
                  {t('hero.ctaFree')}
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  <Play className="w-5 h-5 mr-2" />
                  {t('hero.ctaPreview')}
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="hero-float">
                <img 
                  src={phoneMockup} 
                  alt="motiomint animations on mobile" 
                  className="w-full max-w-md mx-auto drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Preview Section (Catalog Grid) */}
      <section id="categories" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              {t('categories.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('categories.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                onClick={() => navigate(`/category/${encodeURIComponent(category.title)}`)}
              >
                {/* Image Container with Overlay */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <VideoPreview
                    thumbnailUrl={category.image}
                    videoUrl={category.video}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    {/* Count Badge */}
                    <Badge 
                      className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm text-foreground border-border/50 shadow-lg"
                    >
                      {category.count}
                    </Badge>
                    
                    {/* Category Info */}
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-sm text-white/90 line-clamp-2">
                        {category.description}
                      </p>
                      
                      {/* Hover Button */}
                      <div className="flex items-center gap-2 text-white/90 group-hover:text-primary transition-colors pt-2">
                        <span className="text-sm font-semibold">{t('categories.viewCollection')}</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-background-alt">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              {t('benefits.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('benefits.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: t('benefits.saveTime.title'),
                description: t('benefits.saveTime.description'),
                icon: <Clock className="w-8 h-8" />,
                highlight: t('benefits.saveTime.highlight')
              },
              {
                title: t('benefits.goViral.title'),
                description: t('benefits.goViral.description'),
                icon: <TrendingUp className="w-8 h-8" />,
                highlight: t('benefits.goViral.highlight')
              },
              {
                title: t('benefits.affordable.title'),
                description: t('benefits.affordable.description'),
                icon: <DollarSign className="w-8 h-8" />,
                highlight: t('benefits.affordable.highlight')
              }
            ].map((benefit, index) => (
              <Card key={index} className="glass grid-item border-border/50 hover:border-primary/30 text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                    {benefit.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                  <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
                    {benefit.highlight}
                  </Badge>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              {t('howItWorks.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('howItWorks.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '01',
                title: t('howItWorks.step1.title'),
                description: t('howItWorks.step1.description'),
                icon: <Zap className="w-8 h-8" />
              },
              {
                step: '02',
                title: t('howItWorks.step2.title'),
                description: t('howItWorks.step2.description'),
                icon: <Download className="w-8 h-8" />
              },
              {
                step: '03',
                title: t('howItWorks.step3.title'),
                description: t('howItWorks.step3.description'),
                icon: <Smartphone className="w-8 h-8" />
              }
            ].map((item, index) => (
              <Card key={index} className="glass grid-item border-border/50 hover:border-primary/30">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl font-black text-primary/20 mb-4">
                    {item.step}
                  </div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              {t('pricing.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('pricing.subtitle')}
            </p>
          </div>
          
          <div className="mb-12">
            <div className="flex justify-center mb-8">
              <div className="bg-muted p-1 rounded-lg">
                <Button 
                  variant={selectedPricingTab === 'oneTime' ? 'default' : 'ghost'} 
                  size="sm" 
                  className={`mr-2 ${selectedPricingTab === 'oneTime' ? 'btn-glow' : ''}`}
                  onClick={() => setSelectedPricingTab('oneTime')}
                >
                  {t('pricing.oneTimePacks')}
                </Button>
                <Button 
                  variant={selectedPricingTab === 'subscription' ? 'default' : 'ghost'} 
                  size="sm"
                  className={selectedPricingTab === 'subscription' ? 'btn-glow' : ''}
                  onClick={() => setSelectedPricingTab('subscription')}
                >
                  {t('pricing.subscriptions')}
                </Button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingPlans[selectedPricingTab].map((plan, index) => (
                <Card key={index} className={`glass pricing-card border-border/50 relative ${plan.popular ? 'border-primary/50 glow-primary' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1">
                        {t('pricing.mostPopular')}
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <div className="text-4xl font-black mb-2">{plan.price}</div>
                      <p className="text-muted-foreground">{plan.description}</p>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-primary mr-3" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full ${plan.popular ? 'btn-glow' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                      onClick={() => navigate('/pricing')}
                    >
                      {t('pricing.getStarted')}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lead Magnet Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-background/90" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Gift className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                {t('leadMagnet.title')}
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                {t('leadMagnet.subtitle')}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg" 
                className="btn-glow text-lg px-8 py-4"
                onClick={() => user ? navigate('/dashboard') : setShowSignUpModal(true)}
              >
                <Gift className="w-5 h-5 mr-2" />
                {t('leadMagnet.downloadFree')}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => navigate('/pricing')}
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                {t('leadMagnet.seeAllPacks')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              {t('testimonials.title')}
            </h2>
            <div className="flex justify-center items-center gap-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-primary text-primary" />
              ))}
              <span className="text-xl font-semibold ml-2">{t('testimonials.rating')}</span>
              <span className="text-muted-foreground ml-1">{t('testimonials.reviewCount')}</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass grid-item border-border/50">
                <CardContent className="p-8">
                  <Quote className="w-8 h-8 text-primary mb-4" />
                  <blockquote className="text-lg mb-6">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="text-3xl mr-4">{testimonial.avatar}</div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="py-20 bg-background-alt border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              {t('footerCTA.title')}
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('footerCTA.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                size="lg" 
                className="btn-glow text-lg px-8 py-4"
                onClick={() => user ? navigate('/dashboard') : setShowSignUpModal(true)}
              >
                <Gift className="w-5 h-5 mr-2" />
                {t('footerCTA.downloadFree')}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => setShowLoginModal(true)}
              >
                <LogIn className="w-5 h-5 mr-2" />
                {t('footerCTA.loginSignup')}
              </Button>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="max-w-md mx-auto mb-12">
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
          
          <div className="border-t border-border/20 pt-8 text-center text-muted-foreground">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="font-bold text-2xl gradient-text mb-4 md:mb-0">
                motiomint
              </div>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="hover:text-foreground transition-colors">{t('footer.privacyPolicy')}</a>
                <a href="#" className="hover:text-foreground transition-colors">{t('footer.termsOfService')}</a>
                <a href="#" className="hover:text-foreground transition-colors">{t('footer.contact')}</a>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowLoginModal(true)}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  {t('footerCTA.loginSignup')}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-sm">
              {t('footer.allRightsReserved')}
            </div>
          </div>
        </div>
      </footer>

      {/* Continue in next message due to length... */}
    </div>
  );
};

export default MotionMintLanding;