"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // 간단한 클라이언트 유효성 검사
    if (!displayName.trim()) {
      setError("이름을 입력해주세요");
      setLoading(false);
      return;
    }
    if (!email.trim()) {
      setError("이메일을 입력해주세요");
      setLoading(false);
      return;
    }
    // 이메일 형식 최소 검사
    const emailRe = /^\S+@\S+\.\S+$/;
    if (!emailRe.test(email)) {
      setError("유효한 이메일을 입력해주세요");
      setLoading(false);
      return;
    }
    if (password.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다");
      setLoading(false);
      return;
    }

    try {
      // 백엔드 API 규칙에 맞춰 /api/v1/auth/register 호출
      // Ensure we send display_name (snake_case) as backend accepts it.
      const res = await apiFetch<{ user_id?: string; message?: string }>(
        "/api/v1/auth/register",
        {
          method: "POST",
          body: { email, password, display_name: displayName },
        }
      );

      if (!res.ok) {
        // backend가 message 필드를 반환하는 경우를 우선 사용
        setError(res.error?.message ?? "회원가입에 실패했습니다");
        setLoading(false);
        return;
      }

      // 성공 시 로그인 페이지로 이동
      router.push("/login");
    } catch (err) {
      console.error(err);
      setError("네트워크 오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">회원가입</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">이름</label>
          <Input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="예: 홍길동"
            required
            aria-label="display-name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">이메일</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            aria-label="email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">비밀번호</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 (8자 이상 권장)"
            required
            minLength={8}
            aria-label="password"
          />
        </div>

        {error ? <div className="text-sm text-destructive">{error}</div> : null}

        <div className="flex items-center justify-between gap-2">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "가입 처리중..." : "회원가입"}
          </Button>
        </div>
      </form>

      <div className="mt-6 text-sm text-muted-foreground">
        이미 계정이 있으신가요? <a href="/login" className="text-primary underline">로그인</a>
      </div>

      <div className="mt-4 text-xs text-muted-foreground">
        참고: 서버 주소는 환경변수 NEXT_PUBLIC_API_BASE_URL 또는 기본 백엔드 URL을 사용합니다.
      </div>
    </main>
  );
}
