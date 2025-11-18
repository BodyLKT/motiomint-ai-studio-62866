import { useEffect } from 'react';
import MainNavigation from '@/components/navigation/MainNavigation';
import { Footer } from '@/components/Footer';
import { BackToTop } from '@/components/ui/BackToTop';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      
      <main className="container mx-auto px-4 pt-36 pb-24 max-w-4xl">
        <h1 className="text-4xl lg:text-5xl font-bold mb-8 gradient-text">Terms of Service</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">Service Description & Usage</h2>
            <p className="text-muted-foreground leading-relaxed">
              MotioMint provides a platform for accessing and downloading AI-powered animations for social media, 
              marketing, and creative projects. By accessing or using our services, you agree to be bound by these 
              Terms of Service. You must be at least 18 years old or have parental consent to use our platform. 
              You are responsible for maintaining the confidentiality of your account credentials and for all 
              activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">Payments & Subscriptions</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When you purchase a subscription or one-time pack from MotioMint, you agree to the following terms:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>All payments are processed securely through our payment providers</li>
              <li>Subscriptions automatically renew unless cancelled before the renewal date</li>
              <li>You can cancel your subscription at any time from your account dashboard</li>
              <li>Refunds are handled on a case-by-case basis within 14 days of purchase</li>
              <li>Prices are subject to change with notice to existing subscribers</li>
              <li>One-time packs do not expire and remain accessible after purchase</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">License & Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              Upon purchase, you receive a commercial license to use the animations in your projects. This license 
              grants you the right to use, modify, and incorporate the animations into your commercial and personal 
              projects. However, you may not resell, redistribute, or sublicense the raw animation files themselves. 
              All animations and content on MotioMint remain the intellectual property of MotioMint and its content 
              creators.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              MotioMint provides its services "as is" without warranties of any kind, either express or implied. 
              We do not guarantee that our services will be uninterrupted, error-free, or completely secure. 
              In no event shall MotioMint be liable for any indirect, incidental, special, consequential, or 
              punitive damages arising from your use of our services. Our total liability shall not exceed the 
              amount you paid for the services in the past 12 months.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to suspend or terminate your access to MotioMint at any time, with or without 
              notice, for conduct that we believe violates these Terms of Service or is harmful to other users, 
              us, or third parties, or for any other reason. Upon termination, your right to use the services 
              will immediately cease, though licenses for previously downloaded content remain valid.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">Governing Law & Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms of Service are governed by and construed in accordance with applicable laws. 
              Any disputes arising from these terms shall be resolved through binding arbitration. 
              For questions about these terms, please contact us at{' '}
              <a href="mailto:office@motiomint.com" className="text-primary hover:text-primary-glow transition-colors">
                office@motiomint.com
              </a>
            </p>
          </section>

          <section className="pt-8 border-t border-border/20">
            <p className="text-sm text-muted-foreground">
              Last updated: January 2025
            </p>
          </section>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default TermsOfService;
