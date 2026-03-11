import Link from "next/link";
import { useRouter } from "next/navigation";

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

  // 로그아웃 동작: 로컬 스토리지의 토큰 제거 후 루트로 리디렉션
  function handleLogout(e?: React.MouseEvent) {
    e?.preventDefault();
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("pt_access_token");
        localStorage.removeItem("pt_refresh_token");
      }
    } catch {
      // ignore
    }
    // 클라이언트 라우트로 이동
    router.push("/");
  }

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
          {isAuthenticated ? (
            <>
              {displayName ? (
                <span className="hidden text-sm font-medium text-[color:var(--color-foreground)]/80 sm:inline">
                  {displayName}님
                </span>
              ) : null}
              <Button variant="outline" asChild>
                <Link href="/mypage">마이페이지</Link>
              </Button>
              {/* 로그아웃은 실제 동작을 위해 버튼의 onClick으로 처리합니다 */}
              <Button onClick={handleLogout} variant="default">
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
