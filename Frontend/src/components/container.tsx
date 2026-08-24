import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return <div className={cn("container-avion", className)}>{children}</div>;
}
