import Image from "next/image";
import Link from "next/link";

import type { ArtworkSummary } from "@/types";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Price from "@/components/Price";

export type ArtworkCardProps = {
  artwork: ArtworkSummary;
  className?: string;
  ctaLabel?: string;
};

export function ArtworkCard({ artwork, className, ctaLabel = "상세보기" }: ArtworkCardProps) {
  return (
    <Card className={cn("overflow-hidden border-[color:var(--color-border)]", className)}>
      <CardHeader className="p-0">
        <Link href={`/artworks/${artwork.artwork_id}`} aria-label={`${artwork.title} 상세보기`}>
          <div className="relative aspect-[4/3] w-full bg-muted">
            {artwork.thumbnail_url ? (
              <Image
                src={artwork.thumbnail_url}
                alt={artwork.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                priority={false}
                unoptimized
              />
            ) : (
              <div className="absolute inset-0" aria-hidden="true" />
            )}
          </div>
        </Link>
      </CardHeader>

      <CardContent className="space-y-1 p-4">
        <div className="line-clamp-1 text-base font-semibold text-[color:var(--color-foreground)]">{artwork.title}</div>
        <div className="text-sm text-[color:var(--color-foreground)]/70">
          {artwork.seller_display_name ? `${artwork.seller_display_name} · ` : ""}
          {artwork.category ?? "기타"}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <Price amount={artwork.price} className="text-[color:var(--color-foreground)]" />
        <Button variant="outline" size="sm" asChild>
          <Link href={`/artworks/${artwork.artwork_id}`}>{ctaLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ArtworkCard;
