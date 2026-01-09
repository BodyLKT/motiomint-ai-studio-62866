// Category Mapping Utility
// Maps old 6 categories to new 4 canonical categories

export const OLD_CATEGORIES = [
  'Tech & Futuristic',
  'Business & Finance',
  'Abstract Backgrounds',
  'Fitness & Lifestyle',
  'Travel & Nature',
  'Social Media Hooks',
] as const;

export const CANONICAL_CATEGORIES = [
  'Tech & Digital',
  'Abstract & Motion Backgrounds',
  'Lifestyle & Real World',
  'Social & UI Hooks',
] as const;

export type OldCategory = typeof OLD_CATEGORIES[number];
export type CanonicalCategory = typeof CANONICAL_CATEGORIES[number];

// Mapping from old category names to new canonical names
export const CATEGORY_MAPPING: Record<string, CanonicalCategory> = {
  'Tech & Futuristic': 'Tech & Digital',
  'Business & Finance': 'Tech & Digital',
  'Abstract Backgrounds': 'Abstract & Motion Backgrounds',
  'Fitness & Lifestyle': 'Lifestyle & Real World',
  'Travel & Nature': 'Lifestyle & Real World',
  'Social Media Hooks': 'Social & UI Hooks',
  // Also support the new names directly
  'Tech & Digital': 'Tech & Digital',
  'Abstract & Motion Backgrounds': 'Abstract & Motion Backgrounds',
  'Lifestyle & Real World': 'Lifestyle & Real World',
  'Social & UI Hooks': 'Social & UI Hooks',
};

// Reverse mapping: which old categories map to each new canonical category
export const REVERSE_CATEGORY_MAPPING: Record<CanonicalCategory, OldCategory[]> = {
  'Tech & Digital': ['Tech & Futuristic', 'Business & Finance'],
  'Abstract & Motion Backgrounds': ['Abstract Backgrounds'],
  'Lifestyle & Real World': ['Fitness & Lifestyle', 'Travel & Nature'],
  'Social & UI Hooks': ['Social Media Hooks'],
};

// Get the canonical category for any category name (old or new)
export function getCanonicalCategory(category: string): CanonicalCategory | null {
  return CATEGORY_MAPPING[category] || null;
}

// Check if a category is an old category that needs redirect
export function isOldCategory(category: string): boolean {
  return OLD_CATEGORIES.includes(category as OldCategory) && 
         !CANONICAL_CATEGORIES.includes(category as CanonicalCategory);
}

// Get URL-safe slug for a category
export function getCategorySlug(category: string): string {
  return encodeURIComponent(category);
}

// Get the old categories that belong to a canonical category
export function getOldCategoriesFor(canonicalCategory: CanonicalCategory): OldCategory[] {
  return REVERSE_CATEGORY_MAPPING[canonicalCategory] || [];
}

// Category display info for the new 4 categories
export const CATEGORY_INFO: Record<CanonicalCategory, {
  description: string;
  icon: string;
  count: string;
  oldCategories: string[];
}> = {
  'Tech & Digital': {
    description: 'Holographic interfaces, AI visuals, fintech charts, dashboard elements, and corporate motion graphics',
    icon: '🚀',
    count: '215+ animations',
    oldCategories: ['Tech & Futuristic', 'Business & Finance'],
  },
  'Abstract & Motion Backgrounds': {
    description: 'Flowing shapes, particles, gradient motions, mesh patterns, and looping background animations',
    icon: '✨',
    count: '200+ animations',
    oldCategories: ['Abstract Backgrounds'],
  },
  'Lifestyle & Real World': {
    description: 'Fitness graphics, health metrics, travel routes, nature elements, and wellness animations',
    icon: '🌍',
    count: '195+ animations',
    oldCategories: ['Fitness & Lifestyle', 'Travel & Nature'],
  },
  'Social & UI Hooks': {
    description: 'Attention-grabbing intros, transitions, UI elements, loaders, and viral-ready hooks',
    icon: '📱',
    count: '150+ animations',
    oldCategories: ['Social Media Hooks'],
  },
};

// All 30 predefined tags
export const ALL_TAGS = [
  'ai', 'data', 'fintech', 'saas', 'dashboard', 'charts', 'cyber', 'hologram',
  'abstract', 'particles', 'gradient', 'mesh', 'flow', 'loop', 'glow', 'background',
  'fitness', 'health', 'energy', 'travel', 'nature', 'routes',
  'social', 'hook', 'intro', 'transition', 'ui', 'loader', 'text', 'reel',
] as const;

export type AnimationTag = typeof ALL_TAGS[number];
