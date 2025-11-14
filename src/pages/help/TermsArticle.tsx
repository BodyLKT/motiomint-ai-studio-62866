import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Scale, UserCheck, Shield, CreditCard, AlertTriangle, Mail, Cookie, Eye, BarChart3, Megaphone, Database, Lock, Download, Trash2, UserX, CheckCircle2, Copyright, Gavel, Ban, Flag, Award, Users, Clock } from 'lucide-react';
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
  'privacy-policy': {
    title: 'Privacy Policy',
    icon: Eye,
    lastUpdated: 'January 15, 2025',
    sections: [
      {
        id: 'data-collected',
        title: 'Data We Collect',
        icon: Database,
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Motiomint collects various types of information to provide, maintain, and improve our services. This section outlines what data we collect and why.
            </p>

            <div className="grid gap-4">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-primary" />
                    Account Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Personal Details:</strong> Name, email address, username, and optional profile information (avatar, bio).
                  </p>
                  <p>
                    <strong className="text-foreground">Authentication Data:</strong> Encrypted passwords, session tokens, and authentication preferences.
                  </p>
                  <p>
                    <strong className="text-foreground">Profile Preferences:</strong> Theme settings, language preferences, notification settings, and content filters.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Payment & Billing Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Processed via Stripe/PayPal:</strong> All payment information is securely processed by our payment partners. Motiomint does <strong className="text-destructive">not store full credit card numbers</strong>.
                  </p>
                  <p>
                    <strong className="text-foreground">Transaction Records:</strong> We store transaction IDs, billing amounts, subscription tier, purchase dates, and invoice details.
                  </p>
                  <p>
                    <strong className="text-foreground">Billing Address:</strong> Country, postal code, and billing name for tax compliance and fraud prevention.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Usage & Analytics Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Behavioral Analytics:</strong> Pages visited, search queries, animations viewed, downloads, time spent on platform, and feature usage patterns.
                  </p>
                  <p>
                    <strong className="text-foreground">Technical Data:</strong> IP address, browser type, device type, operating system, screen resolution, and referrer information.
                  </p>
                  <p>
                    <strong className="text-foreground">Performance Monitoring:</strong> Page load times, error logs, and crash reports to improve site performance.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Download className="h-5 w-5 text-primary" />
                    AI & User-Uploaded Content
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">AI Training:</strong> Motiomint uses aggregated, anonymized usage patterns to improve AI recommendation algorithms. We <strong className="text-primary">do not</strong> use personal data for third-party AI training.
                  </p>
                  <p>
                    <strong className="text-foreground">User Uploads:</strong> If you upload files for editing or customization, these files are temporarily stored and deleted after processing (typically within 30 days).
                  </p>
                </CardContent>
              </Card>
            </div>

            <Alert className="bg-primary/5 border-primary/20">
              <Shield className="h-4 w-4 text-primary" />
              <AlertDescription className="text-foreground">
                <strong>Data Minimization:</strong> Motiomint only collects data necessary to provide our services and improve user experience. We do not sell personal data to third parties.
              </AlertDescription>
            </Alert>
          </div>
        ),
      },
      {
        id: 'legal-basis',
        title: 'Legal Basis for Processing (GDPR)',
        icon: Scale,
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Under the General Data Protection Regulation (GDPR), Motiomint processes personal data based on the following legal grounds:
            </p>

            <div className="grid gap-4">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Performance of Contract
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    Processing necessary to fulfill our Terms of Service, including account creation, subscription management, download delivery, and customer support.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Legitimate Interest
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    Analytics, fraud prevention, site optimization, security monitoring, and improving AI recommendation algorithms—balanced against user privacy rights.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Consent
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    Non-essential cookies, marketing emails, and personalized advertising require explicit user consent, which can be withdrawn at any time.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Legal Obligation
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    Tax compliance, financial record-keeping, responding to lawful government requests, and enforcing legal rights.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        ),
      },
      {
        id: 'data-usage',
        title: 'How We Use Your Data',
        icon: BarChart3,
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Motiomint uses collected data for the following purposes:
            </p>

            <div className="space-y-4">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="pt-6 space-y-4 text-sm text-muted-foreground">
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <UserCheck className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <strong className="text-foreground block">Account Creation & Authentication</strong>
                      <p className="mt-1">Managing user accounts, verifying identities, enabling secure login, and maintaining account security.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <CreditCard className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <strong className="text-foreground block">Processing Orders</strong>
                      <p className="mt-1">Managing One-Time Packs, subscription billing, refunds, and generating invoices.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <BarChart3 className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <strong className="text-foreground block">Personalization & Recommendations</strong>
                      <p className="mt-1">Suggesting relevant animations based on browsing history, searches, and preferences.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <BarChart3 className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <strong className="text-foreground block">Analytics & Performance</strong>
                      <p className="mt-1">Monitoring site traffic, analyzing user behavior, identifying bugs, and improving platform performance.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Shield className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <strong className="text-foreground block">Fraud Prevention & Security</strong>
                      <p className="mt-1">Detecting suspicious activity, preventing unauthorized access, and enforcing Terms of Service.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Alert className="bg-accent/50 border-border">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription className="text-muted-foreground">
                <strong className="text-foreground">No Data Sale:</strong> Motiomint does <strong className="text-primary">not sell</strong> your personal data to advertisers or third parties.
              </AlertDescription>
            </Alert>
          </div>
        ),
      },
      {
        id: 'data-sharing',
        title: 'Data Sharing & Third Parties',
        icon: Users,
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Motiomint may share your data with trusted third-party service providers to deliver our services. We <strong className="text-foreground">do not sell</strong> personal information.
            </p>

            <div className="grid gap-4">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Payment Processors
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Stripe & PayPal:</strong> Secure payment processing, subscription management, and transaction records. These providers comply with PCI-DSS standards.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Analytics Tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Usage Analytics:</strong> We use analytics services to understand user behavior, optimize site performance, and improve features. Data is aggregated and anonymized where possible.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    Cloud Hosting Providers
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Secure Infrastructure:</strong> Motiomint uses trusted cloud hosting providers for data storage, content delivery, and application hosting. All providers maintain SOC 2 compliance and industry-standard encryption.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    Communication Platforms
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Email Services:</strong> Transactional emails (password resets, receipts, notifications) are sent via secure email service providers.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Alert className="bg-primary/5 border-primary/20">
              <Shield className="h-4 w-4 text-primary" />
              <AlertDescription className="text-foreground">
                <strong>CCPA Compliance:</strong> California residents have the right to opt-out of data sharing. Motiomint does <strong className="text-primary">not sell</strong> personal information as defined by CCPA/CPRA.
              </AlertDescription>
            </Alert>
          </div>
        ),
      },
      {
        id: 'user-rights',
        title: 'Your Rights & Data Control',
        icon: UserCheck,
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Motiomint respects your data privacy rights. Depending on your location, you may have the following rights under GDPR, CCPA, or equivalent regulations:
            </p>

            <div className="grid gap-4">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    Right to Access
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    Request a copy of all personal data Motiomint holds about you, including account details, transaction history, and usage data.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Right to Correction
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    Update or correct inaccurate personal information. Many profile details can be edited directly in your account settings.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-destructive/5 border-destructive/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Trash2 className="h-5 w-5 text-destructive" />
                    Right to Erasure (Right to be Forgotten)
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Delete Your Account:</strong> Request complete deletion of your personal data, subject to legal retention requirements (e.g., tax records, fraud prevention).
                  </p>
                  <p className="mt-2">
                    <strong className="text-foreground">Retention Exception:</strong> Financial records may be retained for 7 years as required by law.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Download className="h-5 w-5 text-primary" />
                    Right to Data Portability
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    Request a machine-readable copy of your data (JSON/CSV format) to transfer to another service.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Ban className="h-5 w-5 text-primary" />
                    Right to Restriction & Objection
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    Restrict or object to certain types of data processing, such as marketing communications or AI-based personalization.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <UserX className="h-5 w-5 text-primary" />
                    Right to Withdraw Consent
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    Withdraw consent for non-essential cookies, marketing emails, or optional data processing at any time without penalty.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Exercise Your Rights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  To exercise any of these rights, please contact us at:
                </p>
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <p className="font-mono text-primary">
                    <a href="mailto:privacy@motiomint.com" className="hover:underline">
                      privacy@motiomint.com
                    </a>
                  </p>
                  <p className="text-xs">
                    Or submit a request via our{' '}
                    <Link to="/help/contact-support/submit-request" className="text-primary hover:underline font-medium">
                      Contact Support
                    </Link>{' '}
                    page.
                  </p>
                </div>
                <p className="text-xs">
                  <strong className="text-foreground">Response Time:</strong> We aim to respond to all data rights requests within 30 days.
                </p>
              </CardContent>
            </Card>

            <Alert className="bg-accent/50 border-border">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription className="text-muted-foreground">
                <strong className="text-foreground">EU/EEA & UK Users:</strong> You have the right to lodge a complaint with your local Data Protection Authority if you believe your data rights have been violated.
              </AlertDescription>
            </Alert>
          </div>
        ),
      },
      {
        id: 'data-retention',
        title: 'Data Retention Periods',
        icon: Clock,
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Motiomint retains personal data only as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by law.
            </p>

            <div className="grid gap-4">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-primary" />
                    Active Accounts
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Retention:</strong> Account data is retained as long as your account remains active.
                  </p>
                  <p className="mt-2">
                    <strong className="text-foreground">Inactive Accounts:</strong> Accounts inactive for 3+ years may be archived or deleted after notification.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Download className="h-5 w-5 text-primary" />
                    Download History
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Retention:</strong> Download records are retained indefinitely to allow re-downloads and license verification.
                  </p>
                  <p className="mt-2">
                    <strong className="text-foreground">Account Deletion:</strong> Download history is permanently deleted upon account deletion (subject to legal requirements).
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Financial Records
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Retention:</strong> Transaction records, invoices, and billing information are retained for <strong className="text-primary">7 years</strong> to comply with tax laws and accounting regulations.
                  </p>
                  <p className="mt-2">
                    <strong className="text-foreground">Legal Requirement:</strong> Cannot be deleted before retention period expires.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Analytics & Logs
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Retention:</strong> Aggregated, anonymized analytics data is retained indefinitely for platform improvement.
                  </p>
                  <p className="mt-2">
                    <strong className="text-foreground">Server Logs:</strong> Raw server logs are retained for 90 days for security and troubleshooting.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Alert className="bg-primary/5 border-primary/20">
              <Shield className="h-4 w-4 text-primary" />
              <AlertDescription className="text-foreground">
                <strong>Data Deletion:</strong> When data is no longer needed, it is securely deleted or anonymized. Backups may retain data for up to 30 additional days.
              </AlertDescription>
            </Alert>
          </div>
        ),
      },
      {
        id: 'security',
        title: 'Security Measures',
        icon: Lock,
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Motiomint employs industry-standard security measures to protect your personal data from unauthorized access, disclosure, alteration, or destruction.
            </p>

            <div className="space-y-4">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="pt-6 space-y-4 text-sm text-muted-foreground">
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Lock className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <strong className="text-foreground block">TLS/SSL Encryption</strong>
                      <p className="mt-1">All data transmitted between your device and Motiomint servers is encrypted using HTTPS/TLS protocols.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Shield className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <strong className="text-foreground block">Password Hashing</strong>
                      <p className="mt-1">User passwords are hashed using bcrypt or similar algorithms. Motiomint cannot access plaintext passwords.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Database className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <strong className="text-foreground block">Controlled Access</strong>
                      <p className="mt-1">Access to personal data is restricted to authorized personnel only, with role-based access controls and audit logs.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Shield className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <strong className="text-foreground block">Regular Security Audits</strong>
                      <p className="mt-1">Motiomint conducts regular security assessments, vulnerability scanning, and penetration testing.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <AlertTriangle className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <strong className="text-foreground block">Breach Notification</strong>
                      <p className="mt-1">In the event of a data breach, affected users will be notified within 72 hours as required by GDPR.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Alert className="bg-accent/50 border-border">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-muted-foreground">
                <strong className="text-foreground">User Responsibility:</strong> You are responsible for maintaining the confidentiality of your account credentials. Do not share your password with others.
              </AlertDescription>
            </Alert>
          </div>
        ),
      },
      {
        id: 'contact',
        title: 'Contact Information',
        icon: Mail,
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              For questions, concerns, or requests related to this Privacy Policy or your personal data, please contact us:
            </p>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Motiomint Privacy Team</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <strong className="text-foreground">Email:</strong>{' '}
                  <a href="mailto:privacy@motiomint.com" className="text-primary hover:underline font-medium">
                    privacy@motiomint.com
                  </a>
                </div>
                <div>
                  <strong className="text-foreground">Support Portal:</strong>{' '}
                  <Link to="/help/contact-support/submit-request" className="text-primary hover:underline font-medium">
                    Submit a Privacy Request
                  </Link>
                </div>
                <div>
                  <strong className="text-foreground">Data Protection Officer:</strong>{' '}
                  <a href="mailto:dpo@motiomint.com" className="text-primary hover:underline font-medium">
                    dpo@motiomint.com
                  </a>
                </div>
              </CardContent>
            </Card>

            <Alert className="bg-accent/50 border-border">
              <Mail className="h-4 w-4" />
              <AlertDescription className="text-muted-foreground">
                <strong className="text-foreground">Response Time:</strong> We aim to respond to all privacy-related inquiries within 5 business days and data rights requests within 30 days.
              </AlertDescription>
            </Alert>
          </div>
        ),
      },
    ],
  },
  'cookie-policy': {
    title: 'Cookie Policy',
    icon: Cookie,
    lastUpdated: 'January 15, 2025',
    sections: [
      {
        id: 'what-are-cookies',
        title: 'What Are Cookies?',
        icon: Cookie,
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Cookies are small text files stored on your device when you visit websites. They help websites remember your preferences, improve performance, and provide personalized experiences.
            </p>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Types of Cookies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">Session Cookies:</strong> Temporary cookies deleted when you close your browser. Used for authentication and cart management.
                </p>
                <p>
                  <strong className="text-foreground">Persistent Cookies:</strong> Remain on your device for a set period. Used for remembering preferences and analytics.
                </p>
                <p>
                  <strong className="text-foreground">First-Party Cookies:</strong> Set by Motiomint directly. Used for core functionality and user experience.
                </p>
                <p>
                  <strong className="text-foreground">Third-Party Cookies:</strong> Set by external services (analytics, payment processors). Subject to their own privacy policies.
                </p>
              </CardContent>
            </Card>

            <Alert className="bg-primary/5 border-primary/20">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <AlertDescription className="text-foreground">
                <strong>Cookie Lifespan:</strong> Most Motiomint cookies expire after 6 months. You can delete cookies at any time via your browser settings.
              </AlertDescription>
            </Alert>
          </div>
        ),
      },
      {
        id: 'cookie-purposes',
        title: 'How We Use Cookies',
        icon: BarChart3,
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Motiomint uses cookies for the following purposes:
            </p>

            <div className="grid gap-4">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-primary" />
                    Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Purpose:</strong> Keeping you logged in and maintaining session security.
                  </p>
                  <p className="mt-2">
                    <strong className="text-foreground">Essential:</strong> Yes — Required for core functionality.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    User Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Purpose:</strong> Remembering your theme (light/dark), language, and display preferences.
                  </p>
                  <p className="mt-2">
                    <strong className="text-foreground">Essential:</strong> No — Functional but optional.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Purpose:</strong> Understanding how users interact with Motiomint to improve features and performance.
                  </p>
                  <p className="mt-2">
                    <strong className="text-foreground">Essential:</strong> No — Can be disabled via cookie preferences.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Cart Storage
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Purpose:</strong> Remembering items in your cart before checkout.
                  </p>
                  <p className="mt-2">
                    <strong className="text-foreground">Essential:</strong> Yes — Required for shopping functionality.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Site Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Purpose:</strong> Optimizing page load times, caching content, and reducing server load.
                  </p>
                  <p className="mt-2">
                    <strong className="text-foreground">Essential:</strong> Yes — Improves user experience.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        ),
      },
      {
        id: 'cookie-types',
        title: 'Cookie Categories',
        icon: Database,
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Motiomint categorizes cookies based on their purpose and user consent requirements:
            </p>

            <div className="grid gap-4">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Strictly Necessary Cookies
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Description:</strong> Essential for basic website functionality. Cannot be disabled without breaking core features.
                  </p>
                  <p>
                    <strong className="text-foreground">Examples:</strong> Authentication tokens, session IDs, cart data, security tokens.
                  </p>
                  <p>
                    <strong className="text-foreground">Consent Required:</strong> <span className="text-destructive font-semibold">No</span> — Always active.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    Functional Cookies
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Description:</strong> Enhance user experience by remembering preferences and settings.
                  </p>
                  <p>
                    <strong className="text-foreground">Examples:</strong> Theme preference (light/dark), language selection, volume settings, filter preferences.
                  </p>
                  <p>
                    <strong className="text-foreground">Consent Required:</strong> <span className="text-primary font-semibold">Yes</span> — Can be disabled.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Analytics Cookies
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Description:</strong> Track user behavior to understand site usage and improve performance.
                  </p>
                  <p>
                    <strong className="text-foreground">Examples:</strong> Page views, click tracking, session duration, bounce rates, conversion tracking.
                  </p>
                  <p>
                    <strong className="text-foreground">Consent Required:</strong> <span className="text-primary font-semibold">Yes</span> — Can be disabled.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Megaphone className="h-5 w-5 text-primary" />
                    Marketing Cookies
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Description:</strong> Track users across websites to deliver targeted advertising and promotional content.
                  </p>
                  <p>
                    <strong className="text-foreground">Current Status:</strong> <span className="text-muted-foreground">Not currently enabled on Motiomint.</span> If added in the future, explicit consent will be required.
                  </p>
                  <p>
                    <strong className="text-foreground">Consent Required:</strong> <span className="text-primary font-semibold">Yes</span> — Always optional.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Alert className="bg-accent/50 border-border">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription className="text-muted-foreground">
                <strong className="text-foreground">Default Settings:</strong> Only strictly necessary cookies are enabled by default. All optional cookies require explicit user consent.
              </AlertDescription>
            </Alert>
          </div>
        ),
      },
      {
        id: 'consent-banner',
        title: 'Cookie Consent Management',
        icon: CheckCircle2,
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Motiomint respects your privacy choices. When you first visit our site, you'll see a cookie consent banner with the following options:
            </p>

            <div className="grid gap-4">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Accept All Cookies
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    Enables all cookie categories (Necessary, Functional, Analytics). Provides the full Motiomint experience with personalized features and performance optimizations.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Ban className="h-5 w-5 text-destructive" />
                    Reject Non-Essential Cookies
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    Disables all optional cookies (Functional, Analytics, Marketing). Only strictly necessary cookies remain active. Some features may be limited.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    Manage Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    Granular control over each cookie category. Choose which optional cookies to enable or disable based on your privacy preferences.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Cookie Preference Storage
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">Duration:</strong> Your cookie preferences are stored for <strong className="text-primary">6 months</strong>. After this period, you'll be prompted to renew your consent.
                </p>
                <p className="mt-2">
                  <strong className="text-foreground">Withdraw Consent:</strong> You can change your cookie preferences at any time via the "Manage Preferences" link in the site footer.
                </p>
              </CardContent>
            </Card>

            <Alert className="bg-accent/50 border-border">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-muted-foreground">
                <strong className="text-foreground">Note:</strong> The actual cookie consent banner will be implemented in a future update. This section documents the planned functionality and user consent options.
              </AlertDescription>
            </Alert>
          </div>
        ),
      },
      {
        id: 'manage-cookies',
        title: 'How to Manage Cookies',
        icon: Eye,
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              You have full control over cookies. Here's how to manage, clear, or disable cookies on Motiomint:
            </p>

            <div className="space-y-4">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    Update Cookie Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Method 1:</strong> Click the "Cookie Preferences" link in the site footer to adjust your settings at any time.
                  </p>
                  <p className="mt-2">
                    <strong className="text-foreground">Method 2:</strong> Access your account settings and navigate to "Privacy & Cookies" to manage preferences.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Trash2 className="h-5 w-5 text-destructive" />
                    Clear Cookies via Browser
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Chrome:</strong> Settings → Privacy and security → Clear browsing data → Cookies and other site data.
                  </p>
                  <p>
                    <strong className="text-foreground">Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data → Clear Data.
                  </p>
                  <p>
                    <strong className="text-foreground">Safari:</strong> Preferences → Privacy → Manage Website Data → Remove All.
                  </p>
                  <p>
                    <strong className="text-foreground">Edge:</strong> Settings → Privacy, search, and services → Clear browsing data → Cookies and other site data.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Ban className="h-5 w-5 text-destructive" />
                    Block All Cookies
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Browser Settings:</strong> Configure your browser to block all cookies. Note that this will prevent you from logging in to Motiomint and using most features.
                  </p>
                  <p className="mt-2">
                    <strong className="text-foreground">Private/Incognito Mode:</strong> Browsing in private mode will delete cookies when the session ends but won't save preferences.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <UserX className="h-5 w-5 text-primary" />
                    Withdraw Consent
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Anytime Withdrawal:</strong> You can withdraw consent for optional cookies at any time without penalty. This will not affect your ability to use Motiomint's core features.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Alert className="bg-accent/50 border-border">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-muted-foreground">
                <strong className="text-foreground">Impact of Disabling Cookies:</strong> Blocking necessary cookies will prevent login, cart functionality, and session management. Disabling functional/analytics cookies may result in a less personalized experience.
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
