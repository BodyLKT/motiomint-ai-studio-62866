import { LucideIcon, BookOpen, CreditCard, Shield, Headphones, Users, FileText } from 'lucide-react';

export interface HelpArticle {
  id: string;
  title: string;
  description: string;
  path: string;
  category: string;
  categoryPath: string;
  tags: string[];
  keywords: string[];
  icon?: LucideIcon;
}

export interface HelpCategory {
  id: string;
  title: string;
  path: string;
  icon: LucideIcon;
  articles: HelpArticle[];
}

export const helpCenterData: HelpCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    path: '/help/getting-started',
    icon: BookOpen,
    articles: [
      {
        id: 'create-account',
        title: 'How to Create an Account',
        description: 'Step-by-step guide to creating your Motiomint account',
        path: '/help/getting-started/create-account',
        category: 'Getting Started',
        categoryPath: '/help/getting-started',
        tags: ['account', 'signup', 'registration', 'getting started'],
        keywords: ['create account', 'sign up', 'register', 'new user', 'email', 'password', 'verification'],
      },
      {
        id: 'browsing-animations',
        title: 'Browsing Animations',
        description: 'Learn how to browse and discover animations',
        path: '/help/getting-started/browsing-animations',
        category: 'Getting Started',
        categoryPath: '/help/getting-started',
        tags: ['browse', 'search', 'discover', 'animations'],
        keywords: ['browse', 'search', 'filter', 'category', 'animations', 'discover', 'explore'],
      },
      {
        id: 'understanding-categories',
        title: 'Understanding Categories',
        description: 'Guide to animation categories and organization',
        path: '/help/getting-started/understanding-categories',
        category: 'Getting Started',
        categoryPath: '/help/getting-started',
        tags: ['categories', 'organization', 'browse'],
        keywords: ['categories', 'types', 'organization', 'classification', 'browse'],
      },
      {
        id: 'first-download',
        title: 'First Download Guide',
        description: 'How to download your first animation',
        path: '/help/getting-started/first-download',
        category: 'Getting Started',
        categoryPath: '/help/getting-started',
        tags: ['download', 'first time', 'guide'],
        keywords: ['download', 'first', 'save', 'export', 'file', 'format'],
      },
    ],
  },
  {
    id: 'subscription-billing',
    title: 'Subscription & Billing',
    path: '/help/subscription-billing',
    icon: CreditCard,
    articles: [
      {
        id: 'subscription-plans',
        title: 'Subscription Plans',
        description: 'Overview of all available subscription plans',
        path: '/help/subscription-billing/subscription-plans',
        category: 'Subscription & Billing',
        categoryPath: '/help/subscription-billing',
        tags: ['subscription', 'plans', 'pricing', 'free', 'starter', 'pro', 'mega'],
        keywords: ['plans', 'subscription', 'pricing', 'free', 'starter', 'pro', 'mega', 'monthly', 'cost'],
      },
      {
        id: 'upgrade-downgrade',
        title: 'Upgrade or Downgrade',
        description: 'How to change your subscription plan',
        path: '/help/subscription-billing/upgrade-downgrade',
        category: 'Subscription & Billing',
        categoryPath: '/help/subscription-billing',
        tags: ['upgrade', 'downgrade', 'change plan', 'subscription'],
        keywords: ['upgrade', 'downgrade', 'change', 'plan', 'switch', 'modify'],
      },
      {
        id: 'billing-payment',
        title: 'Billing & Payment',
        description: 'Payment methods and billing information',
        path: '/help/subscription-billing/billing-payment',
        category: 'Subscription & Billing',
        categoryPath: '/help/subscription-billing',
        tags: ['billing', 'payment', 'invoice', 'credit card'],
        keywords: ['billing', 'payment', 'invoice', 'credit card', 'paypal', 'receipt', 'charge'],
      },
      {
        id: 'cancellation-refund',
        title: 'Cancellation & Refund',
        description: 'How to cancel your subscription and refund policy',
        path: '/help/subscription-billing/cancellation-refund',
        category: 'Subscription & Billing',
        categoryPath: '/help/subscription-billing',
        tags: ['cancel', 'refund', 'subscription', 'policy'],
        keywords: ['cancel', 'refund', 'money back', 'unsubscribe', 'stop', 'return'],
      },
    ],
  },
  {
    id: 'license-usage',
    title: 'License & Usage',
    path: '/help/license-usage',
    icon: Shield,
    articles: [
      {
        id: 'license-types',
        title: 'License Types',
        description: 'Understanding different license types',
        path: '/help/license-usage/license-types',
        category: 'License & Usage',
        categoryPath: '/help/license-usage',
        tags: ['license', 'types', 'free', 'standard', 'extended'],
        keywords: ['license', 'types', 'free', 'standard', 'extended', 'rights', 'usage'],
      },
      {
        id: 'commercial-use',
        title: 'Commercial Use',
        description: 'Guidelines for commercial usage',
        path: '/help/license-usage/commercial-use',
        category: 'License & Usage',
        categoryPath: '/help/license-usage',
        tags: ['commercial', 'business', 'license', 'usage'],
        keywords: ['commercial', 'business', 'monetize', 'sell', 'profit', 'client work'],
      },
      {
        id: 'attribution-requirements',
        title: 'Attribution Requirements',
        description: 'When and how to provide attribution',
        path: '/help/license-usage/attribution-requirements',
        category: 'License & Usage',
        categoryPath: '/help/license-usage',
        tags: ['attribution', 'credit', 'requirements'],
        keywords: ['attribution', 'credit', 'acknowledge', 'mention', 'cite'],
      },
      {
        id: 'corporate-agency-team',
        title: 'Corporate & Agency Use',
        description: 'Licensing for teams and agencies',
        path: '/help/license-usage/corporate-agency-team',
        category: 'License & Usage',
        categoryPath: '/help/license-usage',
        tags: ['corporate', 'agency', 'team', 'business'],
        keywords: ['corporate', 'agency', 'team', 'business', 'enterprise', 'company'],
      },
      {
        id: 'copyright-claims',
        title: 'Copyright Claims',
        description: 'How to handle copyright issues',
        path: '/help/license-usage/copyright-claims',
        category: 'License & Usage',
        categoryPath: '/help/license-usage',
        tags: ['copyright', 'claims', 'dmca', 'legal'],
        keywords: ['copyright', 'dmca', 'claim', 'infringement', 'legal', 'report'],
      },
    ],
  },
  {
    id: 'contact-support',
    title: 'Contact & Support',
    path: '/help/contact-support',
    icon: Headphones,
    articles: [
      {
        id: 'support-email',
        title: 'Support Email',
        description: 'Contact us via email',
        path: '/help/contact-support/support-email',
        category: 'Contact & Support',
        categoryPath: '/help/contact-support',
        tags: ['support', 'email', 'contact', 'help'],
        keywords: ['support', 'email', 'contact', 'help desk', 'response time'],
      },
      {
        id: 'submit-request',
        title: 'Submit a Request',
        description: 'Submit a support request',
        path: '/help/contact-support/submit-request',
        category: 'Contact & Support',
        categoryPath: '/help/contact-support',
        tags: ['request', 'support', 'ticket', 'help'],
        keywords: ['request', 'submit', 'ticket', 'form', 'inquiry'],
      },
      {
        id: 'support-channels',
        title: 'Support Channels',
        description: 'All available support channels',
        path: '/help/contact-support/support-channels',
        category: 'Contact & Support',
        categoryPath: '/help/contact-support',
        tags: ['support', 'channels', 'contact', 'help'],
        keywords: ['support', 'channels', 'contact', 'communication', 'reach us'],
      },
      {
        id: 'live-chat',
        title: 'Live Chat',
        description: 'Get instant help via live chat',
        path: '/help/contact-support/live-chat',
        category: 'Contact & Support',
        categoryPath: '/help/contact-support',
        tags: ['live chat', 'instant', 'support', 'help'],
        keywords: ['live chat', 'instant', 'chat', 'real-time', 'messaging'],
      },
      {
        id: 'troubleshooting',
        title: 'Troubleshooting',
        description: 'Common issues and solutions',
        path: '/help/contact-support/troubleshooting',
        category: 'Contact & Support',
        categoryPath: '/help/contact-support',
        tags: ['troubleshooting', 'issues', 'problems', 'solutions'],
        keywords: ['troubleshooting', 'fix', 'problem', 'issue', 'error', 'not working'],
      },
    ],
  },
  {
    id: 'community',
    title: 'Community',
    path: '/help/community',
    icon: Users,
    articles: [
      {
        id: 'community-overview',
        title: 'Community Overview',
        description: 'Join the Motiomint community',
        path: '/help/community/community-overview',
        category: 'Community',
        categoryPath: '/help/community',
        tags: ['community', 'forum', 'discussion'],
        keywords: ['community', 'forum', 'discussion', 'members', 'join'],
      },
      {
        id: 'feedback-ideas',
        title: 'Feedback & Ideas',
        description: 'Share your feedback and ideas',
        path: '/help/community/feedback-ideas',
        category: 'Community',
        categoryPath: '/help/community',
        tags: ['feedback', 'ideas', 'suggestions', 'features'],
        keywords: ['feedback', 'ideas', 'suggestions', 'feature request', 'improvement'],
      },
      {
        id: 'community-highlights',
        title: 'Community Highlights',
        description: 'Featured community content',
        path: '/help/community/community-highlights',
        category: 'Community',
        categoryPath: '/help/community',
        tags: ['highlights', 'featured', 'community'],
        keywords: ['highlights', 'featured', 'showcase', 'spotlight', 'best'],
      },
    ],
  },
  {
    id: 'terms-policies',
    title: 'Terms & Policies',
    path: '/help/terms-policies',
    icon: FileText,
    articles: [
      {
        id: 'terms-of-service',
        title: 'Terms of Service',
        description: 'Our terms of service',
        path: '/help/terms-policies/terms-of-service',
        category: 'Terms & Policies',
        categoryPath: '/help/terms-policies',
        tags: ['terms', 'service', 'legal', 'agreement'],
        keywords: ['terms', 'service', 'agreement', 'legal', 'conditions', 'tos'],
      },
      {
        id: 'privacy-policy',
        title: 'Privacy Policy',
        description: 'How we protect your privacy',
        path: '/help/terms-policies/privacy-policy',
        category: 'Terms & Policies',
        categoryPath: '/help/terms-policies',
        tags: ['privacy', 'policy', 'data', 'gdpr'],
        keywords: ['privacy', 'policy', 'data', 'gdpr', 'protection', 'personal information'],
      },
      {
        id: 'cookie-policy',
        title: 'Cookie Policy',
        description: 'Our cookie usage policy',
        path: '/help/terms-policies/cookie-policy',
        category: 'Terms & Policies',
        categoryPath: '/help/terms-policies',
        tags: ['cookie', 'policy', 'tracking', 'gdpr'],
        keywords: ['cookie', 'tracking', 'analytics', 'consent', 'gdpr'],
      },
      {
        id: 'intellectual-property',
        title: 'Intellectual Property',
        description: 'Intellectual property rights',
        path: '/help/terms-policies/intellectual-property',
        category: 'Terms & Policies',
        categoryPath: '/help/terms-policies',
        tags: ['intellectual', 'property', 'copyright', 'trademark'],
        keywords: ['intellectual property', 'copyright', 'trademark', 'ownership', 'rights'],
      },
    ],
  },
];

