import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  ChevronDown, 
  ChevronUp, 
  X, 
  Filter,
  SlidersHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

interface FilterPanelProps {
  formats: string[];
  resolutions: string[];
  tags: string[];
  selectedFormats: string[];
  selectedResolutions: string[];
  selectedTags: string[];
  onFormatChange: (formats: string[]) => void;
  onResolutionChange: (resolutions: string[]) => void;
  onTagChange: (tags: string[]) => void;
  onClearAll: () => void;
}

const COLLAPSED_TAG_COUNT = 16;

export default function FilterPanel({
  formats,
  resolutions,
  tags: localTags,
  selectedFormats,
  selectedResolutions,
  selectedTags,
  onFormatChange,
  onResolutionChange,
  onTagChange,
  onClearAll
}: FilterPanelProps) {
  const { t } = useTranslation();
  const [formatsOpen, setFormatsOpen] = useState(true);
  const [resolutionsOpen, setResolutionsOpen] = useState(true);
  const [tagsOpen, setTagsOpen] = useState(true);
  const [tagsExpanded, setTagsExpanded] = useState(false);
  const [globalTags, setGlobalTags] = useState<{ name: string; count: number }[]>([]);

  // Fetch all unique tags from all animations globally
  useEffect(() => {
    async function fetchGlobalTags() {
      const { data, error } = await supabase
        .from('animations')
        .select('tags');

      if (error || !data) return;

      const tagCounts = new Map<string, number>();
      for (const row of data) {
        if (row.tags) {
          for (const tag of row.tags) {
            tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
          }
        }
      }

      const sorted = Array.from(tagCounts.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);

      setGlobalTags(sorted);
    }

    fetchGlobalTags();
  }, []);

  const activeFiltersCount = selectedFormats.length + selectedResolutions.length + selectedTags.length;

  // Build tag display list: selected tags pinned at top, then remaining
  const displayTags = useMemo(() => {
    const allTagNames = globalTags.length > 0 ? globalTags.map(t => t.name) : localTags;
    
    // Pin selected tags that are outside the visible range
    const pinnedSelected = selectedTags.filter(t => allTagNames.includes(t));
    const remaining = allTagNames.filter(t => !selectedTags.includes(t));
    const ordered = [...pinnedSelected, ...remaining];

    if (tagsExpanded) return ordered;
    return ordered.slice(0, Math.max(COLLAPSED_TAG_COUNT, pinnedSelected.length));
  }, [globalTags, localTags, selectedTags, tagsExpanded]);

  const totalTagCount = globalTags.length > 0 ? globalTags.length : localTags.length;
  const hasMoreTags = totalTagCount > COLLAPSED_TAG_COUNT;

  const toggleFormat = (format: string) => {
    if (selectedFormats.includes(format)) {
      onFormatChange(selectedFormats.filter(f => f !== format));
    } else {
      onFormatChange([...selectedFormats, format]);
    }
  };

  const toggleResolution = (resolution: string) => {
    if (selectedResolutions.includes(resolution)) {
      onResolutionChange(selectedResolutions.filter(r => r !== resolution));
    } else {
      onResolutionChange([...selectedResolutions, resolution]);
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagChange([...selectedTags, tag]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">{t('search.filters')}</h3>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFiltersCount}
            </Badge>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <Separator />

      {/* Format Filter */}
      {formats.length > 0 && (
        <Collapsible open={formatsOpen} onOpenChange={setFormatsOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full group">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-primary" />
              <span className="font-medium">Format</span>
              {selectedFormats.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {selectedFormats.length}
                </Badge>
              )}
            </div>
            {formatsOpen ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3 space-y-2">
            {formats.map((format) => (
              <div key={format} className="flex items-center space-x-2 group">
                <Checkbox
                  id={`format-${format}`}
                  checked={selectedFormats.includes(format)}
                  onCheckedChange={() => toggleFormat(format)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label
                  htmlFor={`format-${format}`}
                  className="text-sm font-normal cursor-pointer group-hover:text-foreground transition-colors"
                >
                  {format}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}

      <Separator />

      {/* Resolution Filter */}
      {resolutions.length > 0 && (
        <Collapsible open={resolutionsOpen} onOpenChange={setResolutionsOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full group">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-primary" />
              <span className="font-medium">Resolution</span>
              {selectedResolutions.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {selectedResolutions.length}
                </Badge>
              )}
            </div>
            {resolutionsOpen ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3 space-y-2">
            {resolutions.map((resolution) => (
              <div key={resolution} className="flex items-center space-x-2 group">
                <Checkbox
                  id={`resolution-${resolution}`}
                  checked={selectedResolutions.includes(resolution)}
                  onCheckedChange={() => toggleResolution(resolution)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label
                  htmlFor={`resolution-${resolution}`}
                  className="text-sm font-normal cursor-pointer group-hover:text-foreground transition-colors"
                >
                  {resolution}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}

      <Separator />

      {/* Tags Filter - Global tags with expand/collapse */}
      {(globalTags.length > 0 || localTags.length > 0) && (
        <Collapsible open={tagsOpen} onOpenChange={setTagsOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full group">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-primary" />
              <span className="font-medium">Tags</span>
              {selectedTags.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {selectedTags.length}
                </Badge>
              )}
            </div>
            {tagsOpen ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3">
            <div className="flex flex-wrap gap-2">
              {displayTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer transition-all hover:scale-105",
                    selectedTags.includes(tag) 
                      ? "bg-primary text-primary-foreground shadow-glow" 
                      : "hover:bg-primary/10"
                  )}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            {hasMoreTags && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTagsExpanded(!tagsExpanded)}
                className="mt-3 w-full text-xs text-muted-foreground hover:text-foreground"
              >
                {tagsExpanded 
                  ? `Show less` 
                  : `Show all ${totalTagCount} tags`
                }
                {tagsExpanded ? (
                  <ChevronUp className="w-3 h-3 ml-1" />
                ) : (
                  <ChevronDown className="w-3 h-3 ml-1" />
                )}
              </Button>
            )}
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}
