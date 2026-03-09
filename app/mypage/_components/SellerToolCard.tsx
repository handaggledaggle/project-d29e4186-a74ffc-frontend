import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SellerToolCardProps = {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  className?: string;
};

export function SellerToolCard({ title, description, ctaLabel, href, className }: SellerToolCardProps) {
  return (
    <Card data-component="card" className={cn("bg-[#FFFFFF] rounded-xl w-[360px]", className)}>
      <CardContent className="flex flex-col items-start p-6">
        <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4" />
        <h3 className="text-xl font-semibold text-[#4C1D95]">{title}</h3>
        <p className="text-[#6D28D9]">{description}</p>
        <div className="mt-4">
          <Button
            asChild
            className={cn(
              "bg-white shadow-lg border border-[#DDD6FE] text-[#4C1D95]",
              "rounded-lg px-4 py-2 h-auto"
            )}
          >
            <Link href={href}>{ctaLabel}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
