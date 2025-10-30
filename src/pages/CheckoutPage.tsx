import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, CreditCard, Lock, Shield, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const CheckoutPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const planType = searchParams.get('type') || 'oneTime';
  const planName = searchParams.get('plan') || 'Mega';
  
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'gpay'>('card');
  const [billingFrequency, setBillingFrequency] = useState<'yearly' | 'monthly'>('yearly');
  
  // Mock plan data - in production, this would come from your database
  const planDetails = {
    oneTime: {
      Starter: { price: '29', animations: 20, features: ['HD Quality', 'Commercial License'] },
      Mega: { price: '79', animations: 50, features: ['4K Quality', 'Extended License', 'Priority Support'] },
      Agency: { price: '129', animations: 100, features: ['4K Quality', 'Team License', 'Custom Requests'] }
    },
    subscription: {
      Basic: { price: '9', period: '/mo', animations: 20, features: ['HD Downloads', 'Cancel Anytime'] },
      Pro: { price: '19', period: '/mo', animations: 50, features: ['4K Downloads', 'Priority Access'] },
      Agency: { price: '49', period: '/mo', animations: 'Unlimited', features: ['White Label', 'API Access'] }
    }
  };
  
  const currentPlan = planType === 'oneTime' 
    ? planDetails.oneTime[planName as keyof typeof planDetails.oneTime]
    : planDetails.subscription[planName as keyof typeof planDetails.subscription];
    
  const calculateTotal = () => {
    const basePrice = parseFloat(currentPlan.price);
    const vat = basePrice * 0.21;
    return { subtotal: basePrice, vat, total: basePrice + vat };
  };
  
  const { subtotal, vat, total } = calculateTotal();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="border-b border-border/50 bg-background/95 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/pricing')}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Pricing</span>
            </button>
            <div className="flex-1" />
            <span className="font-bold text-2xl gradient-text">motiomint</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr,400px] gap-8">
          {/* Left Column - Payment Form */}
          <div className="space-y-6">
            {/* Plan Selection */}
            {planType === 'subscription' && (
              <Card className="glass border-border/50">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Select your plan</h2>
                  <RadioGroup value={billingFrequency} onValueChange={(v: any) => setBillingFrequency(v)} className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <RadioGroupItem value="yearly" id="yearly" className="peer sr-only" />
                      <Label
                        htmlFor="yearly"
                        className={cn(
                          "flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-all",
                          billingFrequency === 'yearly' 
                            ? "border-primary bg-primary/5" 
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">Yearly</span>
                          <Badge className="bg-primary text-primary-foreground">SAVE 33%</Badge>
                        </div>
                        <span className="text-2xl font-bold">€15.99/month</span>
                        <span className="text-xs text-muted-foreground">Billed annually</span>
                      </Label>
                    </div>
                    <div className="relative">
                      <RadioGroupItem value="monthly" id="monthly" className="peer sr-only" />
                      <Label
                        htmlFor="monthly"
                        className={cn(
                          "flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-all",
                          billingFrequency === 'monthly' 
                            ? "border-primary bg-primary/5" 
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <span className="font-semibold mb-2">Monthly</span>
                        <span className="text-2xl font-bold">€23.99/month</span>
                        <span className="text-xs text-muted-foreground">Billed monthly</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            )}

            {/* Payment Method */}
            <Card className="glass border-border/50">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Payment method</h2>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { id: 'card', label: 'Credit card', icon: CreditCard },
                    { id: 'paypal', label: 'PayPal', icon: null },
                    { id: 'gpay', label: 'Pay', icon: null }
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={cn(
                        "flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all",
                        paymentMethod === method.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      {method.icon ? <method.icon className="w-5 h-5" /> : null}
                      <span className="text-sm font-medium">{method.label}</span>
                    </button>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardName">Card holder name</Label>
                      <Input id="cardName" placeholder="John Doe" className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="cardNumber">Card number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1.5" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiration">Expiration</Label>
                        <Input id="expiration" placeholder="MM / YY" className="mt-1.5" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" className="mt-1.5" />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Billing Information */}
            <Card className="glass border-border/50">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Billing Information</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select defaultValue="us">
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="de">Germany</SelectItem>
                        <SelectItem value="fr">France</SelectItem>
                        <SelectItem value="es">Spain</SelectItem>
                        <SelectItem value="it">Italy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="Street address" className="mt-1.5" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="City" className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP / Postal code</Label>
                      <Input id="zip" placeholder="12345" className="mt-1.5" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Transactions are encrypted and secured</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>PayPal or any credit card</span>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card className="glass border-primary/20">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-1">Your {planName} plan</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Plan includes:
                </p>

                {/* Plan Features */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm">{typeof currentPlan.animations === 'number' ? currentPlan.animations : currentPlan.animations} Premium Animations</span>
                  </div>
                  {currentPlan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      €{currentPlan.price}{planType === 'subscription' ? '/mo' : ''} × {planType === 'subscription' ? '12 months' : '1'}
                    </span>
                    <span className="font-medium">€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">VAT (21%)</span>
                    <span className="font-medium">€{vat.toFixed(2)}</span>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-3xl font-bold gradient-text">€{total.toFixed(2)}</span>
                </div>

                {/* Complete Purchase Button */}
                <Button className="w-full btn-glow mb-4" size="lg">
                  Complete Purchase
                </Button>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-3 h-3" />
                  <span>Safe & secure payment</span>
                </div>

                <Separator className="my-6" />

                {/* Legal Text */}
                <p className="text-xs text-muted-foreground leading-relaxed">
                  By purchasing, you accept the{' '}
                  <a href="#" className="text-primary hover:underline">Terms of Use</a>
                  {' '}and acknowledge reading the{' '}
                  <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                  .{planType === 'subscription' && ' Your subscription will automatically renew annually unless you cancel it. You can cancel at any time through your account settings or by contacting us, effective at the end of the billing period.'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;