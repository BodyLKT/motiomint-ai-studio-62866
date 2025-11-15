import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, BookOpen, CreditCard, Shield, HelpCircle, FileText, MessageCircle, Headphones, Users } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface SidebarItem {
  title: string;
  path: string;
}

interface SidebarCategory {
  icon: any;
  title: string;
  basePath: string;
  items: SidebarItem[];
}

const sidebarCategories: SidebarCategory[] = [
  {
    icon: BookOpen,
    title: 'Getting Started',
    basePath: '/help/getting-started',
    items: [
      { title: 'How to Create an Account', path: '/help/getting-started/create-account' },
      { title: 'Browsing Animations', path: '/help/getting-started/browsing-animations' },
      { title: 'Understanding Categories', path: '/help/getting-started/understanding-categories' },
      { title: 'First Download Guide', path: '/help/getting-started/first-download' },
    ],
  },
  {
    icon: CreditCard,
    title: 'Subscription & Billing',
    basePath: '/help/subscription-billing',
    items: [
      { title: 'Subscription Plans', path: '/help/subscription-billing/subscription-plans' },
      { title: 'Upgrade or Downgrade', path: '/help/subscription-billing/upgrade-downgrade' },
      { title: 'Billing & Payment', path: '/help/subscription-billing/billing-payment' },
      { title: 'Cancellation & Refund', path: '/help/subscription-billing/cancellation-refund' },
    ],
  },
  {
    icon: Shield,
    title: 'License & Usage',
    basePath: '/help/license-usage',
    items: [
      { title: 'License Types', path: '/help/license-usage/license-types' },
      { title: 'Commercial Use', path: '/help/license-usage/commercial-use' },
      { title: 'Attribution Requirements', path: '/help/license-usage/attribution-requirements' },
      { title: 'Corporate & Agency Use', path: '/help/license-usage/corporate-agency-team' },
      { title: 'Copyright Claims', path: '/help/license-usage/copyright-claims' },
    ],
  },
  {
    icon: Headphones,
    title: 'Contact & Support',
    basePath: '/help/contact-support',
    items: [
      { title: 'Support Email', path: '/help/contact-support/support-email' },
      { title: 'Submit a Request', path: '/help/contact-support/submit-request' },
      { title: 'Support Channels', path: '/help/contact-support/support-channels' },
      { title: 'Live Chat', path: '/help/contact-support/live-chat' },
      { title: 'Troubleshooting', path: '/help/contact-support/troubleshooting' },
    ],
  },
  {
    icon: Users,
    title: 'Community',
    basePath: '/help/community',
    items: [
      { title: 'Community Overview', path: '/help/community/community-overview' },
      { title: 'Feedback & Ideas', path: '/help/community/feedback-ideas' },
      { title: 'Community Highlights', path: '/help/community/community-highlights' },
    ],
  },
  {
    icon: FileText,
    title: 'Terms & Policies',
    basePath: '/help/terms-policies',
    items: [
      { title: 'Terms of Service', path: '/help/terms-policies/terms-of-service' },
      { title: 'Privacy Policy', path: '/help/terms-policies/privacy-policy' },
      { title: 'Cookie Policy', path: '/help/terms-policies/cookie-policy' },
      { title: 'Intellectual Property', path: '/help/terms-policies/intellectual-property' },
    ],
  },
];

export default function HelpCenterSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Determine which category should be open based on current path
  const getDefaultOpenState = (basePath: string) => {
    return currentPath.startsWith(basePath);
  };

  return (
    <aside
      className="fixed top-20 left-0 h-[calc(100vh-5rem)] w-64 border-r border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40 hidden lg:block"
      role="navigation"
      aria-label="Help Center Navigation"
    >
      <ScrollArea className="h-full py-6 px-3">
        <nav className="space-y-2">
          {sidebarCategories.map((category) => {
            const Icon = category.icon;
            const isActive = currentPath.startsWith(category.basePath);
            
            return (
              <Collapsible
                key={category.title}
                defaultOpen={getDefaultOpenState(category.basePath)}
                className="group/collapsible"
              >
                <CollapsibleTrigger
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    "hover:bg-accent/50 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                  )}
                  aria-label={`Toggle ${category.title} section`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={cn("h-4 w-4 transition-colors", isActive && "text-primary")} />
                    <span>{category.title}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
                <CollapsibleContent className="animate-accordion-down">
                  <div className="ml-6 mt-1 space-y-1 border-l border-border/50 pl-3">
                    {category.items.map((item) => {
                      const isItemActive = currentPath === item.path;
                      
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={cn(
                            "block rounded-md px-3 py-2 text-sm transition-all duration-200",
                            "hover:bg-accent/50 hover:text-accent-foreground hover:translate-x-0.5",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            isItemActive
                              ? "bg-primary/10 text-primary font-medium border-l-2 border-primary -ml-[2px] pl-[14px]"
                              : "text-muted-foreground"
                          )}
                          aria-current={isItemActive ? 'page' : undefined}
                        >
                          {item.title}
                        </Link>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </nav>
      </ScrollArea>
    </aside>
  );
}
