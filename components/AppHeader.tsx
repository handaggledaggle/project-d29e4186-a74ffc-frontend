import "use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

import { BRAND, NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type AppHeaderProps = {
  className?: string;
  /** 로그인 여부(디자인/버튼 노출 제어용). 실제 인증 연동 전 임시 플래그 */
  isAuthenticated?: boolean;
  /** 로그인 사용자 표시명(선택). */
  displayName?: string;
};

export function AppHeader({ className, isAuthenticated, displayName }: AppHeaderProps) {
  const router = useRouter();

  // Determine auth state from prop first; if not provided, infer from localStorage token.
  const [authed, setAuthed] = React.useState<boolean>(() => {
    try {
      if (typeof window === "undefined") return false;
      if (typeof isAuthenticated === "boolean") return isAuthenticated;
      return !!window.localStorage.getItem("pt_access_token");
    } catch {
      return false;
    }
  });

  // Keep in sync when prop changes
  React.useEffect(() => {
    try {
      if (typeof isAuthenticated === "boolean") setAuthed(isAuthenticated);
      else setAuthed(!!window.localStorage.getItem("pt_access_token"));
    } catch {
      setAuthed(false);
    }
  }, [isAuthenticated]);

  // Logout handler: remove tokens and redirect to home (or login)
  function handleLogout(e?: React.MouseEvent) {
    if (e) e.preventDefault();
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("pt_access_token");
        window.localStorage.removeItem("pt_refresh_token");
      }
    } catch {
      // ignore
    }
    setAuthed(false);
    // navigate to home
    router.push("/");
  }

  // Simple effect to listen to storage events so other tabs can update header
  React.useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === "pt_access_token") {
        setAuthed(!!e.newValue);
      }
    }
    if (typeof window !== "undefined") {
      window.addEventListener("storage", onStorage);
      return () => window.removeEventListener("storage", onStorage);
    }
    return () => {};
  }, []);

  return (
    <header className={cn("border-b border-border bg-background", className)}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-base font-bold text-[color:var(--color-foreground)]">
            {BRAND.name}
          </Link>
        </div>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <Button key={item.href} variant="ghost" asChild>
              <Link href={item.href} className="text-sm">
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {authed ? (
            <>
              {displayName ? (
                <span className="hidden text-sm font-medium text-[color:var(--color-foreground)]/80 sm:inline">
                  {displayName}님
                </span>
              ) : null}
              <Button variant="outline" asChild>
                <Link href="/mypage">마이페이지</Link>
              </Button>
              <Button onClick={handleLogout} variant="ghost">
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link href="/login">로그인</Link>
              </Button>
              <Button asChild>
                <Link href="/register">회원가입</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
