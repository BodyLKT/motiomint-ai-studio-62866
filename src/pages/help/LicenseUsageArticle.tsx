import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Check, X, AlertCircle, BookOpen, FileText, Scale, Copy, Edit3, Code, Image } from 'lucide-react';
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
    'attribution-requirements': {
      title: 'Usage Rights & Attribution Requirements',
      icon: Copy,
      content: (
        <div className="space-y-8">
          {/* Introduction */}
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground">
              Understanding when and how to attribute Motiomint content is crucial for compliance and respecting creator rights. This guide provides clear rules and formatting examples.
            </p>
          </div>

          {/* When Attribution is Required */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl">When is Attribution Mandatory?</CardTitle>
                  <CardDescription>Clear rules based on your license type</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Free License Attribution */}
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-500" />
                  Free License Users
                </h4>
                <p className="text-muted-foreground mb-4">
                  <strong className="text-foreground">Attribution is ALWAYS required</strong> when using animations under the Free License. This applies to all public-facing projects, including:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                    <span>Personal websites and portfolios</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                    <span>Educational presentations and projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                    <span>Social media posts (non-commercial)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                    <span>Mockups and prototypes</span>
                  </li>
                </ul>
              </div>

              {/* Paid License Attribution */}
              <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  Standard & Extended License Users
                </h4>
                <p className="text-muted-foreground mb-4">
                  <strong className="text-foreground">Attribution is optional but appreciated.</strong> While not legally required, giving credit helps support the creator community and is considered good practice.
                </p>
                <Alert className="border-green-500/20 bg-green-500/5">
                  <AlertCircle className="h-4 w-4 text-green-500" />
                  <AlertDescription>
                    If you choose to provide attribution with a paid license, it demonstrates professionalism and community support.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Correct Attribution Formatting */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Correct Attribution Formatting</h3>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  Correct Attribution Examples
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Example 1 - Minimal */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Minimal Format (Recommended)</h4>
                    <Badge variant="secondary">Most Common</Badge>
                  </div>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm border border-border">
                    <p className="text-foreground">Video animation by Motiomint</p>
                  </div>
                </div>

                {/* Example 2 - With Link */}
                <div className="space-y-3">
                  <h4 className="font-semibold">With Link (Preferred)</h4>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm border border-border">
                    <p className="text-foreground">
                      Video animation by <a href="https://motiomint.com" className="text-primary underline">Motiomint</a>
                    </p>
                  </div>
                </div>

                {/* Example 3 - Full Format */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Full Format (Optional)</h4>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm border border-border">
                    <p className="text-foreground">
                      Animation: "Fitness Workout Loop" by Motiomint<br />
                      License: Free License<br />
                      Source: https://motiomint.com
                    </p>
                  </div>
                </div>

                {/* Example 4 - Video Credits */}
                <div className="space-y-3">
                  <h4 className="font-semibold">In Video Credits</h4>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm border border-border">
                    <p className="text-foreground">
                      CREDITS<br />
                      Animations: Motiomint (motiomint.com)
                    </p>
                  </div>
                </div>

                {/* HTML Example */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">HTML Attribution Example</h4>
                    <Badge variant="outline" className="gap-1">
                      <Code className="w-3 h-3" />
                      Code
                    </Badge>
                  </div>
                  <div className="bg-slate-900 text-slate-100 rounded-lg p-4 font-mono text-xs border border-slate-700 overflow-x-auto">
                    <code>
                      {'<footer>\n'}
                      {'  <p>Video animations by \n'}
                      {'    <a href="https://motiomint.com" \n'}
                      {'       target="_blank" \n'}
                      {'       rel="noopener">Motiomint</a>\n'}
                      {'  </p>\n'}
                      {'</footer>'}
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Incorrect Examples */}
            <Card className="border-red-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <X className="w-5 h-5" />
                  Incorrect Attribution Examples
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                    <div className="flex items-start gap-2 mb-2">
                      <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold mb-1">Missing Creator Name</p>
                        <p className="font-mono text-sm text-muted-foreground line-through">
                          Video animations from stock library
                        </p>
                        <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                          ✗ Does not credit Motiomint specifically
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                    <div className="flex items-start gap-2 mb-2">
                      <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold mb-1">Claiming Authorship</p>
                        <p className="font-mono text-sm text-muted-foreground line-through">
                          All animations created by [Your Company]
                        </p>
                        <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                          ✗ Falsely claims ownership of animations
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                    <div className="flex items-start gap-2 mb-2">
                      <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold mb-1">Buried in Legal Text</p>
                        <p className="font-mono text-xs text-muted-foreground line-through">
                          [Hidden in 5pt font at bottom of page or in unreadable color]
                        </p>
                        <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                          ✗ Attribution must be clearly visible and readable
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Modification Guidelines */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                  <Edit3 className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-xl">Modifying, Remixing & Embedding Guidelines</CardTitle>
                  <CardDescription>What you can and cannot do with animations</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Allowed Modifications */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  Allowed Modifications
                </h4>
                <ul className="space-y-3 ml-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <strong>Color Adjustments:</strong> Change colors to match your brand palette
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <strong>Resizing & Cropping:</strong> Adjust dimensions and aspect ratios
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <strong>Speed Changes:</strong> Slow down or speed up animation playback
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <strong>Layering:</strong> Combine with other assets in your project
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <strong>Trimming:</strong> Use portions of longer animations
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <strong>Format Conversion:</strong> Convert between video formats (MP4, WebM, GIF, etc.)
                    </div>
                  </li>
                </ul>
              </div>

              {/* Embedding Rules */}
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-500" />
                  Embedding in Websites & Apps
                </h4>
                <p className="text-muted-foreground mb-4">
                  You may embed animations in websites, apps, and software according to your license terms:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                    <span><strong>HTML5 Video:</strong> Use {'<video>'} tags for playback</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                    <span><strong>CSS Backgrounds:</strong> Set as background-image or background-video</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                    <span><strong>Canvas/WebGL:</strong> Integrate into interactive experiences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                    <span><strong>Mobile Apps:</strong> Include in iOS/Android applications</span>
                  </li>
                </ul>
                <Alert className="mt-4 border-blue-500/20">
                  <AlertCircle className="h-4 w-4 text-blue-500" />
                  <AlertDescription>
                    <strong>Important:</strong> Ensure files are not easily downloadable by end users. Use appropriate streaming methods and access controls.
                  </AlertDescription>
                </Alert>
              </div>

              {/* Restricted Modifications */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <X className="w-5 h-5 text-red-500" />
                  Restricted Modifications
                </h4>
                <ul className="space-y-3 ml-6">
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <strong>Removing Watermarks:</strong> Cannot remove watermarks from Free License animations
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <strong>Reverse Engineering:</strong> Cannot recreate source files or extract components for redistribution
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <strong>AI Training:</strong> Cannot use animations to train AI models without explicit permission
                    </div>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Placement Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="w-5 h-5" />
                Where to Place Attribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Websites */}
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-green-600 dark:text-green-400">✓ Websites</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Website footer</li>
                      <li>• Credits page</li>
                      <li>• About page</li>
                      <li>• Near the animation</li>
                    </ul>
                  </div>

                  {/* Videos */}
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-green-600 dark:text-green-400">✓ Videos</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• End credits roll</li>
                      <li>• Video description</li>
                      <li>• Corner watermark (if space allows)</li>
                    </ul>
                  </div>

                  {/* Social Media */}
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-green-600 dark:text-green-400">✓ Social Media</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Post caption/description</li>
                      <li>• First comment</li>
                      <li>• Bio link to credits page</li>
                    </ul>
                  </div>

                  {/* Presentations */}
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-green-600 dark:text-green-400">✓ Presentations</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Final slide</li>
                      <li>• Slide footer</li>
                      <li>• References section</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* QA Checklist */}
          <Card className="border-primary/50 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                Attribution QA Checklist
              </CardTitle>
              <CardDescription>
                Verify your attribution meets requirements before publishing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded border-2 border-primary/50" />
                  <div>
                    <p className="font-medium">Is "Motiomint" clearly mentioned?</p>
                    <p className="text-sm text-muted-foreground">The creator name must be visible and spelled correctly</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded border-2 border-primary/50" />
                  <div>
                    <p className="font-medium">Is the attribution readable?</p>
                    <p className="text-sm text-muted-foreground">Check font size, color contrast, and visibility in both light/dark modes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded border-2 border-primary/50" />
                  <div>
                    <p className="font-medium">Is it in an appropriate location?</p>
                    <p className="text-sm text-muted-foreground">Footer, credits page, or near the animation content</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded border-2 border-primary/50" />
                  <div>
                    <p className="font-medium">Does it link to motiomint.com? (optional but preferred)</p>
                    <p className="text-sm text-muted-foreground">Providing a clickable link helps users discover more content</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded border-2 border-primary/50" />
                  <div>
                    <p className="font-medium">Does it render correctly on mobile devices?</p>
                    <p className="text-sm text-muted-foreground">Test responsiveness across different screen sizes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded border-2 border-primary/50" />
                  <div>
                    <p className="font-medium">Have you tested in both light and dark mode?</p>
                    <p className="text-sm text-muted-foreground">Ensure visibility and proper contrast in both themes</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Final Note */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Need Help?</strong> If you're unsure about attribution requirements for your specific use case, contact our support team at support@motiomint.com for personalized guidance.
            </AlertDescription>
          </Alert>
        </div>
      ),
    },
    'copyright-claims': {
      title: 'Copyright & DMCA Policy',
      icon: Shield,
      content: (
        <div className="space-y-8">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground">
              Placeholder for Copyright Claims article. Content coming soon.
            </p>
          </div>
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
