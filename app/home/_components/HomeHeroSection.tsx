import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HomeHeroSection() {
  return (
    <section
      data-section-type="hero"
      className="flex flex-col items-center justify-center py-20 px-8 bg-gradient-to-br from-[#7C3AED] to-[#A78BFA]"
    >
      <h1 className="text-5xl font-bold text-white text-center">
        다양한 작품을 한눈에, 신뢰하는 결제로 안전한 구매
      </h1>
      <p className="text-xl text-white/70 text-center mt-4 max-w-2xl">
        신진 아티스트의 원본 작품부터 한정판 프린트까지 — 썸네일 중심의 그리드로 빠르게 둘러보고,
        안전한 결제로 안심 구매하세요.
      </p>

      <div className="flex gap-4 mt-6">
        <Button className="bg-gradient-to-br from-[#7C3AED] to-[#A78BFA] text-white/90 rounded-lg px-6 py-3 shadow-none hover:opacity-95">
          작품 등록하기
        </Button>
        <Button
          variant="outline"
          className="bg-gradient-to-br from-[#7C3AED] to-[#A78BFA] text-white/90 border border-white/30 rounded-lg px-6 py-3 shadow-none hover:bg-transparent hover:opacity-95"
        >
          인기 작품 보기
        </Button>
      </div>

      <div className="flex items-center gap-6 mt-8 w-full max-w-[1120px]">
        <div
          data-component="filter"
          className="flex items-center gap-3 bg-gradient-to-br from-[#7C3AED] to-[#A78BFA] border border-white/20 rounded-lg p-4 w-full"
        >
          <Input
            className="border border-white/20 bg-transparent text-white placeholder:text-white/60 rounded-md px-3 py-2 w-1/3 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="검색어로 작품/아티스트 검색"
          />

          <select
            aria-label="카테고리"
            className="h-10 rounded-md px-3 py-2 bg-white text-[#4C1D95] border border-white/20 outline-none"
            defaultValue="all"
          >
            <option value="all">전체 카테고리</option>
            <option value="painting">회화</option>
            <option value="photo">사진</option>
            <option value="digital">디지털</option>
          </select>

          <select
            aria-label="정렬"
            className="h-10 rounded-md px-3 py-2 bg-white text-[#4C1D95] border border-white/20 outline-none"
            defaultValue="popular"
          >
            <option value="popular">인기순</option>
            <option value="latest">최신순</option>
            <option value="price_asc">낮은 가격순</option>
            <option value="price_desc">높은 가격순</option>
          </select>

          <div className="ml-auto text-white/70 text-sm">
            총 작품 <span className="text-white font-semibold">1,248</span>
          </div>
        </div>
      </div>
    </section>
  );
}
