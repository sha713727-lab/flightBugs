import { supportPhone } from "@/constants/supportContact";
import { cn } from "@/utils/cn";

type CallPhoneButtonProps = {
  readonly className?: string;
  readonly size?: "sm" | "lg";
};

export function CallPhoneButton({
  className,
  size = "lg",
}: CallPhoneButtonProps) {
  const hasCustomBg = Boolean(className && /(^|\s)!?bg-/.test(className));
  const hasCustomText = Boolean(className && /(^|\s)!?text-/.test(className));

  return (
    <a
      href={supportPhone.href}
      aria-label={`Call ${supportPhone.display}`}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition duration-300 hover:-translate-y-0.5",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aviation-blue",
        size === "lg"
          ? "min-h-12 px-6 text-[15px] sm:min-h-14 sm:px-8 sm:text-base"
          : "min-h-9 gap-1.5 px-3.5 text-sm sm:min-h-10 sm:px-4",
        !hasCustomBg && "bg-aviation-blue hover:bg-medium-blue",
        !hasCustomText && "text-on-accent",
        className,
      )}
    >
      <PhoneIcon size={size === "lg" ? 18 : 15} />
      <span>{supportPhone.display}</span>
    </a>
  );
}

function PhoneIcon({ size }: { readonly size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.7 21 3 13.3 3 3.9 3 3.4 3.4 3 4 3h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"
        fill="currentColor"
      />
    </svg>
  );
}