// Flatten all articles for easy searching
export const allArticles: HelpArticle[] = helpCenterData.flatMap(category => category.articles);

// Search function with fuzzy matching
export function searchArticles(query: string): HelpArticle[] {
  if (!query || query.trim().length < 2) return [];
  
  const lowerQuery = query.toLowerCase().trim();
  const queryWords = lowerQuery.split(/\s+/);
  
  return allArticles
    .map(article => {
      let score = 0;
      
      // Exact title match - highest priority
      if (article.title.toLowerCase().includes(lowerQuery)) {
        score += 100;
      }
      
      // Title word matches
      queryWords.forEach(word => {
        if (article.title.toLowerCase().includes(word)) {
          score += 50;
        }
      });
      
      // Description match
      if (article.description.toLowerCase().includes(lowerQuery)) {
        score += 30;
      }
      
      // Tag matches
      article.tags.forEach(tag => {
        if (tag.toLowerCase().includes(lowerQuery)) {
          score += 20;
        }
        queryWords.forEach(word => {
          if (tag.toLowerCase().includes(word)) {
            score += 10;
          }
        });
      });
      
      // Keyword matches
      article.keywords.forEach(keyword => {
        if (keyword.toLowerCase().includes(lowerQuery)) {
          score += 15;
        }
        queryWords.forEach(word => {
          if (keyword.toLowerCase().includes(word)) {
            score += 8;
          }
        });
      });
      
      // Category match
      if (article.category.toLowerCase().includes(lowerQuery)) {
        score += 10;
      }
      
      // Fuzzy matching for typos (simple Levenshtein-like approach)
      article.keywords.forEach(keyword => {
        if (getLevenshteinDistance(keyword.toLowerCase(), lowerQuery) <= 2) {
          score += 5;
        }
      });
      
      return { article, score };
    })
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(result => result.article);
}

