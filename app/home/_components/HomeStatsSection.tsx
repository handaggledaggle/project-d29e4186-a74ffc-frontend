export function HomeStatsSection() {
  return (
    <section data-section-type="stats" className="flex items-center justify-center py-16 px-8 bg-white shadow-lg">
      <div className="flex gap-16">
        <div className="flex flex-col items-center">
          <p className="text-4xl font-bold text-[#4C1D95]">1.2K</p>
          <p className="text-[#6D28D9]">신규 아티스트 (월)</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-4xl font-bold text-[#4C1D95]">3.4K</p>
          <p className="text-[#6D28D9]">일별 작품 등록 완료</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-4xl font-bold text-[#4C1D95]">78%</p>
          <p className="text-[#6D28D9]">구매 전환율</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-4xl font-bold text-[#4C1D95]">99.6%</p>
          <p className="text-[#6D28D9]">결제 성공률</p>
        </div>
      </div>
    </section>
  );
}
