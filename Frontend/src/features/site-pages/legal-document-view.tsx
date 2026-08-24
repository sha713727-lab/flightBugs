import {
  type LandingThemeId,
  landingThemes,
  type LegalSection,
} from "@/constants/sitePages";
import { cn } from "@/utils/cn";

type LegalDocumentViewProps = {
  readonly themeId: LandingThemeId;
  readonly title: string;
  readonly intro: string;
  readonly updatedLabel: string;
  readonly updatedDate: string;
  readonly sections: ReadonlyArray<LegalSection>;
};

export function LegalDocumentView({
  themeId,
  title,
  intro,
  updatedLabel,
  updatedDate,
  sections,
}: LegalDocumentViewProps) {
  const theme = landingThemes[themeId];
  const isDark = theme.layout === "dark-aviation";
  const isSignal = theme.layout === "signal-live";
  const isExplore = theme.layout === "soft-explore";

  return (
    <div className={cn(theme.containerClassName, "py-14 md:py-20")}>
      <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-aviation-blue">
        Legal
      </p>
      <h1
        className={cn(
          "mt-3 max-w-3xl font-bold tracking-[-0.03em]",
          isSignal
            ? "text-[clamp(36px,6vw,56px)]"
            : "text-[clamp(32px,5vw,52px)]",
        )}
      >
        {title}
      </h1>
      <p
        className={cn(
          "mt-3 text-sm",
          isDark ? "text-white/55" : "text-secondary-text",
        )}
      >
        {updatedLabel}: {updatedDate}
      </p>
      <p
        className={cn(
          "mt-6 max-w-3xl text-[16px] leading-relaxed",
          isDark ? "text-white/70" : "text-secondary-text",
        )}
      >
        {intro}
      </p>

      <div
        className={cn(
          "mt-12 max-w-3xl space-y-10",
          isExplore &&
            "rounded-[24px] border border-[var(--explore-border)] bg-[var(--explore-surface)] p-6 md:p-8",
          isSignal && "rounded-[4px] border border-border bg-white p-6 md:p-8",
        )}
      >
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-bold tracking-[-0.02em]">
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className={cn(
                  "mt-3 text-[15px] leading-relaxed",
                  isDark ? "text-white/65" : "text-secondary-text",
                )}
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
