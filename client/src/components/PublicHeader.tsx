import { Link, useLocation } from 'wouter';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMarket } from "@/contexts/MarketContext";
import { useAuth } from "@/hooks/useAuth";
import { GraduationCap } from "lucide-react";

export function PublicHeader() {
  const { market, setMarket, getMarketLabel } = useMarket();
  const { isAuthenticated, isLoading } = useAuth();
  const [location] = useLocation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const isActive = (path: string) => location === path;

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
                <Link href="/">
                  <button 
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/') ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                    }`}
                    data-testid="nav-home"
                  >
                    Home
                  </button>
                </Link>
                <Link href="/teacher-resources">
                  <button 
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/teacher-resources') ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                    }`}
                    data-testid="nav-teacher-resources"
                  >
                    Teacher Resources
                  </button>
                </Link>
                <Link href="/courses">
                  <button 
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/courses') ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                    }`}
                    data-testid="nav-courses"
                  >
                    Courses
                  </button>
                </Link>
                <button 
                  onClick={() => scrollToSection('pricing')}
                  className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  data-testid="nav-pricing"
                >
                  Pricing
                </button>
                <Link href="/contact">
                  <button 
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/contact') ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                    }`}
                    data-testid="nav-contact"
                  >
                    Contact
                  </button>
                </Link>
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
                {isLoading ? (
                  <div className="w-16 h-9 bg-muted animate-pulse rounded"></div>
                ) : isAuthenticated ? (
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline"
                      onClick={() => window.location.href = '/'}
                      data-testid="button-dashboard"
                    >
                      Dashboard
                    </Button>
                    <Button 
                      variant="ghost"
                      onClick={async () => {
                        try {
                          await fetch('/api/auth/logout', { method: 'POST' });
                          window.location.href = '/';
                        } catch (error) {
                          // Fallback to Replit logout if available
                          window.location.href = '/api/logout';
                        }
                      }}
                      data-testid="button-logout"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button 
                      variant="ghost" 
                      onClick={() => window.location.href = '/signin'}
                      data-testid="button-sign-in"
                    >
                      Sign In
                    </Button>
                    <Button 
                      onClick={() => window.location.href = '/signup'}
                      data-testid="button-get-started"
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

    </>
  );
}
