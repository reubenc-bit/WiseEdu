import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Market = 'south-africa' | 'zimbabwe';

interface MarketContextType {
  market: Market;
  setMarket: (market: Market) => void;
  getMarketLabel: (market: Market) => string;
  getCurriculumText: () => string;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export function MarketProvider({ children }: { children: ReactNode }) {
  const [market, setMarketState] = useState<Market>('south-africa');

  useEffect(() => {
    // Load market preference from localStorage
    const savedMarket = localStorage.getItem('selectedMarket') as Market;
    if (savedMarket && ['south-africa', 'zimbabwe'].includes(savedMarket)) {
      setMarketState(savedMarket);
    }
  }, []);

  const setMarket = (newMarket: Market) => {
    setMarketState(newMarket);
    localStorage.setItem('selectedMarket', newMarket);
  };

  const getMarketLabel = (market: Market) => {
    return market === 'zimbabwe' ? 'Zimbabwe' : 'South Africa';
  };

  const getCurriculumText = () => {
    return market === 'zimbabwe' 
      ? 'Aligned with Zimbabwean education standards and requirements.'
      : 'Aligned with South African education standards and requirements.';
  };

  return (
    <MarketContext.Provider value={{ market, setMarket, getMarketLabel, getCurriculumText }}>
      {children}
    </MarketContext.Provider>
  );
}

export function useMarket() {
  const context = useContext(MarketContext);
  if (context === undefined) {
    throw new Error('useMarket must be used within a MarketProvider');
  }
  return context;
}
