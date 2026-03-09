import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type TagListProps = {
  tags: string[];
  className?: string;
};

export function TagList({ tags, className }: TagListProps) {
  if (!tags?.length) return null;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <Badge key={tag} variant="outline" className="rounded-full">
          {tag}
        </Badge>
      ))}
    </div>
  );
}

export default TagList;
