import { cn } from "@/lib/utils";

const STEPS = [
  {
    no: 1,
    title: "접수 확인",
    desc: "접수 즉시 자동 회신(0–24시간)",
    kpi: "KPI: 신고 접수 대비 응답 시간",
  },
  {
    no: 2,
    title: "초기 검토",
    desc: "증빙 검토 및 담당자 지정(1–3 영업일)",
    kpi: "KPI: 신고 대비 처리 리드타임",
  },
  {
    no: 3,
    title: "추가 요청",
    desc: "추가 정보 필요 시 요청(평균 2일)",
    kpi: "KPI: CS 티켓 수",
  },
  {
    no: 4,
    title: "조치 및 완료",
    desc: "조치 완료 및 결과 통보(총 평균 3–10일)",
    kpi: "KPI: 처리 완료 비율",
  },
] as const;

export function TimelineSection({ className }: { className?: string }) {
  return (
    <section
      data-section-type="timeline"
      className={cn("flex flex-col items-center py-12 px-8 bg-white shadow-lg", className)}
    >
      <h2 className="text-2xl font-bold text-[#4C1D95]">처리 절차 및 예상 리드타임</h2>
      <p className="text-[#6D28D9] mt-2 max-w-3xl text-center">
        접수 후 내부 검토, 증빙 요청, 운영 결정까지의 평균 소요 시간을 단계별로 안내합니다. 긴급 사안은 우선
        처리됩니다.
      </p>

      {/* Screenshot-like: left-aligned vertical timeline with plenty of whitespace */}
      <div className="w-full max-w-6xl mt-14">
        <ol className="flex flex-col gap-20 items-start">
          {STEPS.map((s) => (
            <li key={s.no} className="flex items-start gap-6">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center shrink-0">
                <p className="text-[#4C1D95] font-bold">{s.no}</p>
              </div>
              <div className="max-w-[320px]">
                <h3 className="text-lg font-semibold text-[#4C1D95]">{s.title}</h3>
                <p className="text-[#6D28D9] mt-2">{s.desc}</p>
                <div className="text-sm text-[#6D28D9] mt-3">{s.kpi}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
