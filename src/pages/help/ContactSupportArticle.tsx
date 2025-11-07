import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, MessageCircle, Clock, AlertCircle, CreditCard, Shield, HelpCircle, Send, User, AtSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MainNavigation from '@/components/navigation/MainNavigation';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const articles = {
  'support-email': {
    title: 'Official Support Email & Response Times',
    icon: Mail,
    content: (
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Official Support Email</p>
                    <a href="mailto:support@motiomint.com" className="text-lg font-semibold text-primary hover:underline">
                      support@motiomint.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Support Hours</p>
                    <p className="font-medium">Monday - Friday, 9:00 AM - 6:00 PM EST</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Response Times</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Free Plan</Badge>
                <CardTitle className="text-lg">48-72 Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Standard response time for free plan users during business hours.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2 bg-primary">Standard Plan</Badge>
                <CardTitle className="text-lg">24-48 Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Priority response for standard subscription members.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2 bg-gradient-to-r from-primary to-primary/60">Extended Plan</Badge>
                <CardTitle className="text-lg">12-24 Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Expedited support with the fastest response times available.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Best Practices for Email Support</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">✓</span>
                  <div>
                    <p className="font-medium">Include detailed information</p>
                    <p className="text-sm text-muted-foreground">Provide account email, error messages, and screenshots when applicable</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">✓</span>
                  <div>
                    <p className="font-medium">Use a clear subject line</p>
                    <p className="text-sm text-muted-foreground">Example: "Billing Issue - Duplicate Charge" or "Download Error - Animation ID 12345"</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">✓</span>
                  <div>
                    <p className="font-medium">One issue per email</p>
                    <p className="text-sm text-muted-foreground">Submit separate emails for unrelated issues for faster resolution</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">✓</span>
                  <div>
                    <p className="font-medium">Check spam folder</p>
                    <p className="text-sm text-muted-foreground">Add support@motiomint.com to your contacts to ensure delivery</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Note:</strong> Response times may vary during holidays and peak periods. For urgent issues, consider using our live chat support for immediate assistance.
          </AlertDescription>
        </Alert>
      </div>
    )
  },
  
  'submit-request': {
    title: 'Submit a Support Request',
    icon: Send,
    content: (
      <ContactFormSection />
    )
  },
  
  'support-channels': {
    title: 'Support Channel Guide',
    icon: HelpCircle,
    content: (
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Which Support Channel Should I Use?</h2>
          <p className="text-muted-foreground mb-6">
            Choose the right support channel based on your issue type for faster resolution.
          </p>
          
          <div className="space-y-4">
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-primary" />
                  <div>
                    <CardTitle>Billing & Payments</CardTitle>
                    <CardDescription>Subscription, refunds, invoices, payment methods</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Best Channel:</strong> Email Support</p>
                  <p className="text-sm"><strong>Why:</strong> Billing issues require account verification and may need detailed documentation</p>
                  <p className="text-sm"><strong>Include:</strong> Transaction ID, date of charge, account email</p>
                  <Button variant="outline" size="sm" className="mt-3">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Billing Support
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-blue-500" />
                  <div>
                    <CardTitle>Technical Issues</CardTitle>
                    <CardDescription>Download problems, playback errors, browser compatibility</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Best Channel:</strong> Live Chat or Email</p>
                  <p className="text-sm"><strong>Why:</strong> Technical issues can often be resolved quickly through chat troubleshooting</p>
                  <p className="text-sm"><strong>Include:</strong> Browser/device info, error messages, screenshot of issue</p>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Start Live Chat
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Support
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-green-500" />
                  <div>
                    <CardTitle>License & Usage Questions</CardTitle>
                    <CardDescription>Commercial use, attribution, copyright, license clarification</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Best Channel:</strong> Email Support</p>
                  <p className="text-sm"><strong>Why:</strong> License inquiries may require legal review and detailed explanations</p>
                  <p className="text-sm"><strong>Include:</strong> Specific use case, project details, current license type</p>
                  <Button variant="outline" size="sm" className="mt-3">
                    <Mail className="w-4 h-4 mr-2" />
                    Email License Team
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <User className="w-6 h-6 text-orange-500" />
                  <div>
                    <CardTitle>Account Management</CardTitle>
                    <CardDescription>Password reset, email changes, account deletion</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Best Channel:</strong> Live Chat or Email</p>
                  <p className="text-sm"><strong>Why:</strong> Account issues can often be resolved through guided self-service or quick verification</p>
                  <p className="text-sm"><strong>Include:</strong> Account email, description of issue</p>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Start Live Chat
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Support
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-6 h-6 text-purple-500" />
                  <div>
                    <CardTitle>General Questions</CardTitle>
                    <CardDescription>Feature requests, feedback, general inquiries</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Best Channel:</strong> Live Chat</p>
                  <p className="text-sm"><strong>Why:</strong> Quick questions get quick answers through real-time chat</p>
                  <p className="text-sm"><strong>Include:</strong> Clear description of your question or feedback</p>
                  <Button variant="outline" size="sm" className="mt-3">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Start Live Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Escalation Process</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Initial Contact</p>
                    <p className="text-sm text-muted-foreground">Submit your issue through the appropriate channel</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium">First Response</p>
                    <p className="text-sm text-muted-foreground">Receive acknowledgment and ticket number within response time window</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Troubleshooting</p>
                    <p className="text-sm text-muted-foreground">Work with support team to resolve the issue</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    4
                  </div>
                  <div>
                    <p className="font-medium">Escalation (if needed)</p>
                    <p className="text-sm text-muted-foreground">Complex issues are escalated to senior support or specialized teams</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Tip:</strong> Before contacting support, check our Help Center articles and FAQs. Many common questions are answered there, providing you with instant solutions.
          </AlertDescription>
        </Alert>
      </div>
    )
  },
  
  'live-chat': {
    title: 'Live Chat Support',
    icon: MessageCircle,
    content: (
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Real-Time Support</h2>
          <p className="text-muted-foreground mb-6">
            Get instant help from our support team through live chat. Available during business hours for quick resolution of common issues.
          </p>
          
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <MessageCircle className="w-8 h-8 text-primary flex-shrink-0" />
                <div className="space-y-4 flex-1">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Chat Availability</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Monday - Friday, 9:00 AM - 6:00 PM EST
                    </p>
                  </div>
                  <Button size="lg" className="w-full sm:w-auto">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Start Live Chat Now
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Average wait time: 2-3 minutes
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">What Live Chat Can Help With</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Best for Live Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Quick account questions</li>
                  <li>• Navigation and feature guidance</li>
                  <li>• Download troubleshooting</li>
                  <li>• General product questions</li>
                  <li>• Subscription plan comparisons</li>
                  <li>• Password reset assistance</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="text-muted-foreground">✗</span>
                  Better via Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Complex billing disputes</li>
                  <li>• Legal/license inquiries</li>
                  <li>• Account deletion requests</li>
                  <li>• Refund processing</li>
                  <li>• Copyright claims</li>
                  <li>• Issues requiring screenshots</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Chat Features</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Screen Sharing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Share your screen with support agents for faster troubleshooting of visual issues.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">File Attachments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Send screenshots and files directly in chat to illustrate your issue.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Chat History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Access previous chat transcripts from your account dashboard.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Tips for Effective Chat Support</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">1.</span>
                  <div>
                    <p className="font-medium">Be ready with details</p>
                    <p className="text-sm text-muted-foreground">Have your account email and relevant information ready before starting chat</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">2.</span>
                  <div>
                    <p className="font-medium">Describe the issue clearly</p>
                    <p className="text-sm text-muted-foreground">Explain what you were trying to do and what went wrong</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">3.</span>
                  <div>
                    <p className="font-medium">Stay connected</p>
                    <p className="text-sm text-muted-foreground">Keep the chat window open - agents may need time to research solutions</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">4.</span>
                  <div>
                    <p className="font-medium">Save chat transcripts</p>
                    <p className="text-sm text-muted-foreground">Download or email yourself the chat transcript for future reference</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <Alert>
          <Clock className="h-4 w-4" />
          <AlertDescription>
            <strong>Outside business hours?</strong> Leave us a message and we'll respond via email within our standard response times. You can also browse our Help Center for immediate answers.
          </AlertDescription>
        </Alert>
      </div>
    )
  }
};

