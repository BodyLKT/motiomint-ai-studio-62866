import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Scale, UserCheck, Shield, CreditCard, AlertTriangle, Mail, Cookie, Eye, BarChart3, Megaphone, Database, Lock, Download, Trash2, UserX, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import MainNavigation from '@/components/navigation/MainNavigation';

const articlesData: Record<string, any> = {
  'terms-of-service': {
    title: 'Terms of Service',
    icon: Scale,
    lastUpdated: 'January 15, 2025',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        icon: FileText,
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Welcome to <strong className="text-foreground">Motiomint</strong>, an AI-powered stock animation marketplace. These Terms of Service ("Terms") govern your access to and use of the Motiomint platform, including all content, features, and services offered.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By creating an account, browsing, or downloading content from Motiomint, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use our platform.
            </p>
            <Alert className="bg-primary/5 border-primary/20">
              <AlertTriangle className="h-4 w-4 text-primary" />
              <AlertDescription className="text-foreground">
                <strong>Important:</strong> Motiomint reserves the right to update or modify these Terms at any time. Continued use of the platform after changes constitutes acceptance of the updated Terms.
              </AlertDescription>
            </Alert>
          </div>
        ),
      },
      {
        id: 'user-eligibility',
        title: 'User Eligibility',
        icon: UserCheck,
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              To use Motiomint, you must meet the following eligibility requirements:
            </p>
            
            <div className="grid gap-4">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                      1
                    </div>
                    Minimum Age Requirement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    You must be at least <strong className="text-foreground">18 years old</strong> or the age of majority in your jurisdiction, whichever is older. Users under 18 may only access Motiomint under the supervision of a parent or legal guardian who agrees to these Terms.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                      2
                    </div>
                    Legal Capacity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    You must have the legal capacity to enter into binding contracts. By using Motiomint, you represent and warrant that you are not prohibited from accessing the service under applicable laws.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                      3
                    </div>
                    Account Ownership
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Each account must be registered under a valid email address and maintained by a single individual or authorized entity. Account sharing, resale, or transfer is <strong className="text-destructive">strictly prohibited</strong> without written consent from Motiomint.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Alert className="bg-accent/50 border-border">
              <Shield className="h-4 w-4" />
              <AlertDescription className="text-muted-foreground">
                Motiomint reserves the right to suspend or terminate accounts that violate eligibility requirements or provide false information during registration.
              </AlertDescription>
            </Alert>
          </div>
        ),
      },
      {
        id: 'usage-rights',
        title: 'Usage Rights',
        icon: Shield,
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              When you download animations from Motiomint, you are granted specific usage rights based on your subscription tier. Understanding these rights is essential to ensure compliant use.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-foreground">
                  <span className="text-primary">✓</span> What You Can Do
                </h3>
                <div className="grid gap-3">
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-4">
                      <p className="text-foreground font-medium mb-1">Commercial Use</p>
                      <p className="text-sm text-muted-foreground">
                        Use downloaded animations in commercial projects, advertisements, websites, social media, presentations, and video productions.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-4">
                      <p className="text-foreground font-medium mb-1">Modification & Editing</p>
                      <p className="text-sm text-muted-foreground">
                        Edit, customize, resize, recolor, or combine animations with your own content to fit your project needs.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-4">
                      <p className="text-foreground font-medium mb-1">Client Projects</p>
                      <p className="text-sm text-muted-foreground">
                        Use animations in work-for-hire projects for your clients, provided the final deliverable is substantially different from the original asset.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-foreground">
                  <span className="text-destructive">✗</span> What You Cannot Do
                </h3>
                <div className="grid gap-3">
                  <Card className="bg-destructive/5 border-destructive/20">
                    <CardContent className="pt-4">
                      <p className="text-foreground font-medium mb-1">Redistribution or Resale</p>
                      <p className="text-sm text-muted-foreground">
                        You may not redistribute, resell, sublicense, or share downloaded animations as standalone files or in asset packs.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-destructive/5 border-destructive/20">
                    <CardContent className="pt-4">
                      <p className="text-foreground font-medium mb-1">Trademark or Logo Use</p>
                      <p className="text-sm text-muted-foreground">
                        Animations cannot be used as logos, trademarks, or in any way that suggests endorsement by Motiomint without explicit permission.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-destructive/5 border-destructive/20">
                    <CardContent className="pt-4">
                      <p className="text-foreground font-medium mb-1">Harmful or Illegal Content</p>
                      <p className="text-sm text-muted-foreground">
                        You may not use animations in defamatory, obscene, illegal, or morally objectionable contexts.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <Alert className="bg-accent/50 border-border">
              <FileText className="h-4 w-4" />
              <AlertDescription className="text-muted-foreground">
                For detailed license terms including attribution requirements and extended usage rights, please refer to the{' '}
                <Link to="/help/license-usage/license-types" className="text-primary hover:underline font-medium">
                  License & Usage
                </Link>{' '}
                section of our Help Center.
              </AlertDescription>
            </Alert>
          </div>
        ),
      },
      {
        id: 'payments-subscriptions',
        title: 'Payments & Subscriptions',
        icon: CreditCard,
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Motiomint offers multiple subscription tiers to suit different usage needs. All payments are processed securely through industry-standard payment gateways.
            </p>
            
            <div className="grid gap-4 mt-4">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Subscription Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    • <strong className="text-foreground">Auto-Renewal:</strong> Subscriptions automatically renew at the end of each billing cycle unless canceled.
                  </p>
                  <p>
                    • <strong className="text-foreground">Upgrades & Downgrades:</strong> You may change your plan at any time. Changes take effect at the next billing cycle.
                  </p>
                  <p>
                    • <strong className="text-foreground">Cancellation:</strong> Cancel anytime through your account settings. You will retain access until the end of your current billing period.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Payment Terms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    • All fees are exclusive of taxes (VAT, GST, etc.) which will be added at checkout where applicable.
                  </p>
                  <p>
                    • Payment methods include major credit cards, PayPal, and other regionally supported options.
                  </p>
                  <p>
                    • Refunds are handled in accordance with our{' '}
                    <Link to="/help/subscription-billing/cancellation-refund" className="text-primary hover:underline">
                      Cancellation & Refund Policy
                    </Link>.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Alert className="bg-primary/5 border-primary/20 mt-4">
              <CreditCard className="h-4 w-4 text-primary" />
              <AlertDescription className="text-foreground">
                For full details on subscription plans, billing cycles, and payment options, visit the{' '}
                <Link to="/help/subscription-billing/subscription-plans" className="text-primary hover:underline font-medium">
                  Subscription & Billing
                </Link>{' '}
                section.
              </AlertDescription>
            </Alert>
          </div>
        ),
      },
      {
        id: 'limitations-disclaimers',
        title: 'Limitations & Disclaimers',
        icon: AlertTriangle,
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Motiomint provides its services "as is" and "as available" without warranties of any kind, either express or implied. Please review the following limitations and disclaimers carefully.
            </p>

            <div className="space-y-4">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    No Warranties
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>
                    Motiomint does not warrant that:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>The platform will be error-free, uninterrupted, or secure at all times.</li>
                    <li>All animations are free from third-party claims or intellectual property issues.</li>
                    <li>Downloaded content will meet your specific requirements or expectations.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    Limitation of Liability
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>
                    To the fullest extent permitted by law, Motiomint shall not be liable for:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Any indirect, incidental, special, consequential, or punitive damages.</li>
                    <li>Loss of profits, revenue, data, or business opportunities.</li>
                    <li>Damages arising from unauthorized access to your account or content.</li>
                  </ul>
                  <p className="mt-3">
                    <strong className="text-foreground">Maximum Liability:</strong> In no event shall Motiomint's total liability exceed the amount you paid for your subscription in the 12 months preceding the claim.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-primary" />
                    User Responsibility
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>
                    You are solely responsible for:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Ensuring your use of downloaded content complies with all applicable laws and regulations.</li>
                    <li>Maintaining the security of your account credentials.</li>
                    <li>Any content you upload, share, or submit through the platform.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Alert className="bg-accent/50 border-border">
              <FileText className="h-4 w-4" />
              <AlertDescription className="text-muted-foreground">
                <strong className="text-foreground">Force Majeure:</strong> Motiomint is not responsible for delays or failures caused by circumstances beyond our reasonable control, including natural disasters, government actions, internet outages, or third-party service failures.
              </AlertDescription>
            </Alert>
          </div>
        ),
      },
      {
        id: 'contact',
        title: 'Contact & Support',
        icon: Mail,
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              If you have questions, concerns, or need clarification regarding these Terms of Service, our support team is here to assist you.
            </p>

            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Get in Touch
                </CardTitle>
                <CardDescription>
                  Our team typically responds within 24-48 hours during business days.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-3">
                  <Link to="/help/contact-support/support-email">
                    <Button variant="outline" className="w-full justify-start gap-2 hover:bg-primary/10 hover:border-primary/50">
                      <Mail className="h-4 w-4" />
                      Email Support
                    </Button>
                  </Link>
                  
                  <Link to="/help/contact-support/submit-request">
                    <Button variant="outline" className="w-full justify-start gap-2 hover:bg-primary/10 hover:border-primary/50">
                      <FileText className="h-4 w-4" />
                      Submit a Support Request
                    </Button>
                  </Link>

                  <Link to="/help/contact-support/live-chat">
                    <Button variant="outline" className="w-full justify-start gap-2 hover:bg-primary/10 hover:border-primary/50">
                      <Shield className="h-4 w-4" />
                      Live Chat Support
                    </Button>
                  </Link>
                </div>

                <p className="text-sm text-muted-foreground text-center pt-2">
                  For general inquiries, visit our{' '}
                  <Link to="/help/contact-support/support-channels" className="text-primary hover:underline">
                    Contact & Support
                  </Link>{' '}
                  page.
                </p>
              </CardContent>
            </Card>

            <Alert className="bg-accent/50 border-border">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-muted-foreground">
                <strong className="text-foreground">Legal Notices:</strong> For formal legal communications or DMCA takedown requests, please contact our legal team at{' '}
                <a href="mailto:legal@motiomint.com" className="text-primary hover:underline">
                  legal@motiomint.com
                </a>
              </AlertDescription>
            </Alert>
          </div>
        ),
      },
    ],
  },
};

