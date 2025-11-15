import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, X, ArrowRight, Sparkles, FileText, Wrench, Layers } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { getQuickSuggestions, UnifiedSearchResult } from '@/lib/unifiedSearch';
import { cn } from '@/lib/utils';

interface GlobalSearchBarProps {
  className?: string;
  variant?: 'default' | 'hero';
  autoFocus?: boolean;
}

export default function GlobalSearchBar({ 
  className, 
  variant = 'default',
  autoFocus = false 
}: GlobalSearchBarProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<UnifiedSearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSearching, setIsSearching] = useState(false);

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
        setIsFocused(false);
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

  // Fetch suggestions with debouncing and prefetching
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);

      try {
        // Prefetch after 200ms pause
        const results = await getQuickSuggestions(query, 12);
        setSuggestions(results);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setIsSearching(false);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 200);
    return () => clearTimeout(debounce);
  }, [query]);

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
    setIsMobileOpen(false);
    
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleSuggestionClick = (result: UnifiedSearchResult) => {
    if (result.type === 'animation') {
      navigate(`/animation/${result.id}`);
    } else if (result.type === 'category') {
      navigate(`/category?name=${encodeURIComponent(result.name)}`);
    } else if (result.type === 'tool') {
      navigate(result.path);
    } else if (result.type === 'help') {
      navigate(result.path);
    }
    setIsOpen(false);
    setIsMobileOpen(false);
    setQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const getResultIcon = (type: UnifiedSearchResult['type']) => {
    switch (type) {
      case 'animation':
        return <Sparkles className="w-4 h-4 text-primary" />;
      case 'category':
        return <Layers className="w-4 h-4 text-secondary" />;
      case 'tool':
        return <Wrench className="w-4 h-4 text-accent" />;
      case 'help':
        return <FileText className="w-4 h-4 text-muted-foreground" />;
      default:
        return <Search className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const groupedSuggestions = suggestions.reduce((acc, result) => {
    if (!acc[result.type]) acc[result.type] = [];
    acc[result.type].push(result);
    return acc;
  }, {} as Record<string, UnifiedSearchResult[]>);

  const isHero = variant === 'hero';

  // Desktop Search UI
  const DesktopSearch = (
    <div ref={searchRef} className={cn('relative w-full', className)}>
      <div className={cn(
        'relative flex items-center',
        isHero ? 'max-w-3xl mx-auto' : 'max-w-2xl mx-auto'
      )}>
        {/* Search Input */}
        <div className="relative flex-1 group">
          <Search 
            className={cn(
              'absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-200 pointer-events-none z-10',
              isFocused ? 'text-primary scale-110' : 'text-muted-foreground',
              isHero ? 'w-6 h-6' : 'w-5 h-5'
            )} 
          />
          
          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => {
              setIsFocused(true);
              setIsOpen(true);
            }}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder={isHero 
              ? "Search animations, categories, tools, FAQs..." 
              : "Search animations, categories, tools..."}
            className={cn(
              'w-full pr-20 transition-all duration-300',
              isHero 
                ? 'h-16 pl-14 text-lg rounded-full border-2' 
                : 'h-12 pl-12 rounded-full',
              'bg-background/80 backdrop-blur-md',
              'border-border/50 hover:border-primary/40',
              'focus:border-primary focus:shadow-glow',
              'focus-visible:ring-2 focus-visible:ring-primary/20',
              isFocused && 'scale-[1.02] shadow-glow'
            )}
            aria-label="Global search"
          />

          {query && !isHero && (
            <Button
              onClick={clearSearch}
              variant="ghost"
              size="icon"
              className={cn(
                'absolute right-2 top-1/2 -translate-y-1/2',
                'h-8 w-8 rounded-full hover:bg-muted'
              )}
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </Button>
          )}

          {isHero && (
            <Button
              onClick={() => handleSearch()}
              className={cn(
                'absolute right-2 top-1/2 -translate-y-1/2',
                'h-12 px-6 rounded-full',
                'bg-primary hover:bg-primary/90',
                'shadow-glow'
              )}
            >
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          )}
        </div>
      </div>

      {/* Suggestions Dropdown - Frosted Glass */}
      {isOpen && suggestions.length > 0 && (
        <Card 
          className={cn(
            'absolute z-[100] w-full mt-3',
            isHero ? 'max-w-3xl left-1/2 -translate-x-1/2' : 'max-w-2xl left-1/2 -translate-x-1/2',
            'bg-background/95 backdrop-blur-xl',
            'border-2 border-primary/20',
            'shadow-elevated',
            'animate-fade-in',
            'max-h-[500px] overflow-y-auto',
            'rounded-2xl p-3'
          )}
        >
          {/* Animations Section */}
          {groupedSuggestions.animation && groupedSuggestions.animation.length > 0 && (
            <div className="mb-4">
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Animations
              </div>
              <div className="space-y-1">
                {groupedSuggestions.animation.slice(0, 4).map((result, idx) => {
                  if (result.type !== 'animation') return null;
                  return (
                  <button
                    key={`${result.id}-${idx}`}
                    onClick={() => handleSuggestionClick(result)}
                    className={cn(
                      'w-full flex items-center gap-3 p-3 rounded-xl',
                      'hover:bg-primary/10 transition-all duration-150',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                      'group'
                    )}
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                      <img 
                        src={result.thumbnail_url} 
                        alt={result.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                        {result.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {result.category}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </button>
                );})}
              </div>
            </div>
          )}

          {/* Categories Section */}
          {groupedSuggestions.category && groupedSuggestions.category.length > 0 && (
            <div className="mb-4">
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Categories
              </div>
              <div className="space-y-1">
                {groupedSuggestions.category.slice(0, 3).map((result, idx) => {
                  if (result.type !== 'category') return null;
                  return (
                  <button
                    key={`${result.name}-${idx}`}
                    onClick={() => handleSuggestionClick(result)}
                    className={cn(
                      'w-full flex items-center gap-3 p-3 rounded-xl',
                      'hover:bg-secondary/10 transition-all duration-150',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                      'group'
                    )}
                  >
                    {getResultIcon('category')}
                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm group-hover:text-secondary transition-colors">
                        {result.name}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                  </button>
                );})}
              </div>
            </div>
          )}

          {/* Tools Section */}
          {groupedSuggestions.tool && groupedSuggestions.tool.length > 0 && (
            <div className="mb-4">
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Tools
              </div>
              <div className="space-y-1">
                {groupedSuggestions.tool.map((result, idx) => {
                  if (result.type !== 'tool') return null;
                  return (
                  <button
                    key={`${result.name}-${idx}`}
                    onClick={() => handleSuggestionClick(result)}
                    className={cn(
                      'w-full flex items-center gap-3 p-3 rounded-xl',
                      'hover:bg-accent/10 transition-all duration-150',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                      'group'
                    )}
                  >
                    <div className="text-2xl">{result.icon}</div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="font-medium text-sm group-hover:text-accent transition-colors">
                        {result.name}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {result.description}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </button>
                );})}
              </div>
            </div>
          )}

          {/* Help Articles Section */}
          {groupedSuggestions.help && groupedSuggestions.help.length > 0 && (
            <div>
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Help Center
              </div>
              <div className="space-y-1">
                {groupedSuggestions.help.slice(0, 3).map((result, idx) => {
                  if (result.type !== 'help') return null;
                  return (
                  <button
                    key={`${result.id}-${idx}`}
                    onClick={() => handleSuggestionClick(result)}
                    className={cn(
                      'w-full flex items-center gap-3 p-3 rounded-xl',
                      'hover:bg-muted/50 transition-all duration-150',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                      'group'
                    )}
                  >
                    {getResultIcon('help')}
                    <div className="flex-1 text-left min-w-0">
                      <div className="font-medium text-sm group-hover:text-foreground transition-colors truncate">
                        {result.title}
                      </div>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {result.category}
                      </Badge>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-all" />
                  </button>
                );})}
              </div>
            </div>
          )}

          {/* View All Results */}
          {suggestions.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border/50">
              <Button
                onClick={() => handleSearch()}
                variant="ghost"
                className="w-full justify-center gap-2 text-sm font-medium hover:bg-primary/10 hover:text-primary"
              >
                View all results for "{query}"
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );

  // Mobile Search UI (Bottom Sheet)
  const MobileSearch = (
    <>
      <Button
        onClick={() => setIsMobileOpen(true)}
        variant="outline"
        size="icon"
        className="lg:hidden"
        aria-label="Open search"
      >
        <Search className="w-5 h-5" />
      </Button>

      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl">
          <SheetHeader>
            <SheetTitle>Search Motiomint</SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-4">
            {/* Mobile Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none z-10" />
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search animations, categories, tools..."
                className="h-14 pl-12 pr-12 text-base rounded-2xl bg-background/80 backdrop-blur-md"
                autoFocus
              />
              {query && (
                <Button
                  onClick={clearSearch}
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10"
                >
                  <X className="w-5 h-5" />
                </Button>
              )}
            </div>

            {/* Mobile Suggestions */}
            {suggestions.length > 0 && (
              <div className="space-y-4 overflow-y-auto max-h-[calc(90vh-200px)]">
                {/* Animations */}
                {groupedSuggestions.animation && groupedSuggestions.animation.length > 0 && (
                  <div>
                    <div className="px-2 py-2 text-sm font-semibold text-muted-foreground">
                      Animations
                    </div>
                    <div className="space-y-2">
                      {groupedSuggestions.animation.slice(0, 4).map((result, idx) => {
                        if (result.type !== 'animation') return null;
                        return (
                        <button
                          key={`${result.id}-${idx}`}
                          onClick={() => handleSuggestionClick(result)}
                          className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-primary/10 transition-all active:scale-95"
                        >
                          <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                            <img 
                              src={result.thumbnail_url} 
                              alt={result.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0 text-left">
                            <div className="font-medium truncate">{result.title}</div>
                            <div className="text-sm text-muted-foreground">{result.category}</div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        </button>
                      );})}
                    </div>
                  </div>
                )}

                {/* Categories */}
                {groupedSuggestions.category && groupedSuggestions.category.length > 0 && (
                  <div>
                    <div className="px-2 py-2 text-sm font-semibold text-muted-foreground">
                      Categories
                    </div>
                    <div className="space-y-2">
                      {groupedSuggestions.category.slice(0, 3).map((result, idx) => {
                        if (result.type !== 'category') return null;
                        return (
                        <button
                          key={`${result.name}-${idx}`}
                          onClick={() => handleSuggestionClick(result)}
                          className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-secondary/10 transition-all active:scale-95"
                        >
                          <Layers className="w-6 h-6 text-secondary" />
                          <div className="flex-1 text-left font-medium">{result.name}</div>
                          <ArrowRight className="w-5 h-5 text-muted-foreground" />
                        </button>
                      );})}
                    </div>
                  </div>
                )}

                {/* Tools */}
                {groupedSuggestions.tool && groupedSuggestions.tool.length > 0 && (
                  <div>
                    <div className="px-2 py-2 text-sm font-semibold text-muted-foreground">
                      Tools
                    </div>
                    <div className="space-y-2">
                      {groupedSuggestions.tool.map((result, idx) => {
                        if (result.type !== 'tool') return null;
                        return (
                        <button
                          key={`${result.name}-${idx}`}
                          onClick={() => handleSuggestionClick(result)}
                          className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-accent/10 transition-all active:scale-95"
                        >
                          <div className="text-3xl">{result.icon}</div>
                          <div className="flex-1 text-left min-w-0">
                            <div className="font-medium">{result.name}</div>
                            <div className="text-sm text-muted-foreground truncate">{result.description}</div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-muted-foreground" />
                        </button>
                      );})}
                    </div>
                  </div>
                )}

                {/* Help Articles */}
                {groupedSuggestions.help && groupedSuggestions.help.length > 0 && (
                  <div>
                    <div className="px-2 py-2 text-sm font-semibold text-muted-foreground">
                      Help Center
                    </div>
                    <div className="space-y-2">
                      {groupedSuggestions.help.slice(0, 3).map((result, idx) => {
                        if (result.type !== 'help') return null;
                        return (
                        <button
                          key={`${result.id}-${idx}`}
                          onClick={() => handleSuggestionClick(result)}
                          className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-muted/50 transition-all active:scale-95"
                        >
                          <FileText className="w-6 h-6 text-muted-foreground" />
                          <div className="flex-1 text-left min-w-0">
                            <div className="font-medium truncate">{result.title}</div>
                            <Badge variant="secondary" className="text-xs mt-1">{result.category}</Badge>
                          </div>
                          <ArrowRight className="w-5 h-5 text-muted-foreground" />
                        </button>
                      );})}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Search Button */}
            {query && (
              <Button
                onClick={() => handleSearch()}
                className="w-full h-14 text-base rounded-2xl"
                size="lg"
              >
                <Search className="w-5 h-5 mr-2" />
                Search for "{query}"
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );

  return (
    <>
      <div className="hidden lg:block">
        {DesktopSearch}
      </div>
      <div className="lg:hidden">
        {MobileSearch}
      </div>
    </>
  );
}
