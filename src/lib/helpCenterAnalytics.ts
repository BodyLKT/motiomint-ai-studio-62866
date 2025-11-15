// Help Center Analytics - Local Storage Based MVP
interface ArticleAnalytics {
  views: number;
  positiveFeedback: number;
  negativeFeedback: number;
  lastViewed: string;
  lastUpdated: string;
}

interface ArticleFeedbackData {
  helpful: boolean;
  comment?: string;
  timestamp: string;
}

const ANALYTICS_KEY = 'motiomint_help_analytics';
const FEEDBACK_KEY = 'motiomint_help_feedback';

// Get all analytics data
export function getAllAnalytics(): Record<string, ArticleAnalytics> {
  try {
    const data = localStorage.getItem(ANALYTICS_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

// Save analytics data
function saveAnalytics(data: Record<string, ArticleAnalytics>): void {
  try {
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save analytics:', error);
  }
}

// Track article view
export function trackArticleView(articleId: string): void {
  const analytics = getAllAnalytics();
  
  if (!analytics[articleId]) {
    analytics[articleId] = {
      views: 0,
      positiveFeedback: 0,
      negativeFeedback: 0,
      lastViewed: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };
  }
  
  analytics[articleId].views += 1;
  analytics[articleId].lastViewed = new Date().toISOString();
  
  saveAnalytics(analytics);
}

// Track positive feedback
export function trackPositiveFeedback(articleId: string): void {
  const analytics = getAllAnalytics();
  
  if (!analytics[articleId]) {
    analytics[articleId] = {
      views: 0,
      positiveFeedback: 0,
      negativeFeedback: 0,
      lastViewed: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };
  }
  
  analytics[articleId].positiveFeedback += 1;
  saveAnalytics(analytics);
}

// Track negative feedback
export function trackNegativeFeedback(articleId: string, comment?: string): void {
  const analytics = getAllAnalytics();
  
  if (!analytics[articleId]) {
    analytics[articleId] = {
      views: 0,
      positiveFeedback: 0,
      negativeFeedback: 0,
      lastViewed: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };
  }
  
  analytics[articleId].negativeFeedback += 1;
  saveAnalytics(analytics);
  
  // Store feedback comment
  if (comment) {
    saveFeedbackComment(articleId, comment);
  }
}

// Save feedback comment
function saveFeedbackComment(articleId: string, comment: string): void {
  try {
    const feedbackData = localStorage.getItem(FEEDBACK_KEY);
    const feedback: Record<string, ArticleFeedbackData[]> = feedbackData ? JSON.parse(feedbackData) : {};
    
    if (!feedback[articleId]) {
      feedback[articleId] = [];
    }
    
    feedback[articleId].push({
      helpful: false,
      comment,
      timestamp: new Date().toISOString(),
    });
    
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(feedback));
  } catch (error) {
    console.error('Failed to save feedback:', error);
  }
}

// Calculate helpfulness score
export function calculateHelpfulnessScore(articleId: string): number {
  const analytics = getAllAnalytics();
  const data = analytics[articleId];
  
  if (!data || (data.positiveFeedback + data.negativeFeedback) === 0) {
    return 0;
  }
  
  const totalFeedback = data.positiveFeedback + data.negativeFeedback;
  const score = (data.positiveFeedback / totalFeedback) * 100;
  
  // Bonus for more engagement
  const engagementBonus = Math.min(data.views / 10, 20);
  
  return Math.min(score + engagementBonus, 100);
}

// Get popular articles
export function getPopularArticles(limit: number = 6): Array<{
  articleId: string;
  score: number;
  views: number;
}> {
  const analytics = getAllAnalytics();
  
  return Object.entries(analytics)
    .map(([articleId, data]) => ({
      articleId,
      score: calculateHelpfulnessScore(articleId),
      views: data.views,
    }))
    .sort((a, b) => {
      // Sort by score first, then by views
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return b.views - a.views;
    })
    .slice(0, limit);
}

// Get recently updated articles
export function getRecentlyUpdatedArticles(limit: number = 3): Array<{
  articleId: string;
  lastUpdated: string;
}> {
  const analytics = getAllAnalytics();
  
  return Object.entries(analytics)
    .map(([articleId, data]) => ({
      articleId,
      lastUpdated: data.lastUpdated,
    }))
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, limit);
}

// Check if user has already provided feedback
export function hasUserProvidedFeedback(articleId: string): boolean {
  try {
    const key = `feedback_given_${articleId}`;
    return localStorage.getItem(key) === 'true';
  } catch {
    return false;
  }
}

// Mark feedback as given
export function markFeedbackGiven(articleId: string): void {
  try {
    const key = `feedback_given_${articleId}`;
    localStorage.setItem(key, 'true');
  } catch (error) {
    console.error('Failed to mark feedback:', error);
  }
}

// Get article analytics
export function getArticleAnalytics(articleId: string): ArticleAnalytics | null {
  const analytics = getAllAnalytics();
  return analytics[articleId] || null;
}
