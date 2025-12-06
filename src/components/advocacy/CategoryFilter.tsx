import { Badge } from "@/components/ui/badge";
import { BILL_CATEGORIES, BillCategoryId } from "@/lib/billCategories";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  selectedCategory: BillCategoryId;
  onCategoryChange: (category: BillCategoryId) => void;
  className?: string;
}

export function CategoryFilter({ selectedCategory, onCategoryChange, className }: CategoryFilterProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {BILL_CATEGORIES.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
            "border hover:shadow-sm",
            selectedCategory === category.id
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
          )}
        >
          <span className={cn(
            "inline-block w-2 h-2 rounded-full mr-1.5",
            category.id === 'all' ? 'bg-muted-foreground' : category.color
          )} />
          {category.label}
        </button>
      ))}
    </div>
  );
}

interface CategoryBadgeProps {
  categoryId: BillCategoryId;
  size?: 'sm' | 'default';
}

export function CategoryBadge({ categoryId, size = 'default' }: CategoryBadgeProps) {
  const category = BILL_CATEGORIES.find(c => c.id === categoryId);
  if (!category || category.id === 'all') return null;

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "border-0",
        size === 'sm' ? 'text-[10px] px-1.5 py-0' : 'text-xs',
        category.color,
        "text-white"
      )}
    >
      {category.label}
    </Badge>
  );
}
