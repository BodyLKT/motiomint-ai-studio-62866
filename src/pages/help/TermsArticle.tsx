import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Scale, UserCheck, Shield, CreditCard, AlertTriangle, Mail, Cookie, Eye, BarChart3, Megaphone, Database, Lock, Download, Trash2, UserX, CheckCircle2, Copyright, Gavel, Ban, Flag, Award } from 'lucide-react';
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
  'intellectual-property': {
    title: 'Intellectual Property & License Integration',
    icon: Copyright,
    lastUpdated: 'January 15, 2025',
    sections: [
      {
        id: 'ip-overview',
        title: 'Intellectual Property Overview',
        icon: Copyright,
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              All AI-generated animations, visual assets, branding elements, user interface designs, and platform code available on <strong className="text-foreground">Motiomint</strong> are the exclusive intellectual property of Motiomint and are protected by international copyright and intellectual property laws.
            </p>

            <div className="grid gap-4">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Copyright className="h-5 w-5 text-primary" />
                    Ownership & Rights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Platform Ownership:</strong> All animations, source files, AI models, algorithms, and related technology remain the sole property of Motiomint.
                  </p>
                  <p>
                    <strong className="text-foreground">License Grant:</strong> By downloading animations, you receive a <strong className="text-foreground">non-exclusive, non-transferable license</strong> to use the content according to the terms of your subscription tier.
                  </p>
                  <p>
                    <strong className="text-foreground">No Ownership Transfer:</strong> You do not acquire ownership of the source files, underlying AI models, or any proprietary technology used to generate the animations.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Subscription Termination
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Active Subscription:</strong> You may continue to use all downloaded animations in existing projects as long as your subscription remains active.
                  </p>
                  <p>
                    <strong className="text-foreground">Post-Cancellation:</strong> Previously downloaded animations can be used in projects that were <strong className="text-foreground">already published or in production</strong> before your subscription ended.
                  </p>
                  <p className="text-amber-500">
                    <strong>⚠️ Important:</strong> New projects created after subscription cancellation require an active subscription or individual asset purchase.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Alert className="bg-primary/5 border-primary/20">
              <FileText className="h-4 w-4 text-primary" />
              <AlertDescription className="text-foreground">
                For detailed information about license types and usage permissions, visit the{' '}
                <Link to="/help/license-usage/license-types" className="text-primary hover:underline font-medium">
                  License & Usage
                </Link>{' '}
                section.
              </AlertDescription>
            </Alert>
          </div>
        ),
      },
      {
        id: 'ai-animation-rights',
        title: 'AI-Generated Animation Rights',
        icon: Gavel,
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Understanding your rights and restrictions is essential for compliant use of Motiomint animations. The following guidelines outline permitted and restricted uses based on your subscription tier.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
                  <span className="text-primary">✓</span> Permitted Uses
                </h3>
                <div className="grid gap-3">
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-4">
                      <p className="text-foreground font-medium mb-1">Commercial Use (Paid Plans)</p>
                      <p className="text-sm text-muted-foreground">
                        Use animations in commercial projects, including advertisements, marketing campaigns, product promotions, and revenue-generating content.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-4">
                      <p className="text-foreground font-medium mb-1">Social Media & Digital Content</p>
                      <p className="text-sm text-muted-foreground">
                        Integrate animations into social media posts, YouTube videos, TikTok content, Instagram stories, and other digital platforms.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-4">
                      <p className="text-foreground font-medium mb-1">Advertising & Marketing</p>
                      <p className="text-sm text-muted-foreground">
                        Include animations in TV commercials, online ads, billboards, presentations, and promotional materials.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-4">
                      <p className="text-foreground font-medium mb-1">Client Work & Agency Projects</p>
                      <p className="text-sm text-muted-foreground">
                        Use animations in projects created for clients, provided the final deliverable is a completed composition (not raw animation files).
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
                  <span className="text-destructive">✗</span> Restricted Uses
                </h3>
                <div className="grid gap-3">
                  <Card className="bg-destructive/5 border-destructive/20">
                    <CardContent className="pt-4">
                      <p className="text-foreground font-medium mb-1">Redistribution of Raw Files</p>
                      <p className="text-sm text-muted-foreground">
                        You may not share, distribute, or transfer raw animation files to third parties, including clients, colleagues, or other users.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-destructive/5 border-destructive/20">
                    <CardContent className="pt-4">
                      <p className="text-foreground font-medium mb-1">Reselling or Repackaging</p>
                      <p className="text-sm text-muted-foreground">
                        Animations cannot be resold, sublicensed, or repackaged as part of animation packs, templates, or stock libraries.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-destructive/5 border-destructive/20">
                    <CardContent className="pt-4">
                      <p className="text-foreground font-medium mb-1">Competing Stock Marketplaces</p>
                      <p className="text-sm text-muted-foreground">
                        You may not upload Motiomint animations to other stock animation platforms, marketplaces, or competing services.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-destructive/5 border-destructive/20">
                    <CardContent className="pt-4">
                      <p className="text-foreground font-medium mb-1">Creating Competing Libraries</p>
                      <p className="text-sm text-muted-foreground">
                        Using Motiomint assets to create competing animation libraries, tools, or services is strictly prohibited.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <Alert className="bg-accent/50 border-border">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-muted-foreground">
                <strong className="text-foreground">Free vs. Paid Downloads:</strong> Free downloads have more restrictive usage terms (typically limited to personal or non-commercial use). Paid subscription downloads include full commercial licensing rights.
              </AlertDescription>
            </Alert>
          </div>
        ),
      },
      {
        id: 'redistribution-resale',
        title: 'Redistribution & Resale Rules',
        icon: Ban,
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Motiomint enforces strict redistribution and resale policies to protect our content and ensure fair use for all subscribers.
            </p>

            <div className="grid gap-4">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Ban className="h-5 w-5 text-destructive" />
                    Raw File Distribution Prohibited
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Strict Prohibition:</strong> You may not sell, share, distribute, or transfer raw animation files obtained from Motiomint in any format (MP4, GIF, Lottie, JSON, etc.).
                  </p>
                  <p>
                    <strong className="text-foreground">Violation Consequences:</strong> Redistribution of raw files is a violation of these terms and may result in immediate account suspension, legal action, and removal of download privileges.
                  </p>
                  <p className="text-amber-500">
                    <strong>⚠️ Example of Violation:</strong> Sending raw animation files to a client instead of delivering a completed video composition.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Permitted Final Compositions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Edited Projects:</strong> You may sell or deliver final video projects, advertisements, or compositions that include Motiomint animations as integrated elements.
                  </p>
                  <p>
                    <strong className="text-foreground">Substantial Transformation:</strong> The final deliverable must be substantially different from the original animation (e.g., edited, combined with other content, or part of a larger production).
                  </p>
                  <p className="text-primary">
                    <strong>✓ Example of Permitted Use:</strong> Delivering a completed advertisement video that includes Motiomint animations alongside custom footage, voiceover, and branding.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lock className="h-5 w-5 text-primary" />
                    AI Model Ownership
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Proprietary Technology:</strong> All AI models, algorithms, training data, and underlying technology used to generate animations remain the exclusive property of Motiomint.
                  </p>
                  <p>
                    <strong className="text-foreground">No Reverse Engineering:</strong> Attempting to reverse engineer, replicate, or extract AI model data from Motiomint is strictly prohibited and subject to legal action.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Alert className="bg-destructive/10 border-destructive/30">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-foreground">
                <strong>Legal Warning:</strong> Violation of redistribution or resale terms may result in immediate account termination, legal proceedings, and financial penalties. If you are unsure about a specific use case, contact our legal team before proceeding.
              </AlertDescription>
            </Alert>
          </div>
        ),
      },
      {
        id: 'dmca-takedown',
        title: 'DMCA Takedown Process',
        icon: Flag,
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Motiomint respects intellectual property rights and complies with the Digital Millennium Copyright Act (DMCA). If you believe your content has been misused or infringed upon, you may submit a takedown request.
            </p>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Flag className="h-5 w-5 text-primary" />
                  How to Report Content Misuse
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>
                  If you discover that Motiomint animations are being misused in violation of our terms (e.g., redistributed, resold, or used in unauthorized contexts), please submit a report to our legal team.
                </p>
                
                <div className="bg-accent/30 border border-border/50 rounded-lg p-4 space-y-3">
                  <p className="text-foreground font-medium">Required Information for DMCA Takedown:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Your contact information (name, email, phone number)</li>
                    <li>Description of the copyrighted work being infringed</li>
                    <li>URL or location where the infringing content appears</li>
                    <li>Statement of good faith belief that the use is unauthorized</li>
                    <li>Statement that the information provided is accurate</li>
                    <li>Physical or electronic signature</li>
                  </ul>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <Link to="/help/contact-support/submit-request">
                    <Button variant="outline" className="w-full justify-start gap-2 hover:bg-destructive/10 hover:border-destructive/50">
                      <Flag className="h-4 w-4" />
                      Report Misuse
                    </Button>
                  </Link>
                  
                  <p className="text-xs text-center text-muted-foreground">
                    For formal DMCA notices, email:{' '}
                    <a href="mailto:legal@motiomint.com" className="text-primary hover:underline">
                      legal@motiomint.com
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Motiomint's Response Process
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">Step 1 - Review:</strong> Our legal team reviews all takedown requests within 2-5 business days.
                </p>
                <p>
                  <strong className="text-foreground">Step 2 - Verification:</strong> We verify the legitimacy of the claim and investigate the reported content.
                </p>
                <p>
                  <strong className="text-foreground">Step 3 - Action:</strong> If the claim is valid, we take appropriate action, which may include content removal, account suspension, or legal proceedings.
                </p>
                <p>
                  <strong className="text-foreground">Step 4 - Notification:</strong> All parties are notified of the outcome and any actions taken.
                </p>
              </CardContent>
            </Card>

            <Alert className="bg-accent/50 border-border">
              <Mail className="h-4 w-4" />
              <AlertDescription className="text-muted-foreground">
                <strong className="text-foreground">Response Time:</strong> Motiomint aims to respond to all DMCA takedown requests within 5 business days. Urgent cases may be expedited upon request.
              </AlertDescription>
            </Alert>
          </div>
        ),
      },
      {
        id: 'attribution-policy',
        title: 'Attribution Policy',
        icon: Award,
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Motiomint's attribution policy varies based on your subscription tier and the type of download. Understanding when attribution is required helps ensure compliant use.
            </p>

            <div className="grid gap-4">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Paid Subscription Downloads
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Attribution Not Required:</strong> If you have an active paid subscription (Starter, Basic, Pro, or Mega), you are <strong className="text-primary">not required</strong> to provide attribution when using downloaded animations.
                  </p>
                  <p>
                    <strong className="text-foreground">Optional Recognition:</strong> While not mandatory, we appreciate when creators mention Motiomint in their work, as it helps support our community and platform growth.
                  </p>
                  <div className="bg-accent/30 border border-border/50 rounded-lg p-3 mt-3">
                    <p className="text-xs text-foreground">
                      <strong>Suggested Attribution (Optional):</strong><br />
                      "Animations by Motiomint" or "Powered by Motiomint"
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-accent/30 border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-foreground" />
                    Free Downloads
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Attribution Recommended:</strong> For free downloads (available to users on the Free plan), attribution is <strong className="text-foreground">recommended but optional</strong>.
                  </p>
                  <p>
                    <strong className="text-foreground">Commercial Restrictions:</strong> Free downloads are typically limited to personal or non-commercial use unless otherwise specified. Check the individual asset license before use.
                  </p>
                  <div className="bg-accent/50 border border-border/50 rounded-lg p-3 mt-3">
                    <p className="text-xs text-foreground">
                      <strong>Suggested Attribution for Free Downloads:</strong><br />
                      "Animation by Motiomint - https://motiomint.com"
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Where to Provide Attribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>If you choose to provide attribution, here are common places to include it:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Video descriptions (YouTube, Vimeo, social media)</li>
                    <li>Website footer or credits page</li>
                    <li>Project credits or end cards in video productions</li>
                    <li>Marketing material fine print or credits section</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Alert className="bg-primary/5 border-primary/20">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <AlertDescription className="text-foreground">
                <strong>Summary:</strong> Paid subscribers enjoy attribution-free use, while free users are encouraged (but not required) to credit Motiomint. For specific attribution requirements, refer to the{' '}
                <Link to="/help/license-usage/attribution-requirements" className="text-primary hover:underline font-medium">
                  Attribution Requirements
                </Link>{' '}
                section.
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
