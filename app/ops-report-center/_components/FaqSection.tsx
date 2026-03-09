import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "신고 접수 후 답변까지 얼마나 걸리나요?",
    a: "자동 접수 확인은 즉시 발송됩니다. 내부 검토 및 조치까지는 평균 3–10일이 소요되며, 증빙 요청이 있는 경우 추가 시간이 필요할 수 있습니다.",
  },
  {
    q: "익명으로 신고할 수 있나요?",
    a: "익명 신고는 가능하지만 추가 증빙 요청 시 연락이 불가할 수 있어 조사에 제한이 생길 수 있습니다.",
  },
  {
    q: "처리 결과에 불만이 있을 경우?",
    a: "결과에 이의가 있는 경우 재심사를 요청할 수 있습니다. 재심사 요청 양식 및 절차는 결과 통지 메시지에 안내됩니다.",
  },
] as const;

export function FaqSection({ className }: { className?: string }) {
  return (
    <section data-section-type="faq" className={cn("flex flex-col items-center py-12 px-8 bg-white shadow-lg", className)}>
      <h2 className="text-2xl font-bold text-[#4C1D95]">자주 묻는 질문</h2>
      <div className="flex flex-col gap-4 mt-6 max-w-3xl w-full">
        {FAQS.map((f) => (
          <Card
            key={f.q}
            data-component="card"
            className="flex flex-col p-4 bg-[#FAF5FF] rounded-lg border border-[#DDD6FE] shadow-none"
          >
            <h3 className="text-lg font-semibold text-[#4C1D95]">{f.q}</h3>
            <p className="text-[#6D28D9] mt-1">{f.a}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
