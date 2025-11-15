import { useState } from 'react';
import { AlertCircle, Send, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ReportIssueModalProps {
  articleId: string;
  articleTitle: string;
}

export default function ReportIssueModal({ articleId, articleTitle }: ReportIssueModalProps) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!category || !description.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please select a category and provide a description.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      // Store report data
      try {
        const reports = JSON.parse(localStorage.getItem('motiomint_reports') || '[]');
        reports.push({
          articleId,
          articleTitle,
          category,
          description,
          timestamp: new Date().toISOString(),
        });
        localStorage.setItem('motiomint_reports', JSON.stringify(reports));
      } catch (error) {
        console.error('Failed to save report:', error);
      }

      toast({
        title: 'Report Submitted',
        description: 'Thank you for helping us improve our Help Center!',
      });

      // Reset form
      setCategory('');
      setDescription('');
      setIsSubmitting(false);
      setOpen(false);
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "group hover:bg-destructive/10 hover:border-destructive/50 hover:text-destructive",
            "transition-all duration-200"
          )}
        >
          <AlertCircle className="w-4 h-4 mr-2" />
          Report an Issue
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-background/95 backdrop-blur-lg border-2 border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-primary" />
            Report an Issue
          </DialogTitle>
          <DialogDescription className="text-base">
            Help us improve this article: <span className="font-semibold text-foreground">{articleTitle}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Category Selection */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-base font-semibold">
              Issue Category *
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger 
                id="category"
                className={cn(
                  "bg-background/50 border-border/50",
                  "focus:border-primary focus:ring-2 focus:ring-primary/20",
                  "transition-all duration-200"
                )}
              >
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bug">
                  <div className="flex items-center gap-2">
                    <span>🐛</span>
                    <span>Bug or Error</span>
                  </div>
                </SelectItem>
                <SelectItem value="missing-info">
                  <div className="flex items-center gap-2">
                    <span>📝</span>
                    <span>Information Missing</span>
                  </div>
                </SelectItem>
                <SelectItem value="confusing">
                  <div className="flex items-center gap-2">
                    <span>🤔</span>
                    <span>Confusing Content</span>
                  </div>
                </SelectItem>
                <SelectItem value="outdated">
                  <div className="flex items-center gap-2">
                    <span>⏰</span>
                    <span>Outdated Information</span>
                  </div>
                </SelectItem>
                <SelectItem value="other">
                  <div className="flex items-center gap-2">
                    <span>💬</span>
                    <span>Other</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-semibold">
              Description *
            </Label>
            <Textarea
              id="description"
              placeholder="Please describe the issue in detail. What were you trying to do? What went wrong?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={cn(
                "min-h-[120px] resize-none",
                "bg-background/50 border-border/50",
                "focus:border-primary focus:ring-2 focus:ring-primary/20",
                "transition-all duration-200"
              )}
            />
            <p className="text-xs text-muted-foreground">
              {description.length}/500 characters
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !category || !description.trim()}
            className="group"
          >
            {isSubmitting ? (
              <>
                <span className="animate-pulse">Submitting...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                Submit Report
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
