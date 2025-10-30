import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, TrendingUp, Clock, X, Filter, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

interface SearchSuggestion {
  type: 'recent' | 'popular' | 'category' | 'trending' | 'tag';
  text: string;
  count?: number;
}

interface GlobalSearchBarProps {
  className?: string;
  variant?: 'default' | 'hero';
  autoFocus?: boolean;
}

const CATEGORIES = [
  'Tech & Futuristic',
  'Fitness & Lifestyle',
  'Business & Finance',
  'Travel & Nature',
  'Abstract Backgrounds',
  'Social Media Hooks',
];

const PLATFORMS = ['Facebook', 'Instagram', 'TikTok', 'LinkedIn', 'Twitter'];
const FORMATS = ['MP4', 'MOV', 'GIF', 'WebM'];
const SIZES = ['720p', '1080p', '4K'];

export default function GlobalSearchBar({ 
  className, 
  variant = 'default',
  autoFocus = false 
}: GlobalSearchBarProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('motiomint_recent_searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse recent searches');
      }
    }
  }, []);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-focus if needed
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Fetch suggestions based on query
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        // Show recent searches and popular categories
        const baseSuggestions: SearchSuggestion[] = [
          ...recentSearches.slice(0, 3).map(text => ({ type: 'recent' as const, text })),
          ...CATEGORIES.slice(0, 3).map(text => ({ type: 'category' as const, text })),
        ];
        setSuggestions(baseSuggestions);
        return;
      }

      try {
        // Fetch matching tags and titles
        const { data: animations, error } = await supabase
          .from('animations')
          .select('title, tags, category')
          .or(`title.ilike.%${query}%,tags.cs.{${query}}`)
          .limit(10);

        if (error) throw error;

        const newSuggestions: SearchSuggestion[] = [];
        const seen = new Set<string>();

        // Add matching categories
        CATEGORIES.forEach(cat => {
          if (cat.toLowerCase().includes(query.toLowerCase()) && !seen.has(cat)) {
            newSuggestions.push({ type: 'category', text: cat });
            seen.add(cat);
          }
        });

        // Add matching titles
        animations?.forEach(anim => {
          if (anim.title && !seen.has(anim.title)) {
            newSuggestions.push({ type: 'trending', text: anim.title });
            seen.add(anim.title);
          }
          
          // Add matching tags
          anim.tags?.forEach(tag => {
            if (tag.toLowerCase().includes(query.toLowerCase()) && !seen.has(tag)) {
              newSuggestions.push({ type: 'tag', text: tag });
              seen.add(tag);
            }
          });
        });

        setSuggestions(newSuggestions.slice(0, 8));
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 150);
    return () => clearTimeout(debounce);
  }, [query, recentSearches]);

  const saveRecentSearch = (searchText: string) => {
    const updated = [searchText, ...recentSearches.filter(s => s !== searchText)].slice(0, 10);
    setRecentSearches(updated);
    localStorage.setItem('motiomint_recent_searches', JSON.stringify(updated));
  };

  const handleSearch = (searchText?: string) => {
    const searchQuery = searchText || query;
    if (!searchQuery.trim()) return;

    saveRecentSearch(searchQuery);
    setIsOpen(false);
    
    // Navigate to search results with query and filter
    const params = new URLSearchParams();
    params.set('q', searchQuery);
    if (selectedFilter !== 'all') {
      params.set('filter', selectedFilter);
    }
    navigate(`/search?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const getSuggestionIcon = (type: SearchSuggestion['type']) => {
    switch (type) {
      case 'recent':
        return <Clock className="w-4 h-4 text-muted-foreground" />;
      case 'popular':
      case 'trending':
        return <TrendingUp className="w-4 h-4 text-primary" />;
      case 'category':
        return <Sparkles className="w-4 h-4 text-primary" />;
      case 'tag':
        return <Search className="w-4 h-4 text-muted-foreground" />;
      default:
        return <Search className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const isHero = variant === 'hero';

  return (
    <div ref={searchRef} className={cn('relative w-full', className)}>
      <div className={cn(
        'relative flex items-center gap-2',
        isHero ? 'max-w-3xl mx-auto' : 'max-w-2xl'
      )}>
        {/* Search Input */}
        <div className={cn(
          'relative flex-1 group',
          isHero && 'shadow-2xl'
        )}>
          <Search className={cn(
            'absolute left-4 top-1/2 -translate-y-1/2 transition-colors z-[1]',
            isOpen ? 'text-primary' : 'text-muted-foreground',
            isHero ? 'w-6 h-6' : 'w-5 h-5'
          )} />
          
          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={t('search.placeholder')}
            className={cn(
              'w-full pr-24 transition-all duration-300',
              isHero 
                ? 'h-16 pl-14 text-lg rounded-full border-2 border-border/50 hover:border-primary/50 focus:border-primary bg-background/95 backdrop-blur-sm' 
                : 'h-12 pl-12 rounded-full border-border/50 hover:border-primary/50 focus:border-primary',
              isOpen && 'border-primary shadow-lg'
            )}
          />

          {/* Clear Button */}
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={clearSearch}
              className={cn(
                'absolute right-2 top-1/2 -translate-y-1/2 rounded-full hover:bg-muted z-[1]',
                isHero ? 'h-10 w-10' : 'h-8 w-8'
              )}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={selectedFilter === 'all' ? 'outline' : 'default'}
              size={isHero ? 'lg' : 'default'}
              className={cn(
                'gap-2',
                isHero ? 'h-16 px-6 rounded-full' : 'h-12 px-4 rounded-full'
              )}
            >
              <Filter className={isHero ? 'w-5 h-5' : 'w-4 h-4'} />
              {selectedFilter === 'all' ? t('search.filters') : selectedFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-sm border-border/50 z-[100]">
            <DropdownMenuLabel>{t('search.filterBy')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={() => setSelectedFilter('all')}>
              <span className={selectedFilter === 'all' ? 'font-semibold text-primary' : ''}>
                {t('search.allResults')}
              </span>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              {t('search.categories')}
            </DropdownMenuLabel>
            {CATEGORIES.slice(0, 4).map((cat) => (
              <DropdownMenuItem key={cat} onClick={() => setSelectedFilter(cat)}>
                <span className={selectedFilter === cat ? 'font-semibold text-primary' : ''}>
                  {cat}
                </span>
              </DropdownMenuItem>
            ))}
            
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              {t('search.platforms')}
            </DropdownMenuLabel>
            {PLATFORMS.slice(0, 3).map((platform) => (
              <DropdownMenuItem key={platform} onClick={() => setSelectedFilter(platform)}>
                <span className={selectedFilter === platform ? 'font-semibold text-primary' : ''}>
                  {platform}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search Button (Hero variant only) */}
        {isHero && (
          <Button
            onClick={() => handleSearch()}
            size="lg"
            className="h-16 px-8 rounded-full btn-glow"
          >
            {t('search.search')}
          </Button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <Card className={cn(
          'absolute top-full mt-2 w-full bg-background/95 backdrop-blur-xl border-border/50 shadow-2xl overflow-hidden z-[100]',
          isHero ? 'max-w-3xl mx-auto left-0 right-0' : 'max-w-2xl'
        )}>
          <div className="max-h-96 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <button
                key={`${suggestion.type}-${suggestion.text}-${index}`}
                onClick={() => handleSearch(suggestion.text)}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-muted/50 transition-colors text-left group"
              >
                {getSuggestionIcon(suggestion.type)}
                <span className="flex-1 group-hover:text-primary transition-colors">
                  {suggestion.text}
                </span>
                {suggestion.type === 'category' && (
                  <Badge variant="secondary" className="text-xs">
                    {t('search.category')}
                  </Badge>
                )}
                {suggestion.type === 'recent' && (
                  <Badge variant="outline" className="text-xs">
                    {t('search.recent')}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
