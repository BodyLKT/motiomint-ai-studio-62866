import { useState } from 'react';
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

export default function FilterPanel({
  formats,
  resolutions,
  tags,
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

  const activeFiltersCount = selectedFormats.length + selectedResolutions.length + selectedTags.length;

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

      {/* Tags Filter */}
      {tags.length > 0 && (
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
              {tags.slice(0, 12).map((tag) => (
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
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}
