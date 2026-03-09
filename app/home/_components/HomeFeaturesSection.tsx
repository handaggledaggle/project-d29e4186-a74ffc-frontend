export function HomeFeaturesSection() {
  return (
    <section data-section-type="features" className="flex flex-col items-center py-16 px-8 bg-white shadow-lg">
      <h2 className="text-3xl font-bold text-[#4C1D95]">주요 기능</h2>
      <p className="text-lg text-[#6D28D9] mt-2">작품 등록부터 결제, 배송까지 셀러와 바이어를 위한 필수 기능</p>

      <div className="flex gap-8 mt-8">
        <div data-component="feature" className="flex flex-col items-center p-6 bg-[#FAF5FF] rounded-xl w-64">
          <div className="w-12 h-12 bg-gray-200 rounded-lg" aria-hidden="true" />
          <h3 className="text-xl font-semibold text-[#4C1D95] mt-4">원클릭 작품 등록</h3>
          <p className="text-[#6D28D9] text-center mt-2">
            템플릿 기반으로 빠르게 작품 정보를 입력하고 등록을 완료할 수 있습니다.
          </p>
        </div>

        <div data-component="feature" className="flex flex-col items-center p-6 bg-[#FAF5FF] rounded-xl w-64">
          <div className="w-12 h-12 bg-gray-200 rounded-lg" aria-hidden="true" />
          <h3 className="text-xl font-semibold text-[#4C1D95] mt-4">안전한 결제</h3>
          <p className="text-[#6D28D9] text-center mt-2">
            외부 결제 게이트웨이와 연동해 높은 승인율과 안전한 거래를 보장합니다.
          </p>
        </div>

        <div data-component="feature" className="flex flex-col items-center p-6 bg-[#FAF5FF] rounded-xl w-64">
          <div className="w-12 h-12 bg-gray-200 rounded-lg" aria-hidden="true" />
          <h3 className="text-xl font-semibold text-[#4C1D95] mt-4">정책 기반 신고 처리</h3>
          <p className="text-[#6D28D9] text-center mt-2">
            신고 접수 시 가이드에 따른 빠른 조사와 처리 절차를 제공합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
