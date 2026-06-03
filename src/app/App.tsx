import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { StonesRiverHeader } from './components/StonesRiverHeader';
import { SectionDots } from './components/SectionDots';
import { ImageCarouselSection } from './components/ImageCarouselSection';
import { ListenNowSection } from './components/ListenNowSection';
import { AboutSection } from './components/AboutSection';
import { BiosSection } from './components/BiosSection';
import { PreorderSection } from './components/PreorderSection';
import { InterviewSection } from './components/InterviewSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CartProvider } from './context/CartContext';
import { siteConfig } from './config/siteConfig';
import blueBg from '../../assets/BROWN TEXTURE.jpg';

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
          backgroundImage: `url(${blueBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'scroll',
          backgroundColor: '#0d1b2a',
        }}
      >
        <CartDrawer />
        <SectionDots />

        {/* New banner header with frosted-glass navigation */}
        <StonesRiverHeader />

        <AboutSection />
        <InterviewSection />
        <BiosSection />
        <ImageCarouselSection />
        {siteConfig.SHOW_LISTEN_NOW && <ListenNowSection />}
        <PreorderSection />
        <Footer />
      </div>
    </CartProvider>
  );
}
