import Link from "next/link";

import { BRAND, FOOTER_COLUMNS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export type AppFooterProps = {
  className?: string;
};

export function AppFooter({ className }: AppFooterProps) {
  return (
    <footer className={cn("border-t border-border bg-background", className)}>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="text-lg font-bold text-[color:var(--color-foreground)]">{BRAND.name}</div>
            <p className="mt-2 text-sm text-[color:var(--color-foreground)]/70">{BRAND.tagline}</p>
            <p className="mt-4 text-xs text-[color:var(--color-foreground)]/60">© 2026 {BRAND.name}. All rights reserved.</p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="text-sm font-semibold text-[color:var(--color-foreground)]">{col.title}</div>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-[color:var(--color-foreground)]/70 hover:text-[color:var(--color-foreground)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;
