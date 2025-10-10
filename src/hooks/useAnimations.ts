import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Animation {
  id: string;
  title: string;
  description: string;
  category: string;
  file_url: string;
  thumbnail_url: string;
  tags: string[];
}

export function useAnimations(selectedCategory?: string, searchQuery?: string) {
  const [animations, setAnimations] = useState<Animation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnimations() {
      setLoading(true);
      try {
        let query = supabase.from('animations').select('*');

        if (selectedCategory && selectedCategory !== 'All') {
          query = query.eq('category', selectedCategory);
        }

        if (searchQuery) {
          query = query.ilike('title', `%${searchQuery}%`);
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) throw error;
        setAnimations(data || []);
      } catch (error) {
        console.error('Error fetching animations:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnimations();
  }, [selectedCategory, searchQuery]);

  return { animations, loading };
}

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user) return;

    async function fetchFavorites() {
      const { data } = await supabase
        .from('user_favorites')
        .select('animation_id');

      if (data) {
        setFavorites(new Set(data.map(f => f.animation_id)));
      }
    }

    fetchFavorites();
  }, [user]);

  const toggleFavorite = async (animationId: string) => {
    if (!user) return;

    const isFavorite = favorites.has(animationId);

    if (isFavorite) {
      await supabase
        .from('user_favorites')
        .delete()
        .eq('animation_id', animationId);
      
      setFavorites(prev => {
        const next = new Set(prev);
        next.delete(animationId);
        return next;
      });
    } else {
      await supabase
        .from('user_favorites')
        .insert({ 
          user_id: user.id,
          animation_id: animationId 
        });
      
      setFavorites(prev => new Set(prev).add(animationId));
    }
  };

  return { favorites, toggleFavorite };
}

export function useCategories() {
  const [categories, setCategories] = useState<string[]>(['All']);

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase
        .from('animations')
        .select('category');

      if (data) {
        const uniqueCategories = Array.from(new Set(data.map(d => d.category)));
        setCategories(['All', ...uniqueCategories]);
      }
    }

    fetchCategories();
  }, []);

  return categories;
}
