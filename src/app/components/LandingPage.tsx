import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import videoSrc from '../../../assets/New_KittelLandingPage_Asset.mp4';

interface LandingPageProps {
  onEnter: () => void;
}

export function LandingPage({ onEnter }: LandingPageProps) {
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 10-second timeout for video load failure
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      if (!videoReady) {
        setVideoFailed(true);
      }
    }, 10000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [videoReady]);

  const handleCanPlay = useCallback(() => {
    setVideoReady(true);
    setVideoFailed(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const handleVideoError = useCallback(() => {
    setVideoFailed(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const handleEnterClick = useCallback(() => {
    setIsFadingOut(true);
    setTimeout(() => {
      onEnter();
    }, 400);
  }, [onEnter]);

  return (
    <AnimatePresence>
      {!isFadingOut ? (
        <motion.div
          className="relative w-full h-screen overflow-hidden"
          style={{ backgroundColor: '#1a1a2e' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Video background */}
          {!videoFailed && (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              onCanPlay={handleCanPlay}
              onError={handleVideoError}
              onStalled={handleVideoError}
              className="absolute inset-0 w-full h-full object-contain md:object-cover"
              style={{
                opacity: videoReady ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
              }}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          )}

          {/* Fallback background shown while loading or on failure */}
          {(!videoReady || videoFailed) && (
            <div
              className="absolute inset-0"
              style={{ backgroundColor: '#1a1a2e' }}
            />
          )}



          {/* Enter button — centered on mobile, near bottom on desktop */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center md:justify-end px-6"
               style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom, 0px))' }}>
            <motion.button
              onClick={handleEnterClick}
              className="group relative px-12 py-5 border-2 border-parchment/80 bg-warm-black/20 backdrop-blur-sm
                         text-parchment tracking-wide transition-all duration-300
                         hover:bg-parchment/10 hover:border-brass hover:shadow-[0_0_30px_rgba(184,134,11,0.3)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-['Playfair_Display'] text-lg tracking-wider">
                Enter
              </span>

              {/* Subtle glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                              bg-gradient-to-r from-transparent via-brass/5 to-transparent" />
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="relative w-full h-screen overflow-hidden"
          style={{ backgroundColor: '#1a1a2e' }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      )}
    </AnimatePresence>
  );
}
