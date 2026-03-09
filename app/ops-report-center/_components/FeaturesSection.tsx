import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    title: "접수 이력 관리",
    desc: "사용자가 제출한 모든 신고 내역을 확인하고 상태별로 분류합니다.",
  },
  {
    title: "우선순위 분류",
    desc: "저작권 침해 등 긴급 사안은 빠르게 처리되도록 우선 지정합니다.",
  },
  {
    title: "통계 & 리포트",
    desc: "신고 유형, 처리 리드타임, 처리 결과에 대한 정기 리포트를 제공합니다.",
  },
] as const;

export function FeaturesSection({ className }: { className?: string }) {
  return (
    <section data-section-type="features" className={cn("flex flex-col items-center py-12 px-8 bg-white", className)}>
      <h2 className="text-2xl font-bold text-[#4C1D95]">운영 센터 주요 기능</h2>
      <p className="text-[#6D28D9] mt-2">신고 접수부터 결과 통지까지 투명하게 관리합니다.</p>

      <div className="flex gap-6 mt-6">
        {FEATURES.map((f) => (
          <Card
            key={f.title}
            data-component="card"
            className="flex flex-col items-start p-6 bg-white shadow-lg rounded-xl border border-[#DDD6FE] w-64"
          >
            <div className="w-10 h-10 bg-gray-200 rounded-lg mb-3" />
            <h3 className="text-lg font-semibold text-[#4C1D95]">{f.title}</h3>
            <p className="text-[#6D28D9] mt-1">{f.desc}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
