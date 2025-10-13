import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORY_INFO: Record<string, { description: string; icon: string; count: string }> = {
  'Tech & Futuristic': {
    description: 'Holographic interfaces, circuit patterns, AI visuals',
    icon: '🚀',
    count: '120+ animations'
  },
  'Fitness & Lifestyle': {
    description: 'Workout graphics, health metrics, energy flows',
    icon: '💪',
    count: '85+ animations'
  },
  'Business & Finance': {
    description: 'Charts, graphs, corporate motion graphics',
    icon: '💼',
    count: '95+ animations'
  },
  'Travel & Nature': {
    description: 'Landscapes, travel routes, nature elements',
    icon: '🌍',
    count: '110+ animations'
  },
  'Abstract Backgrounds': {
    description: 'Flowing shapes, particles, gradient motions',
    icon: '✨',
    count: '200+ animations'
  },
  'Social Media Hooks': {
    description: 'Attention-grabbing intros and transitions',
    icon: '📱',
    count: '150+ animations'
  }
};

interface CategoryGridProps {
  categories: string[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  const { t } = useTranslation();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => {
        const info = CATEGORY_INFO[category] || { 
          description: 'Explore this category', 
          icon: '🎬',
          count: 'View all'
        };
        
        return (
          <Link key={category} to={`/category/${encodeURIComponent(category)}`}>
            <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 h-full">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{info.icon}</div>
                  <Badge variant="secondary" className="text-xs">
                    {info.count}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {category}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {info.description}
                </p>
                <Button variant="outline" size="sm" className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {t('categories.browseCollection')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
