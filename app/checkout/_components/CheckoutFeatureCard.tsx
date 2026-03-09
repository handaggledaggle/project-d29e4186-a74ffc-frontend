import { Card } from "@/components/ui/card";

export function CheckoutFeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="rounded-xl border border-[#DDD6FE] bg-white p-6 shadow-none">
      <div className="h-10 w-10 rounded-lg bg-gray-200" />
      <h3 className="mt-3 text-xl font-semibold text-[#4C1D95]">{title}</h3>
      <p className="mt-1 text-sm text-[#6D28D9]">{description}</p>
    </Card>
  );
}
