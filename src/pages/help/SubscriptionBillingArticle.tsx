import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, AlertCircle, CreditCard, RefreshCw, Zap, XCircle, DollarSign, Clock, FileText, Shield, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import MainNavigation from '@/components/navigation/MainNavigation';

export default function SubscriptionBillingArticle() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const articles: Record<string, {
    title: string;
    description: string;
    content: JSX.Element;
  }> = {
    'subscription-plans': {
      title: 'Subscription Plans Explained',
      description: 'Learn about all available subscription plans and one-time packs',
      content: (
        <div className="space-y-8">
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-muted-foreground mb-4">
              Motiomint offers flexible pricing options to suit every need. Choose between monthly subscriptions for ongoing access or one-time packs for specific projects.
            </p>
          </section>

          {/* Subscription Plans */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Monthly Subscription Plans</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Free Plan */}
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">Free</CardTitle>
                    <Badge variant="secondary">$0/month</Badge>
                  </div>
                  <CardDescription>Perfect for exploring and testing</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">5 downloads per month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Browse entire animation library</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Standard quality downloads</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Watermarked content</span>
                    </li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-4 italic">
                    Best for: Hobbyists, students, and anyone wanting to explore our collection
                  </p>
                </CardContent>
              </Card>

              {/* Starter Plan */}
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">Starter</CardTitle>
                    <Badge variant="secondary">$19/month</Badge>
                  </div>
                  <CardDescription>Great for small projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">50 downloads per month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">HD quality downloads</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">No watermarks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Basic commercial license</span>
                    </li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-4 italic">
                    Best for: Freelancers, small businesses, content creators
                  </p>
                </CardContent>
              </Card>

              {/* Basic Plan */}
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">Basic</CardTitle>
                    <Badge variant="secondary">$39/month</Badge>
                  </div>
                  <CardDescription>For regular content production</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">150 downloads per month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Full HD quality downloads</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Extended commercial license</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Priority email support</span>
                    </li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-4 italic">
                    Best for: Marketing teams, agencies, regular video producers
                  </p>
                </CardContent>
              </Card>

              {/* Pro Plan */}
              <Card className="border-2 border-primary">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">Pro</CardTitle>
                    <Badge className="bg-primary text-primary-foreground">$79/month</Badge>
                  </div>
                  <CardDescription>Maximum flexibility and volume</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Unlimited downloads</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">4K quality downloads</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Full commercial license</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Priority 24/7 support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Early access to new animations</span>
                    </li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-4 italic">
                    Best for: Production studios, large teams, high-volume users
                  </p>
                </CardContent>
              </Card>

              {/* Mega Plan */}
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">Mega</CardTitle>
                    <Badge variant="secondary">$129/month</Badge>
                  </div>
                  <CardDescription>Enterprise-level features</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Unlimited downloads</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">8K quality downloads</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Enterprise commercial license</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Dedicated account manager</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Custom animation requests</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">API access</span>
                    </li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-4 italic">
                    Best for: Enterprise organizations, broadcast networks, major studios
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* One-Time Packs */}
          <section>
            <h2 className="text-2xl font-bold mb-6">One-Time Packs</h2>
            <Alert className="mb-6">
              <Zap className="h-4 w-4" />
              <AlertDescription>
                One-time packs are perfect for specific projects. No recurring charges, just pay once and download.
              </AlertDescription>
            </Alert>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Small Pack</CardTitle>
                  <div className="text-2xl font-bold text-primary">$29</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span>10 downloads</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span>HD quality</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span>6 months validity</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Medium Pack</CardTitle>
                  <div className="text-2xl font-bold text-primary">$79</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span>50 downloads</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span>Full HD quality</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span>12 months validity</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Large Pack</CardTitle>
                  <div className="text-2xl font-bold text-primary">$199</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span>200 downloads</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span>4K quality</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span>24 months validity</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Key Differences */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Key Differences at a Glance</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-primary" />
                        Subscriptions
                      </h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Monthly recurring billing</li>
                        <li>• Downloads reset each month</li>
                        <li>• Cancel anytime</li>
                        <li>• Best for ongoing needs</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-primary" />
                        One-Time Packs
                      </h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Single payment</li>
                        <li>• Downloads valid for set period</li>
                        <li>• No recurring charges</li>
                        <li>• Perfect for specific projects</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      )
    },
    'upgrade-downgrade': {
      title: 'How to Upgrade or Downgrade Your Plan',
      description: 'Step-by-step guide to switching between subscription plans',
      content: (
        <div className="space-y-8">
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Switching Plans Made Easy</h2>
            <p className="text-muted-foreground mb-4">
              You can upgrade or downgrade your subscription at any time. Changes take effect immediately, and billing is prorated automatically.
            </p>
            <Alert>
              <RefreshCw className="h-4 w-4" />
              <AlertDescription>
                Upgrading gives you immediate access to new features. Downgrading takes effect at your next billing cycle to ensure you get full value from your current plan.
              </AlertDescription>
            </Alert>
          </section>

          {/* Upgrading Steps */}
          <section>
            <h2 className="text-2xl font-bold mb-6">How to Upgrade Your Plan</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                    Access Your Account
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">Click on your profile icon in the top right corner of any page</p>
                  <p className="text-sm text-muted-foreground">Select <strong>"Subscription"</strong> from the dropdown menu</p>
                  <div className="bg-muted/50 p-4 rounded-lg border">
                    <p className="text-xs text-muted-foreground italic">💡 You'll see your current plan displayed next to "Subscription" in the menu</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                    Choose Your New Plan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">Review all available subscription tiers and their features</p>
                  <p className="text-sm text-muted-foreground">Click <strong>"Upgrade"</strong> on the plan you want</p>
                  <div className="bg-muted/50 p-4 rounded-lg border">
                    <p className="text-xs text-muted-foreground italic">💡 Plans with more features than your current one will show an "Upgrade" button</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                    Review & Confirm
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">Review the pricing difference and new features</p>
                  <p className="text-sm text-muted-foreground">You'll see a prorated credit for your current plan applied to the upgrade cost</p>
                  <p className="text-sm text-muted-foreground">Click <strong>"Confirm Upgrade"</strong></p>
                  <div className="bg-muted/50 p-4 rounded-lg border">
                    <p className="text-xs text-muted-foreground italic">💡 Your new plan features are available immediately after confirmation</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                    Start Using New Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">Your download limit updates immediately</p>
                  <p className="text-sm text-muted-foreground">Access higher quality formats right away</p>
                  <p className="text-sm text-muted-foreground">You'll receive a confirmation email with your updated plan details</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Downgrading Steps */}
          <section>
            <h2 className="text-2xl font-bold mb-6">How to Downgrade Your Plan</h2>
            <Alert className="mb-6" variant="default">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Downgrades take effect at the end of your current billing cycle so you can enjoy your current plan benefits until then.
              </AlertDescription>
            </Alert>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                    Navigate to Subscription Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">Go to your profile menu → <strong>"Subscription"</strong></p>
                  <p className="text-sm text-muted-foreground">Scroll to view all available plans</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                    Select Lower Tier
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">Find the plan that better fits your needs</p>
                  <p className="text-sm text-muted-foreground">Click <strong>"Downgrade"</strong> on your chosen plan</p>
                  <div className="bg-muted/50 p-4 rounded-lg border">
                    <p className="text-xs text-muted-foreground italic">💡 You can also switch to a one-time pack if that suits your needs better</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                    Confirm Downgrade
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">Review what changes with your new plan</p>
                  <p className="text-sm text-muted-foreground">See when the downgrade takes effect (end of current billing period)</p>
                  <p className="text-sm text-muted-foreground">Click <strong>"Confirm Downgrade"</strong></p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                    Transition Period
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">Continue enjoying your current plan until the billing cycle ends</p>
                  <p className="text-sm text-muted-foreground">You'll receive a reminder email 3 days before the change</p>
                  <p className="text-sm text-muted-foreground">On your renewal date, the new plan activates automatically</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* What Happens After */}
          <section>
            <h2 className="text-2xl font-bold mb-6">What Happens After Switching</h2>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">After Upgrading</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Immediate access to higher download limits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Better quality formats available instantly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Prorated billing - you only pay the difference</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Next billing date remains the same</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Confirmation email sent with new plan details</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">After Downgrading</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Current plan remains active until billing cycle ends</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>New plan activates on your next renewal date</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Lower price reflects on next invoice</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Download limit adjusts at transition</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Reminder email sent before change takes effect</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Common Questions */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Common Questions</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Can I switch between plans multiple times?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Yes! You can change your plan as often as you need. However, frequent changes within the same billing cycle may be subject to prorated adjustments.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">What happens to unused downloads when I upgrade?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Your download count resets to match your new plan's limit immediately upon upgrading. Any unused downloads from your previous plan do not carry over.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Can I switch from a subscription to a one-time pack?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Yes! You can cancel your subscription and purchase a one-time pack at any time. Your subscription will remain active until the end of your current billing period.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Will I lose my download history when switching plans?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    No. Your complete download history, purchased items, and account preferences remain intact regardless of plan changes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Need Help */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Need help with your subscription?</strong> Our support team is here to assist you. Contact us through the Help Center or email support@motiomint.com
            </AlertDescription>
          </Alert>
        </div>
      )
    },
    'cancellation-refund': {
      title: 'Cancellation & Refund Policy',
      description: 'How to cancel your subscription and request refunds',
      content: (
        <div className="space-y-8">
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-muted-foreground mb-4">
              We understand that your needs may change. This guide explains how to cancel your subscription and our transparent refund policy.
            </p>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                All cancellations and refund policies comply with international consumer protection standards and regulations.
              </AlertDescription>
            </Alert>
          </section>

          {/* How to Cancel */}
          <section>
            <h2 className="text-2xl font-bold mb-6">How to Cancel Your Subscription</h2>
            <p className="text-muted-foreground mb-6">
              You can cancel your subscription at any time. The process is simple and instant.
            </p>

            <div className="space-y-6">
              {/* Step 1 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                    Log In to Your Account
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Sign in to your Motiomint account using your email and password
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg border border-border">
                    <p className="text-sm font-mono">Navigate to: motiomint.com → Click "Sign In" (top right)</p>
                  </div>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                    Open Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Access your account settings from the navigation menu
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg border border-border space-y-2">
                    <p className="text-sm font-mono">• Click your profile icon (top right corner)</p>
                    <p className="text-sm font-mono">• Select "Dashboard" from the dropdown menu</p>
                    <p className="text-sm font-mono">• Click "Account Settings" tab</p>
                  </div>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                    Navigate to Subscription Section
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Find your current subscription details
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg border border-border">
                    <p className="text-sm font-mono">Look for "Subscription Status" card showing your current plan</p>
                  </div>
                </CardContent>
              </Card>

              {/* Step 4 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                    Cancel Subscription
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Click the "Cancel Subscription" button
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg border border-border space-y-2">
                    <p className="text-sm font-mono">• Click "Cancel Subscription" button</p>
                    <p className="text-sm font-mono">• Confirm your cancellation in the dialog</p>
                    <p className="text-sm font-mono">• You'll receive an email confirmation immediately</p>
                  </div>
                  <Alert className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Your cancellation is effective immediately, but you retain access until the end of your current billing period.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* What Happens After Cancellation */}
          <section>
            <h2 className="text-2xl font-bold mb-6">What Happens After You Cancel?</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Immediate Confirmation</h3>
                      <p className="text-sm text-muted-foreground">
                        You'll receive an email confirming your cancellation with details about when your access ends.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Continue Using Until Period Ends</h3>
                      <p className="text-sm text-muted-foreground">
                        You can still download animations and use all features until the end of your current billing cycle.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Access Loss at Period End</h3>
                      <p className="text-sm text-muted-foreground">
                        After your billing period expires, premium features will no longer be accessible. Your account will revert to the Free plan automatically.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CreditCard className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">No Further Charges</h3>
                      <p className="text-sm text-muted-foreground">
                        Your payment method will not be charged again. All future billing stops immediately.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Refund Policy */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Refund Policy</h2>
            
            <Alert className="mb-6">
              <DollarSign className="h-4 w-4" />
              <AlertDescription>
                We offer a transparent, fair refund policy that complies with international consumer protection laws.
              </AlertDescription>
            </Alert>

            {/* Eligibility */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Refund Eligibility
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 text-sm">✓ You ARE eligible for a refund if:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li>• You request within 14 days of your initial subscription purchase</li>
                    <li>• You've downloaded fewer than 5 animations during this period</li>
                    <li>• You experienced technical issues that prevented service use (documented)</li>
                    <li>• You were charged incorrectly or twice for the same subscription</li>
                  </ul>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2 text-sm">✗ You are NOT eligible for a refund if:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li>• More than 14 days have passed since your purchase</li>
                    <li>• You've downloaded 5 or more animations</li>
                    <li>• You're requesting a refund for renewal payments (monthly recurring)</li>
                    <li>• You simply changed your mind after using the service extensively</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Refund Timeline */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Refund Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary text-sm font-bold flex-shrink-0">
                      1-2d
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Request Review</h3>
                      <p className="text-sm text-muted-foreground">
                        Our team reviews your refund request within 1-2 business days
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary text-sm font-bold flex-shrink-0">
                      3-5d
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Processing</h3>
                      <p className="text-sm text-muted-foreground">
                        Approved refunds are processed within 3-5 business days
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary text-sm font-bold flex-shrink-0">
                      5-10d
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Bank Processing</h3>
                      <p className="text-sm text-muted-foreground">
                        Your bank may take 5-10 business days to reflect the refund in your account
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How to Request Refund */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-primary" />
                  How to Request a Refund
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Follow these steps to submit your refund request:
                  </p>

                  <div className="bg-muted/50 p-6 rounded-lg border border-border space-y-4">
                    <div className="space-y-2">
                      <p className="font-semibold text-sm">Option 1: Via Dashboard</p>
                      <ol className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>1. Go to Dashboard → Account Settings</li>
                        <li>2. Find "Subscription Status" section</li>
                        <li>3. Click "Request Refund" button</li>
                        <li>4. Fill out the refund request form</li>
                        <li>5. Submit with reason for refund</li>
                      </ol>
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <p className="font-semibold text-sm">Option 2: Via Email</p>
                      <ol className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>1. Email: refunds@motiomint.com</li>
                        <li>2. Subject: "Refund Request - [Your Email]"</li>
                        <li>3. Include: Account email, reason, and transaction ID</li>
                        <li>4. Attach any supporting documentation if applicable</li>
                      </ol>
                    </div>
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Please include your account email and transaction ID (found in your billing history) to expedite the process.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Special Cases */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Special Cases & Notes</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">One-Time Packs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    One-time pack purchases are eligible for refunds within 7 days if no downloads have been made. Once you download even one animation, the pack is non-refundable.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Promotional Discounts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    If you purchased with a promotional discount or coupon code, refunds are issued for the actual amount paid, not the original price.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Disputed Charges</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    If you see an unfamiliar charge, please contact us before disputing with your bank. We can resolve most issues quickly and prevent account suspension.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">International Customers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    All refund policies comply with EU Consumer Rights Directive, UK Consumer Rights Act, and other international regulations. Currency conversions may apply.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Contact Support */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Questions about cancellation or refunds?</strong> Contact our support team at support@motiomint.com or through the Help Center for personalized assistance.
            </AlertDescription>
          </Alert>
        </div>
      )
    },
    'billing-payment': {
      title: 'Billing & Payment Methods',
      description: 'How billing works, accepted payment methods, and payment security',
      content: (
        <div className="space-y-8">
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-muted-foreground mb-4">
              Motiomint uses secure, transparent billing practices. This guide explains how billing works, accepted payment methods, and how we protect your payment information.
            </p>
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                All payments are processed through industry-leading secure payment providers. We never store your full credit card details on our servers.
              </AlertDescription>
            </Alert>
          </section>

          {/* How Billing Works */}
          <section>
            <h2 className="text-2xl font-bold mb-6">How Billing Works on Motiomint</h2>
            
            <div className="space-y-6">
              {/* Billing Cycles */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Billing Cycles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Monthly Subscriptions</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• <strong>Billing Date:</strong> Charged on the same day each month (the day you initially subscribed)</li>
                      <li>• <strong>Renewal:</strong> Automatic renewal unless you cancel before the next billing date</li>
                      <li>• <strong>Prorated Charges:</strong> If you upgrade mid-cycle, you'll be charged a prorated amount for the remaining days</li>
                      <li>• <strong>Download Reset:</strong> Monthly download limits reset on your billing date</li>
                    </ul>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-2">One-Time Packs</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• <strong>Single Payment:</strong> One-time charge, no recurring billing</li>
                      <li>• <strong>Validity Period:</strong> Downloads available for 6-24 months depending on pack size</li>
                      <li>• <strong>No Automatic Renewal:</strong> Packs expire after validity period with no further charges</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Invoice Generation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    When Invoices Are Generated
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Invoices are automatically generated and emailed to you in the following situations:
                    </p>
                    
                    <div className="bg-muted/50 p-4 rounded-lg border border-border space-y-3">
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-sm">Initial Purchase</p>
                          <p className="text-xs text-muted-foreground">When you first subscribe or buy a one-time pack</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-sm">Monthly Renewal</p>
                          <p className="text-xs text-muted-foreground">On your billing date each month for active subscriptions</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-sm">Plan Changes</p>
                          <p className="text-xs text-muted-foreground">When you upgrade or downgrade (prorated invoice issued)</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-sm">Refunds Processed</p>
                          <p className="text-xs text-muted-foreground">Credit note issued when refund is approved</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Accessing Invoices */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5 text-primary" />
                    Where to Access Your Invoices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      You can access all your invoices anytime through your account dashboard:
                    </p>
                    
                    <div className="bg-muted/50 p-6 rounded-lg border border-border">
                      <ol className="space-y-3 text-sm">
                        <li className="flex items-start gap-3">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex-shrink-0">1</span>
                          <div>
                            <p className="font-semibold">Log in to your account</p>
                            <p className="text-muted-foreground text-xs">Click "Sign In" at the top right corner</p>
                          </div>
                        </li>
                        
                        <li className="flex items-start gap-3">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex-shrink-0">2</span>
                          <div>
                            <p className="font-semibold">Navigate to Dashboard</p>
                            <p className="text-muted-foreground text-xs">Click your profile icon → Select "Dashboard"</p>
                          </div>
                        </li>
                        
                        <li className="flex items-start gap-3">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex-shrink-0">3</span>
                          <div>
                            <p className="font-semibold">Open Account Settings</p>
                            <p className="text-muted-foreground text-xs">Click the "Account Settings" tab</p>
                          </div>
                        </li>
                        
                        <li className="flex items-start gap-3">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex-shrink-0">4</span>
                          <div>
                            <p className="font-semibold">View Billing History</p>
                            <p className="text-muted-foreground text-xs">Scroll to "Billing History" section to see all invoices</p>
                          </div>
                        </li>
                        
                        <li className="flex items-start gap-3">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex-shrink-0">5</span>
                          <div>
                            <p className="font-semibold">Download Invoice</p>
                            <p className="text-muted-foreground text-xs">Click "Download PDF" next to any invoice to save it</p>
                          </div>
                        </li>
                      </ol>
                    </div>

                    <Alert>
                      <FileText className="h-4 w-4" />
                      <AlertDescription>
                        Invoices are also automatically emailed to your registered email address within minutes of each transaction.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>

              {/* Invoice Information */}
              <Card>
                <CardHeader>
                  <CardTitle>What's Included on Each Invoice</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Badge variant="outline">Individual</Badge>
                        For Personal Accounts
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Invoice number and date</li>
                        <li>• Your name and email address</li>
                        <li>• Plan name and billing period</li>
                        <li>• Subtotal, taxes (if applicable), and total amount</li>
                        <li>• Payment method used (last 4 digits)</li>
                        <li>• Transaction ID for reference</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Badge variant="outline">Company</Badge>
                        For Business Accounts
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• All individual invoice details, plus:</li>
                        <li>• Company name and VAT/Tax ID</li>
                        <li>• Company billing address</li>
                        <li>• VAT breakdown (for EU companies)</li>
                        <li>• Purchase order number (if provided)</li>
                        <li>• Additional notes or terms</li>
                      </ul>
                    </div>
                  </div>

                  <Alert className="mt-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      To add company information to your invoices, update your billing details in Account Settings → Billing Information before your next payment.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Payment Methods */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Accepted Payment Methods</h2>
            
            <Alert className="mb-6">
              <CreditCard className="h-4 w-4" />
              <AlertDescription>
                We accept multiple payment methods to make it convenient for customers worldwide. All payments are processed securely.
              </AlertDescription>
            </Alert>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Credit/Debit Cards */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Credit & Debit Cards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    We accept all major credit and debit cards:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm">Visa</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm">Mastercard</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm">American Express</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm">Discover</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm">JCB</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm">Diners Club</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 italic">
                    Most popular option for subscriptions and one-time purchases
                  </p>
                </CardContent>
              </Card>

              {/* PayPal */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    PayPal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Use your PayPal account for secure payments:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm">PayPal Balance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm">Bank Account (via PayPal)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm">PayPal Credit</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 italic">
                    Available for both subscriptions and one-time packs
                  </p>
                </CardContent>
              </Card>

              {/* Apple Pay */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Apple Pay
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Quick checkout with Apple Pay on supported devices:
                  </p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Available on Safari browser (macOS, iOS, iPadOS)</p>
                    <p>• One-tap checkout experience</p>
                    <p>• Uses your saved Apple Pay cards</p>
                  </div>
                </CardContent>
              </Card>

              {/* Google Pay */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Google Pay
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Fast payment with Google Pay on Chrome:
                  </p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Available on Chrome browser (all devices)</p>
                    <p>• Quick and secure checkout</p>
                    <p>• Uses your Google Pay saved cards</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* How to Make Payment */}
          <section>
            <h2 className="text-2xl font-bold mb-6">How to Make a Payment</h2>
            
            <div className="space-y-6">
              {/* For New Subscriptions */}
              <Card>
                <CardHeader>
                  <CardTitle>For New Subscriptions or One-Time Packs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 p-6 rounded-lg border border-border">
                    <ol className="space-y-4">
                      <li className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex-shrink-0">1</span>
                        <div>
                          <p className="font-semibold text-sm">Choose Your Plan</p>
                          <p className="text-xs text-muted-foreground">Navigate to Pricing page and select your preferred plan or pack</p>
                        </div>
                      </li>
                      
                      <li className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex-shrink-0">2</span>
                        <div>
                          <p className="font-semibold text-sm">Click "Subscribe" or "Buy Now"</p>
                          <p className="text-xs text-muted-foreground">You'll be redirected to the secure checkout page</p>
                        </div>
                      </li>
                      
                      <li className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex-shrink-0">3</span>
                        <div>
                          <p className="font-semibold text-sm">Enter Billing Information</p>
                          <p className="text-xs text-muted-foreground">Provide your name, email, and billing address</p>
                        </div>
                      </li>
                      
                      <li className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex-shrink-0">4</span>
                        <div>
                          <p className="font-semibold text-sm">Select Payment Method</p>
                          <p className="text-xs text-muted-foreground">Choose credit card, PayPal, Apple Pay, or Google Pay</p>
                        </div>
                      </li>
                      
                      <li className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex-shrink-0">5</span>
                        <div>
                          <p className="font-semibold text-sm">Enter Payment Details</p>
                          <p className="text-xs text-muted-foreground">Provide card number, expiry date, and CVV (or authenticate with PayPal/Apple Pay/Google Pay)</p>
                        </div>
                      </li>
                      
                      <li className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex-shrink-0">6</span>
                        <div>
                          <p className="font-semibold text-sm">Review and Confirm</p>
                          <p className="text-xs text-muted-foreground">Double-check your order summary and click "Complete Payment"</p>
                        </div>
                      </li>
                      
                      <li className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex-shrink-0">7</span>
                        <div>
                          <p className="font-semibold text-sm">Payment Confirmation</p>
                          <p className="text-xs text-muted-foreground">You'll see a success message and receive confirmation email with invoice</p>
                        </div>
                      </li>
                    </ol>
                  </div>
                </CardContent>
              </Card>

              {/* Updating Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Updating Payment Method for Existing Subscription</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 p-6 rounded-lg border border-border">
                    <ol className="space-y-3 text-sm">
                      <li>1. Go to Dashboard → Account Settings</li>
                      <li>2. Find "Payment Method" section</li>
                      <li>3. Click "Update Payment Method" button</li>
                      <li>4. Enter new card details or select different payment method</li>
                      <li>5. Click "Save" to update</li>
                      <li>6. Your next billing will use the new payment method</li>
                    </ol>
                  </div>
                  
                  <Alert className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Updating your payment method does not trigger a new charge. The new method will be used for your next scheduled billing date.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Payment Security */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Payment Security Measures</h2>
            
            <Alert className="mb-6">
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Your payment security is our top priority. We implement industry-leading security standards to protect your financial information.
              </AlertDescription>
            </Alert>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    PCI DSS Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    We are fully compliant with Payment Card Industry Data Security Standards (PCI DSS Level 1), the highest level of certification in the payments industry.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    256-Bit SSL Encryption
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    All payment data is transmitted using 256-bit SSL/TLS encryption, the same security level used by major banks and financial institutions.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Tokenization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    We never store your full credit card details. Payment information is tokenized and securely stored by our payment processor (Stripe).
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    3D Secure Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Additional verification layer for card payments (Visa Secure, Mastercard ID Check) to prevent unauthorized transactions.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-primary" />
                    Fraud Detection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Advanced AI-powered fraud detection systems monitor all transactions in real-time to identify and prevent suspicious activity.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Regular Security Audits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our payment infrastructure undergoes regular third-party security audits and penetration testing to ensure maximum protection.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6 bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Your Payment Data is Protected
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• We NEVER see or store your full card number</li>
                    <li>• We NEVER have access to your CVV/security code</li>
                    <li>• All payment processing is handled by certified payment providers</li>
                    <li>• We comply with GDPR, CCPA, and international data protection laws</li>
                    <li>• Our team is trained in data security best practices</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Common Questions */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Common Questions</h2>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Why was my payment declined?</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>Common reasons include:</p>
                  <ul className="ml-4 space-y-1">
                    <li>• Insufficient funds in your account</li>
                    <li>• Incorrect card details (number, expiry, CVV)</li>
                    <li>• Card blocked by your bank for security reasons</li>
                    <li>• International transaction restrictions</li>
                  </ul>
                  <p className="text-xs italic pt-2">Try contacting your bank or use a different payment method.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Do you charge sales tax or VAT?</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>Yes, we charge applicable sales tax, VAT, or GST based on your billing address as required by local tax regulations. Tax amounts are calculated automatically at checkout and shown before you complete payment.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Can I change my billing date?</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>Billing dates are set to the day you initially subscribed. To change your billing date, you would need to cancel your current subscription and re-subscribe on your preferred date. Contact support for assistance with this process.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">What currency are payments processed in?</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>All prices are listed in USD. If you're paying from a different currency region, your bank or payment provider will handle the conversion, and exchange rate fees may apply based on your financial institution's policies.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Contact Support */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Payment questions or issues?</strong> Our billing support team is ready to help. Contact us at billing@motiomint.com or through the Help Center.
            </AlertDescription>
          </Alert>
        </div>
      )
    }
  };

  const article = slug ? articles[slug] : null;

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <MainNavigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <Button onClick={() => navigate('/help')}>
            Back to Help Center
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => navigate('/help')}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Help Center
        </Button>

        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <p className="text-lg text-muted-foreground">{article.description}</p>
        </div>

        {/* Article Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          {article.content}
        </div>

        {/* Footer Actions */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Was this article helpful?</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Yes</Button>
                <Button variant="outline" size="sm">No</Button>
              </div>
            </div>
            <Button onClick={() => navigate('/help')}>
              Browse More Articles
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
