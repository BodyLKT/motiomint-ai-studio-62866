import { useState } from 'react';
import { Search, ChevronRight, BookOpen, Shield, CreditCard, HelpCircle, FileText, Mail, MessageCircle, Headphones, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MainNavigation from '@/components/navigation/MainNavigation';
import { useNavigate, Link } from 'react-router-dom';

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const helpCategories = [
    {
      icon: BookOpen,
      title: 'Getting Started',
      description: 'Learn the basics of Motiomint',
      articles: [
        'How to create an account',
        'Browsing animations',
        'Understanding categories',
        'First download guide'
      ]
    },
    {
      icon: CreditCard,
      title: 'Subscription & Billing',
      description: 'Manage your subscription',
      articles: [
        'Subscription plans explained',
        'How to upgrade or downgrade',
        'Billing & Payment methods',
        'Cancellation & Refund policy'
      ],
      slugs: ['subscription-plans', 'upgrade-downgrade', 'billing-payment', 'cancellation-refund']
    },
    {
      icon: Shield,
      title: 'License & Usage',
      description: 'Understanding your rights',
      articles: [
        'License types overview',
        'Commercial use guidelines',
        'Attribution requirements',
        'Corporate, agency & team use',
        'Copyright claims'
      ],
      slugs: ['license-types', 'commercial-use', 'attribution-requirements', 'corporate-agency-team', 'copyright-claims']
    },
    {
      icon: HelpCircle,
      title: 'Account Help',
      description: 'Account and profile management',
      articles: [
        'Account troubleshooting',
        'Reset your password',
        'Update profile information',
        'Delete account'
      ]
    },
    {
      icon: FileText,
      title: 'Downloads & Files',
      description: 'Managing your downloads',
      articles: [
        'Download formats explained',
        'File size and quality',
        'Download history',
        'Re-download animations'
      ]
    },
    {
      icon: MessageCircle,
      title: 'Technical Support',
      description: 'Get technical assistance',
      articles: [
        'Playback issues',
        'Browser compatibility',
        'Mobile app support',
        'Integration guides'
      ]
    },
    {
      icon: Headphones,
      title: 'Contact & Support',
      description: 'Reach out to our team',
      articles: [
        'Support email & response times',
        'Submit a support request',
        'Support channel guide',
        'Live chat support',
        'Troubleshooting & technical assistance'
      ],
      slugs: ['support-email', 'submit-request', 'support-channels', 'live-chat', 'troubleshooting']
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with creators',
      articles: [
        'Community overview & guidelines',
        'Feedback & ideas',
        'Community highlights & recognition'
      ],
      slugs: ['community-overview', 'feedback-ideas', 'community-highlights']
    },
    {
      icon: FileText,
      title: 'Terms & Policies',
      description: 'Legal information and policies',
      articles: [
        'Terms of Service',
        'Privacy Policy',
        'Cookie Policy',
        'Intellectual Property & License Integration'
      ],
      slugs: ['terms-of-service', 'privacy-policy', 'cookie-policy', 'intellectual-property']
    }
  ];

  const popularTopics = [
    'How to download animations',
    'Understanding subscription plans',
    'License for commercial projects',
    'Cancel subscription',
    'Payment methods accepted',
    'Video format specifications'
  ];

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-background py-20 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              How can we help you?
            </h1>
            <p className="text-lg text-muted-foreground">
              Search our knowledge base for answers and solutions
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for articles, guides, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-14 text-lg bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Popular Topics */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Popular Topics</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {popularTopics.map((topic) => (
                <Button
                  key={topic}
                  variant="outline"
                  className="rounded-full hover:bg-primary/10 hover:border-primary/50"
                >
                  {topic}
                </Button>
              ))}
            </div>
          </div>

          {/* Help Categories Grid */}
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold mb-8 text-center">Browse by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {helpCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <Card
                    key={category.title}
                    className="group hover:border-primary/50 hover:shadow-xl transition-all duration-300 cursor-pointer bg-card/50 backdrop-blur-sm"
                  >
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors">
                            {category.title}
                          </CardTitle>
                          <CardDescription>{category.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {category.articles.map((article, idx) => {
                          let articleSlug = null;
                          let basePath = '/help';
                          
                          if (category.title === 'Getting Started') {
                            const slugs = ['create-account', 'browsing-animations', 'understanding-categories', 'first-download'];
                            articleSlug = slugs[idx];
                            basePath = '/help/getting-started';
                          } else if (category.title === 'Subscription & Billing' && category.slugs) {
                            articleSlug = category.slugs[idx];
                            basePath = '/help/subscription-billing';
                          } else if (category.title === 'License & Usage' && category.slugs) {
                            articleSlug = category.slugs[idx];
                            basePath = '/help/license-usage';
                          } else if (category.title === 'Contact & Support' && category.slugs) {
                            articleSlug = category.slugs[idx];
                            basePath = '/help/contact-support';
                          } else if (category.title === 'Community' && category.slugs) {
                            articleSlug = category.slugs[idx];
                            basePath = '/help/community';
                          } else if (category.title === 'Terms & Policies' && category.slugs) {
                            articleSlug = category.slugs[idx];
                            basePath = '/help/terms-policies';
                          }
                          
                          return (
                            <li key={article}>
                              {articleSlug ? (
                                <Link 
                                  to={`${basePath}/${articleSlug}`}
                                  className="flex items-center justify-between w-full text-left py-2 px-3 rounded-md hover:bg-accent/50 transition-colors group/item"
                                >
                                  <span className="text-sm text-muted-foreground group-hover/item:text-foreground">
                                    {article}
                                  </span>
                                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover/item:text-primary opacity-0 group-hover/item:opacity-100 transition-all" />
                                </Link>
                              ) : (
                                <button className="flex items-center justify-between w-full text-left py-2 px-3 rounded-md hover:bg-accent/50 transition-colors group/item">
                                  <span className="text-sm text-muted-foreground group-hover/item:text-foreground">
                                    {article}
                                  </span>
                                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover/item:text-primary opacity-0 group-hover/item:opacity-100 transition-all" />
                                </button>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                      {category.title === 'Getting Started' && (
                        <Button 
                          variant="ghost" 
                          className="w-full mt-4 group-hover:text-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            // All articles are already visible
                          }}
                        >
                          All Articles Shown
                          <ChevronRight className="ml-2 w-4 h-4" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Contact Support Section */}
          <div className="max-w-4xl mx-auto mt-20">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-semibold mb-4">Can't find an answer to your question?</h2>
                <p className="text-muted-foreground mb-6">
                  Our support team is here to help you. Get in touch and we'll respond as soon as possible.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="gap-2" onClick={() => navigate('/help/contact-support/submit-request')}>
                    <Mail className="w-5 h-5" />
                    Submit a Request
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2" onClick={() => navigate('/help/contact-support/live-chat')}>
                    <MessageCircle className="w-5 h-5" />
                    Live Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/30 py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
            <div className="flex flex-wrap gap-6 justify-center">
              <button onClick={() => navigate('/')} className="hover:text-primary transition-colors">
                Home
              </button>
              <button onClick={() => navigate('/help/terms-policies/terms-of-service')} className="hover:text-primary transition-colors">
                Terms of Service
              </button>
              <button onClick={() => navigate('/help/terms-policies/privacy-policy')} className="hover:text-primary transition-colors">
                Privacy Policy
              </button>
              <button onClick={() => navigate('/help/terms-policies/cookie-policy')} className="hover:text-primary transition-colors">
                Cookie Policy
              </button>
              <button onClick={() => navigate('/help/contact-support/support-email')} className="hover:text-primary transition-colors">
                Contact Us
              </button>
            </div>
            <p className="text-center md:text-right">© 2025 Motiomint. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
