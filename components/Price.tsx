import { formatCurrencyKRW } from "@/lib/format";
import { cn } from "@/lib/utils";

export type PriceProps = {
  amount: number;
  className?: string;
};

export function Price({ amount, className }: PriceProps) {
  return (
    <span className={cn("font-semibold", className)} aria-label={`가격 ${amount}원`}>
      {formatCurrencyKRW(amount)}
    </span>
  );
}

export default Price;
