import { ShieldCheck, Truck, Package, CreditCard, Award, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustBadgesProps {
  variant?: "compact" | "full";
  className?: string;
}

export const TrustBadges = ({ variant = "full", className }: TrustBadgesProps) => {
  const badges = [
    {
      icon: ShieldCheck,
      text: "100% Authentic",
      subtext: "Verified Products",
    },
    {
      icon: Truck,
      text: "Free Shipping",
      subtext: "All Pakistan",
    },
    {
      icon: Package,
      text: "Express Delivery",
      subtext: "2-3 Days",
    },
    {
      icon: CreditCard,
      text: "Cash on Delivery",
      subtext: "Secure Payment",
    },
    {
      icon: Award,
      text: "Money-Back",
      subtext: "30-Day Guarantee",
    },
    {
      icon: Lock,
      text: "Secure Checkout",
      subtext: "SSL Encrypted",
    },
  ];

  if (variant === "compact") {
    return (
      <div className={cn("grid grid-cols-3 gap-3", className)}>
        {badges.slice(0, 3).map((badge, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-secondary/50 rounded-lg p-3 border border-border/50"
          >
            <badge.icon className="h-4 w-4 text-primary flex-shrink-0" />
            <span className="text-xs font-medium">{badge.text}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 gap-4", className)}>
      {badges.map((badge, index) => (
        <div
          key={index}
          className="flex items-start gap-3 bg-card border rounded-lg p-4 hover:border-primary/50 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center flex-shrink-0">
            <badge.icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-0.5">{badge.text}</h4>
            <p className="text-xs text-muted-foreground">{badge.subtext}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
