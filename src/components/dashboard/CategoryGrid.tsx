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

import techDigitalThumb from '@/assets/category-thumbnails/tech-digital.png';
import abstractMotionThumb from '@/assets/category-thumbnails/abstract-motion.png';
import lifestyleThumb from '@/assets/category-thumbnails/lifestyle-real-world.png';
import socialUiThumb from '@/assets/category-thumbnails/social-ui-hooks.png';

const THUMBNAIL_MAP: Record<string, string> = {
  'tech-digital': techDigitalThumb,
  'abstract-motion': abstractMotionThumb,
  'lifestyle-real-world': lifestyleThumb,
  'social-ui-hooks': socialUiThumb,
};

interface CategoryGridProps {
  categories: string[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  const { t } = useTranslation();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
      {categories.map((categoryName) => {
        const canonicalCategory = getCanonicalCategory(categoryName) || categoryName;
        const info = CATEGORY_INFO[canonicalCategory as CanonicalCategory] || { 
          description: 'Explore this category', 
          icon: '🎬',
          count: 'View all',
          thumbnailAsset: undefined,
        };
        const thumbSrc = info.thumbnailAsset ? THUMBNAIL_MAP[info.thumbnailAsset] : undefined;
        
        return (
          <Link key={categoryName} to={`/category/${getCategorySlug(canonicalCategory)}`}>
            <Card className="group relative overflow-hidden rounded-xl hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/40 h-full aspect-[4/5]">
              {/* Thumbnail background */}
              {thumbSrc && (
                <img
                  src={thumbSrc}
                  alt={`${canonicalCategory} category`}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              )}
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

              <CardContent className="relative z-10 flex flex-col justify-end h-full p-5">
                <Badge variant="secondary" className="self-start mb-3 text-xs bg-background/40 backdrop-blur-sm border-primary/20">
                  {info.count}
                </Badge>
                <h3 className="text-lg font-bold mb-1.5 text-foreground group-hover:text-primary transition-colors">
                  {canonicalCategory}
                </h3>
                <p className="text-muted-foreground mb-4 text-xs line-clamp-2">
                  {info.description}
                </p>
                <Button variant="outline" size="sm" className="w-full gap-2 bg-background/30 backdrop-blur-sm border-primary/30 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
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
