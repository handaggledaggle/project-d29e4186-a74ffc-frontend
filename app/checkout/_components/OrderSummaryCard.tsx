import { Price } from "@/components/Price";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function OrderSummaryCard({
  className,
  artworkTitle,
  artistName,
  quantity,
  totalAmount,
}: {
  className?: string;
  artworkTitle: string;
  artistName: string;
  quantity: number;
  totalAmount: number;
}) {
  return (
    <Card
      data-component="card"
      className={cn(
        "rounded-xl border border-white/20",
        "bg-gradient-to-br from-[#7C3AED] to-[#A78BFA]",
        className
      )}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-white">주문 요약</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-white/90">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span>작품명</span>
            <span className="text-white">{artworkTitle}</span>
          </div>
          <div className="flex justify-between">
            <span>작가</span>
            <span className="text-white">{artistName}</span>
          </div>
          <div className="flex justify-between">
            <span>수량</span>
            <span className="text-white">{quantity}</span>
          </div>
          <div className="flex justify-between border-t border-white/20 pt-3">
            <span className="font-semibold text-white">총 결제금액</span>
            <Price amount={totalAmount} className="font-semibold text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
