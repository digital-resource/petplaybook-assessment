import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export default function VideoSection() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [showThumbnail, setShowThumbnail] = useState(false);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://player.vimeo.com/api/player.js';
    script.async = true;
    script.onload = () => {
      if (iframeRef.current && (window as any).Vimeo) {
        const player = new (window as any).Vimeo.Player(iframeRef.current);
        playerRef.current = player;
        player.on('ended', function () {
          setShowThumbnail(true);
        });
        player.on('play', function () {
          setShowThumbnail(false);
        });
      }
    };
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleReplay = () => {
    if (playerRef.current) {
      playerRef.current.setCurrentTime(0).then(() => {
        playerRef.current.play();
      });
    }
    setShowThumbnail(false);
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
        >
          <div
            style={{ padding: '56.25% 0 0 0', position: 'relative' }}
            className="video-wrapper rounded-3xl overflow-hidden shadow-2xl"
          >
            <iframe
              ref={iframeRef}
              src="https://player.vimeo.com/video/1199937832?badge=0&autopause=0&player_id=0&app_id=58479"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              title="PetPlaybook"
            />
            {showThumbnail && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 10,
                }}
              >
                <img
                  src="/assets/thumb.jpg"
                  alt="PetPlaybook video thumbnail"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                {/* Replay button */}
                <button
                  onClick={handleReplay}
                  style={{
                    position: 'absolute',
                    bottom: '24px',
                    left: '24px',
                  }}
                  className="flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition-opacity text-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                  Replay Video
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
