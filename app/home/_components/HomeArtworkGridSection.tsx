import { ArtworkCard } from "@/components/ArtworkCard";
import { Button } from "@/components/ui/button";
import type { ArtworkSummary } from "@/types/artwork";

const RECOMMENDED_ARTWORKS = [
  {
    id: "artwork_1",
    title: "바다의 기억",
    artistName: "김수현",
    category: "회화",
    year: 2025,
    price: 350000,
    thumbnailUrl: "",
  },
  {
    id: "artwork_2",
    title: "도시의 밤",
    artistName: "이민준",
    category: "사진",
    year: 2024,
    price: 120000,
    thumbnailUrl: "",
  },
  {
    id: "artwork_3",
    title: "무제 27",
    artistName: "정하늘",
    category: "디지털",
    year: 2025,
    price: 80000,
    thumbnailUrl: "",
  },
  {
    id: "artwork_4",
    title: "회색 정원",
    artistName: "박진영",
    category: "회화",
    year: 2023,
    price: 450000,
    thumbnailUrl: "",
  },
] as unknown as ArtworkSummary[];

export function HomeArtworkGridSection() {
  return (
    <section data-section-type="card-grid" className="flex flex-col items-center py-12 px-8 bg-[#FFFFFF]">
      <div className="w-full max-w-[1280px]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-[#4C1D95]">추천 작품</h2>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="bg-white shadow-lg text-[#4C1D95] border border-[#DDD6FE] rounded-lg px-4 py-2 hover:bg-white"
            >
              필터 저장
            </Button>
            <Button
              variant="outline"
              className="bg-white shadow-lg text-[#4C1D95] border border-[#DDD6FE] rounded-lg px-4 py-2 hover:bg-white"
            >
              리스트 보기
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {RECOMMENDED_ARTWORKS.map((artwork) => (
            <ArtworkCard
              key={(artwork as any).id ?? (artwork as any).artwork_id ?? (artwork as any).artworkId ?? Math.random()}
              artwork={artwork}
              ctaLabel="상세보기"
              className="shadow-lg border border-[#DDD6FE] rounded-xl overflow-hidden"
            />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            className="bg-white shadow-lg text-[#4C1D95] border border-[#DDD6FE] rounded-lg px-6 py-3 hover:bg-white"
          >
            더 보기
          </Button>
        </div>
      </div>
    </section>
  );
}
