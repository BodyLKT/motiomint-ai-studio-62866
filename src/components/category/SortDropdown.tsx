import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown } from 'lucide-react';

export type SortOption = 'newest' | 'oldest' | 'popular' | 'trending' | 'title-asc' | 'title-desc';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px] border-border/50 bg-card/50 backdrop-blur-sm">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border/50">
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="oldest">Oldest First</SelectItem>
          <SelectItem value="popular">Most Popular</SelectItem>
          <SelectItem value="trending">Trending</SelectItem>
          <SelectItem value="title-asc">Title (A-Z)</SelectItem>
          <SelectItem value="title-desc">Title (Z-A)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
