import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";

/**
 * Cinematic full-bleed video background.
 * - Switches between mobile/desktop sources so the wrong file is never downloaded.
 * - Falls back to a poster image if the video fails or can't autoplay.
 * - Never leaves a blank/broken hero: poster is always in the DOM underneath.
 */
export default function VideoBackground({
  desktopSrc,
  mobileSrc,
  poster,
  className = "",
  overlayClassName = "bg-black/45",
}) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const videoRef = useRef(null);
  const [failed, setFailed] = useState(false);
  const src = isMobile ? mobileSrc : desktopSrc;

  useEffect(() => {
    setFailed(false);

    const el = videoRef.current;
    if (!el) return;

    // Reload the element when source changes (mobile <-> desktop breakpoint cross)
    el.load();

    const tryPlay = async () => {
      try {
        await el.play();
      } catch {
        // Browser may not be ready yet. Wait for canplay.
      }
    };

    if (el.readyState >= 2) {
      tryPlay();
    } else {
      el.addEventListener("canplay", tryPlay, { once: true });

      return () => {
        el.removeEventListener("canplay", tryPlay);
      };
    }
  }, [src]);

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {/* Poster is always rendered so there is never a blank frame */}
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          failed ? "opacity-100" : "opacity-0"
        }`}
      />

      {!failed && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          onError={() => setFailed(true)}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      <div
        className={`absolute inset-0 ${overlayClassName}`}
        aria-hidden="true"
      />
    </div>
  );
}