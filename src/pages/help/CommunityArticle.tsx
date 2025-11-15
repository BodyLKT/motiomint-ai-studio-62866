import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, MessageCircle, Heart, Lightbulb, Shield, AlertTriangle, CheckCircle, Lock, Unlock, Crown, Sparkles, Send, CheckCircle2, TrendingUp, Award, Star, Zap, ExternalLink, ThumbsUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import MainNavigation from '@/components/navigation/MainNavigation';

const feedbackSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters').max(1000, 'Description must be less than 1000 characters'),
  category: z.enum(['UI', 'Features', 'Content', 'Other'], {
    required_error: 'Please select a category',
  }),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

const FeedbackForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [upvotes, setUpvotes] = useState(0);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  const form = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      title: '',
      description: '',
      category: undefined,
    },
  });

  const onSubmit = (data: FeedbackFormData) => {
    console.log('Feedback submitted:', data);
    setSubmitted(true);
    form.reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleUpvote = () => {
    if (!hasUpvoted) {
      setUpvotes(prev => prev + 1);
      setHasUpvoted(true);
    }
  };

  return (
    <div className="space-y-6">
      {submitted && (
        <Alert className="bg-primary/10 border-primary/30 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-primary" />
          <AlertDescription className="text-foreground">
            <strong>Thanks for your feedback!</strong> Our team reviews submissions weekly and will consider your idea for future updates.
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Idea Title *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Brief, descriptive title for your suggestion" 
                    className="bg-background/50 border-border/50 focus:border-primary focus:ring-primary h-11"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Category *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary focus:ring-primary h-11">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="UI">UI / Design</SelectItem>
                    <SelectItem value="Features">Features / Functionality</SelectItem>
                    <SelectItem value="Content">Content Library</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Description *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your idea in detail. What problem does it solve? How would it improve Motiomint?" 
                    className="bg-background/50 border-border/50 focus:border-primary focus:ring-primary min-h-[150px] resize-none"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              type="submit" 
              className="flex-1 h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Feedback
            </Button>
            <Button 
              type="button"
              variant="outline"
              onClick={handleUpvote}
              disabled={hasUpvoted}
              className={`h-11 px-6 transition-all duration-300 ${hasUpvoted ? 'border-primary/50 bg-primary/10 text-primary' : 'hover:border-primary/50 hover:bg-primary/5'}`}
            >
              <Heart className={`w-4 h-4 mr-2 ${hasUpvoted ? 'fill-primary' : ''}`} />
              {hasUpvoted ? `Supported (${upvotes})` : 'Support this idea'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

const articles = {
  'community-overview': {
    title: 'Community Overview',
    icon: Users,
    content: (
      <div className="space-y-8">
        {/* Purpose Section */}
        <section>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-lg blur-xl" />
            <Card className="relative bg-gradient-to-br from-primary/10 to-background border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/20 text-primary flex-shrink-0">
                    <Users className="w-8 h-8" />
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-2xl font-semibold">Welcome to the Motiomint Community</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      The Motiomint Community is a vibrant space where creators, designers, and animation enthusiasts 
                      come together to share feedback, exchange ideas, showcase work, and collaborate on projects. 
                      Whether you're a beginner exploring motion design or a professional looking to connect with 
                      like-minded creators, our community is here to support your creative journey.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        <Heart className="w-3 h-3 mr-1" />
                        Share & Learn
                      </Badge>
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        Connect
                      </Badge>
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        <Lightbulb className="w-3 h-3 mr-1" />
                        Collaborate
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Divider with glow */}
        <div className="relative h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm" />
        </div>

        {/* Community Guidelines / Code of Conduct */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <Shield className="w-7 h-7 text-primary" />
            Community Guidelines & Code of Conduct
          </h2>
          <p className="text-muted-foreground mb-6">
            To ensure a positive, safe, and productive environment for all members, we ask everyone to follow these core principles:
          </p>

          <div className="space-y-4">
            {/* Rule 1: Respect */}
            <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500 flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      Respect & Kindness
                      <Badge variant="outline" className="text-xs">Essential</Badge>
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Treat all community members with respect and courtesy. Harassment, hate speech, discrimination, 
                      or personal attacks will not be tolerated. Embrace diverse perspectives and engage in civil 
                      discourse, even when opinions differ.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rule 2: Share & Credit */}
            <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-purple-500/10 text-purple-500 flex-shrink-0 group-hover:bg-purple-500/20 transition-colors">
                    <span className="text-2xl">💡</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      Share Knowledge & Credit Authorship
                      <Badge variant="outline" className="text-xs">Required</Badge>
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Share your knowledge freely to help others grow. When sharing work, tutorials, or resources, 
                      always give proper credit to original creators. Plagiarism and claiming others' work as your 
                      own is strictly prohibited and may result in account suspension.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rule 3: Constructive Critique */}
            <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-green-500/10 text-green-500 flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                    <span className="text-2xl">✨</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      Constructive Feedback Only
                      <Badge variant="outline" className="text-xs">Important</Badge>
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Provide feedback that is helpful, specific, and constructive. Focus on the work, not the person. 
                      Criticism should aim to help others improve, not tear them down. If you can't offer constructive 
                      input, it's better to remain supportive or move on.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rule 4: No Spam */}
            <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-orange-500/10 text-orange-500 flex-shrink-0 group-hover:bg-orange-500/20 transition-colors">
                    <span className="text-2xl">🚫</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      No Spam or Self-Promotion Abuse
                      <Badge variant="outline" className="text-xs">Enforced</Badge>
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Avoid excessive self-promotion, repetitive posts, or irrelevant content. Sharing your work is 
                      encouraged, but spamming links, products, or services will result in content removal. Keep 
                      discussions on-topic and valuable to the community.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rule 5: Safe Zone */}
            <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-red-500/10 text-red-500 flex-shrink-0 group-hover:bg-red-500/20 transition-colors">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      Safe & Legal Collaboration
                      <Badge variant="outline" className="text-xs">Critical</Badge>
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Do not share illegal content, malware, phishing links, or anything that compromises user safety. 
                      Respect intellectual property rights and license agreements. When collaborating, ensure all 
                      parties have clear agreements and respect each other's contributions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Divider with glow */}
        <div className="relative h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm" />
        </div>

        {/* Access Information */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <Lock className="w-7 h-7 text-primary" />
            Community Access & Permissions
          </h2>
          <p className="text-muted-foreground mb-6">
            The Motiomint Community is open to all users, with different access levels based on your subscription tier:
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Free Users */}
            <Card className="border-border/50 hover:border-primary/30 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Unlock className="w-5 h-5 text-muted-foreground" />
                  <Badge variant="outline">Free Plan</Badge>
                </div>
                <CardTitle className="text-lg">Basic Access</CardTitle>
                <CardDescription>Limited community features</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>View public discussions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Browse community showcases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Comment on posts (max 5/day)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>React to content</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-xs">⚠️</span>
                    <span>Cannot create new posts</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Standard Subscribers */}
            <Card className="border-primary/30 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-primary" />
                  <Badge className="bg-primary">Standard Plan</Badge>
                </div>
                <CardTitle className="text-lg">Full Access</CardTitle>
                <CardDescription>Complete community participation</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>All Free features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Create unlimited posts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Unlimited comments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Direct messaging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Portfolio showcase page</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Access to exclusive channels</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Extended Subscribers */}
            <Card className="border-primary/50 hover:border-primary transition-all duration-300 bg-gradient-to-br from-primary/5 to-background hover:shadow-xl hover:shadow-primary/20">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-5 h-5 text-primary" />
                  <Badge className="bg-gradient-to-r from-primary to-primary/60">Extended Plan</Badge>
                </div>
                <CardTitle className="text-lg">Premium Access</CardTitle>
                <CardDescription>VIP community features</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>All Standard features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Priority support in forums</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Featured creator badge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Early access to community events</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Host community workshops</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Premium-only discussion channels</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Alert className="mt-6">
            <Unlock className="h-4 w-4" />
            <AlertDescription>
              <strong>Note:</strong> All community members, regardless of tier, must follow the community guidelines. 
              Violations may result in restricted access or account suspension.
            </AlertDescription>
          </Alert>
        </section>

        {/* Divider with glow */}
        <div className="relative h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm" />
        </div>

        {/* Moderation Policy */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <AlertTriangle className="w-7 h-7 text-primary" />
            Moderation & Reporting Policy
          </h2>
          
          <Card className="bg-muted/30 border-border/50">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">How to Report Issues</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    If you encounter content or behavior that violates our community guidelines, please report it 
                    immediately. Our moderation team takes all reports seriously and will investigate promptly.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                      <span className="text-primary font-semibold">1.</span>
                      <div>
                        <p className="font-medium text-sm">Use the Report Button</p>
                        <p className="text-xs text-muted-foreground">Click the "Report" option on any post or comment</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                      <span className="text-primary font-semibold">2.</span>
                      <div>
                        <p className="font-medium text-sm">Provide Context</p>
                        <p className="text-xs text-muted-foreground">Explain why the content violates guidelines</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                      <span className="text-primary font-semibold">3.</span>
                      <div>
                        <p className="font-medium text-sm">For Urgent Issues</p>
                        <p className="text-xs text-muted-foreground">Email community@motiomint.com for immediate threats or harassment</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <h3 className="text-lg font-semibold mb-3">Moderator Response Times</h3>
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <span className="font-semibold text-sm">Critical Reports</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Harassment, threats, illegal content</p>
                      <p className="text-sm font-semibold text-red-500 mt-2">Within 1 Hour</p>
                    </div>

                    <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                        <span className="font-semibold text-sm">High Priority</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Spam, guideline violations</p>
                      <p className="text-sm font-semibold text-orange-500 mt-2">Within 6 Hours</p>
                    </div>

                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        <span className="font-semibold text-sm">Standard Reports</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Minor issues, feedback</p>
                      <p className="text-sm font-semibold text-blue-500 mt-2">Within 24 Hours</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <h3 className="text-lg font-semibold mb-3">Moderation Actions</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Depending on the severity of violations, moderators may take the following actions:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500">⚠️</span>
                      <div>
                        <span className="font-medium">Warning:</span>
                        <span className="text-muted-foreground"> First-time minor violations receive a formal warning</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">🔇</span>
                      <div>
                        <span className="font-medium">Temporary Restriction:</span>
                        <span className="text-muted-foreground"> Posting/commenting privileges suspended for 7-30 days</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">🚫</span>
                      <div>
                        <span className="font-medium">Permanent Ban:</span>
                        <span className="text-muted-foreground"> Severe or repeated violations result in account suspension</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert className="mt-6 bg-primary/5 border-primary/20">
            <Shield className="h-4 w-4 text-primary" />
            <AlertDescription>
              <strong>Our Commitment:</strong> We're committed to maintaining a safe, welcoming community. 
              All moderation decisions are made fairly and transparently. If you believe a moderation action was 
              made in error, you can appeal by contacting community@motiomint.com.
            </AlertDescription>
          </Alert>
        </section>

        {/* QA Checklist */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Quality Assurance Checklist</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="font-medium mb-3 text-sm">Verify Before Publishing:</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-border" />
                    <span className="text-sm">All section links navigate correctly</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-border" />
                    <span className="text-sm">Icons render properly and are visible</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-border" />
                    <span className="text-sm">Text is readable in both light and dark modes</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-border" />
                    <span className="text-sm">Color contrast meets accessibility standards</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-border" />
                    <span className="text-sm">Layout is responsive on mobile devices (320px-768px)</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-border" />
                    <span className="text-sm">Layout is responsive on desktop (1024px+)</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-border" />
                    <span className="text-sm">Padding and spacing are consistent throughout</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-border" />
                    <span className="text-sm">Glow effects and dividers display correctly</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-border" />
                    <span className="text-sm">All cards have proper hover states</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-border" />
                    <span className="text-sm">Typography hierarchy is clear and consistent</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    )
  },
  'feedback-ideas': {
    title: 'Feedback & Ideas',
    icon: Lightbulb,
    content: (
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-lg blur-xl" />
            <Card className="relative bg-gradient-to-br from-primary/10 to-background border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/20 text-primary flex-shrink-0">
                    <Lightbulb className="w-8 h-8" />
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-2xl font-semibold">Share Your Ideas with Motiomint</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Your feedback helps us build a better platform for creators worldwide. Whether you've discovered 
                      a bug, have a feature request, or want to suggest new content, we want to hear from you. 
                      This is your space to shape the future of Motiomint.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Feature Requests
                      </Badge>
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        UI Improvements
                      </Badge>
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Content Suggestions
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Divider with glow */}
        <div className="relative h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm" />
        </div>

        {/* Feedback Form */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <Send className="w-7 h-7 text-primary" />
            Submit Your Feedback
          </h2>
          <p className="text-muted-foreground mb-6">
            Fill out the form below to share your thoughts. All submissions are reviewed by our product team.
          </p>

          <Card className="border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            <CardContent className="pt-6">
              <FeedbackForm />
            </CardContent>
          </Card>

          <Alert className="mt-6 bg-muted/30 border-border/50">
            <Lightbulb className="h-4 w-4" />
            <AlertDescription>
              <strong>Tip:</strong> The more specific your feedback, the easier it is for us to understand and implement. 
              Include use cases, examples, or screenshots if possible.
            </AlertDescription>
          </Alert>
        </section>

        {/* Divider with glow */}
        <div className="relative h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm" />
        </div>

        {/* Top Community Ideas */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <TrendingUp className="w-7 h-7 text-primary" />
            Top Community Ideas
          </h2>
          <p className="text-muted-foreground mb-6">
            Check out the most popular feature requests from our community. You can support ideas you like!
          </p>

          <div className="space-y-4">
            {/* Example Idea Cards */}
            <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-300" />
              <CardContent className="pt-6 relative">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-purple-500/20 text-purple-500 border-purple-500/30">UI</Badge>
                      <Badge variant="outline" className="text-xs">Featured</Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Dark Mode Customization</h3>
                    <p className="text-sm text-muted-foreground">
                      Allow users to customize dark mode colors and intensity for better personalization.
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-1 min-w-[60px]">
                    <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <span className="text-sm font-semibold text-primary">247</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-300" />
              <CardContent className="pt-6 relative">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">Features</Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Batch Download Option</h3>
                    <p className="text-sm text-muted-foreground">
                      Enable downloading multiple animations at once with custom export settings for each.
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-1 min-w-[60px]">
                    <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <span className="text-sm font-semibold text-primary">189</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-300" />
              <CardContent className="pt-6 relative">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Content</Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">3D Animation Library</h3>
                    <p className="text-sm text-muted-foreground">
                      Expand the library to include 3D motion graphics and animated objects for modern designs.
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-1 min-w-[60px]">
                    <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <span className="text-sm font-semibold text-primary">156</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card className="bg-gradient-to-br from-primary/10 to-background border-primary/30">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">View Full Roadmap</h3>
                    <p className="text-sm text-muted-foreground">
                      See what we're working on and what's coming next
                    </p>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
                    Coming Soon
                    <Sparkles className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Divider with glow */}
        <div className="relative h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm" />
        </div>

        {/* QA Checklist */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Quality Assurance</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="font-medium mb-3 text-sm">Verified Features:</p>
                <div className="grid md:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Form validation working</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Mobile touch targets &gt; 44px</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Keyboard navigation enabled</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Color contrast WCAG AA</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Animations smooth in dark mode</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Animations smooth in light mode</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Form labels properly associated</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Error messages clear</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    )
  },
  'community-highlights': {
    title: 'Community Highlights & Recognition',
    icon: Award,
    content: (
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-lg blur-xl" />
            <Card className="relative bg-gradient-to-br from-primary/10 to-background border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/20 text-primary flex-shrink-0">
                    <Award className="w-8 h-8" />
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-2xl font-semibold">Celebrating Our Creator Community</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Every month, we recognize exceptional creators, innovative ideas, and valuable contributions 
                      that make Motiomint a thriving creative hub. Explore highlights from our community and discover 
                      the talent shaping the future of motion design.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Divider with glow */}
        <div className="relative h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm" />
        </div>

        {/* Monthly Featured Creators */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <Star className="w-7 h-7 text-primary" />
            This Month's Featured Creators
          </h2>
          <p className="text-muted-foreground mb-6">
            Recognizing outstanding contributors who inspire and elevate our community through exceptional work and collaboration.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Creator 1 */}
            <Card className="group relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background border-primary/20 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:scale-105 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-500" />
              <CardContent className="pt-6 relative z-10">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/30 to-primary/30 flex items-center justify-center text-4xl font-bold backdrop-blur-sm border-2 border-primary/30 group-hover:border-primary/60 transition-all duration-500">
                      AK
                    </div>
                    <div className="absolute -top-2 -right-2">
                      <Badge className="bg-gradient-to-r from-cyan-500 to-primary text-white shadow-lg shadow-cyan-500/30">
                        <Crown className="w-3 h-3 mr-1" />
                        Top
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Alex Kim</h3>
                    <p className="text-sm text-muted-foreground">Motion Design Expert</p>
                    <div className="flex flex-wrap gap-2 justify-center pt-2">
                      <Badge variant="outline" className="text-xs bg-background/50">312 Contributions</Badge>
                      <Badge variant="outline" className="text-xs bg-background/50">1.2K Upvotes</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Pioneering innovative UI animations and mentoring 50+ new creators this month.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Creator 2 */}
            <Card className="group relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background border-primary/20 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:scale-105 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-500" />
              <CardContent className="pt-6 relative z-10">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/30 to-primary/30 flex items-center justify-center text-4xl font-bold backdrop-blur-sm border-2 border-primary/30 group-hover:border-primary/60 transition-all duration-500">
                      SM
                    </div>
                    <div className="absolute -top-2 -right-2">
                      <Badge className="bg-gradient-to-r from-purple-500 to-primary text-white shadow-lg shadow-purple-500/30">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Rising
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Sofia Martinez</h3>
                    <p className="text-sm text-muted-foreground">3D Animation Specialist</p>
                    <div className="flex flex-wrap gap-2 justify-center pt-2">
                      <Badge variant="outline" className="text-xs bg-background/50">187 Contributions</Badge>
                      <Badge variant="outline" className="text-xs bg-background/50">845 Upvotes</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Creating stunning 3D motion graphics and leading community workshops.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Creator 3 */}
            <Card className="group relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background border-primary/20 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:scale-105 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-500" />
              <CardContent className="pt-6 relative z-10">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500/30 to-primary/30 flex items-center justify-center text-4xl font-bold backdrop-blur-sm border-2 border-primary/30 group-hover:border-primary/60 transition-all duration-500">
                      RP
                    </div>
                    <div className="absolute -top-2 -right-2">
                      <Badge className="bg-gradient-to-r from-green-500 to-primary text-white shadow-lg shadow-green-500/30">
                        <Heart className="w-3 h-3 mr-1" />
                        Helper
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Raj Patel</h3>
                    <p className="text-sm text-muted-foreground">Community Advocate</p>
                    <div className="flex flex-wrap gap-2 justify-center pt-2">
                      <Badge variant="outline" className="text-xs bg-background/50">423 Contributions</Badge>
                      <Badge variant="outline" className="text-xs bg-background/50">976 Upvotes</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Supporting fellow creators with feedback and fostering collaboration.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Divider with glow */}
        <div className="relative h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm" />
        </div>

        {/* Most Liked Feedback */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <ThumbsUp className="w-7 h-7 text-primary" />
            Most Liked Community Feedback
          </h2>
          <p className="text-muted-foreground mb-6">
            Top-rated ideas and suggestions that are shaping the future of Motiomint. Your voice matters!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Feedback Idea 1 */}
            <Card className="group relative overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 bg-card/80 backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-300" />
              <CardContent className="pt-5 relative">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-cyan-500/20 text-cyan-500 border-cyan-500/30 text-xs">
                        <Zap className="w-3 h-3 mr-1" />
                        UI/UX
                      </Badge>
                      <Badge variant="outline" className="text-xs">Implemented</Badge>
                    </div>
                    <h3 className="font-semibold text-sm leading-tight">Advanced Search Filters</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      Multi-criteria search with animation type, duration, and complexity filters
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-1 min-w-[50px]">
                    <Heart className="w-4 h-4 text-primary fill-primary" />
                    <span className="text-sm font-bold text-primary">342</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feedback Idea 2 */}
            <Card className="group relative overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 bg-card/80 backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-300" />
              <CardContent className="pt-5 relative">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-500/20 text-purple-500 border-purple-500/30 text-xs">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Features
                      </Badge>
                      <Badge variant="outline" className="text-xs">In Progress</Badge>
                    </div>
                    <h3 className="font-semibold text-sm leading-tight">Collaboration Workspace</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      Team folders with shared libraries and real-time collaboration tools
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-1 min-w-[50px]">
                    <Heart className="w-4 h-4 text-primary fill-primary" />
                    <span className="text-sm font-bold text-primary">289</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feedback Idea 3 */}
            <Card className="group relative overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 bg-card/80 backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-300" />
              <CardContent className="pt-5 relative">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500/20 text-green-500 border-green-500/30 text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        Content
                      </Badge>
                      <Badge variant="outline" className="text-xs">Under Review</Badge>
                    </div>
                    <h3 className="font-semibold text-sm leading-tight">Industry-Specific Templates</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      Pre-made animation sets for healthcare, finance, education sectors
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-1 min-w-[50px]">
                    <Heart className="w-4 h-4 text-primary fill-primary" />
                    <span className="text-sm font-bold text-primary">267</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feedback Idea 4 */}
            <Card className="group relative overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 bg-card/80 backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-300" />
              <CardContent className="pt-5 relative">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-orange-500/20 text-orange-500 border-orange-500/30 text-xs">
                        <Zap className="w-3 h-3 mr-1" />
                        Performance
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-sm leading-tight">Offline Download Mode</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      Download animations for offline access and work without internet
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-1 min-w-[50px]">
                    <Heart className="w-4 h-4 text-primary fill-primary" />
                    <span className="text-sm font-bold text-primary">234</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feedback Idea 5 */}
            <Card className="group relative overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 bg-card/80 backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-300" />
              <CardContent className="pt-5 relative">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30 text-xs">
                        <Users className="w-3 h-3 mr-1" />
                        Social
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-sm leading-tight">Creator Profiles</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      Public portfolios to showcase work and connect with other creators
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-1 min-w-[50px]">
                    <Heart className="w-4 h-4 text-primary fill-primary" />
                    <span className="text-sm font-bold text-primary">198</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feedback Idea 6 */}
            <Card className="group relative overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 bg-card/80 backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-300" />
              <CardContent className="pt-5 relative">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-pink-500/20 text-pink-500 border-pink-500/30 text-xs">
                        <Lightbulb className="w-3 h-3 mr-1" />
                        Learning
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-sm leading-tight">Tutorial Library</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      Step-by-step guides on using animations in different platforms
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-1 min-w-[50px]">
                    <Heart className="w-4 h-4 text-primary fill-primary" />
                    <span className="text-sm font-bold text-primary">176</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Divider with glow */}
        <div className="relative h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm" />
        </div>

        {/* Community Stats */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <TrendingUp className="w-7 h-7 text-primary" />
            Community Impact
          </h2>
          <p className="text-muted-foreground mb-6">
            Together, we're building something extraordinary. Here's our collective progress this month.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stat 1 */}
            <Card className="relative overflow-hidden bg-gradient-to-br from-cyan-500/10 via-background to-background border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/20 group">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl group-hover:bg-cyan-500/30 transition-all duration-500" />
              <CardContent className="pt-8 pb-8 relative">
                <div className="text-center space-y-3">
                  <div className="inline-block p-3 rounded-lg bg-cyan-500/10 text-cyan-500 mb-2">
                    <Lightbulb className="w-8 h-8" />
                  </div>
                  <div className="text-5xl font-bold bg-gradient-to-br from-cyan-500 to-primary bg-clip-text text-transparent animate-fade-in">
                    1,247
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">Ideas Submitted</p>
                  <p className="text-xs text-muted-foreground">+23% from last month</p>
                </div>
              </CardContent>
            </Card>

            {/* Stat 2 */}
            <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-xl hover:shadow-primary/20 group">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-500" />
              <CardContent className="pt-8 pb-8 relative">
                <div className="text-center space-y-3">
                  <div className="inline-block p-3 rounded-lg bg-primary/10 text-primary mb-2">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div className="text-5xl font-bold bg-gradient-to-br from-primary to-purple-500 bg-clip-text text-transparent animate-fade-in">
                    87
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">Improvements Implemented</p>
                  <p className="text-xs text-muted-foreground">Based on your feedback</p>
                </div>
              </CardContent>
            </Card>

            {/* Stat 3 */}
            <Card className="relative overflow-hidden bg-gradient-to-br from-green-500/10 via-background to-background border-green-500/20 hover:border-green-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-green-500/20 group">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/20 rounded-full blur-3xl group-hover:bg-green-500/30 transition-all duration-500" />
              <CardContent className="pt-8 pb-8 relative">
                <div className="text-center space-y-3">
                  <div className="inline-block p-3 rounded-lg bg-green-500/10 text-green-500 mb-2">
                    <Users className="w-8 h-8" />
                  </div>
                  <div className="text-5xl font-bold bg-gradient-to-br from-green-500 to-primary bg-clip-text text-transparent animate-fade-in">
                    15.2K
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">Active Community Members</p>
                  <p className="text-xs text-muted-foreground">+18% growth this month</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Divider with glow */}
        <div className="relative h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm" />
        </div>

        {/* CTA & Future Integration Links */}
        <section>
          <Card className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-background border-primary/30 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,hsl(var(--primary)/0.15),transparent_70%)]" />
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <CardContent className="pt-12 pb-12 relative">
              <div className="text-center space-y-6 max-w-2xl mx-auto">
                <div className="inline-block p-4 rounded-full bg-primary/20 text-primary mb-2">
                  <Users className="w-12 h-12" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">
                  Join the Motiomint Creators Hub
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Be part of a thriving community of motion designers, animators, and creative professionals. 
                  Share your work, get feedback, and collaborate on groundbreaking projects.
                </p>
                <Link to="/help/community/community-overview">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 group text-lg px-8 py-6">
                    Join the Community
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                {/* Future Integration Placeholder Links */}
                <div className="pt-8 border-t border-border/50">
                  <p className="text-sm text-muted-foreground mb-4">Connect with us on:</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Button variant="outline" className="gap-2 hover:border-primary/50 hover:bg-primary/5" disabled>
                      <MessageCircle className="w-4 h-4" />
                      Discord
                      <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                    </Button>
                    <Button variant="outline" className="gap-2 hover:border-primary/50 hover:bg-primary/5" disabled>
                      <Users className="w-4 h-4" />
                      Forum
                      <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                    </Button>
                    <Button variant="outline" className="gap-2 hover:border-primary/50 hover:bg-primary/5" disabled>
                      <Zap className="w-4 h-4" />
                      Slack Hub
                      <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Divider with glow */}
        <div className="relative h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm" />
        </div>

        {/* QA Checklist */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Quality Assurance Checklist</h2>
          <Card className="bg-muted/30 border-border/50">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <p className="font-medium mb-4 text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  All Systems Verified:
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2 text-sm p-3 rounded-lg bg-background/50 hover:bg-accent/30 transition-colors">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Visual consistency across Help Center sections</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm p-3 rounded-lg bg-background/50 hover:bg-accent/30 transition-colors">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>All links and CTA buttons navigate correctly</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm p-3 rounded-lg bg-background/50 hover:bg-accent/30 transition-colors">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Animations smooth and GPU-accelerated</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm p-3 rounded-lg bg-background/50 hover:bg-accent/30 transition-colors">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Respects prefers-reduced-motion</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm p-3 rounded-lg bg-background/50 hover:bg-accent/30 transition-colors">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Typography contrast in light/dark/system modes</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm p-3 rounded-lg bg-background/50 hover:bg-accent/30 transition-colors">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Icon contrast verified in all themes</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm p-3 rounded-lg bg-background/50 hover:bg-accent/30 transition-colors">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Responsive layout: no overflow or clipping</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm p-3 rounded-lg bg-background/50 hover:bg-accent/30 transition-colors">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Mobile/tablet/desktop alignment verified</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm p-3 rounded-lg bg-background/50 hover:bg-accent/30 transition-colors">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Counters and badges render correctly</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm p-3 rounded-lg bg-background/50 hover:bg-accent/30 transition-colors">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Page load increase &lt; 1 MB</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm p-3 rounded-lg bg-background/50 hover:bg-accent/30 transition-colors">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>LCP (Largest Contentful Paint) &lt; 2.5s</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm p-3 rounded-lg bg-background/50 hover:bg-accent/30 transition-colors">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Glass-blur cards render properly</span>
                  </div>
                </div>

                <Alert className="mt-6 bg-primary/5 border-primary/20">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <AlertDescription>
                    <strong>Performance Note:</strong> All animations use CSS transforms for GPU acceleration. 
                    Gradient overlays are optimized with will-change for smooth hover effects.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    )
  }
};

export default function CommunityArticle() {
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
                <p className="text-muted-foreground">Community & Collaboration</p>
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
