/**
 * Popular Tags Bar - displays clickable tag chips for quick filtering
 * Supports multi-select and shows active selection state
 */

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Tags } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PopularTagsBarProps {
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearTags: () => void;
  maxVisible?: number;
}

// Priority order for tags (most important first)
const TAG_PRIORITY = [
  // Format/context
  'loop', 'background', 'reel',
  // Topic
  'ai', 'fintech', 'fitness', 'health', 'travel', 'nature', 'cyber', 'data', 'saas', 'dashboard', 'charts',
  // Style
  'glow', 'particles', 'gradient', 'mesh', 'flow', 'hologram', 'neon', 'glass', 'abstract',
  // Social/UI
  'social', 'hook', 'intro', 'transition', 'ui', 'loader', 'text'
];

function sortTagsByPriority(tags: string[]): string[] {
  return [...tags].sort((a, b) => {
    const aIndex = TAG_PRIORITY.indexOf(a.toLowerCase());
    const bIndex = TAG_PRIORITY.indexOf(b.toLowerCase());
    
    // If both are in priority list, sort by priority
    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }
    // If only one is in priority list, it comes first
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    // Otherwise sort alphabetically
    return a.localeCompare(b);
  });
}

export default function PopularTagsBar({
  tags,
  selectedTags,
  onTagToggle,
  onClearTags,
  maxVisible = 12
}: PopularTagsBarProps) {
  if (tags.length === 0) return null;

  const sortedTags = sortTagsByPriority(tags);
  const visibleTags = sortedTags.slice(0, maxVisible);
  const hasSelectedTags = selectedTags.length > 0;

  return (
    <div className="space-y-3">
      {/* Header with clear button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Tags className="w-4 h-4" />
          <span>Popular tags</span>
          {hasSelectedTags && (
            <Badge variant="secondary" className="text-xs">
              {selectedTags.length} selected
            </Badge>
          )}
        </div>
        {hasSelectedTags && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearTags}
            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="w-3 h-3 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Tags row */}
      <div className="flex flex-wrap gap-2">
        {visibleTags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <Badge
              key={tag}
              variant={isSelected ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-all duration-200 select-none",
                "hover:scale-105 active:scale-95",
                isSelected
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-card/50 hover:bg-primary/10 hover:border-primary/50"
              )}
              onClick={() => onTagToggle(tag)}
            >
              {tag}
              {isSelected && (
                <X className="w-3 h-3 ml-1 opacity-70" />
              )}
            </Badge>
          );
        })}
        
        {sortedTags.length > maxVisible && (
          <Badge
            variant="outline"
            className="bg-muted/50 text-muted-foreground cursor-default"
          >
            +{sortedTags.length - maxVisible} more
          </Badge>
        )}
      </div>

      {/* Selected tags summary (if selecting from sidebar) */}
      {hasSelectedTags && selectedTags.some(t => !visibleTags.includes(t)) && (
        <div className="flex flex-wrap gap-1 pt-1 border-t border-border/50">
          <span className="text-xs text-muted-foreground mr-1">Also filtering by:</span>
          {selectedTags
            .filter(t => !visibleTags.includes(t))
            .map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs cursor-pointer hover:bg-destructive/20"
                onClick={() => onTagToggle(tag)}
              >
                {tag}
                <X className="w-2.5 h-2.5 ml-1" />
              </Badge>
            ))}
        </div>
      )}
    </div>
  );
}
