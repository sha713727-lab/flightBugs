import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aviation-blue disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-aviation-blue text-on-accent shadow-none hover:bg-medium-blue",
        secondary:
          "border border-border bg-soft-section text-primary-text hover:border-aviation-blue hover:text-aviation-blue",
        ghost: "bg-transparent text-primary-text hover:text-aviation-blue",
        soft: "bg-aviation-blue/15 text-aviation-blue backdrop-blur-md hover:bg-aviation-blue/25",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-10 px-5 text-sm",
        lg: "h-12 px-6 text-[15px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type ButtonBaseProps = {
  className?: string;
  children: ReactNode;
  variant?: NonNullable<ButtonVariantProps["variant"]>;
  size?: NonNullable<ButtonVariantProps["size"]>;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  > & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps & {
  href: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const className = cn(
    buttonVariants({
      variant: props.variant ?? "primary",
      size: props.size ?? "md",
    }),
    props.className,
  );

  if ("href" in props && typeof props.href === "string") {
    return (
      <Link href={props.href} className={className}>
        {props.children}
      </Link>
    );
  }

  const nativeProps = props as ButtonAsButton;

  return (
    <button
      type={nativeProps.type ?? "button"}
      className={className}
      disabled={nativeProps.disabled}
      onClick={nativeProps.onClick}
      aria-label={nativeProps["aria-label"]}
      name={nativeProps.name}
      value={nativeProps.value}
      form={nativeProps.form}
    >
      {nativeProps.children}
    </button>
  );
}
