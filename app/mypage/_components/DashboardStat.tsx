import { cn } from "@/lib/utils";

type DashboardStatProps = {
  value: string;
  label: string;
  className?: string;
};

export function DashboardStat({ value, label, className }: DashboardStatProps) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <p className="text-3xl font-bold text-[#4C1D95]">{value}</p>
      <p className="text-[#6D28D9]">{label}</p>
    </div>
  );
}
