import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export function CartButton() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (user) {
      fetchCartCount();
      
      // Listen for cart updates
      const handleCartUpdate = () => {
        fetchCartCount();
      };

      window.addEventListener('cart-updated', handleCartUpdate);
      return () => window.removeEventListener('cart-updated', handleCartUpdate);
    } else {
      setCartCount(0);
    }
  }, [user]);

  const fetchCartCount = async () => {
    if (!user) return;

    try {
      const { count, error } = await supabase
        .from('user_cart')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      if (error) throw error;
      setCartCount(count || 0);
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Button
      onClick={() => navigate('/cart')}
      variant="outline"
      size="sm"
      className="relative gap-2"
    >
      <ShoppingCart size={16} />
      <span className="hidden sm:inline">Cart</span>
      {cartCount > 0 && (
        <Badge 
          variant="default" 
          className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full bg-primary text-primary-foreground"
        >
          {cartCount > 99 ? '99+' : cartCount}
        </Badge>
      )}
    </Button>
  );
}
