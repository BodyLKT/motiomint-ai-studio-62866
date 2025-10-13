import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  Tag,
  CreditCard,
  ArrowLeft,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

interface CartItem {
  id: string;
  animation_id: string;
  quantity: number;
  price_at_add: number;
  animation: {
    id: string;
    title: string;
    thumbnail_url: string;
    category: string;
    format: string;
    resolution: string;
  };
}

interface PromoCode {
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
}

interface UserSubscription {
  subscription_tier: string;
  status: string;
}

const CartPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [userSubscription, setUserSubscription] = useState<UserSubscription | null>(null);
  const [processingCheckout, setProcessingCheckout] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchCartData();
    fetchUserSubscription();
  }, [user, navigate]);

  const fetchCartData = async () => {
    try {
      const { data, error } = await supabase
        .from('user_cart')
        .select(`
          id,
          animation_id,
          quantity,
          price_at_add,
          animations (
            id,
            title,
            thumbnail_url,
            category,
            format,
            resolution
          )
        `)
        .eq('user_id', user?.id);

      if (error) throw error;

      const formattedData = (data || []).map(item => ({
        ...item,
        animation: Array.isArray(item.animations) ? item.animations[0] : item.animations
      })) as CartItem[];

      setCartItems(formattedData);
    } catch (error: any) {
      console.error('Error fetching cart:', error);
      toast({
        title: 'Error loading cart',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserSubscription = async () => {
    try {
      const { data } = await supabase
        .from('user_subscriptions')
        .select('subscription_tier, status')
        .eq('user_id', user?.id)
        .eq('status', 'active')
        .maybeSingle();

      setUserSubscription(data);
    } catch (error) {
      console.error('Error fetching subscription:', error);
    }
  };

  const updateQuantity = async (cartId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      const { error } = await supabase
        .from('user_cart')
        .update({ quantity: newQuantity })
        .eq('id', cartId);

      if (error) throw error;

      setCartItems(prev =>
        prev.map(item =>
          item.id === cartId ? { ...item, quantity: newQuantity } : item
        )
      );

      toast({
        title: 'Quantity updated',
      });
    } catch (error: any) {
      toast({
        title: 'Error updating quantity',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const removeItem = async (cartId: string) => {
    try {
      const { error } = await supabase
        .from('user_cart')
        .delete()
        .eq('id', cartId);

      if (error) throw error;

      setCartItems(prev => prev.filter(item => item.id !== cartId));

      toast({
        title: 'Item removed from cart',
      });
    } catch (error: any) {
      toast({
        title: 'Error removing item',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const clearCart = async () => {
    try {
      const { error } = await supabase
        .from('user_cart')
        .delete()
        .eq('user_id', user?.id);

      if (error) throw error;

      setCartItems([]);
      toast({
        title: 'Cart cleared',
      });
    } catch (error: any) {
      toast({
        title: 'Error clearing cart',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const applyPromoCode = async () => {
    if (!promoCode.trim()) return;

    try {
      const { data, error } = await supabase
        .from('promo_codes')
        .select('*')
        .eq('code', promoCode.toUpperCase())
        .eq('active', true)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        toast({
          title: 'Invalid promo code',
          variant: 'destructive',
        });
        return;
      }

      // Check if max uses reached
      if (data.max_uses && data.current_uses >= data.max_uses) {
        toast({
          title: 'Promo code expired',
          description: 'This code has reached its usage limit',
          variant: 'destructive',
        });
        return;
      }

      setAppliedPromo({
        code: data.code,
        discount_type: data.discount_type,
        discount_value: data.discount_value,
      });

      toast({
        title: 'Promo code applied!',
        description: `You saved ${data.discount_type === 'percentage' ? data.discount_value + '%' : data.discount_value + '€'}`,
      });
    } catch (error: any) {
      toast({
        title: 'Error applying promo code',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price_at_add * item.quantity), 0);
  };

  const calculateDiscount = () => {
    if (!appliedPromo) return 0;
    const subtotal = calculateSubtotal();
    if (appliedPromo.discount_type === 'percentage') {
      return subtotal * (appliedPromo.discount_value / 100);
    }
    return appliedPromo.discount_value;
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    return (subtotal - discount) * 0.19; // 19% VAT
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const tax = calculateTax();
    return subtotal - discount + tax;
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    setProcessingCheckout(true);
    
    try {
      // Placeholder for actual payment integration
      toast({
        title: 'Checkout',
        description: 'Payment integration coming soon!',
      });
      
      // After successful payment, clear cart and add to downloads
      // This would be handled by your payment webhook
    } catch (error: any) {
      toast({
        title: 'Checkout failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setProcessingCheckout(false);
    }
  };

  const getTierBadge = () => {
    if (!userSubscription) return null;
    
    const tier = userSubscription.subscription_tier;
    const colors: Record<string, string> = {
      basic: 'bg-blue-500/20 text-blue-500 border-blue-500/30',
      pro: 'bg-purple-500/20 text-purple-500 border-purple-500/30',
      agency: 'bg-gold-500/20 text-gold-500 border-gold-500/30',
    };

    return (
      <Badge className={colors[tier] || ''}>
        <Sparkles className="w-3 h-3 mr-1" />
        {tier.toUpperCase()} Member
      </Badge>
    );
  };

  const getUpsellMessage = () => {
    if (!userSubscription) {
      return {
        title: 'Join a subscription for better prices!',
        description: 'Pro members get 20% off all animations',
        action: 'View Plans',
      };
    }

    if (userSubscription.subscription_tier === 'basic') {
      return {
        title: 'Upgrade to Pro for unlimited downloads',
        description: 'Pro members get 4K quality and priority support',
        action: 'Upgrade Now',
      };
    }

    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-muted-foreground animate-pulse" />
          <p className="text-muted-foreground">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          <div className="flex items-center space-x-3">
            {getTierBadge()}
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center">
                <ShoppingCart className="w-8 h-8 mr-3" />
                Your Cart
              </h1>
              <p className="text-muted-foreground">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            {cartItems.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearCart}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Cart
              </Button>
            )}
          </div>

          {cartItems.length === 0 ? (
            <Card className="glass border-border/50 text-center py-16">
              <CardContent>
                <ShoppingCart className="w-24 h-24 mx-auto mb-6 text-muted-foreground opacity-50" />
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <p className="text-muted-foreground mb-8">
                  Browse our collection and add some amazing animations
                </p>
                <Button onClick={() => navigate('/dashboard')}>
                  Browse Animations
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {/* Upsell Message */}
                {getUpsellMessage() && (
                  <Card className="glass border-primary/30 bg-primary/5">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <AlertCircle className="w-5 h-5 mr-2 text-primary" />
                            <h3 className="font-semibold">{getUpsellMessage()!.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">
                            {getUpsellMessage()!.description}
                          </p>
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => navigate('/pricing')}
                          >
                            {getUpsellMessage()!.action}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Cart Items List */}
                {cartItems.map((item) => (
                  <Card key={item.id} className="glass border-border/50">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={item.animation.thumbnail_url}
                          alt={item.animation.title}
                          className="w-32 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">{item.animation.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {item.animation.category} • {item.animation.format} • {item.animation.resolution}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-12 text-center font-semibold">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg">
                                {(item.price_at_add * item.quantity).toFixed(2)}€
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-sm text-muted-foreground">
                                  {item.price_at_add.toFixed(2)}€ each
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="glass border-border/50 sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Promo Code */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Promo Code
                      </label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                          disabled={!!appliedPromo}
                        />
                        <Button
                          variant="outline"
                          onClick={applyPromoCode}
                          disabled={!!appliedPromo || !promoCode.trim()}
                        >
                          <Tag className="w-4 h-4" />
                        </Button>
                      </div>
                      {appliedPromo && (
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {appliedPromo.code} applied
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setAppliedPromo(null);
                              setPromoCode('');
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      )}
                    </div>

                    <Separator />

                    {/* Price Breakdown */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>{calculateSubtotal().toFixed(2)}€</span>
                      </div>
                      {appliedPromo && (
                        <div className="flex justify-between text-sm text-green-500">
                          <span>Discount</span>
                          <span>-{calculateDiscount().toFixed(2)}€</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">VAT (19%)</span>
                        <span>{calculateTax().toFixed(2)}€</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>{calculateTotal().toFixed(2)}€</span>
                    </div>

                    <Button
                      className="w-full btn-glow"
                      size="lg"
                      onClick={handleCheckout}
                      disabled={processingCheckout}
                    >
                      <CreditCard className="w-5 h-5 mr-2" />
                      {processingCheckout ? 'Processing...' : 'Proceed to Checkout'}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Secure checkout powered by Stripe
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
