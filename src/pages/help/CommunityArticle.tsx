import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, MessageCircle, Heart, Lightbulb, Shield, AlertTriangle, CheckCircle, Lock, Unlock, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import MainNavigation from '@/components/navigation/MainNavigation';

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
