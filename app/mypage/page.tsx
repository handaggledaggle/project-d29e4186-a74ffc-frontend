import Image from "next/image";
import Link from "next/link";

import { AppFooter } from "@/components/AppFooter";
import { AppHeader } from "@/components/AppHeader";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { DashboardStat } from "./_components/DashboardStat";
import { DashboardWideCard } from "./_components/DashboardWideCard";
import { SellerToolCard } from "./_components/SellerToolCard";

export const dynamic = "force-dynamic";

const placeholderSrc =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='720' height='352'>
      <rect width='100%' height='100%' fill='#E5E7EB'/>
      <rect x='320' y='96' width='80' height='160' fill='#000000'/>
    </svg>`
  );

export default async function MyPage() {
  // NOTE: 인증/데이터 연동은 공유 코드(예: lib/auth, lib/api)에서 처리 가능.
  // 이 페이지는 디자인 재현을 위해 정적 더미 데이터를 사용합니다.
  const isAuthenticated = true;
  const displayName = "김지수";

  return (
    <AppShell>
      <div className="w-[1440px] mx-auto flex flex-col">
        <AppHeader
          isAuthenticated={isAuthenticated}
          displayName={displayName}
          className="h-16 bg-white border-b border-[#DDD6FE] shadow-sm px-8"
        />

        {/* Hero */}
        <section
          data-section-type="hero"
          className="flex flex-col bg-gradient-to-br from-[#7C3AED] to-[#A78BFA] px-8 py-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">마이페이지 — 구매 / 판매 관리</h1>
              <p className="text-white/70">
                주문 내역 확인, 결제 상태 추적, 판매자용 작품 관리 및 신고·CS로 바로 이동할 수 있는 개인 대시보드입니다.
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                asChild
                className={cn(
                  "bg-gradient-to-br from-[#7C3AED] to-[#A78BFA]",
                  "border border-white/20 text-white/90",
                  "rounded-lg px-4 py-2 h-auto"
                )}
              >
                <Link href="/account">계정 설정</Link>
              </Button>
              <Button
                asChild
                className={cn(
                  "bg-gradient-to-br from-[#7C3AED] to-[#A78BFA]",
                  "text-white/90",
                  "rounded-lg px-4 py-2 h-auto"
                )}
              >
                <Link href="/artworks/new">작품 등록</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section
          data-section-type="stats"
          className="flex items-center justify-center py-12 px-8 bg-white shadow-lg"
        >
          <div className="flex flex-wrap justify-center gap-x-24 gap-y-8 max-w-[1180px]">
            <DashboardStat value="신규 아티스트 12" label="지난 주 가입" />
            <DashboardStat value="등록 완료 34" label="오늘 등록된 작품" />
            <DashboardStat value="결제 성공 97%" label="최근 30일 결제 성공률" />
            <DashboardStat value="CS 티켓 8" label="처리 대기 중" />
          </div>
        </section>

        {/* Card grid */}
        <section data-section-type="card-grid" className="flex flex-col items-start py-12 px-8 bg-[#FAF5FF]">
          <h2 className="text-2xl font-bold text-[#4C1D95] mb-6">주문 및 작품 목록</h2>

          <div className="flex gap-6">
            <DashboardWideCard
              title="주문 #A10234"
              description="구매자: 김지수 • 결제상태: 결제완료 • 배송상태: 발송준비"
              imageSrc={placeholderSrc}
              actions={[
                { label: "주문 상세", href: "/orders/A10234", variant: "soft" },
                { label: "CS 문의", href: "/support/new?order=A10234", variant: "outlineShadow" }
              ]}
            />

            <DashboardWideCard
              title="작품: 일러스트 '봄'"
              description="상태: 판매중 • 조회수: 1,240 • 결제 전환율: 4.2%"
              imageSrc={placeholderSrc}
              actions={[
                { label: "수정", href: "/artworks/1/edit", variant: "soft" },
                { label: "비공개 전환", href: "/artworks/1/hide", variant: "outlineShadow" }
              ]}
            />

            <DashboardWideCard
              title="신고 접수: #R884"
              description="신고유형: 저작권 • 상태: 조사중 • 접수 2일 전"
              imageSrc={placeholderSrc}
              actions={[
                { label: "상세 보기", href: "/reports/R884", variant: "soft" },
                { label: "처리 기록", href: "/reports/R884/history", variant: "outlineShadow" }
              ]}
            />
          </div>
        </section>

        {/* Features */}
        <section data-section-type="features" className="flex flex-col items-start py-16 px-8 bg-white shadow-lg">
          <h2 className="text-2xl font-bold text-[#4C1D95] mb-2">판매자 도구</h2>
          <p className="text-[#6D28D9] mb-6">작품 관리, 통계 확인, 자동 결제 알림 및 CS 연동 기능으로 판매를 지원합니다.</p>

          <div className="flex flex-col gap-6">
            <SellerToolCard
              title="작품 일괄 관리"
              description="복수 작품 수정, 상태 변경(공개/비공개), 가격 일괄 적용 기능을 제공합니다."
              ctaLabel="관리 페이지로 이동"
              href="/seller/artworks"
            />

            <SellerToolCard
              title="결제 모니터링"
              description="결제 성공률, Toss 승인률, 실패 원인 요약을 실시간으로 확인하세요."
              ctaLabel="결제 상태 확인"
              href="/seller/payments"
            />

            <SellerToolCard
              title="신고·CS 연동"
              description="신고 접수부터 처리 리드타임 추적, CS 티켓 이력 관리를 한 곳에서 진행합니다."
              ctaLabel="CS 관리"
              href="/support"
            />
          </div>
        </section>

        {/* CTA */}
        <section data-section-type="cta" className="flex flex-col items-center justify-center py-12 px-8 bg-[#FAF5FF]">
          <h2 className="text-2xl font-bold text-[#4C1D95] text-center">판매 활성화 도구를 활용해보세요</h2>
          <p className="text-[#6D28D9] text-center mb-4">
            표준화된 판매 채널 설정, 결제 안정성 개선, CS 프로세스 최적화로 더 많은 거래를 성사시키세요.
          </p>
          <div className="flex gap-4">
            <Button
              asChild
              className={cn(
                "bg-white shadow-lg border border-[#DDD6FE] text-[#4C1D95]",
                "rounded-lg px-6 py-3 h-auto",
                "w-[520px]"
              )}
            >
              <Link href="/seller/channels">판매 채널 설정하기</Link>
            </Button>
            <Button
              asChild
              className={cn(
                "bg-[#FAF5FF] text-[#4C1D95]",
                "rounded-lg px-6 py-3 h-auto",
                "w-[220px]"
              )}
            >
              <Link href="/support">CS·신고 바로가기</Link>
            </Button>
          </div>
        </section>

        <AppFooter className="bg-white" />
      </div>
    </AppShell>
  );
}

function _PreviewOnlyCardSkeleton() {
  // unused; kept for quick visual inspection if needed
  return (
    <Card className="w-[360px] overflow-hidden rounded-xl border border-[#DDD6FE] shadow-lg">
      <Image src={placeholderSrc} alt="placeholder" width={720} height={352} className="h-44 w-full object-cover" />
      <CardContent className="p-6" />
    </Card>
  );
}
