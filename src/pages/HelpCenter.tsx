import { useState } from 'react';
import { Search, ChevronRight, BookOpen, Shield, CreditCard, HelpCircle, FileText, Mail, MessageCircle, Headphones, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MainNavigation from '@/components/navigation/MainNavigation';
import { useNavigate, Link } from 'react-router-dom';

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
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
      <section 
        className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-background py-20 border-b border-border/50 animate-fade-in"
        role="banner"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent animate-fade-in"
              style={{ animationDelay: '0.1s' }}
            >
              How can we help you?
            </h1>
            <p 
              className="text-lg text-muted-foreground animate-fade-in"
              style={{ animationDelay: '0.2s' }}
            >
              Search our knowledge base for answers and solutions
            </p>
            
            {/* Search Bar */}
            <div 
              className="relative max-w-2xl mx-auto animate-fade-in"
              style={{ animationDelay: '0.3s' }}
            >
              <Search 
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors" 
                aria-hidden="true"
              />
              <Input
                type="search"
                placeholder="Search for articles, guides, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="pl-12 pr-4 h-14 text-lg bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary transition-all duration-300 hover:shadow-lg"
                aria-label="Search help articles"
                role="searchbox"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16" role="main">
        <div className="container mx-auto px-4">
          {/* Popular Topics */}
          <div 
            className="max-w-4xl mx-auto mb-16 animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-center">Popular Topics</h2>
            <div 
              className="flex flex-wrap justify-center gap-3"
              role="list"
              aria-label="Popular help topics"
            >
              {popularTopics.map((topic, idx) => (
                <Button
                  key={topic}
                  variant="outline"
                  className="rounded-full hover:bg-primary/10 hover:border-primary/50 hover:scale-105 transition-all duration-200 animate-fade-in"
                  style={{ animationDelay: `${0.5 + idx * 0.05}s` }}
                  role="listitem"
                  aria-label={`View articles about: ${topic}`}
                >
                  {topic}
                </Button>
              ))}
            </div>
          </div>

          {/* Help Categories Grid */}
          <div 
            className="max-w-7xl mx-auto animate-fade-in"
            style={{ animationDelay: '0.8s' }}
          >
            <h2 className="text-2xl font-semibold mb-8 text-center">Browse by Category</h2>
            <div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              role="list"
              aria-label="Help categories"
            >
              {helpCategories.map((category, idx) => {
                const Icon = category.icon;
                return (
                  <Card
                    key={category.title}
                    className="group hover:border-primary/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer bg-card/50 backdrop-blur-sm animate-fade-in"
                    style={{ animationDelay: `${0.9 + idx * 0.1}s` }}
                    role="listitem"
                  >
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div 
                          className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300"
                          aria-hidden="true"
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors duration-200">
                            {category.title}
                          </CardTitle>
                          <CardDescription>{category.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2" role="list" aria-label={`${category.title} articles`}>
                        {category.articles.map((article, articleIdx) => {
                          let articleSlug = null;
                          let basePath = '/help';
                          
                          if (category.title === 'Getting Started') {
                            const slugs = ['create-account', 'browsing-animations', 'understanding-categories', 'first-download'];
                            articleSlug = slugs[articleIdx];
                            basePath = '/help/getting-started';
                          } else if (category.title === 'Subscription & Billing' && category.slugs) {
                            articleSlug = category.slugs[articleIdx];
                            basePath = '/help/subscription-billing';
                          } else if (category.title === 'License & Usage' && category.slugs) {
                            articleSlug = category.slugs[articleIdx];
                            basePath = '/help/license-usage';
                          } else if (category.title === 'Contact & Support' && category.slugs) {
                            articleSlug = category.slugs[articleIdx];
                            basePath = '/help/contact-support';
                          } else if (category.title === 'Community' && category.slugs) {
                            articleSlug = category.slugs[articleIdx];
                            basePath = '/help/community';
                          } else if (category.title === 'Terms & Policies' && category.slugs) {
                            articleSlug = category.slugs[articleIdx];
                            basePath = '/help/terms-policies';
                          }
                          
                          return (
                            <li key={article} role="listitem">
                              {articleSlug ? (
                                <Link 
                                  to={`${basePath}/${articleSlug}`}
                                  className="flex items-center justify-between w-full text-left py-2 px-3 rounded-md hover:bg-accent/50 hover:translate-x-1 transition-all duration-200 group/item focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                  aria-label={`Read article: ${article}`}
                                >
                                  <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">
                                    {article}
                                  </span>
                                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover/item:text-primary opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all duration-200" aria-hidden="true" />
                                </Link>
                              ) : (
                                <button 
                                  className="flex items-center justify-between w-full text-left py-2 px-3 rounded-md hover:bg-accent/50 hover:translate-x-1 transition-all duration-200 group/item focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                  aria-label={`Article: ${article} (coming soon)`}
                                >
                                  <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">
                                    {article}
                                  </span>
                                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover/item:text-primary opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all duration-200" aria-hidden="true" />
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
          <div 
            className="max-w-4xl mx-auto mt-20 animate-fade-in"
            style={{ animationDelay: '1.2s' }}
          >
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-semibold mb-4">Can't find an answer to your question?</h2>
                <p className="text-muted-foreground mb-6">
                  Our support team is here to help you. Get in touch and we'll respond as soon as possible.
                </p>
                <div 
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  role="group"
                  aria-label="Contact support options"
                >
                  <Button 
                    size="lg" 
                    className="gap-2 hover:scale-105 transition-all duration-200 group" 
                    onClick={() => navigate('/help/contact-support/submit-request')}
                    aria-label="Submit a support request"
                  >
                    <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                    Submit a Request
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="gap-2 hover:scale-105 hover:bg-primary/10 hover:border-primary/50 transition-all duration-200 group" 
                    onClick={() => navigate('/help/contact-support/live-chat')}
                    aria-label="Start live chat with support"
                  >
                    <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                    Live Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="border-t border-border/50 bg-muted/30 py-12 mt-20"
        role="contentinfo"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
            <nav 
              className="flex flex-wrap gap-6 justify-center"
              aria-label="Footer navigation"
            >
              <button 
                onClick={() => navigate('/')} 
                className="hover:text-primary hover:underline transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                aria-label="Navigate to home page"
              >
                Home
              </button>
              <button 
                onClick={() => navigate('/help/terms-policies/terms-of-service')} 
                className="hover:text-primary hover:underline transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                aria-label="View Terms of Service"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => navigate('/help/terms-policies/privacy-policy')} 
                className="hover:text-primary hover:underline transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                aria-label="View Privacy Policy"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => navigate('/help/terms-policies/cookie-policy')} 
                className="hover:text-primary hover:underline transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                aria-label="View Cookie Policy"
              >
                Cookie Policy
              </button>
              <button 
                onClick={() => navigate('/help/contact-support/support-email')} 
                className="hover:text-primary hover:underline transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                aria-label="Contact us via email"
              >
                Contact Us
              </button>
            </nav>
            <p className="text-center md:text-right">© 2025 Motiomint. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
