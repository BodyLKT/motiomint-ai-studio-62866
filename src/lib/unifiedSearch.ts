import { supabase } from '@/integrations/supabase/client';
import { searchArticles } from './helpCenterData';
import { CANONICAL_CATEGORIES, getCanonicalCategory } from './categoryMapping';

export interface SearchResultAnimation {
  type: 'animation';
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail_url: string;
  tags: string[];
  relevance: number;
}

export interface SearchResultCategory {
  type: 'category';
  name: string;
  count: number;
  relevance: number;
}

export interface SearchResultTool {
  type: 'tool';
  name: string;
  description: string;
  icon: string;
  path: string;
  relevance: number;
}

export interface SearchResultHelpArticle {
  type: 'help';
  id: string;
  title: string;
  description: string;
  category: string;
  path: string;
  relevance: number;
}

export type UnifiedSearchResult = 
  | SearchResultAnimation 
  | SearchResultCategory 
  | SearchResultTool 
  | SearchResultHelpArticle;

// Use the new 4 canonical categories
const CATEGORIES = [...CANONICAL_CATEGORIES];

const TOOLS = [
  {
    name: 'Canva',
    description: 'Design platform for creating stunning visuals',
    icon: '🎨',
    path: '/tools/canva',
  },
  {
    name: 'CapCut',
    description: 'Professional video editing made simple',
    icon: '🎬',
    path: '/tools/capcut',
  },
  {
    name: 'DaVinci Resolve',
    description: 'Professional-grade video editing software',
    icon: '🎞️',
    path: '/tools/davinci',
  },
  {
    name: 'After Effects',
    description: 'Industry-standard motion graphics and visual effects',
    icon: '✨',
    path: '/tools/after-effects',
  },
];

// Calculate relevance score based on match type
const calculateRelevance = (
  query: string,
  title: string,
  tags?: string[],
  description?: string
): number => {
  const lowerQuery = query.toLowerCase();
  const lowerTitle = title.toLowerCase();
  let score = 0;

  // Exact title match (highest priority)
  if (lowerTitle === lowerQuery) {
    score += 100;
  } else if (lowerTitle.startsWith(lowerQuery)) {
    score += 80;
  } else if (lowerTitle.includes(lowerQuery)) {
    score += 50;
  }

  // Tag matches
  if (tags) {
    tags.forEach(tag => {
      const lowerTag = tag.toLowerCase();
      if (lowerTag === lowerQuery) score += 70;
      else if (lowerTag.includes(lowerQuery)) score += 30;
    });
  }

  // Description matches
  if (description && description.toLowerCase().includes(lowerQuery)) {
    score += 20;
  }

  return score;
};

