import { ReactNode, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ThumbsUp, ThumbsDown, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MainNavigation from '@/components/navigation/MainNavigation';
import HelpCenterSidebar from '@/components/help/HelpCenterSidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { getRelatedArticles, getAdjacentArticles } from '@/lib/helpCenterData';

interface ArticleLayoutProps {
  title: string;
  category: string;
  categoryPath: string;
  children: ReactNode;
  articleId?: string;
}

export default function ArticleLayout({
  title,
  category,
  categoryPath,
  children,
  articleId
}: ArticleLayoutProps) {
  const location = useLocation();
  
  // Get smart suggestions and adjacent articles
  const relatedArticles = articleId ? getRelatedArticles(articleId, 4) : [];
  const { previous, next } = getAdjacentArticles(location.pathname);
  
  // Smooth scroll to top on article change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [title]);

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      
      <HelpCenterSidebar />

      <div 
        className={cn(
          "lg:ml-64 transition-all duration-300",
          "animate-fade-in"
        )}
      >
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Breadcrumb Navigation */}
          <Breadcrumb className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link 
                    to="/help"
                    className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                    aria-label="Navigate to Help Center home"
                  >
                    Help Center
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator aria-hidden="true" />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link 
                    to={categoryPath}
                    className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                    aria-label={`Navigate to ${category} category`}
                  >
                    {category}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator aria-hidden="true" />
              <BreadcrumbPage className="text-foreground">{title}</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-8 -ml-2 hover:bg-primary/10 hover:translate-x-[-2px] transition-all duration-200 group animate-fade-in"
            style={{ animationDelay: '0.2s' }}
            asChild
          >
            <Link 
              to="/help"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
              aria-label="Back to Help Center"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Help Center
            </Link>
          </Button>

          {/* Article Header */}
          <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              {title}
            </h1>
          </div>

          {/* Article Content */}
          <article 
            className="prose prose-slate dark:prose-invert max-w-none mb-16 animate-fade-in"
            style={{ animationDelay: '0.4s' }}
            role="article"
          >
            {children}
          </article>

          {/* Previous/Next Navigation */}
          {(previous || next) && (
            <div 
              className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in"
              style={{ animationDelay: '0.5s' }}
            >
              {previous ? (
                <Link
                  to={previous.path}
                  className="group flex items-center gap-3 p-4 rounded-lg border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <ArrowLeft className="w-5 h-5 text-primary group-hover:-translate-x-1 transition-transform" />
                  <div className="flex-1 text-left">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Previous</p>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {previous.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div /> 
              )}
              
              {next && (
                <Link
                  to={next.path}
                  className="group flex items-center gap-3 p-4 rounded-lg border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="flex-1 text-right">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Next</p>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {next.title}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          )}

          {/* Smart Suggestions - You May Also Find Helpful */}
          {relatedArticles.length > 0 && (
            <Card 
              className="mb-16 animate-fade-in hover:shadow-lg transition-all duration-300 border-2 border-primary/10"
              style={{ animationDelay: '0.6s' }}
            >
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  <span className="text-foreground">You May Also Find Helpful</span>
                </h2>
                <div className="grid gap-3" role="list">
                  {relatedArticles.map((article) => (
                    <Link
                      key={article.id}
                      to={article.path}
                      className="flex items-start gap-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 hover:translate-x-1 transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      role="listitem"
                      aria-label={`Read related article: ${article.title}`}
                    >
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all duration-200 group-hover:translate-x-1 mt-1 flex-shrink-0" aria-hidden="true" />
                      <div className="flex-1">
                        <span className="text-foreground group-hover:text-primary transition-colors duration-200 font-medium block mb-1">
                          {article.title}
                        </span>
                        <span className="text-xs text-muted-foreground line-clamp-2">
                          {article.description}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Feedback Section */}
          <Card 
            className="bg-muted/30 hover:bg-muted/40 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: '0.7s' }}
          >
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">Was this article helpful?</h3>
                <div 
                  className="flex gap-3 justify-center" 
                  role="group" 
                  aria-label="Article feedback"
                >
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="hover:bg-success/10 hover:border-success/50 hover:text-success hover:scale-105 transition-all duration-200 group"
                    aria-label="Yes, this article was helpful"
                  >
                    <ThumbsUp className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
                    Yes
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="hover:bg-destructive/10 hover:border-destructive/50 hover:text-destructive hover:scale-105 transition-all duration-200 group"
                    aria-label="No, this article was not helpful"
                  >
                    <ThumbsDown className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
                    No
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Need more help?{' '}
                  <Link 
                    to="/help/contact-support/submit-request" 
                    className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm transition-colors"
                    aria-label="Contact support for additional help"
                  >
                    Contact Support
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
