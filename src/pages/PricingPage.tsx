import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import MainNavigation from '@/components/navigation/MainNavigation';
import { Footer } from '@/components/Footer';

const PricingPage = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<'oneTime' | 'subscription'>('oneTime');
  const navigate = useNavigate();
  const { user } = useAuth();

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
      }
    ]
  };

  const handleGetStarted = (planName: string) => {
    // Redirect to checkout with plan details
    navigate(`/checkout?type=${selectedTab}&plan=${planName}`);
  };

  const currentPlans = pricingPlans[selectedTab];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <MainNavigation />

      {/* Hero Section */}
      <section className="pt-40 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 gradient-text">
              {t('pricing.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('pricing.subtitle')}
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex justify-center mb-12">
            <div className="bg-muted/50 p-1 rounded-lg border border-border/50 inline-flex">
              <Button 
                variant={selectedTab === 'oneTime' ? 'default' : 'ghost'} 
                size="lg"
                onClick={() => setSelectedTab('oneTime')}
                className={selectedTab === 'oneTime' ? 'btn-glow' : ''}
              >
                {t('pricing.oneTimePacks')}
              </Button>
              <Button 
                variant={selectedTab === 'subscription' ? 'default' : 'ghost'} 
                size="lg"
                onClick={() => setSelectedTab('subscription')}
                className={selectedTab === 'subscription' ? 'btn-glow' : ''}
              >
                {t('pricing.subscriptions')}
              </Button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="flex justify-center">
            <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
            {currentPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`glass border-border/50 relative hover:border-primary/50 transition-all duration-300 flex flex-col ${
                  plan.popular ? 'border-primary/50 glow-primary scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold">
                      {t('pricing.mostPopular')}
                    </Badge>
                  </div>
                )}
                <CardContent className="p-8 flex flex-col flex-1">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="text-5xl font-black mb-2 gradient-text">{plan.price}</div>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </div>
                  
                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full mt-auto ${plan.popular ? 'btn-glow' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    size="lg"
                    onClick={() => handleGetStarted(plan.name)}
                  >
                    {t('pricing.getStarted')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
              {t('pricing.additionalInfo')}
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Badge variant="outline" className="px-4 py-2">
                {t('pricing.noHiddenFees')}
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                {t('pricing.securePayment')}
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                {t('pricing.instantAccess')}
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                {t('pricing.cancelAnytime')}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PricingPage;
