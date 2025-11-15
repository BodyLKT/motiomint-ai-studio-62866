import { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { searchArticles, HelpArticle } from '@/lib/helpCenterData';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface HelpCenterSearchProps {
  className?: string;
}

export default function HelpCenterSearch({ className }: HelpCenterSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<HelpArticle[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Perform search
  useEffect(() => {
    if (query.trim().length >= 2) {
      const searchResults = searchArticles(query);
      setResults(searchResults);
      setIsOpen(searchResults.length > 0);
      setSelectedIndex(0);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isOpen || results.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % results.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            window.location.href = results[selectedIndex].path;
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setIsFocused(false);
          inputRef.current?.blur();
          break;
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery('');
    setIsFocused(false);
  };

  return (
    <div ref={searchRef} className={cn("relative w-full", className)}>
      {/* Search Input */}
      <div className="relative">
        <Search 
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200",
            isFocused ? "text-primary" : "text-muted-foreground"
          )} 
          aria-hidden="true"
        />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search help articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            if (results.length > 0) setIsOpen(true);
          }}
          className={cn(
            "w-full h-11 sm:h-12 pl-11 sm:pl-12 pr-11 sm:pr-12 text-sm sm:text-base",
            "bg-background/60 backdrop-blur-sm",
            "border-2 border-border/50",
            "hover:border-primary/30 focus:border-primary",
            "transition-all duration-150",
            "placeholder:text-muted-foreground/60",
            "focus-visible:ring-2 focus-visible:ring-primary/20"
          )}
          aria-label="Search help articles"
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-expanded={isOpen}
          role="combobox"
        />
        {query && (
          <button
            onClick={handleClear}
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2",
              "p-1 rounded-full hover:bg-muted transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <Card 
          id="search-results"
          role="listbox"
          className={cn(
            "absolute z-50 w-full mt-2 p-1.5 sm:p-2",
            "bg-background/95 backdrop-blur-md",
            "border-2 border-primary/20",
            "shadow-xl shadow-primary/5",
            "animate-fade-in max-h-[350px] sm:max-h-[400px] overflow-y-auto rounded-xl"
          )}
        >
          <div className="space-y-1">
            {results.map((article, index) => (
              <Link
                key={article.id}
                to={article.path}
                onClick={handleResultClick}
                role="option"
                aria-selected={selectedIndex === index}
                className={cn(
                  "flex items-start justify-between gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg",
                  "transition-all duration-150 group",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  selectedIndex === index
                    ? "bg-primary/10 border-primary/30"
                    : "hover:bg-muted/50"
                )}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={cn(
                      "font-semibold text-sm truncate transition-colors duration-150 leading-snug",
                      selectedIndex === index ? "text-primary" : "text-foreground"
                    )}>
                      {article.title}
                    </h4>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2 leading-relaxed">
                    {article.description}
                  </p>
                  <Badge 
                    variant="secondary" 
                    className="text-xs font-normal"
                  >
                    {article.category}
                  </Badge>
                </div>
                <ArrowRight 
                  className={cn(
                    "w-4 h-4 flex-shrink-0 transition-all duration-150 mt-1",
                    selectedIndex === index 
                      ? "text-primary translate-x-1" 
                      : "text-muted-foreground group-hover:translate-x-1"
                  )}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>

          {/* Search Tips */}
          <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-border/50">
            <p className="text-xs text-muted-foreground text-center px-2">
              <kbd className="px-1.5 py-0.5 text-xs rounded bg-muted">↑</kbd>
              {' '}<kbd className="px-1.5 py-0.5 text-xs rounded bg-muted">↓</kbd>
              {' '}to navigate • {' '}
              <kbd className="px-1.5 py-0.5 text-xs rounded bg-muted">Enter</kbd>
              {' '}to select • {' '}
              <kbd className="px-1.5 py-0.5 text-xs rounded bg-muted">Esc</kbd>
              {' '}to close
            </p>
          </div>
        </Card>
      )}

      {/* No Results */}
      {isOpen && query.length >= 2 && results.length === 0 && (
        <Card 
          className={cn(
            "absolute z-50 w-full mt-2 p-5 sm:p-6",
            "bg-background/95 backdrop-blur-md",
            "border-2 border-border/50",
            "animate-fade-in text-center rounded-xl"
          )}
        >
          <p className="text-muted-foreground text-sm leading-relaxed">
            No results found for "<span className="font-semibold text-foreground">{query}</span>"
          </p>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
            Try different keywords or browse categories below
          </p>
        </Card>
      )}
    </div>
  );
}
