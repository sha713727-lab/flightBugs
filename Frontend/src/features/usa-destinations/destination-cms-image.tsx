"use client";

import Image from "next/image";

type DestinationCmsImageProps = {
  readonly src: string;
  readonly alt: string;
  readonly className: string;
  readonly sizes: string;
  readonly priority?: boolean;
};

export function DestinationCmsImage({
  src,
  alt,
  className,
  sizes,
  priority = false,
}: DestinationCmsImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      unoptimized
      className={className}
      sizes={sizes}
      {...(priority ? { priority: true } : {})}
    />
  );
}
