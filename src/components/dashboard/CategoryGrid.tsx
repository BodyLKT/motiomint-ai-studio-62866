import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  CATEGORY_INFO, 
  getCategorySlug, 
  getCanonicalCategory,
  type CanonicalCategory 
} from '@/lib/categoryMapping';

interface CategoryGridProps {
  categories: string[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  const { t } = useTranslation();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {categories.map((categoryName) => {
        // Get canonical category for proper info lookup
        const canonicalCategory = getCanonicalCategory(categoryName) || categoryName;
        const info = CATEGORY_INFO[canonicalCategory as CanonicalCategory] || { 
          description: 'Explore this category', 
          icon: '🎬',
          count: 'View all'
        };
        
        return (
          <Link key={categoryName} to={`/category/${getCategorySlug(canonicalCategory)}`}>
            <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 h-full">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{info.icon}</div>
                  <Badge variant="secondary" className="text-xs">
                    {info.count}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {canonicalCategory}
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
