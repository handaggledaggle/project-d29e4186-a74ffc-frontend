"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Price } from "@/components/Price";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { apiFetch } from "@/lib/api";
import type { ArtworkCreateResponse } from "@/types/artwork";

export default function ArtworkCreateClient() {
  const router = useRouter();

  const [title, setTitle] = React.useState("꿈의 풍경");
  const [category, setCategory] = React.useState("PAINTING");
  const [description, setDescription] = React.useState(
    "업로드한 이미지와 설명을 바탕으로 구매자가 보게 될 상세 페이지 미리보기입니다."
  );
  const [price, setPrice] = React.useState<number>(500000);
  const [quantity, setQuantity] = React.useState<number | "">("");

  const [files, setFiles] = React.useState<File[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Ensure onSubmit is stable reference (optional) and properly called by form's onSubmit
  const onSubmit = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);

      // basic validation
      if (!title || !price) {
        setError("작품명과 가격은 필수입니다.");
        return;
      }

      const form = new FormData();
      form.append("title", title);
      form.append("category", category);
      form.append("price", String(price));
      if (description) form.append("description", description);
      if (typeof quantity === "number") form.append("quantity", String(quantity));

      // Append files (API expects multipart/form-data)
      files.slice(0, 10).forEach((f, i) => {
        form.append("files", f, f.name);
      });

      try {
        setLoading(true);
        setError(null);

        const res = await apiFetch<ArtworkCreateResponse>(`/api/v1/artworks`, {
          method: "POST",
          body: form,
        });

        if (!res.ok) {
          setError(res.error?.message || "등록에 실패했습니다.");
          return;
        }

        // Navigate to newly created artwork detail page if artwork_id returned
        const artworkId = res.data.artwork_id;
        if (artworkId) {
          // router from next/navigation works in client components
          router.push(`/artworks/${encodeURIComponent(String(artworkId))}`);
        } else {
          // If backend returned 204 or no id, at least navigate to artworks list
          router.push(`/artworks`);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        setError("서버와 통신 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    },
    [title, category, description, price, quantity, files, router]
  );

  return (
    <>
      <section
        data-section-type="form"
        className="flex flex-col items-center py-12 px-8 bg-white shadow-lg"
      >
        <div className="flex w-full gap-8">
          {/* Left: Form */}
          <Card
            data-component="card"
            className={cn(
              "flex-1 p-8 bg-[#FFFFFF] border border-[#DDD6FE] rounded-none shadow-none"
            )}
          >
            {/* Ensure form element uses the onSubmit handler and a proper name/role for accessibility */}
            <form onSubmit={onSubmit} className="" noValidate>
              <h2 className="text-2xl font-bold text-[#4C1D95] mb-4">작품 정보</h2>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <Label className="text-sm text-[#4C1D95]">
                    작품명 <span className="text-[#6D28D9] text-sm">(필수)</span>
                  </Label>
                  <Input
                    aria-label="작품명"
                    className="h-10 bg-white shadow-lg border border-[#DDD6FE] rounded-lg px-3 text-[#4C1D95]"
                    type="text"
                    placeholder="예: 꿈의 풍경"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  <p className="text-[#6D28D9] text-sm">30자 이내로 입력하세요.</p>
                </div>

                <div className="flex flex-col gap-1">
                  <Label className="text-sm text-[#4C1D95]">
                    카테고리 <span className="text-[#6D28D9] text-sm">(필수)</span>
                  </Label>
                  {/* simple select */}
                  <select
                    aria-label="카테고리 선택"
                    className="h-10 bg-white shadow-lg border border-[#DDD6FE] rounded-lg px-3 text-[#4C1D95]"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="PAINTING">회화 · 판화 · 사진</option>
                    <option value="PHOTO">사진</option>
                    <option value="DIGITAL">디지털</option>
                    <option value="PRINT">프린트</option>
                    <option value="ILLUSTRATION">일러스트</option>
                    <option value="OTHER">기타</option>
                  </select>
                  <p className="text-[#6D28D9] text-sm">
                    작품이 속한 카테고리를 선택하면 구매자 검색에 유리합니다.
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <Label className="text-sm text-[#4C1D95]">
                    설명 <span className="text-[#6D28D9] text-sm">(권장)</span>
                  </Label>
                  <textarea
                    aria-label="작품 설명"
                    className="h-28 bg-white shadow-lg border border-[#DDD6FE] rounded-lg p-3 text-[#4C1D95] resize-none"
                    placeholder="작품의 재료, 제작 연도, 작품 의도 등을 상세히 적어주세요."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <p className="text-[#6D28D9] text-sm">
                    구매 전환에 긍정적인 상세 설명을 권장합니다. (최대 1,000자)
                  </p>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1 flex flex-col gap-1">
                    <Label className="text-sm text-[#4C1D95]">
                      가격 (KRW) <span className="text-[#6D28D9] text-sm">(필수)</span>
                    </Label>
                    <Input
                      aria-label="가격"
                      className="h-10 bg-white shadow-lg border border-[#DDD6FE] rounded-lg px-3 text-[#4C1D95]"
                      type="number"
                      placeholder="예: 500000"
                      value={Number.isFinite(price) ? String(price) : ""}
                      onChange={(e) => setPrice(Number(e.target.value || 0))}
                      required
                    />
                    <p className="text-[#6D28D9] text-sm">
                      숫자만 입력하세요. 배송비는 별도 설정 가능합니다.
                    </p>
                  </div>

                  <div className="flex-1 flex flex-col gap-1">
                    <Label className="text-sm text-[#4C1D95]">재고/수량</Label>
                    <Input
                      aria-label="수량"
                      className="h-10 bg-white shadow-lg border border-[#DDD6FE] rounded-lg px-3 text-[#4C1D95]"
                      type="number"
                      placeholder="예: 1"
                      value={quantity === "" ? "" : String(quantity)}
                      onChange={(e) =>
                        setQuantity(e.target.value === "" ? "" : Number(e.target.value))
                      }
                    />
                    <p className="text-[#6D28D9] text-sm">
                      한정판인 경우 재고를 정확히 입력하세요.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <Label className="text-sm text-[#4C1D95]">작품 상태</Label>
                  <div className="h-10 bg-white shadow-lg border border-[#DDD6FE] rounded-lg flex items-center px-3 text-[#4C1D95]">
                    새상품 / 중고 등
                  </div>
                  <p className="text-[#6D28D9] text-sm">
                    구매자 신뢰를 위해 상태를 정직하게 기재하세요.
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <Label className="text-sm text-[#4C1D95]">노출 설정</Label>
                  <div className="h-10 bg-white shadow-lg border border-[#DDD6FE] rounded-lg flex items-center px-3 text-[#4C1D95]">
                    즉시 판매 / 숨김(임시저장)
                  </div>
                  <p className="text-[#6D28D9] text-sm">
                    임시저장은 비공개로 저장되며, 나중에 편집하여 공개할 수 있습니다.
                  </p>
                </div>
              </div>

              {error ? <p className="mt-3 text-red-600">{error}</p> : null}

              <div className="flex items-center justify-end gap-3 mt-6">
                <Button
                  type="button"
                  variant="secondary"
                  className="bg-[#FFFFFF] text-[#4C1D95] rounded-lg px-4 py-2 shadow-none hover:bg-[#FAF5FF]"
                >
                  임시저장
                </Button>
                <Button
                  type="submit"
                  className="bg-[#7C3AED] text-white rounded-lg px-6 py-2 hover:bg-[#6D28D9]"
                  disabled={loading}
                >
                  {loading ? "등록 중..." : "등록하기"}
                </Button>
              </div>
            </form>
          </Card>

          {/* Right: Gallery & Preview */}
          <div className="w-[480px] flex flex-col gap-6">
            <Card
              data-section-type="gallery"
              data-component="card"
              className="flex flex-col p-6 bg-[#FAF5FF] border border-[#DDD6FE] rounded-none shadow-none"
            >
              <h3 className="text-xl font-semibold text-[#4C1D95]">
                작품 이미지 업로드 <span className="text-[#6D28D9] text-sm">(최대 10장)</span>
              </h3>

              <div className="flex flex-col gap-3 mt-3">
                <label className="h-36 bg-white shadow-lg border border-[#DDD6FE] rounded-lg flex items-center justify-center text-[#6D28D9] cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={(e) => setFiles(Array.from(e.target.files ?? []).slice(0, 10))}
                    aria-label="이미지 업로드"
                  />
                  이미지 드래그 앤 드롭 또는 클릭하여 업로드
                </label>

                <div className="flex gap-2">
                  {files.slice(0, 4).map((f, idx) => (
                    <div key={f.name + idx} className="w-20 h-20 bg-white shadow-lg border border-[#DDD6FE] rounded-lg flex items-center justify-center text-[#6D28D9] overflow-hidden">
                      <img src={URL.createObjectURL(f)} alt={f.name} className="w-full h-full object-cover" />
                    </div>
                  ))}

                  {files.length < 4 ? (
                    <div className="w-20 h-20 bg-white shadow-lg border border-[#DDD6FE] rounded-lg flex items-center justify-center text-[#6D28D9]">
                      추가
                    </div>
                  ) : null}
                </div>

                <p className="text-[#6D28D9] text-sm">이미지는 5MB 이하, 권장 해상도 2000px 이상</p>
              </div>
            </Card>

            <Card
              data-section-type="features"
              data-component="card"
              className="flex flex-col p-6 bg-white shadow-lg border border-[#DDD6FE] rounded-none"
            >
              <h3 className="text-xl font-semibold text-[#4C1D95]">미리보기</h3>

              <div className="flex flex-col gap-3 mt-3">
                <div className="w-full h-56 bg-[#FFFFFF] border border-[#DDD6FE] rounded-lg flex flex-col p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-lg font-bold text-[#4C1D95]">{title || "꿈의 풍경"}</div>
                      <div className="text-sm text-[#6D28D9]">
                        {category ? `${category}` : "회화"} · {new Date().getFullYear()} · {"60x80cm"}
                      </div>
                    </div>
                    <div className="text-sm text-[#6D28D9]">
                      <Price amount={price || 0} />
                    </div>
                  </div>

                  <div className="flex-1 mt-3 text-[#6D28D9] line-clamp-4">
                    {description ||
                      "업로드한 이미지와 설명을 바탕으로 구매자가 보게 될 상세 페이지 미리보기입니다."}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    className="bg-[#FFFFFF] text-[#4C1D95] rounded-lg px-4 py-2 shadow-none hover:bg-[#FAF5FF]"
                    onClick={() => {
                      // ensure preview action is handled in client
                      const el = document.querySelector('[data-section-type="gallery"]');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    미리보기 전체화면
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    className="bg-[#FFFFFF] text-[#4C1D95] rounded-lg px-4 py-2 shadow-none hover:bg-[#FAF5FF]"
                    onClick={() => alert('공개 전 검토 기능은 준비 중입니다.')}
                  >
                    공개 전 검토
                  </Button>
                </div>
              </div>
            </Card>

            <Card
              data-section-type="features"
              data-component="card"
              className="flex flex-col p-6 bg-[#FFFFFF] border border-[#DDD6FE] rounded-none shadow-none"
            >
              <h3 className="text-lg font-semibold text-[#4C1D95]">입력 가이드</h3>
              <ul className="text-sm text-[#6D28D9] mt-2 space-y-2">
                <li>필수 항목: 작품명, 카테고리, 가격</li>
                <li>설명은 200자 이상 권장 — 검색 및 구매 전환에 도움</li>
                <li>이미지 최소 1장 필수, 대표 이미지가 검색 썸네일로 사용됩니다.</li>
                <li>임시저장을 활용해 작업을 분할 등록하세요.</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section
        data-section-type="features"
        className="flex flex-col items-center py-12 px-8 bg-white shadow-lg"
      >
        <h2 className="text-2xl font-bold text-[#4C1D95]">등록 절차 및 팁</h2>
        <p className="text-[#6D28D9]">간단한 체크리스트로 등록 시간을 단축하고 전환율을 높이세요.</p>

        <div className="flex gap-6 mt-6 w-full">
          <Card
            data-component="card"
            className="flex flex-col items-start p-6 bg-[#FFFFFF] border border-[#DDD6FE] rounded-none shadow-none flex-1"
          >
            <h3 className="text-lg font-semibold text-[#4C1D95]">1. 사진 퀄리티</h3>
            <p className="text-[#6D28D9]">밝고 선명한 사진이 클릭률을 높입니다.</p>
          </Card>

          <Card
            data-component="card"
            className="flex flex-col items-start p-6 bg-[#FFFFFF] border border-[#DDD6FE] rounded-none shadow-none flex-1"
          >
            <h3 className="text-lg font-semibold text-[#4C1D95]">2. 상세 설명</h3>
            <p className="text-[#6D28D9]">재료·사이즈·제작연도·작가노트 포함</p>
          </Card>

          <Card
            data-component="card"
            className="flex flex-col items-start p-6 bg-[#FFFFFF] border border-[#DDD6FE] rounded-none shadow-none flex-1"
          >
            <h3 className="text-lg font-semibold text-[#4C1D95]">3. 가격 설정</h3>
            <p className="text-[#6D28D9]">유사 작품 대비 경쟁력 있는 가격을 제안하세요.</p>
          </Card>
        </div>
      </section>

      <section
        data-section-type="cta"
        className="flex flex-col items-center justify-center py-10 px-8 bg-[#FAF5FF]"
      >
        <h2 className="text-2xl font-bold text-[#4C1D95] text-center">준비되셨나요?</h2>
        <p className="text-[#6D28D9] text-center">
          지금 등록하면 아티스트 전용 프로모션 및 추천에 노출됩니다.
        </p>

        <div className="flex gap-3 mt-4">
          <Button
            className="bg-[#7C3AED] text-white rounded-lg px-6 py-2 hover:bg-[#6D28D9]"
            onClick={() => {
              // fallback: scroll to form submit
              const form = document.querySelector('form');
              if (form) form.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            등록 완료
          </Button>
          <Button
            variant="secondary"
            className="bg-[#FAF5FF] text-[#4C1D95] rounded-lg px-6 py-2 shadow-none hover:bg-[#F3E8FF]"
          >
            임시저장
          </Button>
        </div>
      </section>
    </>
  );
}
