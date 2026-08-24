"use client";

import { type HTMLMotionProps,motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type AdsRevealProps = {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
  readonly y?: number;
} & Omit<HTMLMotionProps<"div">, "children" | "className">;

export function AdsReveal({
  children,
  className,
  delay = 0,
  y = 28,
  ...rest
}: AdsRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
