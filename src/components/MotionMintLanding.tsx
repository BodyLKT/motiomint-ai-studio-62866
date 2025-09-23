import { useState } from 'react';
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
  Quote
} from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';
import phoneMockup from '@/assets/phone-mockup.jpg';
import techAnimation from '@/assets/tech-animation.jpg';
import fitnessAnimation from '@/assets/fitness-animation.jpg';

const MotionMintLanding = () => {
  const [email, setEmail] = useState('');

  const categories = [
    {
      title: 'Tech & Futuristic',
      description: 'Holographic interfaces, circuit patterns, AI visuals',
      image: techAnimation,
      count: '120+ animations'
    },
    {
      title: 'Fitness & Lifestyle',
      description: 'Workout graphics, health metrics, energy flows',
      image: fitnessAnimation,
      count: '85+ animations'
    },
    {
      title: 'Business & Finance',
      description: 'Charts, graphs, corporate motion graphics',
      image: techAnimation,
      count: '95+ animations'
    },
    {
      title: 'Travel & Nature',
      description: 'Landscapes, travel routes, nature elements',
      image: fitnessAnimation,
      count: '110+ animations'
    },
    {
      title: 'Abstract Backgrounds',
      description: 'Flowing shapes, particles, gradient motions',
      image: techAnimation,
      count: '200+ animations'
    },
    {
      title: 'Social Media Hooks',
      description: 'Attention-grabbing intros and transitions',
      image: fitnessAnimation,
      count: '150+ animations'
    }
  ];

  const pricingPlans = {
    oneTime: [
      {
        name: 'Starter Pack',
        price: '29€',
        description: 'Perfect for getting started',
        features: ['50 Premium Animations', 'HD Quality Downloads', 'Commercial License', 'Email Support'],
        popular: false
      },
      {
        name: 'Mega Pack',
        price: '79€',
        description: 'Most popular choice',
        features: ['200 Premium Animations', '4K Quality Downloads', 'Extended Commercial License', 'Priority Support', 'Bonus Content'],
        popular: true
      },
      {
        name: 'Agency Pack',
        price: '129€',
        description: 'For agencies & teams',
        features: ['500 Premium Animations', '4K Quality Downloads', 'Team License (5 users)', 'Priority Support', 'Custom Requests'],
        popular: false
      }
    ],
    subscription: [
      {
        name: 'Basic',
        price: '9€/mo',
        description: 'Essential animations',
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
        description: 'Team collaboration',
        features: ['Unlimited Downloads', 'Team Management', 'White Label License', 'API Access', 'Dedicated Support'],
        popular: false
      }
    ]
  };

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Content Creator',
      content: 'These animations doubled my engagement on Instagram. The quality is incredible and saves me hours of work!',
      avatar: '👩‍💼'
    },
    {
      name: 'Marcus Rivera',
      role: 'Marketing Agency Owner',
      content: 'Game changer for our clients. Professional animations at a fraction of the cost of custom work.',
      avatar: '👨‍💻'
    },
    {
      name: 'Elena Kozlov',
      role: 'Freelance Video Editor',
      content: 'Finally found animations that match my vision. The AI-generated content is surprisingly creative.',
      avatar: '👩‍🎨'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-2xl gradient-text">
            MotionMint
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#categories" className="text-muted-foreground hover:text-foreground transition-colors">
              Categories
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
              Reviews
            </a>
          </div>
          <Button variant="default" className="btn-glow">
            <Gift className="w-4 h-4 mr-2" />
            Free Pack
          </Button>
        </div>
      </nav>

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
                ✨ AI-Powered Animations
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
                AI Stock Animations 
                <span className="gradient-text block">
                  for Social Media
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl">
                Ready-to-use video loops to make your content stand out. 
                Download instantly and boost engagement across all platforms.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="btn-glow text-lg px-8 py-4">
                  <Gift className="w-5 h-5 mr-2" />
                  🎁 Download 10 Free Animations
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Preview
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="hero-float">
                <img 
                  src={phoneMockup} 
                  alt="MotionMint animations on mobile" 
                  className="w-full max-w-md mx-auto drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get professional animations in minutes, not hours
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '01',
                title: 'Choose Your Pack',
                description: 'Browse our curated collection of AI-generated animation packs',
                icon: <Zap className="w-8 h-8" />
              },
              {
                step: '02',
                title: 'Customize & Download',
                description: 'Add your text, logo, or branding in seconds',
                icon: <Download className="w-8 h-8" />
              },
              {
                step: '03',
                title: 'Post Instantly',
                description: 'Upload to TikTok, Instagram, Facebook, and watch engagement soar',
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

      {/* Categories */}
      <section id="categories" className="py-20 bg-background-alt">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Animation Categories
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the perfect animations for every type of content
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="glass grid-item border-border/50 overflow-hidden group">
                <div className="video-mockup h-64">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold">{category.title}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    View Collection
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
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
              Choose Your Plan
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              One-time purchases or flexible subscriptions. Cancel anytime.
            </p>
          </div>
          
          <div className="mb-12">
            <div className="flex justify-center mb-8">
              <div className="bg-muted p-1 rounded-lg">
                <Button variant="default" size="sm" className="mr-2">
                  One-time Packs
                </Button>
                <Button variant="ghost" size="sm">
                  Subscriptions
                </Button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingPlans.oneTime.map((plan, index) => (
                <Card key={index} className={`glass pricing-card border-border/50 relative ${plan.popular ? 'border-primary/50 glow-primary' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1">
                        Most Popular
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
                    >
                      Get Started
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
                Start Creating Today
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Download 10 free AI animations and see the difference quality content makes. 
                No credit card required.
              </p>
            </div>
            
            <Card className="glass max-w-md mx-auto border-border/50">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <Input 
                    type="email" 
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-center"
                  />
                  <Button size="lg" className="w-full btn-glow">
                    <Download className="w-5 h-5 mr-2" />
                    Get Free Pack Now
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Join 50,000+ creators using MotionMint animations
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Loved by Creators Worldwide
            </h2>
            <div className="flex justify-center items-center gap-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-primary text-primary" />
              ))}
              <span className="text-xl font-semibold ml-2">4.9/5</span>
              <span className="text-muted-foreground ml-1">(2,847 reviews)</span>
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
              Boost Your Content with 
              <span className="gradient-text block">
                AI-Powered Animations
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of creators who've transformed their content strategy with MotionMint.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button size="lg" className="btn-glow text-lg px-8 py-4">
                <Users className="w-5 h-5 mr-2" />
                Start Creating Now
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                <Gift className="w-5 h-5 mr-2" />
                Get Free Pack
              </Button>
            </div>
          </div>
          
          <div className="border-t border-border/20 pt-8 text-center text-muted-foreground">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="font-bold text-2xl gradient-text mb-4 md:mb-0">
                MotionMint
              </div>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-foreground transition-colors">Contact</a>
              </div>
            </div>
            <div className="mt-4 text-sm">
              © 2024 MotionMint. All rights reserved. Empowering creators with AI-powered animations.
            </div>
          </div>
        </div>
      </footer>

      {/* Continue in next message due to length... */}
    </div>
  );
};

export default MotionMintLanding;