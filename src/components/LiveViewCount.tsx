import { useEffect, useState } from "react";
import { Eye, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveViewCountProps {
  baseCount?: number;
  productId?: string;
  variant?: "compact" | "full";
  className?: string;
}

export const LiveViewCount = ({ 
  baseCount = 15, 
  productId,
  variant = "full",
  className 
}: LiveViewCountProps) => {
  const [viewCount, setViewCount] = useState(baseCount);
  const [isIncreasing, setIsIncreasing] = useState(false);

  useEffect(() => {
    // Simulate real-time view count changes
    const interval = setInterval(() => {
      const change = Math.random() > 0.5 ? 1 : -1;
      const shouldChange = Math.random() > 0.3;
      
      if (shouldChange) {
        setViewCount((prev) => {
          const newCount = Math.max(5, Math.min(prev + change, baseCount + 20));
          setIsIncreasing(newCount > prev);
          return newCount;
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [baseCount]);

  if (variant === "compact") {
    return (
      <div className={cn("inline-flex items-center gap-1.5 text-sm", className)}>
        <div className="relative">
          <Eye className="h-4 w-4 text-muted-foreground" />
          {isIncreasing && (
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-500 animate-ping" />
          )}
        </div>
        <span className="font-medium text-muted-foreground">
          {viewCount} viewing
        </span>
      </div>
    );
  }

  return (
    <div className={cn(
      "inline-flex items-center gap-2 bg-accent/10 rounded-full px-4 py-2 border border-accent/20",
      className
    )}>
      <div className="relative">
        <Users className="h-4 w-4 text-foreground" />
        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      </div>
      <div className="flex items-center gap-1">
        <span className="font-bold text-foreground">{viewCount}</span>
        <span className="text-sm text-muted-foreground">people viewing right now</span>
      </div>
      {isIncreasing && (
        <span className="text-xs font-semibold text-green-600 animate-pulse">↑</span>
      )}
    </div>
  );
};
