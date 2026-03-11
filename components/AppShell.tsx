"use client";

import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import { useEffect, useState } from "react";

export type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  // 클라이언트에서 인증 상태를 확인해서 헤더에 전달
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
  const [displayName, setDisplayName] = useState<string | undefined>(undefined);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const access = localStorage.getItem("pt_access_token");
      setIsAuthenticated(!!access);
      // 현재 예제에서는 displayName이 로컬스토리지에 저장되지 않으므로 생략합니다.
      // 추후 사용자 정보를 저장/조회하면 setDisplayName을 사용하세요.
    } catch {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <AppHeader isAuthenticated={!!isAuthenticated} displayName={displayName} />
      {children}
      <AppFooter />
    </div>
  );
}

export default AppShell;
