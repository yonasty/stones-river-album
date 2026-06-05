import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { StonesRiverHeader } from './components/StonesRiverHeader';
import { SectionDots } from './components/SectionDots';
import { ListenNowSection } from './components/ListenNowSection';
import { AboutSection } from './components/AboutSection';
import { QuoteSection } from './components/QuoteSection';
import { BiosSection } from './components/BiosSection';
import { PreorderSection } from './components/PreorderSection';
import { HonoraryProducers } from './components/HonoraryProducers';
import { VideoSection } from './components/VideoSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CartProvider } from './context/CartContext';
import { siteConfig } from './config/siteConfig';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);

  const handleEnter = () => {
    setHasEntered(true);
  };

  if (!hasEntered) {
    return <LandingPage onEnter={handleEnter} />;
  }

  return (
    <CartProvider>
      <div
        className="w-full"
        style={{
          backgroundColor: 'var(--site-bg)',
        }}
      >
        <CartDrawer />
        <SectionDots />

        {/* New banner header with frosted-glass navigation */}
        <StonesRiverHeader />

        <AboutSection />
        <QuoteSection />
        <BiosSection />
        <VideoSection />
        {siteConfig.SHOW_LISTEN_NOW && <ListenNowSection />}
        <PreorderSection />
        <HonoraryProducers />
        <Footer />
      </div>
    </CartProvider>
  );
}
