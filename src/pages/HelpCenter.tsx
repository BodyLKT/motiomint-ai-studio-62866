import { Link } from 'react-router-dom';
import { BookOpen, CreditCard, Shield, Headphones, Users, FileText, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MainNavigation from '@/components/navigation/MainNavigation';
import HelpCenterSearch from '@/components/help/HelpCenterSearch';
import { helpCenterData } from '@/lib/helpCenterData';

export default function HelpCenter() {
  const categories = helpCenterData;

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
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16" role="main">
        <div className="container mx-auto px-4">
          {/* Search Section */}
          <div 
            className="max-w-3xl mx-auto mb-16 animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            <HelpCenterSearch />
            <p className="mt-4 text-sm text-muted-foreground text-center">
              Search by keywords, topics, or browse categories below
            </p>
          </div>

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
          <div className="max-w-6xl mx-auto">
            <h2 
              className="text-3xl font-semibold mb-8 text-center animate-fade-in"
              style={{ animationDelay: '0.6s' }}
            >
              Browse by Category
            </h2>
            <div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              role="list"
              aria-label="Help categories"
            >
              {categories.map((category, idx) => {
                const Icon = category.icon;
                return (
                  <Card
                    key={category.id}
                    className="group relative overflow-hidden border-2 border-border/50 hover:border-primary/50 hover:shadow-xl transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${0.7 + idx * 0.1}s` }}
                    role="listitem"
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                          <Icon className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {category.title}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-base">
                        Browse {category.articles.length} articles
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {category.articles.map((article) => (
                          <li key={article.id}>
                            <Link
                              to={article.path}
                              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group/link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                              aria-label={`Navigate to ${article.title}`}
                            >
                              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                              <span className="text-sm">{article.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          <div 
            className="max-w-4xl mx-auto mt-20 text-center animate-fade-in"
            style={{ animationDelay: '1.2s' }}
          >
            <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20">
              <CardContent className="pt-8 pb-8 space-y-6">
                <h2 className="text-2xl font-semibold">Still Need Help?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Can't find what you're looking for? Our support team is ready to assist you with any questions or issues.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    className="group"
                    asChild
                  >
                    <Link to="/help/contact-support/submit-request">
                      Contact Support
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    asChild
                  >
                    <Link to="/help/contact-support/support-email">
                      Email Us
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="border-t border-border/50 bg-muted/20 py-12 mt-16"
        role="contentinfo"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link 
                      to="/help/terms-policies/terms-of-service" 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/help/terms-policies/privacy-policy" 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/help/terms-policies/cookie-policy" 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                    >
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Support</h3>
                <ul className="space-y-2">
                  <li>
                    <Link 
                      to="/help/contact-support/support-email" 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                    >
                      Email Support
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/help/contact-support/submit-request" 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                    >
                      Submit Request
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link 
                      to="/" 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/help" 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                    >
                      Help Center
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-foreground">About</h3>
                <p className="text-sm text-muted-foreground">
                  Motiomint provides premium AI-generated stock animations for creators worldwide.
                </p>
              </div>
            </div>
            <div className="text-center pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Motiomint. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
