import { useParams } from 'react-router-dom';
import { CheckCircle, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ArticleLayout from '@/components/help/ArticleLayout';

const articles = {
  'create-account': {
    id: 'create-account',
    title: 'How to Create an Account',
    content: (
        <div className="space-y-8">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Getting started with Motiomint is quick and easy. Follow these steps to create your account and start exploring thousands of premium animations.
        </p>

        <Alert className="bg-primary/5 border-primary/20">
          <Info className="w-5 h-5 text-primary" />
          <AlertDescription className="text-foreground">
            Creating an account is completely free and gives you immediate access to browse our entire animation library.
          </AlertDescription>
        </Alert>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">1</span>
              Navigate to Sign Up
            </h2>
            <p className="text-muted-foreground mb-4">
              Click the "Sign Up" button located in the top right corner of the homepage. You can also access it from the user menu icon.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">2</span>
              Enter Your Information
            </h2>
            <p className="text-muted-foreground mb-4">
              Fill in the registration form with the following details:
            </p>
            <ul className="list-none space-y-3 ml-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-foreground">Full Name:</strong>
                  <span className="text-muted-foreground"> Enter your first and last name</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-foreground">Email Address:</strong>
                  <span className="text-muted-foreground"> Use a valid email you have access to</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-foreground">Password:</strong>
                  <span className="text-muted-foreground"> Create a secure password (minimum 6 characters)</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-foreground">Confirm Password:</strong>
                  <span className="text-muted-foreground"> Re-enter your password to verify</span>
                </div>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">3</span>
              Accept Terms & Conditions
            </h2>
            <p className="text-muted-foreground mb-4">
              Review and accept our Terms of Service and Privacy Policy by checking the agreement box. This is required to create your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">4</span>
              Click "Create Account"
            </h2>
            <p className="text-muted-foreground mb-4">
              Once all fields are filled, click the "Create Account" button. Your account will be created immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">5</span>
              Start Exploring
            </h2>
            <p className="text-muted-foreground mb-4">
              You're all set! You can now browse our animation library, save favorites, and choose a subscription plan that fits your needs.
            </p>
          </section>
        </div>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2 text-lg">Next Steps</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Explore different animation categories</li>
              <li>• Save animations to your favorites for quick access</li>
              <li>• Review our subscription plans to unlock downloads</li>
              <li>• Check out our license guide to understand usage rights</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    ),
  },
  'browsing-animations': {
    id: 'browsing-animations',
    title: 'Browsing Animations',
    content: (
      <div className="space-y-8">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Discover the perfect animation for your project using our intuitive browsing and filtering tools.
        </p>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Search Bar</h2>
          <p className="text-muted-foreground mb-4">
            Use the search bar at the top of the page to quickly find specific animations by keyword, style, or category.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Category Filters</h2>
          <p className="text-muted-foreground mb-4">
            Browse by category including Business, Technology, Social Media, and more. Each category contains hundreds of animations tailored to specific use cases.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Sort Options</h2>
          <p className="text-muted-foreground mb-4">
            Sort animations by:
          </p>
          <ul className="list-none space-y-2 ml-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">Newest - See the latest additions first</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">Popular - Most downloaded animations</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">Trending - Hot right now</span>
            </li>
          </ul>
        </section>
      </div>
    ),
  },
  'understanding-categories': {
    id: 'understanding-categories',
    title: 'Understanding Categories',
    content: (
      <div className="space-y-8">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Motiomint organizes animations into intuitive categories to help you find exactly what you need.
        </p>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Main Categories</h2>
          <div className="space-y-4">
            <Card className="border-border/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-primary">Business & Corporate</h3>
                <p className="text-muted-foreground">
                  Professional animations perfect for presentations, corporate videos, and business communications.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-primary">Technology & Digital</h3>
                <p className="text-muted-foreground">
                  Modern, tech-focused animations for apps, websites, and digital products.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-primary">Social Media</h3>
                <p className="text-muted-foreground">
                  Engaging animations optimized for social platforms and content creation.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    ),
  },
  'first-download': {
    id: 'first-download',
    title: 'First Download Guide',
    content: (
      <div className="space-y-8">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Ready to download your first animation? Follow this guide to get started.
        </p>

        <Alert className="bg-primary/5 border-primary/20">
          <Info className="w-5 h-5 text-primary" />
          <AlertDescription className="text-foreground">
            A valid subscription is required to download animations. Free accounts can browse and preview content.
          </AlertDescription>
        </Alert>

        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">1</span>
            Find Your Animation
          </h2>
          <p className="text-muted-foreground mb-4">
            Browse or search for the animation you want. Click on it to view details and preview.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">2</span>
            Select Download Options
          </h2>
          <p className="text-muted-foreground mb-4">
            Choose your preferred format, resolution, and aspect ratio.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">3</span>
            Click Download
          </h2>
          <p className="text-muted-foreground mb-4">
            Click the "Download" button and the file will be saved to your device immediately.
          </p>
        </section>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2 text-lg">Download Tips</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Check your download folder if the file doesn't appear automatically</li>
              <li>• Ensure you have sufficient storage space</li>
              <li>• Downloads are tracked in your account history</li>
              <li>• You can re-download files without using additional credits</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    ),
  },
};

export default function GettingStartedArticle() {
  const { slug } = useParams<{ slug: string }>();

  const article = slug ? articles[slug as keyof typeof articles] : null;

  if (!article) {
    return (
      <ArticleLayout
        title="Article Not Found"
        category="Getting Started"
        categoryPath="/help/getting-started"
      >
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground">
            The article you're looking for doesn't exist or has been moved.
          </p>
        </div>
      </ArticleLayout>
    );
  }

  return (
    <ArticleLayout
      title={article.title}
      category="Getting Started"
      categoryPath="/help/getting-started"
      articleId={article.id}
    >
      {article.content}
    </ArticleLayout>
  );
}
