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
      const res = await apiFetch<{ accessToken: string; refreshToken?: string }>(
        "/auth/login",
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

      // 서버가 쿠키에 토큰을 설정해주는 경우(권장)엔 클라이언트 저장 불필요.
      // 여기서는 응답에 토큰이 있으면 로컬스토리지에 보관하고 홈으로 이동.
      const data = res.data;
      if (data?.accessToken) {
        try {
          localStorage.setItem("pt_access_token", data.accessToken);
          if (data.refreshToken) localStorage.setItem("pt_refresh_token", data.refreshToken);
        } catch {
          // ignore storage errors
        }
      }

      // 리다이렉트 또는 페이지 새로고침
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
