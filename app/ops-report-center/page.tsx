import type { Metadata } from "next";

import { AppFooter } from "@/components/AppFooter";
import { AppHeader } from "@/components/AppHeader";
import { AppShell } from "@/components/AppShell";
import { cn } from "@/lib/utils";

import { ReportFormCard } from "./_components/ReportFormCard";
import { TimelineSection } from "./_components/TimelineSection";
import { FeaturesSection } from "./_components/FeaturesSection";
import { FaqSection } from "./_components/FaqSection";

export const metadata: Metadata = {
  title: "운영 / 신고 센터 | 작품마당",
  description:
    "작품 관련 문제 신고를 접수하고 처리 진행 상황 및 안내를 확인할 수 있습니다.",
};

export default function OpsReportCenterPage() {
  return (
    <AppShell>
      <div className={cn("w-[1440px] mx-auto flex flex-col")}> 
        <AppHeader className="border-b border-[#DDD6FE] shadow-sm" isAuthenticated={false} />

        <main className="flex flex-col">
          {/* Hero */}
          <section
            data-section-type="hero"
            className="flex flex-col items-start py-12 px-8 bg-gradient-to-br from-[#7C3AED] to-[#A78BFA]"
          >
            <div className="max-w-4xl">
              <h1 className="text-3xl font-bold text-white">운영 / 신고 센터</h1>
              <p className="text-white/70 mt-2">
                작품 관련 문제 신고를 접수하고 처리 진행 상황 및 안내를 확인할 수 있습니다. 신고 접수 전
                가이드와 처리 리드타임을 먼저 확인해주세요.
              </p>
            </div>
          </section>

          {/* Form */}
          <section data-section-type="form" className="flex justify-center py-12 px-8 bg-white shadow-lg">
            <ReportFormCard />
          </section>

          {/* Timeline */}
          <TimelineSection />

          {/* Features */}
          <FeaturesSection />

          {/* FAQ */}
          <FaqSection />
        </main>

        <AppFooter className="bg-white" />
      </div>
    </AppShell>
  );
}
