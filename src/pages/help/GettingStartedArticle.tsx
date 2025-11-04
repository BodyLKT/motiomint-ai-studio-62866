import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Info, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import MainNavigation from '@/components/navigation/MainNavigation';

const articles = {
  'create-account': {
    title: 'How to Create an Account',
    content: (
      <div className="space-y-6">
        <p className="text-lg text-muted-foreground">
          Getting started with Motiomint is quick and easy. Follow these steps to create your account and start exploring thousands of premium animations.
        </p>

        <Alert className="bg-primary/5 border-primary/20">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Creating an account is completely free and gives you immediate access to browse our entire animation library.
          </AlertDescription>
        </Alert>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">1</span>
              Navigate to Sign Up
            </h2>
            <p className="text-muted-foreground mb-4">
              Click the "Sign Up" button located in the top right corner of the homepage. You can also access it from the user menu icon.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
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
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">3</span>
              Accept Terms & Conditions
            </h2>
            <p className="text-muted-foreground mb-4">
              Review and accept our Terms of Service and Privacy Policy by checking the agreement box. These documents outline your rights and responsibilities as a Motiomint user.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">4</span>
              Email Confirmation
            </h2>
            <p className="text-muted-foreground mb-4">
              After submitting the form, you'll receive a confirmation email at the address you provided. Click the verification link in the email to activate your account.
            </p>
            <Alert className="bg-muted border-border">
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Note:</strong> Check your spam folder if you don't see the email within a few minutes. Make sure to add noreply@motiomint.com to your contacts.
              </AlertDescription>
            </Alert>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">5</span>
              Start Exploring
            </h2>
            <p className="text-muted-foreground mb-4">
              Once your email is confirmed, you can log in and start browsing our animation library. Your free account includes:
            </p>
            <ul className="list-none space-y-2 ml-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Access to browse all animation categories</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Preview animations before downloading</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Save favorites to your account</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Download history tracking</span>
              </li>
            </ul>
          </section>
        </div>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2 text-lg">Need Help?</h3>
            <p className="text-muted-foreground text-sm">
              If you encounter any issues during registration, please contact our support team at support@motiomint.com or use the live chat feature.
            </p>
          </CardContent>
        </Card>
      </div>
    ),
  },
  'browsing-animations': {
    title: 'Browsing and Searching Animations',
    content: (
      <div className="space-y-6">
        <p className="text-lg text-muted-foreground">
          Discover the perfect animation for your project with our powerful search and filtering tools. Learn how to efficiently navigate our extensive library.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">1</span>
              Using the Search Bar
            </h2>
            <p className="text-muted-foreground mb-4">
              The search bar is located at the top of every page. Simply type keywords related to the animation you're looking for:
            </p>
            <ul className="list-none space-y-3 ml-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-foreground">Keywords:</strong>
                  <span className="text-muted-foreground"> Try "technology," "abstract," "social media," etc.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-foreground">Specific Terms:</strong>
                  <span className="text-muted-foreground"> Search for "loading spinner," "button animation," "logo reveal"</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-foreground">Style Names:</strong>
                  <span className="text-muted-foreground"> Look for "3D," "flat design," "minimal," "glitch"</span>
                </div>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">2</span>
              Browse by Category
            </h2>
            <p className="text-muted-foreground mb-4">
              Navigate through our organized category system to find animations by type:
            </p>
            <ul className="list-none space-y-2 ml-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Click "Categories" in the main navigation menu</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Select your desired category from the dropdown</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Browse through curated collections within each category</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">3</span>
              Using Filters
            </h2>
            <p className="text-muted-foreground mb-4">
              Refine your search results with our advanced filtering options:
            </p>
            <div className="grid md:grid-cols-2 gap-4 ml-4">
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Style Filters</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 2D / 3D</li>
                    <li>• Abstract / Realistic</li>
                    <li>• Minimal / Detailed</li>
                    <li>• Modern / Vintage</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Technical Filters</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Resolution (HD, 4K, etc.)</li>
                    <li>• Duration (Short, Medium, Long)</li>
                    <li>• Frame Rate</li>
                    <li>• File Format</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">4</span>
              Sorting Options
            </h2>
            <p className="text-muted-foreground mb-4">
              Organize search results to find exactly what you need:
            </p>
            <ul className="list-none space-y-2 ml-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground"><strong>Most Popular:</strong> See what other users love</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground"><strong>Newest First:</strong> Discover latest additions</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground"><strong>Relevance:</strong> Best matches for your search</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">5</span>
              Preview Before Downloading
            </h2>
            <p className="text-muted-foreground mb-4">
              Click on any animation card to open the detail view where you can:
            </p>
            <ul className="list-none space-y-2 ml-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Watch the full animation preview</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">View technical specifications</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">See similar animations</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Check license information</span>
              </li>
            </ul>
          </section>
        </div>

        <Alert className="bg-primary/5 border-primary/20">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Pro Tip:</strong> Use the heart icon to save animations to your favorites for easy access later!
          </AlertDescription>
        </Alert>
      </div>
    ),
  },
  'understanding-categories': {
    title: 'Understanding Animation Categories',
    content: (
      <div className="space-y-6">
        <p className="text-lg text-muted-foreground">
          Motiomint organizes thousands of animations into intuitive categories to help you find exactly what you need. Here's a comprehensive guide to our category system.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Main Categories</h2>
            
            <div className="space-y-6">
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-primary">Business & Corporate</h3>
                  <p className="text-muted-foreground mb-3">
                    Professional animations perfect for presentations, corporate videos, and business communications.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Charts & Graphs</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Infographics</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Logo Reveals</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Team Collaboration</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-primary">Technology & Digital</h3>
                  <p className="text-muted-foreground mb-3">
                    Modern, tech-focused animations for apps, websites, and digital products.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">UI Elements</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Loading Animations</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Cybersecurity</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">AI & Machine Learning</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-primary">Social Media</h3>
                  <p className="text-muted-foreground mb-3">
                    Engaging animations optimized for social platforms and content creation.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Stories & Reels</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Lower Thirds</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Reactions</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Call-to-Actions</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-primary">Abstract & Creative</h3>
                  <p className="text-muted-foreground mb-3">
                    Artistic and experimental animations for creative projects and backgrounds.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Particle Effects</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Geometric Shapes</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Fluid Motion</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Glitch Effects</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-primary">Nature & Lifestyle</h3>
                  <p className="text-muted-foreground mb-3">
                    Organic animations featuring nature, lifestyle, and wellness themes.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Weather Effects</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Seasons</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Health & Fitness</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Travel</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-primary">E-commerce & Marketing</h3>
                  <p className="text-muted-foreground mb-3">
                    Conversion-focused animations for online stores and marketing campaigns.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Product Showcases</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Shopping Icons</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Sale Badges</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Checkout Process</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Tag System</h2>
            <p className="text-muted-foreground mb-4">
              Each animation is tagged with multiple descriptors to improve searchability:
            </p>
            <ul className="list-none space-y-3 ml-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-foreground">Style Tags:</strong>
                  <span className="text-muted-foreground"> Minimal, Modern, Vintage, Futuristic, Hand-drawn, etc.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-foreground">Color Tags:</strong>
                  <span className="text-muted-foreground"> Monochrome, Vibrant, Pastel, Dark, Light, etc.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-foreground">Motion Tags:</strong>
                  <span className="text-muted-foreground"> Smooth, Dynamic, Subtle, Energetic, Looping, etc.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-foreground">Usage Tags:</strong>
                  <span className="text-muted-foreground"> Background, Transition, Button, Icon, Logo, etc.</span>
                </div>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How to Use Categories Effectively</h2>
            <div className="space-y-3">
              <Card className="bg-muted/50 border-border/50">
                <CardContent className="p-4">
                  <p className="text-sm">
                    <strong className="text-foreground">1. Start Broad:</strong>
                    <span className="text-muted-foreground"> Begin with a main category that matches your project type</span>
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-muted/50 border-border/50">
                <CardContent className="p-4">
                  <p className="text-sm">
                    <strong className="text-foreground">2. Narrow Down:</strong>
                    <span className="text-muted-foreground"> Use subcategories and filters to refine results</span>
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-muted/50 border-border/50">
                <CardContent className="p-4">
                  <p className="text-sm">
                    <strong className="text-foreground">3. Explore Tags:</strong>
                    <span className="text-muted-foreground"> Click on tags within animations to discover similar content</span>
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-muted/50 border-border/50">
                <CardContent className="p-4">
                  <p className="text-sm">
                    <strong className="text-foreground">4. Mix Categories:</strong>
                    <span className="text-muted-foreground"> Don't be afraid to browse multiple categories for your project</span>
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>

        <Alert className="bg-primary/5 border-primary/20">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Categories are regularly updated with new animations. Check back frequently to discover fresh content!
          </AlertDescription>
        </Alert>
      </div>
    ),
  },
  'first-download': {
    title: 'Your First Download Guide',
    content: (
      <div className="space-y-6">
        <p className="text-lg text-muted-foreground">
          Ready to download your first animation? This step-by-step guide will walk you through the entire process, from adding items to your cart to accessing your downloaded files.
        </p>

        <Alert className="bg-primary/5 border-primary/20">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Make sure you're logged in before attempting to download. Downloads are tracked in your account for easy re-access.
          </AlertDescription>
        </Alert>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">1</span>
              Find Your Animation
            </h2>
            <p className="text-muted-foreground mb-4">
              Browse or search for the animation you want to download. Once you've found it:
            </p>
            <ul className="list-none space-y-2 ml-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Click on the animation card to view details</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Preview the animation to ensure it's what you need</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Review technical specifications (resolution, duration, file size)</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">2</span>
              Add to Cart
            </h2>
            <p className="text-muted-foreground mb-4">
              If you're satisfied with the animation, click the "Add to Cart" button. You can:
            </p>
            <ul className="list-none space-y-2 ml-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Continue browsing and add more items</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">View your cart by clicking the cart icon in the header</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Proceed to checkout when ready</span>
              </li>
            </ul>
            <Alert className="bg-muted border-border mt-4">
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Subscription Users:</strong> If you have an active subscription, you may have download credits available. Check your plan details.
              </AlertDescription>
            </Alert>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">3</span>
              Choose Download Options
            </h2>
            <p className="text-muted-foreground mb-4">
              Before downloading, you'll be presented with format and quality options:
            </p>
            <div className="grid md:grid-cols-2 gap-4 ml-4">
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3">File Formats</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li><strong className="text-foreground">MP4:</strong> Best for web and social media</li>
                    <li><strong className="text-foreground">MOV:</strong> High quality for video editing</li>
                    <li><strong className="text-foreground">WebM:</strong> Optimized for websites</li>
                    <li><strong className="text-foreground">GIF:</strong> Simple animations (limited)</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3">Quality Options</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li><strong className="text-foreground">4K (3840×2160):</strong> Ultra HD quality</li>
                    <li><strong className="text-foreground">Full HD (1920×1080):</strong> Standard HD</li>
                    <li><strong className="text-foreground">HD (1280×720):</strong> Smaller file size</li>
                    <li><strong className="text-foreground">SD (640×480):</strong> Web optimized</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <p className="text-sm text-muted-foreground mt-4 ml-4">
              Higher quality files will have larger file sizes. Choose based on your project requirements and storage capacity.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">4</span>
              Complete the Download
            </h2>
            <p className="text-muted-foreground mb-4">
              After selecting your preferred options:
            </p>
            <ul className="list-none space-y-2 ml-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Click the "Download" button</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Your browser will begin downloading the file</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">The download will be saved to your default downloads folder</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Large files may take a few minutes depending on your connection</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">5</span>
              Access Your Downloaded Files
            </h2>
            <p className="text-muted-foreground mb-4">
              Once the download is complete:
            </p>
            <ul className="list-none space-y-2 ml-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-foreground">On Windows:</strong>
                  <span className="text-muted-foreground"> Check your Downloads folder (usually C:\Users\YourName\Downloads)</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-foreground">On Mac:</strong>
                  <span className="text-muted-foreground"> Look in your Downloads folder (in Finder sidebar)</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-foreground">On Mobile:</strong>
                  <span className="text-muted-foreground"> Check your device's Downloads app or file manager</span>
                </div>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">6</span>
              Using Your Animation
            </h2>
            <p className="text-muted-foreground mb-4">
              You can now import the animation into your preferred software:
            </p>
            <ul className="list-none space-y-2 ml-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Video editors: Adobe Premiere, Final Cut Pro, DaVinci Resolve</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Motion graphics: After Effects, Blender, Cinema 4D</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Presentations: PowerPoint, Keynote, Google Slides</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Web development: Directly embed in HTML/CSS</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Download History</h2>
            <p className="text-muted-foreground mb-4">
              All your downloads are automatically saved to your account history. You can:
            </p>
            <ul className="list-none space-y-2 ml-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Access past downloads anytime from your Dashboard</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Re-download files in different formats without using credits</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">View download dates and file details</span>
              </li>
            </ul>
          </section>
        </div>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2 text-lg">Troubleshooting Downloads</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• If download fails, check your internet connection and try again</li>
              <li>• Ensure you have sufficient storage space on your device</li>
              <li>• Disable browser extensions that might block downloads</li>
              <li>• Check your browser's download settings and permissions</li>
              <li>• Contact support if issues persist - we're here to help!</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    ),
  },
};

export default function GettingStartedArticle() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const article = slug ? articles[slug as keyof typeof articles] : null;

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <MainNavigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <Button onClick={() => navigate('/help')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Help Center
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <button
              onClick={() => navigate('/help')}
              className="hover:text-primary transition-colors"
            >
              Help Center
            </button>
            <ChevronRight className="w-4 h-4" />
            <button
              onClick={() => navigate('/help')}
              className="hover:text-primary transition-colors"
            >
              Getting Started
            </button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{article.title}</span>
          </div>

          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/help')}
            className="mb-6 -ml-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Help Center
          </Button>

          {/* Article Content */}
          <article className="prose prose-slate dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-6 text-foreground">
              {article.title}
            </h1>
            
            <div className="border-l-4 border-primary pl-6 mb-8">
              <p className="text-sm text-muted-foreground">
                Last updated: November 2025 • 5 min read
              </p>
            </div>

            <div className="mt-8">
              {article.content}
            </div>
          </article>

          {/* Footer Navigation */}
          <div className="mt-16 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold mb-4">Was this article helpful?</h3>
            <div className="flex gap-3">
              <Button variant="outline">👍 Yes</Button>
              <Button variant="outline">👎 No</Button>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(articles)
                .filter(([key]) => key !== slug)
                .slice(0, 2)
                .map(([key, art]) => (
                  <Card
                    key={key}
                    className="cursor-pointer hover:border-primary/50 transition-all"
                    onClick={() => navigate(`/help/getting-started/${key}`)}
                  >
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">{art.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        Learn more about {art.title.toLowerCase()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
