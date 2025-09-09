import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AuthModals } from "./AuthModals";
import { useMarket } from "@/contexts/MarketContext";
import { GraduationCap } from "lucide-react";

export function PublicHeader() {
  const [showAuthModal, setShowAuthModal] = useState<'login' | 'signup' | null>(null);
  const { market, setMarket, getMarketLabel } = useMarket();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                CodewiseHub
              </h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  data-testid="nav-home"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  data-testid="nav-about"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  data-testid="nav-features"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  data-testid="nav-contact"
                >
                  Contact
                </button>
              </div>
            </nav>

            {/* Market Selector and Auth */}
            <div className="flex items-center space-x-4">
              {/* Market Selector */}
              <Select value={market} onValueChange={setMarket} data-testid="select-market">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="south-africa" data-testid="option-south-africa">
                    🇿🇦 South Africa
                  </SelectItem>
                  <SelectItem value="zimbabwe" data-testid="option-zimbabwe">
                    🇿🇼 Zimbabwe
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  onClick={() => setShowAuthModal('login')}
                  data-testid="button-sign-in"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => setShowAuthModal('signup')}
                  data-testid="button-get-started"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <AuthModals 
        showModal={showAuthModal} 
        onClose={() => setShowAuthModal(null)} 
      />
    </>
  );
}
