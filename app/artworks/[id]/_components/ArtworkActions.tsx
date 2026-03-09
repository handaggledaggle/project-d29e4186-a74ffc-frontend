"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ArtworkActions({
  artworkId,
  artworkTitle,
  amount
}: {
  artworkId: string;
  artworkTitle: string;
  amount: number;
}) {
  const [liked, setLiked] = React.useState(false);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className={cn(
          "flex-1 rounded-lg px-4 py-3 border-[#DDD6FE]",
          liked ? "text-[#6D28D9]" : "text-[#4C1D95]"
        )}
        onClick={() => setLiked((v) => !v)}
        aria-pressed={liked}
      >
        찜하기
      </Button>

      <Button
        className="flex-1 bg-[#7C3AED] text-white rounded-lg px-4 py-3 hover:bg-[#6D28D9]"
        asChild
      >
        <Link
          href={`/checkout?artworkId=${encodeURIComponent(artworkId)}&title=${encodeURIComponent(
            artworkTitle
          )}&amount=${amount}`}
        >
          구매하기
        </Link>
      </Button>
    </>
  );
}
