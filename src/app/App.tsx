import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Navbar } from './components/Navbar';
import { SectionDots } from './components/SectionDots';
import { HomeHeroSection } from './components/HomeHeroSection';
import { ImageCarouselSection } from './components/ImageCarouselSection';
import { ListenNowSection } from './components/ListenNowSection';
import { AboutSection } from './components/AboutSection';
import { BiosSection } from './components/BiosSection';
import { PreorderSection } from './components/PreorderSection';
import { InterviewSection } from './components/InterviewSection';
import { Footer } from './components/Footer';
import { CartIcon } from './components/CartIcon';
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
        className="w-full overflow-x-hidden"
        style={{
          backgroundImage: `url(${blueBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'scroll',
          backgroundColor: '#0d1b2a',
        }}
      >
        <CartIcon />
        <CartDrawer />
        <SectionDots />

        {/* Home banner + Navbar */}
        <div className="bg-black">
          <HomeHeroSection />
          <Navbar />
        </div>
        <AboutSection />
        <ImageCarouselSection />
        {siteConfig.SHOW_LISTEN_NOW && <ListenNowSection />}
        <BiosSection />
        <PreorderSection />
        <InterviewSection />
        <Footer />
      </div>
    </CartProvider>
  );
}
