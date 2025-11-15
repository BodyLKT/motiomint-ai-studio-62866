import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MainNavigation from '@/components/navigation/MainNavigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';

interface ArticleLayoutProps {
  title: string;
  category: string;
  categoryPath: string;
  children: ReactNode;
  relatedArticles?: {
    title: string;
    path: string;
  }[];
}

export default function ArticleLayout({
  title,
  category,
  categoryPath,
  children,
  relatedArticles = []
}: ArticleLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Breadcrumb Navigation */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/help">Help Center</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={categoryPath}>{category}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-8 -ml-2 hover:bg-primary/10"
          asChild
        >
          <Link to="/help">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Help Center
          </Link>
        </Button>

        {/* Article Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
        </div>

        {/* Article Content */}
        <article className="prose prose-slate dark:prose-invert max-w-none mb-16">
          {children}
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <Card className="mb-16">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-6">Related Articles</h2>
              <div className="grid gap-3">
                {relatedArticles.map((article, idx) => (
                  <Link
                    key={idx}
                    to={article.path}
                    className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                  >
                    <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary rotate-180 transition-colors" />
                    <span className="text-foreground group-hover:text-primary transition-colors">
                      {article.title}
                    </span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Feedback Section */}
        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold">Was this article helpful?</h3>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" size="sm">
                  Yes
                </Button>
                <Button variant="outline" size="sm">
                  No
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Need more help?{' '}
                <Link to="/help/contact-support/submit-request" className="text-primary hover:underline">
                  Contact Support
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
