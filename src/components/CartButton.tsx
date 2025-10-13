import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const CartButton = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (user) {
      fetchCartCount();
      
      // Subscribe to real-time cart updates
      const channel = supabase
        .channel('cart_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'user_cart',
            filter: `user_id=eq.${user.id}`,
          },
          () => {
            fetchCartCount();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } else {
      setCartCount(0);
    }
  }, [user]);

  const fetchCartCount = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_cart')
        .select('quantity', { count: 'exact' })
        .eq('user_id', user.id);

      if (error) throw error;

      const totalQuantity = data?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;
      setCartCount(totalQuantity);
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  if (!user) return null;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => navigate('/cart')}
      className="relative"
    >
      <ShoppingCart className="w-5 h-5" />
      {cartCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
        >
          {cartCount > 9 ? '9+' : cartCount}
        </Badge>
      )}
    </Button>
  );
};
