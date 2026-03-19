import { useParams, Link, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import { helpCenterData } from '@/lib/helpCenterData';
import { cn } from '@/lib/utils';

export default function HelpCategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();

  const category = helpCenterData.find(
    (c) => c.path === `/help/${categorySlug}`
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [categorySlug]);

  if (!category) {
    return <Navigate to="/help" replace />;
  }

  const Icon = category.icon;

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      <HelpCenterSidebar />

      <div className={cn("lg:ml-64 transition-all duration-300 animate-fade-in")}>
        <div className="container mx-auto px-4 pt-32 sm:pt-36 pb-8 max-w-4xl">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/help" className="transition-colors hover:text-primary">
                    Help Center
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage className="text-foreground">{category.title}</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-8 -ml-2 hover:bg-primary/10 transition-all duration-200 group animate-fade-in"
            style={{ animationDelay: '0.2s' }}
            asChild
          >
            <Link to="/help">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Help Center
            </Link>
          </Button>

          {/* Category Header */}
          <div className="mb-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <Icon className="w-6 h-6" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">{category.title}</h1>
            </div>
            <p className="text-muted-foreground">
              {category.articles.length} article{category.articles.length !== 1 ? 's' : ''} in this category
            </p>
          </div>

          {/* Articles List */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {category.articles.map((article, idx) => (
              <Card
                key={article.id}
                className="group hover:border-primary/50 hover:shadow-lg transition-all duration-200 animate-fade-in"
                style={{ animationDelay: `${0.45 + idx * 0.05}s` }}
              >
                <Link to={article.path} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors duration-150">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed mb-3">
                      {article.description}
                    </CardDescription>
                    <div className="flex items-center text-sm text-primary font-medium">
                      <span>Read article</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-150" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <Card className="mt-16 bg-muted/30 hover:bg-muted/40 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">Need Additional Help?</h3>
                <p className="text-sm text-muted-foreground">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <Button asChild size="lg" className="group">
                  <Link to="/help/contact-support/submit-request">
                    Contact Support
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
