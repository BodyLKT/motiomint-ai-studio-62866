import { useEffect } from 'react';
import MainNavigation from '@/components/navigation/MainNavigation';
import { Footer } from '@/components/Footer';
import { BackToTop } from '@/components/ui/BackToTop';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      
      <main className="container mx-auto px-4 pt-36 pb-24 max-w-4xl">
        <h1 className="text-4xl lg:text-5xl font-bold mb-8 gradient-text">Privacy Policy</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              At MotioMint, we collect information that you provide directly to us, including your name, email address, 
              and payment information when you create an account or make a purchase. We also automatically collect certain 
              information about your device and how you interact with our services, such as IP address, browser type, 
              and usage patterns.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">How We Use Your Data</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Analyze usage patterns and trends to enhance user experience</li>
              <li>Detect and prevent fraud or other malicious activities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">Cookies & Tracking</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use cookies and similar tracking technologies to collect information about your browsing activities. 
              Cookies help us remember your preferences, understand how you use our services, and improve your experience. 
              You can control cookies through your browser settings, though disabling them may affect the functionality 
              of certain features.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">Third-Party Editors</h2>
            <p className="text-muted-foreground leading-relaxed">
              When you choose to open an animation in a third-party editor (such as Canva, CapCut, or VEED), we may 
              provide that service with a file URL or media asset necessary to load your animation. We do not control 
              how these third parties collect, use, or store your information.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Your use of third-party editors is governed by their own privacy policies. We encourage you to review 
              those policies before using their services. If you prefer not to share data with third-party editors, 
              you can always download your animation directly from MotioMint instead.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">Data Retention & Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this 
              privacy policy, unless a longer retention period is required by law. We implement appropriate technical 
              and organizational measures to protect your personal information against unauthorized access, alteration, 
              disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              You have the right to access, update, or delete your personal information at any time. You can also 
              object to the processing of your data or request that we restrict its use. To exercise these rights or 
              for any privacy-related questions, please contact us at{' '}
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

export default PrivacyPolicy;
