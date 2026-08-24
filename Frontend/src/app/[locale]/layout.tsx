import { notFound } from "next/navigation";

import { isSupportedLocale } from "@/constants/locales";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return (
    <div lang={locale} className="flex min-h-full flex-1 flex-col">
      {children}
    </div>
  );
}