export default function TermsArticle() {
  const { slug } = useParams<{ slug: string }>();
  const [activeSection, setActiveSection] = useState('overview');

  const article = slug ? articlesData[slug] : null;

  useEffect(() => {
    const handleScroll = () => {
      if (!article) return;
      
      const sections = article.sections.map((section: any) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <MainNavigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <Link to="/help">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Help Center
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const Icon = article.icon;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Link to="/help">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Help Center
            </Button>
          </Link>
        </div>

        <div className="flex gap-8 relative">
          {/* Floating Table of Contents - Hidden on mobile, visible on lg+ */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 space-y-1">
              <div className="mb-4 pb-3 border-b border-border/50">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Table of Contents
                </h3>
              </div>
              <nav className="space-y-1">
                {article.sections.map((section: any) => {
                  const SectionIcon = section.icon;
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 group ${
                        isActive
                          ? 'bg-primary/10 text-primary font-medium border-l-2 border-primary'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                      }`}
                    >
                      <SectionIcon className={`h-4 w-4 shrink-0 ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`} />
                      <span className="line-clamp-1">{section.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 max-w-[65ch] mx-auto lg:mx-0">
            {/* Article Header */}
            <div className="mb-8 pb-6 border-b border-border/50">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                    {article.title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Badge variant="outline" className="border-primary/30 text-primary">
                      Legal Document
                    </Badge>
                    <span>Last updated: {article.lastUpdated}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Article Sections */}
            <div className="space-y-12">
              {article.sections.map((section: any, index: number) => {
                const SectionIcon = section.icon;
                return (
                  <section key={section.id} id={section.id} className="scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <SectionIcon className="h-5 w-5" />
                      </div>
                      <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
                    </div>
                    <div className="prose prose-invert max-w-none">
                      {section.content}
                    </div>
                    {index < article.sections.length - 1 && (
                      <div className="mt-8 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                    )}
                  </section>
                );
              })}
            </div>

            {/* Footer Navigation */}
            <div className="mt-16 pt-8 border-t border-border/50">
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Need More Information?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Explore related help articles or contact our support team for assistance.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link to="/help">
                      <Button variant="outline" size="sm" className="gap-2">
                        <FileText className="h-4 w-4" />
                        Browse Help Center
                      </Button>
                    </Link>
                    <Link to="/help/contact-support/submit-request">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Mail className="h-4 w-4" />
                        Contact Support
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
