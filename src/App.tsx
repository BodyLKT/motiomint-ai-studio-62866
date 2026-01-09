import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import CategoryPage from "./pages/CategoryPage";
import PricingPage from "./pages/PricingPage";
import CheckoutPage from "./pages/CheckoutPage";
import VideoDetailsPage from "./pages/VideoDetailsPage";
import CartPage from "./pages/CartPage";
import SimilarAnimations from "./pages/SimilarAnimations";
import SearchResults from "./pages/SearchResults";
import HelpCenter from "./pages/HelpCenter";
import GettingStartedArticle from "./pages/help/GettingStartedArticle";
import SubscriptionBillingArticle from "./pages/help/SubscriptionBillingArticle";
import LicenseUsageArticle from "./pages/help/LicenseUsageArticle";
import ContactSupportArticle from "./pages/help/ContactSupportArticle";
import CommunityArticle from "./pages/help/CommunityArticle";
import TermsArticle from "./pages/help/TermsArticle";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminThumbnails from "./pages/AdminThumbnails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="motionmint-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/help/getting-started/:slug" element={<GettingStartedArticle />} />
              <Route path="/help/subscription-billing/:slug" element={<SubscriptionBillingArticle />} />
              <Route path="/help/license-usage/:slug" element={<LicenseUsageArticle />} />
              <Route path="/help/contact-support/:slug" element={<ContactSupportArticle />} />
              <Route path="/help/community/:slug" element={<CommunityArticle />} />
              <Route path="/help/terms-policies/:slug" element={<TermsArticle />} />
              <Route
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              {/* Category page handles both old and new category URLs */}
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/animation/:id" element={<VideoDetailsPage />} />
              <Route path="/similar/:id" element={<SimilarAnimations />} />
              <Route path="/search" element={<SearchResults />} />
              <Route 
                path="/cart" 
                element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/thumbnails" 
                element={
                  <ProtectedRoute>
                    <AdminThumbnails />
                  </ProtectedRoute>
                } 
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
