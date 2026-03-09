import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ActionVariant = "soft" | "outlineShadow";

type CardAction = {
  label: string;
  href: string;
  variant: ActionVariant;
};

type DashboardWideCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  actions: [CardAction, CardAction];
  className?: string;
};

export function DashboardWideCard({ title, description, imageSrc, actions, className }: DashboardWideCardProps) {
  return (
    <Card
      data-component="card"
      className={cn(
        "flex flex-col bg-white shadow-lg rounded-xl border border-[#DDD6FE] overflow-hidden w-[360px]",
        className
      )}
    >
      <Image src={imageSrc} alt="placeholder" width={720} height={352} className="w-full h-44 object-cover" />
      <CardContent className="flex flex-col p-6 gap-2">
        <h3 className="text-lg font-semibold text-[#4C1D95]">{title}</h3>
        <p className="text-[#6D28D9]">{description}</p>
        <div className="flex items-center gap-3 mt-3">
          {actions.map((a) => (
            <Button
              key={a.label}
              asChild
              className={cn(
                "rounded-lg px-3 py-2 h-auto text-[#4C1D95]",
                a.variant === "soft" && "bg-[#FAF5FF]",
                a.variant === "outlineShadow" && "bg-white shadow-lg border border-[#DDD6FE]"
              )}
            >
              <Link href={a.href}>{a.label}</Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
