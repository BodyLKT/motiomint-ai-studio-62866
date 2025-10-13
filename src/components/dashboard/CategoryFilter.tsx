import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? 'default' : 'outline'}
          onClick={() => onSelectCategory(null)}
          size="sm"
        >
          {t('dashboard.all')}
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => onSelectCategory(category)}
            size="sm"
          >
            {category}
          </Button>
        ))}
      </div>
      
      {selectedCategory && (
        <Link to={`/category/${encodeURIComponent(selectedCategory)}`}>
          <Button variant="ghost" size="sm" className="gap-2">
            <ExternalLink size={14} />
            {t('category.viewAll', { category: selectedCategory })}
          </Button>
        </Link>
      )}
    </div>
  );
}
