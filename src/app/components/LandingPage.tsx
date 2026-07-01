import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'motion/react';
import videoSrc from '../../../assets/New_KittelLandingPage_Asset.mp4';

interface LandingPageProps {
  onEnter: () => void;
}

// Pre-launch soft gate. Password is checked case-insensitively.
const GATE_PASSWORD = 'nethermead';

export function LandingPage({ onEnter }: LandingPageProps) {
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shakeControls = useAnimationControls();

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

  // Click "Enter" → the button lifts away and the password prompt is revealed.
  const handleEnterClick = useCallback(() => {
    setShowPassword(true);
    setTimeout(() => inputRef.current?.focus(), 240);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (password.trim().toLowerCase() === GATE_PASSWORD) {
        setError(false);
        setIsFadingOut(true);
        setTimeout(() => {
          onEnter();
        }, 400);
      } else {
        setError(true);
        shakeControls.start({ x: [0, -8, 8, -8, 8, 0], transition: { duration: 0.4 } });
        inputRef.current?.select();
      }
    },
    [password, onEnter, shakeControls],
  );

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



          {/* Enter button + pre-launch password gate — below video on mobile, near bottom on desktop */}
          <div className="relative z-10 w-full h-full flex flex-col items-center px-6 pt-[70vh] md:pt-0 md:justify-end"
               style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom, 0px))' }}>
            {/* Shared anchor: the password prompt rises into the same spot the button lifts away from */}
            <div className="relative flex flex-col items-center">
              <motion.button
                onClick={handleEnterClick}
                className="group relative px-12 py-4 border-2 border-parchment/80 bg-warm-black/20 backdrop-blur-sm
                           text-parchment transition-all duration-300
                           hover:bg-parchment/10 hover:border-brass hover:shadow-[0_0_30px_rgba(184,134,11,0.3)]"
                initial={{ opacity: 0, y: 20 }}
                animate={showPassword ? { opacity: 0, y: -90 } : { opacity: 1, y: 0 }}
                transition={{ duration: showPassword ? 0.55 : 1, delay: showPassword ? 0 : 0.5 }}
                style={{ pointerEvents: showPassword ? 'none' : 'auto' }}
                whileHover={showPassword ? undefined : { scale: 1.05 }}
                whileTap={showPassword ? undefined : { scale: 0.98 }}
              >
                <span className="font-garamond text-2xl tracking-[0.16em]">
                  Enter
                </span>

                {/* Subtle glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                bg-gradient-to-r from-transparent via-brass/5 to-transparent" />
              </motion.button>

              {/* Password prompt — revealed under the lifted Enter button */}
              <motion.form
                onSubmit={handleSubmit}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3.5"
                initial={{ opacity: 0, y: 24 }}
                animate={showPassword ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, delay: showPassword ? 0.18 : 0 }}
                style={{ pointerEvents: showPassword ? 'auto' : 'none' }}
                aria-hidden={!showPassword}
              >
                <span className="font-garamond text-lg uppercase tracking-[0.22em] text-parchment/70 whitespace-nowrap">
                  Enter password to continue
                </span>

                <motion.div className="flex items-stretch gap-2.5" animate={shakeControls}>
                  <input
                    ref={inputRef}
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(false);
                    }}
                    placeholder="Password"
                    autoComplete="off"
                    spellCheck={false}
                    tabIndex={showPassword ? 0 : -1}
                    className="font-garamond w-64 px-4 py-3 border-2 border-parchment/60 bg-warm-black/30 backdrop-blur-sm
                               text-parchment text-xl tracking-[0.1em] outline-none transition-all duration-300
                               placeholder:text-parchment/40 focus:border-brass focus:shadow-[0_0_24px_rgba(184,134,11,0.25)]"
                  />
                  <button
                    type="submit"
                    aria-label="Submit password"
                    tabIndex={showPassword ? 0 : -1}
                    className="font-garamond px-5 border-2 border-parchment/60 bg-warm-black/20 backdrop-blur-sm
                               text-parchment text-2xl transition-all duration-300
                               hover:border-brass hover:bg-parchment/10 hover:shadow-[0_0_24px_rgba(184,134,11,0.25)]"
                  >
                    →
                  </button>
                </motion.div>

                <span
                  className="font-garamond text-base tracking-[0.12em] h-4 text-red-300 transition-opacity duration-200"
                  style={{ opacity: error ? 1 : 0 }}
                  role="alert"
                >
                  Incorrect password
                </span>
              </motion.form>
            </div>
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