function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issueType: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.issueType || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would send to backend
    toast({
      title: "Request Submitted",
      description: "We've received your support request and will respond within 24-48 hours.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      issueType: '',
      message: ''
    });
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Submit a Support Request</h2>
        <p className="text-muted-foreground mb-6">
          Fill out the form below and our support team will get back to you as soon as possible.
        </p>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="pl-10"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="issueType">Issue Type *</Label>
                <Select value={formData.issueType} onValueChange={(value) => setFormData({ ...formData, issueType: value })}>
                  <SelectTrigger id="issueType">
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="billing">Billing & Payments</SelectItem>
                    <SelectItem value="technical">Technical Issues</SelectItem>
                    <SelectItem value="license">License & Usage Questions</SelectItem>
                    <SelectItem value="account">Account Management</SelectItem>
                    <SelectItem value="download">Download Problems</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Please describe your issue in detail..."
                  className="min-h-[150px]"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Tip: Include error messages, screenshots, or any relevant details to help us resolve your issue faster.
                </p>
              </div>

              <Button type="submit" size="lg" className="w-full sm:w-auto">
                <Send className="w-4 h-4 mr-2" />
                Submit Request
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What Happens Next?</h2>
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Instant Confirmation</p>
                    <p className="text-sm text-muted-foreground">You'll receive an email confirmation with your ticket number</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Review & Assignment</p>
                    <p className="text-sm text-muted-foreground">Your request is reviewed and assigned to the appropriate team member</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Initial Response</p>
                    <p className="text-sm text-muted-foreground">You'll hear back from us within 24-48 hours (faster for premium plans)</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                    4
                  </div>
                  <div>
                    <p className="font-medium">Resolution</p>
                    <p className="text-sm text-muted-foreground">We'll work with you until your issue is completely resolved</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Need urgent help?</strong> For immediate assistance during business hours, try our live chat support instead.
        </AlertDescription>
      </Alert>
    </div>
  );
}

export default function ContactSupportArticle() {
  const { slug } = useParams();
  const article = slug ? articles[slug as keyof typeof articles] : null;

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <MainNavigation />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The article you're looking for doesn't exist.
            </p>
            <Link to="/help">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Help Center
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const Icon = article.icon;

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      
      {/* Header */}
      <section className="border-b border-border/50 bg-gradient-to-br from-primary/5 to-background py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link to="/help">
              <Button variant="ghost" size="sm" className="mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Help Center
              </Button>
            </Link>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <Icon className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{article.title}</h1>
                <p className="text-muted-foreground">Contact & Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {article.content}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/30 py-8 mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">Was this article helpful?</p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" size="sm">Yes</Button>
                <Button variant="outline" size="sm">No</Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
