"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Note: backend controllers are under /api/v1/auth (see backend)
      const res = await apiFetch<{ access_token?: string; refresh_token?: string }>(
        "/api/v1/auth/login",
        {
          method: "POST",
          body: { email, password },
        }
      );

      if (!res.ok) {
        setError(res.error?.message ?? "로그인에 실패했습니다");
        setLoading(false);
        return;
      }

      const data = res.data;
      // backend returns snake_case keys: access_token, refresh_token
      const accessToken = (data as any)?.access_token ?? (data as any)?.accessToken;
      const refreshToken = (data as any)?.refresh_token ?? (data as any)?.refreshToken;

      if (accessToken) {
        try {
          localStorage.setItem("pt_access_token", accessToken);
          if (refreshToken) localStorage.setItem("pt_refresh_token", refreshToken);
        } catch {
          // ignore
        }
      }

      router.push("/");
    } catch (err) {
      setError("네트워크 오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">로그인</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">이메일</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">비밀번호</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="비밀번호"
          />
        </div>

        {error ? <div className="text-sm text-destructive">{error}</div> : null}

        <div className="flex items-center justify-between gap-2">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "로그인 중..." : "로그인"}
          </Button>
        </div>
      </form>

      <div className="mt-6 text-sm text-muted-foreground">
        계정이 없으신가요? <a href="/register" className="text-primary underline">회원가입</a>
      </div>
    </main>
  );
}
