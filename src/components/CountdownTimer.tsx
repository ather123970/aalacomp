import { useEffect, useState } from "react";
import { Timer, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  endDate: Date;
  onExpire?: () => void;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "urgent" | "minimal";
}

export const CountdownTimer = ({ 
  endDate, 
  onExpire, 
  showIcon = true, 
  size = "md",
  variant = "default"
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setIsExpired(true);
        onExpire?.();
        return;
      }

      setTimeLeft({
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate, onExpire]);

  if (isExpired) {
    return (
      <div className="text-muted-foreground font-medium">
        Deal Expired
      </div>
    );
  }

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-2xl",
  };

  const isUrgent = timeLeft.hours < 1;

  if (variant === "minimal") {
    return (
      <span className={cn("font-mono font-bold", sizeClasses[size], isUrgent && "text-sale animate-pulse")}>
        {String(timeLeft.hours).padStart(2, "0")}:
        {String(timeLeft.minutes).padStart(2, "0")}:
        {String(timeLeft.seconds).padStart(2, "0")}
      </span>
    );
  }

  return (
    <div className={cn(
      "inline-flex items-center gap-2 font-bold",
      variant === "urgent" && "text-sale",
      sizeClasses[size]
    )}>
      {showIcon && (
        isUrgent ? (
          <Zap className={cn("animate-pulse", size === "sm" ? "h-4 w-4" : size === "md" ? "h-5 w-5" : "h-6 w-6")} />
        ) : (
          <Timer className={cn("animate-pulse", size === "sm" ? "h-4 w-4" : size === "md" ? "h-5 w-5" : "h-6 w-6")} />
        )
      )}
      <div className="flex items-center gap-1">
        <span className={cn(
          "bg-white/10 border border-white/20 rounded px-3 py-2 font-mono text-white backdrop-blur-sm",
          isUrgent && "border-sale bg-sale/20 animate-pulse-glow"
        )}>
          {String(timeLeft.hours).padStart(2, "0")}
        </span>
        <span className="text-white/60">:</span>
        <span className={cn(
          "bg-white/10 border border-white/20 rounded px-3 py-2 font-mono text-white backdrop-blur-sm",
          isUrgent && "border-sale bg-sale/20 animate-pulse-glow"
        )}>
          {String(timeLeft.minutes).padStart(2, "0")}
        </span>
        <span className="text-white/60">:</span>
        <span className={cn(
          "bg-white/10 border border-white/20 rounded px-3 py-2 font-mono text-white backdrop-blur-sm",
          isUrgent && "border-sale bg-sale/20 animate-pulse-glow"
        )}>
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};
