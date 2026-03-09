import Link from "next/link";

import { AppFooter } from "@/components/AppFooter";
import { AppHeader } from "@/components/AppHeader";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { HomeArtworkGridSection } from "@/app/home/_components/HomeArtworkGridSection";
import { HomeCtaSection } from "@/app/home/_components/HomeCtaSection";
import { HomeFeaturesSection } from "@/app/home/_components/HomeFeaturesSection";
import { HomeHeroSection } from "@/app/home/_components/HomeHeroSection";
import { HomeStatsSection } from "@/app/home/_components/HomeStatsSection";

export default async function HomePage() {
  return (
    <AppShell>
      <div className="w-[1440px] flex flex-col bg-white">
        <AppHeader className="h-16 bg-white border-b border-[#DDD6FE] shadow-sm" isAuthenticated={false} />

        {/* Hero */}
        <HomeHeroSection />

        {/* Card grid */}
        <HomeArtworkGridSection />

        {/* Features */}
        <HomeFeaturesSection />

        {/* Stats */}
        <HomeStatsSection />

        {/* CTA */}
        <HomeCtaSection />

        <AppFooter className="py-12 px-8 bg-[#FFFFFF]" />

        {/* 
          Design parity note:
          - AppHeader/AppFooter are shared components.
          - If shared components already include navigation links, they will render accordingly.
          - If they don't, consider adding those links inside the shared components (not in this step).
        */}
        <div className="sr-only">
          <Link href="/home">작품 둘러보기</Link>
          <Button asChild>
            <Link href="/artworks/new">작품 등록</Link>
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
