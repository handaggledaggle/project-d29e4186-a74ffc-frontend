import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { Artwork } from "@/types";
import { apiFetch } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Price } from "@/components/Price";
import { TagList } from "@/components/TagList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArtworkActions } from "./_components/ArtworkActions";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

function fallbackArtwork(id: string): Artwork {
  return {
    artwork_id: id,
    title: "작품 정보",
    description: "작품 정보를 불러오지 못했습니다.",
    tags: [],
    category: "OTHER",
    price: 0,
    files: {
      original_url: "",
      thumbnail_url: "",
      gallery_urls: [],
    },
    seller: {
      id: "",
      display_name: "알 수 없음",
      avatar_url: "",
    },
    status: "PUBLIC",
    created_at: new Date().toISOString(),
    updated_at: undefined,
  };
}

export default async function ArtworkDetailPage({ params }: PageProps) {
  const { id } = await params;

  const result = await apiFetch<Artwork>(`/api/artworks/${encodeURIComponent(id)}`, {
    cache: "no-store",
  });

  if (!result.ok && result.error.status === 404) {
    notFound();
  }

  const artwork = result.ok ? result.data : fallbackArtwork(id);

  const heroImage = artwork.files.thumbnail_url || artwork.files.original_url;

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/home" className="hover:underline">
          홈
        </Link>
        <span aria-hidden="true">/</span>
        <Link href="/artworks" className="hover:underline">
          작품
        </Link>
        <span aria-hidden="true">/</span>
        <span className="line-clamp-1 text-foreground">{artwork.title}</span>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader className="p-0">
            <div className={cn("relative w-full bg-muted", "aspect-[4/3]")}
            >
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt={artwork.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized
                  priority
                />
              ) : (
                <div className="absolute inset-0" aria-hidden="true" />
              )}
            </div>
          </CardHeader>
        </Card>

        <div className="flex flex-col gap-5">
          <div>
            <h1 className="text-3xl font-bold text-[color:var(--color-foreground)]">{artwork.title}</h1>
            <div className="mt-2 text-sm text-[color:var(--color-foreground)]/70">
              {artwork.seller.display_name}
              {artwork.category ? ` · ${artwork.category}` : ""}
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="text-sm text-muted-foreground">가격</div>
              <Price amount={artwork.price} className="text-2xl" />
            </div>
          </div>

          <TagList tags={artwork.tags} />

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">작품 설명</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-[color:var(--color-foreground)]/80">
              {artwork.description ? (
                <p className="whitespace-pre-wrap">{artwork.description}</p>
              ) : (
                <p className="text-muted-foreground">등록된 설명이 없습니다.</p>
              )}
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <ArtworkActions artworkId={artwork.artwork_id} artworkTitle={artwork.title} amount={artwork.price} />
          </div>

          {!result.ok ? (
            <p className="text-xs text-muted-foreground">
              현재 작품 정보를 불러오지 못해 임시 정보를 표시하고 있습니다. ({result.error.message})
            </p>
          ) : null}
        </div>
      </div>
    </main>
  );
}
