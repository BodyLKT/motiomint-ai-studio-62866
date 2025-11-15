import { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  trackPositiveFeedback,
  trackNegativeFeedback,
  hasUserProvidedFeedback,
  markFeedbackGiven,
} from '@/lib/helpCenterAnalytics';

interface ArticleFeedbackProps {
  articleId: string;
  className?: string;
}

export default function ArticleFeedback({ articleId, className }: ArticleFeedbackProps) {
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'positive' | 'negative' | null>(null);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if user has already provided feedback
    setFeedbackGiven(hasUserProvidedFeedback(articleId));
  }, [articleId]);

  const handlePositiveFeedback = () => {
    if (feedbackGiven) return;
    
    setFeedbackType('positive');
    trackPositiveFeedback(articleId);
    markFeedbackGiven(articleId);
    setFeedbackGiven(true);
    setSubmitted(true);
    
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleNegativeFeedback = () => {
    if (feedbackGiven) return;
    
    setFeedbackType('negative');
    setShowCommentBox(true);
  };

  const handleSubmitComment = () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    // Simulate submission delay
    setTimeout(() => {
      trackNegativeFeedback(articleId, comment);
      markFeedbackGiven(articleId);
      setFeedbackGiven(true);
      setSubmitted(true);
      setIsSubmitting(false);
      setShowCommentBox(false);
      
      setTimeout(() => setSubmitted(false), 3000);
    }, 500);
  };

  const handleSkipComment = () => {
    trackNegativeFeedback(articleId);
    markFeedbackGiven(articleId);
    setFeedbackGiven(true);
    setShowCommentBox(false);
    setSubmitted(true);
    
    setTimeout(() => setSubmitted(false), 3000);
  };

  if (submitted) {
    return (
      <Card 
        className={cn(
          "bg-primary/5 border-primary/20 animate-fade-in",
          className
        )}
      >
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <p className="text-foreground font-medium">
              Thank you for your feedback!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <Card className="bg-muted/30 hover:bg-muted/40 transition-all duration-200">
        <CardContent className="pt-5 sm:pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-base sm:text-lg font-semibold leading-snug">Was this article helpful?</h3>
            
            {!feedbackGiven && !showCommentBox && (
              <div 
                className="flex gap-3 justify-center" 
                role="group" 
                aria-label="Article feedback"
              >
                <Button 
                  variant="outline" 
                  size="default"
                  onClick={handlePositiveFeedback}
                  className={cn(
                    "hover:bg-green-500/10 hover:border-green-500/50 hover:text-green-600 dark:hover:text-green-400 hover:scale-105 transition-all duration-150 group",
                    feedbackType === 'positive' && "bg-green-500/10 border-green-500/50 text-green-600 dark:text-green-400"
                  )}
                  aria-label="Yes, this article was helpful"
                >
                  <ThumbsUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform duration-150" aria-hidden="true" />
                  <span className="text-sm sm:text-base">Yes, this helped</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="default"
                  onClick={handleNegativeFeedback}
                  className={cn(
                    "hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-600 dark:hover:text-red-400 hover:scale-105 transition-all duration-150 group",
                    feedbackType === 'negative' && "bg-red-500/10 border-red-500/50 text-red-600 dark:text-red-400"
                  )}
                  aria-label="No, this article was not helpful"
                >
                  <ThumbsDown className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform duration-150" aria-hidden="true" />
                  <span className="text-sm sm:text-base">No, I need more help</span>
                </Button>
              </div>
            )}
            
            {feedbackGiven && !showCommentBox && (
              <p className="text-sm text-muted-foreground">
                Thanks for your feedback!
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Collapsible Feedback Form */}
      {showCommentBox && !feedbackGiven && (
        <Card 
          className={cn(
            "bg-background/60 backdrop-blur-sm border-2 border-primary/20 animate-fade-in",
            "shadow-lg shadow-primary/5"
          )}
        >
          <CardContent className="pt-6 space-y-4">
            <div>
              <h4 className="font-semibold mb-2">What was unclear or missing?</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Help us improve this article by sharing what you were looking for.
              </p>
              
              <Textarea
                placeholder="Tell us what you were trying to find or what could be clearer..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={cn(
                  "min-h-[100px] resize-none",
                  "bg-background/50 border-border/50",
                  "focus:border-primary focus:ring-2 focus:ring-primary/20",
                  "transition-all duration-200"
                )}
                aria-label="Feedback comment"
              />
            </div>
            
            <div className="flex gap-3 justify-end">
              <Button
                variant="ghost"
                onClick={handleSkipComment}
                disabled={isSubmitting}
              >
                Skip
              </Button>
              <Button
                onClick={handleSubmitComment}
                disabled={isSubmitting || !comment.trim()}
                className="group"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-pulse">Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                    Submit Feedback
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
