"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type MediaAsset = {
  readonly src: string;
  readonly alt: string;
};

type PosterVideoProps = {
  readonly poster: MediaAsset;
  readonly video: MediaAsset;
  readonly className?: string;
  readonly imageSizes: string;
  readonly priority?: boolean;
};

export function PosterVideo({
  poster,
  video,
  className,
  imageSizes,
  priority = false,
}: PosterVideoProps) {
  const [useVideo, setUseVideo] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const sync = () => {
      setUseVideo(media.matches);
    };

    sync();
    media.addEventListener("change", sync);
    return () => {
      media.removeEventListener("change", sync);
    };
  }, []);

  return (
    <div className={className}>
      {useVideo ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={poster.src}
          aria-label={video.alt}
        >
          <source src={video.src} type="video/mp4" />
          <track kind="captions" />
        </video>
      ) : (
        <Image
          src={poster.src}
          alt={poster.alt}
          fill
          priority={priority}
          sizes={imageSizes}
          className="object-cover"
        />
      )}
    </div>
  );
}
