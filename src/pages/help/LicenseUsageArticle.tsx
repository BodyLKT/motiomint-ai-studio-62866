import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Check, X, AlertCircle, BookOpen, FileText, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import MainNavigation from '@/components/navigation/MainNavigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function LicenseUsageArticle() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const articles = {
    'license-types': {
      title: 'License Types Overview',
      icon: Scale,
      content: (
        <div className="space-y-8">
          {/* Introduction */}
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground">
              Motiomint offers three distinct license types to suit different usage needs. Each license grants specific rights and comes with particular restrictions to ensure fair use and protect creators.
            </p>
          </div>

          {/* Free License */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Free License</CardTitle>
                  <CardDescription>Perfect for personal projects and testing</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  What's Allowed
                </h4>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Personal, non-commercial projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Educational and learning purposes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Portfolio and mockup presentations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Testing and prototyping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Use with watermark included</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <X className="w-5 h-5 text-red-500" />
                  What's Restricted
                </h4>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Commercial use or monetization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Redistribution or resale</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Use in paid products or services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Removal of watermark</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Client projects or freelance work</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Standard License */}
          <Card className="border-2 border-primary/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    Standard License
                    <Badge variant="default">Most Popular</Badge>
                  </CardTitle>
                  <CardDescription>For commercial projects and client work</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  What's Allowed
                </h4>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Commercial use in digital and print projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Client projects and freelance work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Websites, apps, and software (single end product)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Social media content and advertising</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Video production and presentations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Up to 500,000 end users or views</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>No watermark</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <X className="w-5 h-5 text-red-500" />
                  What's Restricted
                </h4>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Redistribution as stock, template, or tool</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Use in merchandise for sale</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Broadcast television or theatrical release</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Multiple end products (requires Extended License)</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Extended License */}
          <Card className="border-2 border-purple-500/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    Extended License
                    <Badge variant="secondary" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
                      Enterprise
                    </Badge>
                  </CardTitle>
                  <CardDescription>For large-scale and broadcast projects</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  What's Allowed (Everything in Standard, plus)
                </h4>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Unlimited end users or views</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Broadcast television and streaming platforms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Theatrical film releases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Physical products and merchandise for sale</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Multiple end products and templates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>SaaS products with unlimited subscribers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Priority support and custom licensing terms available</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <X className="w-5 h-5 text-red-500" />
                  What's Restricted
                </h4>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Redistribution as standalone digital assets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Claiming authorship or copyright of the animations</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Comparison Table */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">License Comparison</h3>
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">Feature</TableHead>
                        <TableHead className="text-center">Free</TableHead>
                        <TableHead className="text-center">Standard</TableHead>
                        <TableHead className="text-center">Extended</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Personal Use</TableCell>
                        <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                        <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                        <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Commercial Use</TableCell>
                        <TableCell className="text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></TableCell>
                        <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                        <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Client Projects</TableCell>
                        <TableCell className="text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></TableCell>
                        <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                        <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Watermark Removal</TableCell>
                        <TableCell className="text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></TableCell>
                        <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                        <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">End User Limit</TableCell>
                        <TableCell className="text-center text-muted-foreground">N/A</TableCell>
                        <TableCell className="text-center">500K</TableCell>
                        <TableCell className="text-center">Unlimited</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Physical Products</TableCell>
                        <TableCell className="text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></TableCell>
                        <TableCell className="text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></TableCell>
                        <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Broadcast/Streaming</TableCell>
                        <TableCell className="text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></TableCell>
                        <TableCell className="text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></TableCell>
                        <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Multiple End Products</TableCell>
                        <TableCell className="text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></TableCell>
                        <TableCell className="text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></TableCell>
                        <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Important Note */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> Licenses are granted per animation download. Using the same animation in multiple projects may require multiple licenses depending on the license type and usage scope.
            </AlertDescription>
          </Alert>
        </div>
      ),
    },
    'commercial-use': {
      title: 'Commercial Use Guidelines',
      icon: FileText,
      content: (
        <div className="space-y-8">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground">
              Understanding what constitutes commercial use is essential for choosing the right license. This guide provides clear examples of acceptable and prohibited uses.
            </p>
          </div>

          {/* Acceptable Use Cases */}
          <Card className="border-green-500/20 bg-green-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <Check className="w-6 h-6" />
                Acceptable Commercial Uses (Standard & Extended License)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Digital Projects</h4>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <strong>Corporate Website:</strong> Using animations in your company website's hero section, feature showcase, or loading screens
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <strong>Mobile App:</strong> Integrating animations into your iOS or Android app's UI/UX
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <strong>Client Projects:</strong> Freelancers and agencies using animations in client deliverables
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <strong>E-learning Platform:</strong> Educational content with animations for paid courses
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Marketing & Advertising</h4>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <strong>Social Media Campaigns:</strong> Instagram stories, TikTok videos, YouTube ads with animations
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <strong>Product Videos:</strong> Promotional videos showcasing your product or service
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <strong>Email Marketing:</strong> Animated elements in marketing email campaigns
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Extended License Only</h4>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <strong>Physical Merchandise:</strong> T-shirts, mugs, posters with printed animations
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <strong>Broadcast Content:</strong> TV commercials, streaming service content, theatrical releases
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <strong>SaaS Templates:</strong> Website builders or design tools offering animations to subscribers
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prohibited Use Cases */}
          <Card className="border-red-500/20 bg-red-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <X className="w-6 h-6" />
                Prohibited Uses (All Licenses)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <strong>Reselling as Stock:</strong> Uploading animations to other stock websites or marketplaces
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <strong>Standalone Redistribution:</strong> Sharing, selling, or giving away animations as downloadable files
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <strong>NFT Minting:</strong> Creating or selling animations as NFTs without explicit written permission
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <strong>Claiming Authorship:</strong> Removing creator credits or claiming you created the animations
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <strong>Logo/Trademark Use:</strong> Using animations as your company logo or trademark (requires custom license)
                    </div>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Real-World Scenarios */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Real-World Scenarios</h3>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Scenario 1: Freelance Web Designer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  <strong>Situation:</strong> You're designing a website for a restaurant client and want to use animations for menu items.
                </p>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <p className="font-semibold text-green-600 dark:text-green-400 mb-2">✓ Required License: Standard</p>
                  <p className="text-sm">This is commercial client work with a single end product (the restaurant website). A Standard License covers this use case.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Scenario 2: YouTube Content Creator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  <strong>Situation:</strong> You want to use animations in your monetized YouTube videos.
                </p>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <p className="font-semibold text-green-600 dark:text-green-400 mb-2">✓ Required License: Standard (if under 500K views per video) or Extended (unlimited views)</p>
                  <p className="text-sm">YouTube monetization is commercial use. Choose based on your expected viewership.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Scenario 3: SaaS Startup</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  <strong>Situation:</strong> You're building a project management app with 50,000 users and growing.
                </p>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <p className="font-semibold text-green-600 dark:text-green-400 mb-2">✓ Required License: Standard (initially), Extended (when scaling beyond 500K users)</p>
                  <p className="text-sm">Start with Standard, upgrade to Extended as your user base grows beyond 500,000 active users.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Scenario 4: T-Shirt Business</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  <strong>Situation:</strong> You want to print animations on t-shirts to sell online.
                </p>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <p className="font-semibold text-green-600 dark:text-green-400 mb-2">✓ Required License: Extended</p>
                  <p className="text-sm">Physical merchandise requires an Extended License regardless of quantity sold.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact for Custom Licensing */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Need something specific?</strong> If your use case doesn't fit standard licensing options, contact our team for custom licensing arrangements at licensing@motiomint.com
            </AlertDescription>
          </Alert>
        </div>
      ),
    },
  };

  const article = slug ? articles[slug as keyof typeof articles] : null;

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <MainNavigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <Button onClick={() => navigate('/help')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Help Center
          </Button>
        </div>
      </div>
    );
  }

  const ArticleIcon = article.icon;

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      
      {/* Header */}
      <section className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-background py-12 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => navigate('/help')}
              className="mb-6 -ml-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Help Center
            </Button>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <ArticleIcon className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span>License & Usage</span>
                  <span>•</span>
                  <span>5 min read</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">{article.title}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {article.content}
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">Was this article helpful?</p>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">Yes</Button>
                <Button variant="outline" size="sm">No</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
