import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface SignUpModalProps {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export const SignUpModal = ({ open, onClose, onSwitchToLogin }: SignUpModalProps) => {
  const { t } = useTranslation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (pass: string, confirm: string) => {
    if (pass.length < 6) {
      setPasswordError(t('auth.passwordTooShort'));
      return false;
    }
    if (pass !== confirm) {
      setPasswordError(t('auth.passwordsMismatch'));
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword(password, confirmPassword)) {
      return;
    }

    if (!agreeToTerms) {
      setPasswordError(t('auth.acceptTerms'));
      return;
    }

    setLoading(true);

    const { error } = await signUp(email, password, fullName);
    
    setLoading(false);

    if (!error) {
      onClose();
      navigate('/dashboard');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-lg border-primary/20 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {t('auth.createAccount')}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {t('auth.signUpSubtitle')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">{t('auth.fullName')}</Label>
            <Input
              id="fullName"
              type="text"
              placeholder={t('auth.fullNamePlaceholder')}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t('auth.email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t('auth.emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t('auth.password')}</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder={t('auth.passwordPlaceholder')}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (confirmPassword) validatePassword(e.target.value, confirmPassword);
                }}
                required
                className="bg-background/50 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t('auth.confirmPassword')}</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder={t('auth.passwordPlaceholder')}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  validatePassword(password, e.target.value);
                }}
                required
                className="bg-background/50 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {passwordError && (
            <p className="text-sm text-destructive">{passwordError}</p>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={agreeToTerms}
              onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
            />
            <label
              htmlFor="terms"
              className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t('auth.agreeToTerms')}
            </label>
          </div>

          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full"
            disabled={loading || !agreeToTerms}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('auth.creatingAccount')}
              </>
            ) : (
              t('auth.signUpButton')
            )}
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground mt-4">
          {t('auth.hasAccount')}{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-primary hover:underline font-medium"
          >
            {t('nav.login')}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
