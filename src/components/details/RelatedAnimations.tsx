import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import EnhancedAnimationCard from '@/components/category/EnhancedAnimationCard';
import { Sparkles } from 'lucide-react';

interface RelatedAnimationsProps {
  currentAnimationId: string;
  category: string;
  tags: string[];
  onFavoriteToggle: (id: string) => void;
  onCartToggle: (id: string) => void;
  favorites: Set<string>;
  cart: Set<string>;
  isGuest?: boolean;
  onAuthRequired?: () => void;
}

interface Animation {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail_url: string;
  file_url: string;
  preview_url?: string;
  tags: string[];
  format?: string;
  resolution?: string;
}

export default function RelatedAnimations({
  currentAnimationId,
  category,
  tags,
  onFavoriteToggle,
  onCartToggle,
  favorites,
  cart,
  isGuest = false,
  onAuthRequired,
}: RelatedAnimationsProps) {
  const navigate = useNavigate();
  const [relatedAnimations, setRelatedAnimations] = useState<Animation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRelatedAnimations();
  }, [currentAnimationId, category, tags]);

  const fetchRelatedAnimations = async () => {
    try {
      // Fetch animations from the same category
      const { data, error } = await supabase
        .from('animations')
        .select('*')
        .eq('category', category)
        .neq('id', currentAnimationId)
        .limit(6);

      if (error) throw error;

      // Sort by tag similarity
      const sorted = (data || []).sort((a, b) => {
        const aMatchCount = a.tags.filter((tag: string) => tags.includes(tag)).length;
        const bMatchCount = b.tags.filter((tag: string) => tags.includes(tag)).length;
        return bMatchCount - aMatchCount;
      });

      setRelatedAnimations(sorted.slice(0, 4));
    } catch (error) {
      console.error('Error fetching related animations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-semibold">Similar Animations</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="aspect-video w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (relatedAnimations.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-semibold">Similar Animations</h3>
        </div>
        <Badge variant="outline">
          {relatedAnimations.length} found
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {relatedAnimations.map((animation) => (
          <div key={animation.id} className="h-[400px]">
            <EnhancedAnimationCard
            key={animation.id}
            id={animation.id}
            title={animation.title}
            description={animation.description}
            category={animation.category}
            thumbnailUrl={animation.thumbnail_url}
            videoUrl={animation.preview_url || animation.file_url}
            tags={animation.tags}
            format={animation.format}
            resolution={animation.resolution}
            isFavorite={favorites.has(animation.id)}
            isInCart={cart.has(animation.id)}
            onFavoriteToggle={() => onFavoriteToggle(animation.id)}
            onCartToggle={() => onCartToggle(animation.id)}
            isGuest={isGuest}
            onAuthRequired={onAuthRequired}
          />
          </div>
        ))}
      </div>
    </div>
  );
}
