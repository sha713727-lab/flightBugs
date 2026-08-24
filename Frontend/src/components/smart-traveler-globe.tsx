import Image from "next/image";

import { marketingImages } from "@/constants/brandAssets";
import { cn } from "@/utils/cn";

type SmartTravelerGlobeProps = {
  className?: string;
};

export function SmartTravelerGlobe({ className }: SmartTravelerGlobeProps) {
  const { globe } = marketingImages;

  return (
    <div className={cn("earth-globe-root", className)} aria-hidden="true">
      <div className="earth-globe-shell">
        <div className="earth-globe-ring" />
        <div className="earth-globe-sphere">
          <Image
            src={globe.src}
            alt=""
            width={globe.width}
            height={globe.height}
            className="h-full w-full object-contain"
            priority={false}
          />
        </div>
      </div>
    </div>
  );
}