export async function performUnifiedSearch(query: string, filter: string = 'all') {
  const results: UnifiedSearchResult[] = [];
  const lowerQuery = query.toLowerCase();

  try {
    // 1. Search Animations
    let animationQuery = supabase
      .from('animations')
      .select('*');

    if (query) {
      animationQuery = animationQuery.or(
        `title.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{${query}}`
      );
    }

    if (filter && filter !== 'all') {
      animationQuery = animationQuery.eq('category', filter);
    }

    const { data: animations } = await animationQuery
      .order('created_at', { ascending: false })
      .limit(50);

    if (animations) {
      animations.forEach(anim => {
        const relevance = calculateRelevance(query, anim.title, anim.tags, anim.description);
        results.push({
          type: 'animation',
          id: anim.id,
          title: anim.title,
          description: anim.description || '',
          category: anim.category,
          thumbnail_url: anim.thumbnail_url,
          tags: anim.tags || [],
          relevance,
        });
      });
    }

    // 2. Search Categories
    if (filter === 'all' || filter === 'categories') {
      CATEGORIES.forEach(category => {
        if (category.toLowerCase().includes(lowerQuery)) {
          const relevance = calculateRelevance(query, category);
          results.push({
            type: 'category',
            name: category,
            count: 0, // Will be populated separately if needed
            relevance,
          });
        }
      });
    }

    // 3. Search Tools
    if (filter === 'all' || filter === 'tools') {
      TOOLS.forEach(tool => {
        if (
          tool.name.toLowerCase().includes(lowerQuery) ||
          tool.description.toLowerCase().includes(lowerQuery)
        ) {
          const relevance = calculateRelevance(query, tool.name, undefined, tool.description);
          results.push({
            type: 'tool',
            name: tool.name,
            description: tool.description,
            icon: tool.icon,
            path: tool.path,
            relevance,
          });
        }
      });
    }

    // 4. Search Help Center Articles
    if (filter === 'all' || filter === 'help') {
      const helpArticles = searchArticles(query);
      helpArticles.forEach(article => {
        const relevance = calculateRelevance(query, article.title, article.tags, article.description);
        results.push({
          type: 'help',
          id: article.id,
          title: article.title,
          description: article.description,
          category: article.category,
          path: article.path,
          relevance,
        });
      });
    }

    // Sort by relevance (highest first)
    results.sort((a, b) => b.relevance - a.relevance);

    return results;
  } catch (error) {
    console.error('Unified search error:', error);
    return [];
  }
}

// Quick suggestions for dropdown (lighter query)
export async function getQuickSuggestions(query: string, limit: number = 8) {
  if (!query || query.length < 2) {
    return [];
  }

  const results: UnifiedSearchResult[] = [];
  const lowerQuery = query.toLowerCase();

  try {
    // Quick animation search (limited)
    const { data: animations } = await supabase
      .from('animations')
      .select('id, title, category, thumbnail_url, tags')
      .or(`title.ilike.%${query}%,tags.cs.{${query}}`)
      .limit(5);

    if (animations) {
      animations.forEach(anim => {
        results.push({
          type: 'animation',
          id: anim.id,
          title: anim.title,
          description: '',
          category: anim.category,
          thumbnail_url: anim.thumbnail_url,
          tags: anim.tags || [],
          relevance: calculateRelevance(query, anim.title, anim.tags),
        });
      });
    }

    // Quick category match
    CATEGORIES.forEach(category => {
      if (category.toLowerCase().includes(lowerQuery)) {
        results.push({
          type: 'category',
          name: category,
          count: 0,
          relevance: calculateRelevance(query, category),
        });
      }
    });

    // Quick tool match
    TOOLS.forEach(tool => {
      if (tool.name.toLowerCase().includes(lowerQuery)) {
        results.push({
          type: 'tool',
          name: tool.name,
          description: tool.description,
          icon: tool.icon,
          path: tool.path,
          relevance: calculateRelevance(query, tool.name),
        });
      }
    });

    // Quick help article match (top 3)
    const helpArticles = searchArticles(query).slice(0, 3);
    helpArticles.forEach(article => {
      results.push({
        type: 'help',
        id: article.id,
        title: article.title,
        description: article.description,
        category: article.category,
        path: article.path,
        relevance: calculateRelevance(query, article.title, article.tags),
      });
    });

    // Sort by relevance and limit
    return results
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, limit);
  } catch (error) {
    console.error('Quick suggestions error:', error);
    return [];
  }
}

// Cache for search results (simple in-memory cache)
const searchCache = new Map<string, { results: UnifiedSearchResult[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getCachedSearch(query: string, filter: string = 'all') {
  const cacheKey = `${query}:${filter}`;
  const cached = searchCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.results;
  }

  const results = await performUnifiedSearch(query, filter);
  searchCache.set(cacheKey, { results, timestamp: Date.now() });

  // Clean old cache entries (keep only last 10 searches)
  if (searchCache.size > 10) {
    const oldestKey = Array.from(searchCache.keys())[0];
    searchCache.delete(oldestKey);
  }

  return results;
}
