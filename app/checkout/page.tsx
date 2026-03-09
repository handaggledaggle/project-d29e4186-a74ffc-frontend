import Link from "next/link";

import { AppFooter } from "@/components/AppFooter";
import { AppHeader } from "@/components/AppHeader";
import { AppShell } from "@/components/AppShell";
import { Price } from "@/components/Price";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { CheckoutFeatureCard } from "./_components/CheckoutFeatureCard";
import { OrderSummaryCard } from "./_components/OrderSummaryCard";

export default function CheckoutPage() {
  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-[1440px] flex-col bg-white">
        <AppHeader className="h-16 border-b border-[#DDD6FE] bg-white shadow-sm" />

        {/* Hero */}
        <section
          data-section-type="hero"
          className="bg-gradient-to-br from-[#7C3AED] to-[#A78BFA] px-8 py-12"
        >
          <div className="mx-auto flex w-full max-w-6xl items-start gap-8">
            <div className="flex-1">
              {/* Screenshot shows a big white placeholder box with a single action button */}
              <div className="relative h-[120px] w-full rounded-xl bg-white shadow-sm">
                <Button
                  className={cn(
                    "absolute bottom-4 left-1/2 h-10 w-[360px] -translate-x-1/2",
                    "bg-gradient-to-br from-[#7C3AED] to-[#A78BFA] text-white hover:opacity-95"
                  )}
                >
                  결제 정보 보기
                </Button>
              </div>

              {/* Keep the primary action available but visually subtle (not in screenshot focus) */}
              <div className="mt-6 flex gap-4">
                <Button
                  className={cn(
                    "h-11 rounded-lg bg-white px-6 text-[#7C3AED]",
                    "hover:bg-white/90"
                  )}
                >
                  결제 진행
                </Button>
              </div>
            </div>

            <OrderSummaryCard
              className="w-[360px]"
              artworkTitle='"봄의 기억"'
              artistName="홍길동"
              quantity={1}
              totalAmount={120000}
            />
          </div>
        </section>

        {/* Features */}
        <section
          data-section-type="features"
          className="bg-white px-8 py-12"
        >
          <div className="mx-auto w-full max-w-6xl">
            <h2 className="text-center text-2xl font-bold text-[#4C1D95]">
              결제 흐름 주요 기능
            </h2>
            <p className="mt-2 text-center text-sm text-[#6D28D9]">
              Toss 결제 연동으로 결제 요청·응답을 안정적으로 처리하고, 결제 결과에 따라 주문 상태를 확정합니다.
            </p>

            <div className="mt-6 rounded-xl border border-[#DDD6FE] p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <CheckoutFeatureCard
                  title="결제 요청 전송"
                  description="결제 토큰 생성 및 Toss 결제창 호출(모바일/웹)을 처리합니다."
                />
                <CheckoutFeatureCard
                  title="결제 결과 처리"
                  description="승인/거절을 받아 주문 확정 혹은 에러 처리(재시도, CS 안내)를 수행합니다."
                />
                <CheckoutFeatureCard
                  title="안전·운영 모니터링"
                  description="결제 성공률, 실패 유형, CS 발생 건수를 실시간으로 집계합니다."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Form */}
        <section data-section-type="form" className="bg-white px-8 py-12">
          <div className="mx-auto w-full max-w-6xl">
            <Card className="border-[#DDD6FE] bg-[#FAF5FF]">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#4C1D95]">
                  결제 정보 입력
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-4" action="#">
                  <div className="grid gap-1">
                    <Label className="text-sm text-[#4C1D95]">카드 번호</Label>
                    <Input
                      className="h-11 border-[#DDD6FE] bg-white shadow-sm"
                      placeholder="0000 0000 0000 0000"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      name="cardNumber"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div className="grid gap-1">
                      <Label className="text-sm text-[#4C1D95]">만료일</Label>
                      <Input
                        className="h-11 border-[#DDD6FE] bg-white shadow-sm"
                        placeholder="MM/YY"
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        name="cardExpiry"
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label className="text-sm text-[#4C1D95]">CVC</Label>
                      <Input
                        className="h-11 border-[#DDD6FE] bg-white shadow-sm"
                        placeholder="123"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        name="cardCvc"
                      />
                    </div>
                  </div>

                  <div className="grid gap-1">
                    <Label className="text-sm text-[#4C1D95]">할인/쿠폰 코드</Label>
                    <Input
                      className="h-11 border-[#DDD6FE] bg-white shadow-sm"
                      placeholder="쿠폰 코드를 입력하세요"
                      name="coupon"
                    />
                  </div>

                  <Button className="mt-2 h-11 w-full bg-[#7C3AED] text-white hover:bg-[#6D28D9]">
                    Toss로 결제하기
                  </Button>

                  <p className="mt-2 text-sm text-[#6D28D9]">
                    결제 처리 중에는 창을 닫거나 새로고침하지 마세요. 문제 발생 시 고객센터로 문의하세요.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stats */}
        <section data-section-type="stats" className="bg-[#FAF5FF] px-8 py-12">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid grid-cols-1 items-start gap-12 text-center md:grid-cols-3">
              <div>
                <p className="text-3xl font-bold text-[#4C1D95]">결제 성공률</p>
                <p className="mt-2 text-xl text-[#4C1D95]">95%</p>
                <p className="mt-1 text-sm text-[#6D28D9]">Toss 요청 대비 승인 비율</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#4C1D95]">구매 전환율</p>
                <p className="mt-2 text-xl text-[#4C1D95]">4.8%</p>
                <p className="mt-1 text-sm text-[#6D28D9]">상세 조회 대비 결제 완료</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#4C1D95]">CS 티켓</p>
                <p className="mt-2 text-xl text-[#4C1D95]">12건 / 주</p>
                <p className="mt-1 text-sm text-[#6D28D9]">결제/주문 관련 문의 건수</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section data-section-type="cta" className="bg-[#F5F3FF] px-8 py-12">
          <div className="mx-auto w-full max-w-6xl">
            <h2 className="text-center text-2xl font-bold text-[#4C1D95]">
              결제 안정성 향상
            </h2>
            <p className="mt-2 text-center text-sm text-[#6D28D9]">
              결제 실패 유형별 대응(재시도, 결제 수단 변경, 고객 안내)과 모니터링으로 구매 전환과 CS 감소를 목표로 합니다.
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-4 md:flex-row">
              <Button className="h-11 w-full max-w-[520px] bg-[#7C3AED] text-white hover:bg-[#6D28D9]">
                결제 로그 확인
              </Button>
              <Button
                variant="ghost"
                className="h-11 w-full max-w-[220px] text-[#4C1D95] hover:bg-transparent hover:underline"
              >
                운영 가이드 보기
              </Button>
            </div>

            <div className="mt-10 text-center text-sm text-[#6D28D9]">
              <Link href="#" className="underline underline-offset-4">
                결제 실패 시 도움말 보기
              </Link>
            </div>
          </div>
        </section>

        <AppFooter className="bg-white px-8 py-12" />
      </div>
    </AppShell>
  );
}

function InlineTotal({ amount }: { amount: number }) {
  return <Price amount={amount} className="font-semibold text-white" />;
}
