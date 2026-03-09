import { Button } from "@/components/ui/button";

export function HomeCtaSection() {
  return (
    <section data-section-type="cta" className="flex flex-col items-center justify-center py-16 px-8 bg-[#FAF5FF]">
      <h2 className="text-3xl font-bold text-[#4C1D95] text-center">당신의 작품을 더 많은 사람에게 소개하세요</h2>
      <p className="text-lg text-[#6D28D9] text-center mt-2">지금 등록하면 첫 등록 수수료 면제 및 프로모션 기회 제공</p>
      <div className="flex gap-4 mt-6">
        <Button className="bg-[#FAF5FF] text-[#4C1D95] rounded-lg px-8 py-3 shadow-none hover:bg-[#FAF5FF]">
          작품 등록하기
        </Button>
        <Button
          variant="outline"
          className="bg-white shadow-lg text-[#4C1D95] border border-[#DDD6FE] rounded-lg px-8 py-3 hover:bg-white"
        >
          셀러 가이드 보기
        </Button>
      </div>
    </section>
  );
}