// Simple Levenshtein distance for fuzzy matching
function getLevenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  
  const matrix = [];
  
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[b.length][a.length];
}

// Get related articles based on category and tags
export function getRelatedArticles(currentArticleId: string, limit: number = 4): HelpArticle[] {
  const currentArticle = allArticles.find(a => a.id === currentArticleId);
  if (!currentArticle) return [];
  
  const related = allArticles
    .filter(article => article.id !== currentArticleId)
    .map(article => {
      let score = 0;
      
      // Same category - high priority
      if (article.category === currentArticle.category) {
        score += 50;
      }
      
      // Shared tags
      const sharedTags = article.tags.filter(tag => 
        currentArticle.tags.includes(tag)
      ).length;
      score += sharedTags * 20;
      
      // Shared keywords
      const sharedKeywords = article.keywords.filter(keyword =>
        currentArticle.keywords.includes(keyword)
      ).length;
      score += sharedKeywords * 10;
      
      return { article, score };
    })
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(result => result.article);
  
  return related;
}

// Get previous and next articles in the same category
export function getAdjacentArticles(currentArticlePath: string): { 
  previous: HelpArticle | null; 
  next: HelpArticle | null;
} {
  const currentArticle = allArticles.find(a => a.path === currentArticlePath);
  if (!currentArticle) return { previous: null, next: null };
  
  const categoryArticles = allArticles.filter(a => a.category === currentArticle.category);
  const currentIndex = categoryArticles.findIndex(a => a.path === currentArticlePath);
  
  return {
    previous: currentIndex > 0 ? categoryArticles[currentIndex - 1] : null,
    next: currentIndex < categoryArticles.length - 1 ? categoryArticles[currentIndex + 1] : null,
  };
}
