import { useEffect } from 'react';
import MainNavigation from '@/components/navigation/MainNavigation';
import { Footer } from '@/components/Footer';
import { Sparkles, Target, Users, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { BackToTop } from '@/components/ui/BackToTop';

const About = () => {
  const values = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Innovation',
      description: 'Leveraging cutting-edge AI to create stunning animations that elevate your content.'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Quality',
      description: 'Every animation is crafted with precision and attention to detail for professional results.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community',
      description: 'Empowering creators, marketers, and businesses with tools that inspire creativity.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Speed',
      description: 'Instant access to high-quality animations that keep your projects moving forward.'
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      
      <main className="container mx-auto px-4 pt-36 pb-24 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 gradient-text">About MotioMint</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Empowering creators with AI-powered animations for social media, marketing, and beyond.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-20">
          <Card className="glass border-border/50">
            <CardContent className="p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                At MotioMint, we believe that every creator deserves access to professional-quality animations 
                without the complexity of traditional motion design software. We've built a platform that combines 
                the power of artificial intelligence with the creativity of human designers to deliver stunning, 
                ready-to-use animations in seconds.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you're a social media manager, content creator, marketer, or business owner, MotioMint 
                helps you stand out in a crowded digital landscape. Our extensive library of animations spans 
                multiple categories and styles, ensuring you'll find the perfect match for your brand and message.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Values Grid */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground">What We Stand For</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="glass border-border/50 hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* What We Offer */}
        <section>
          <Card className="glass border-border/50">
            <CardContent className="p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">What We Offer</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">AI-Powered Stock Animations</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Access thousands of high-quality animations optimized for Instagram, TikTok, YouTube, 
                    and other social platforms.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Flexible Licensing</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Commercial licenses included with every purchase. Use our animations in client projects, 
                    marketing campaigns, and more.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Multiple Formats & Resolutions</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Download in HD, 4K, and optimized formats for web, mobile, and broadcast use.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Subscription & One-Time Options</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Choose between flexible monthly subscriptions or cost-effective one-time animation packs 
                    that fit your workflow.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default About;
