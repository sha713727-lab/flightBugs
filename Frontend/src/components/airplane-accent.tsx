import Image from "next/image";

import { brandAssets } from "@/constants/brandAssets";
import { cn } from "@/utils/cn";

type AirplaneAccentProps = {
  className?: string;
  mirrored?: boolean;
  width?: number;
};

export function AirplaneAccent({
  className,
  mirrored = false,
  width = 140,
}: AirplaneAccentProps) {
  const { airplaneAccent } = brandAssets;
  const height = Math.round(
    (width * airplaneAccent.height) / airplaneAccent.width,
  );

  return (
    <Image
      src={airplaneAccent.src}
      alt=""
      width={width}
      height={height}
      aria-hidden="true"
      unoptimized
      className={cn(
        "pointer-events-none select-none object-contain",
        mirrored && "-scale-x-100",
        className,
      )}
    />
  );
}
