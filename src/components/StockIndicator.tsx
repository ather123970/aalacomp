import { AlertCircle, Flame, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface StockIndicatorProps {
  stock: number;
  threshold?: number;
  showIcon?: boolean;
  variant?: "inline" | "badge" | "prominent";
}

export const StockIndicator = ({ 
  stock, 
  threshold = 30, 
  showIcon = true,
  variant = "inline"
}: StockIndicatorProps) => {
  const isLowStock = stock <= threshold && stock > 0;
  const isOutOfStock = stock === 0;
  const isHot = stock > 0 && stock <= 10;

  if (isOutOfStock) {
    return (
      <div className={cn(
        "flex items-center gap-2",
        variant === "badge" && "inline-flex",
        variant === "prominent" && "bg-destructive/10 border border-destructive rounded-lg p-3"
      )}>
        {showIcon && <AlertCircle className="h-4 w-4 text-destructive" />}
        <span className="font-semibold text-destructive">Out of Stock</span>
      </div>
    );
  }

  if (!isLowStock) return null;

  if (variant === "badge") {
    return (
      <Badge variant="destructive" className="animate-pulse">
        {isHot && <Flame className="h-3 w-3 mr-1" />}
        Only {stock} left!
      </Badge>
    );
  }

  if (variant === "prominent") {
    return (
      <div className="bg-sale/10 border-2 border-sale rounded-lg p-4 animate-pulse-glow">
        <div className="flex items-center gap-2 mb-2">
          {isHot ? (
            <Flame className="h-5 w-5 text-sale" />
          ) : (
            <TrendingUp className="h-5 w-5 text-sale" />
          )}
          <span className="font-bold text-sale text-lg">
            {isHot ? "ALMOST GONE!" : "LOW STOCK ALERT"}
          </span>
        </div>
        <p className="text-sm font-semibold">
          Only <span className="text-2xl text-sale">{stock}</span> units left in stock!
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Order now before it's too late
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sale font-bold">
      {showIcon && <AlertCircle className="h-4 w-4 animate-pulse" />}
      <span>Only {stock} left in stock - Order now!</span>
    </div>
  );
};
