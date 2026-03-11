"use client";

import * as React from "react";
import type { ArtworkSummary, ArtworkListResponse } from "@/types/artwork";
import { apiFetch } from "@/lib/api";
import ArtworkCard from "@/components/ArtworkCard";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default function ArtworksFeedPage() {
  const [items, setItems] = React.useState<ArtworkSummary[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [hasMore, setHasMore] = React.useState<boolean>(true);

  React.useEffect(() => {
    loadPage(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadPage(p: number, replace = false) {
    setLoading(true);
    try {
      const res = await apiFetch<ArtworkListResponse>(`/api/v1/artworks?page=${p}&page_size=12`, {
        cache: "no-store",
      } as RequestInit);
      if (res.ok) {
        const next = res.data.items ?? [];
        setItems((prev) => (replace ? next : [...prev, ...next]));
        setPage(res.data.page ?? p);
        const total = res.data.total_count ?? (replace ? next.length : items.length + next.length);
        setHasMore((res.data.page ?? p) * (res.data.page_size ?? 12) < total);
      } else {
        // ignore for now
      }
    } catch (err) {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[color:var(--color-foreground)]">작품 둘러보기</h1>
        <div className="text-sm text-muted-foreground">전체 {items.length}개</div>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.length === 0 && !loading ? (
          <div className="col-span-full text-center text-muted-foreground">표시할 작품이 없습니다.</div>
        ) : (
          items.map((art) => (
            <ArtworkCard
              key={art.artwork_id}
              artwork={art}
              ctaLabel="상세보기"
              className="shadow-lg border border-[#DDD6FE] rounded-xl overflow-hidden"
            />
          ))
        )}
      </section>

      <div className="flex justify-center mt-8">
        <Button
          onClick={() => loadPage(page + 1)}
          disabled={loading || !hasMore}
          className="bg-white shadow-lg text-[#4C1D95] border border-[#DDD6FE] rounded-lg px-6 py-3 hover:bg-white"
        >
          {loading ? "로딩..." : hasMore ? "더 보기" : "더 이상 없음"}
        </Button>
      </div>
    </main>
  );
}
