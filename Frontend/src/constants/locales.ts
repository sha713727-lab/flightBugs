export const DEFAULT_LOCALE = "en" as const;

export const SUPPORTED_LOCALES = ["en"] as const;

export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

export function isSupportedLocale(value: string): value is AppLocale {
  return (SUPPORTED_LOCALES as ReadonlyArray<string>).includes(value);
}
