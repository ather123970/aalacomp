import { useEffect, useState } from "react";
import { ShoppingBag, Eye, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "purchase" | "viewing" | "hot";
  message: string;
  city?: string;
}

const cities = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar"];
const names = ["Ahmed", "Ali", "Hassan", "Usman", "Bilal", "Zain", "Omar", "Asad"];

const generatePurchaseNotification = (): Notification => {
  const name = names[Math.floor(Math.random() * names.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];
  const timeAgo = Math.floor(Math.random() * 120) + 1;
  
  return {
    id: `purchase-${Date.now()}`,
    type: "purchase",
    message: `${name} from ${city} purchased ${timeAgo} ${timeAgo === 1 ? 'minute' : 'minutes'} ago`,
    city,
  };
};

export const RealTimeNotification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Generate initial notification after 3 seconds
    const initialTimer = setTimeout(() => {
      const notification = generatePurchaseNotification();
      setCurrentNotification(notification);
      setIsVisible(true);

      // Hide after 5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    }, 3000);

    // Generate new notification every 15-25 seconds
    const interval = setInterval(() => {
      const notification = generatePurchaseNotification();
      setNotifications((prev) => [...prev.slice(-5), notification]);
      setCurrentNotification(notification);
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    }, Math.random() * 10000 + 15000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  if (!currentNotification) return null;

  return (
    <div
      className={cn(
        "fixed bottom-6 left-6 z-50 max-w-sm transition-all duration-300",
        isVisible ? "animate-slide-in-bottom opacity-100" : "animate-slide-out-bottom opacity-0"
      )}
    >
      <div className="bg-card border-2 border-primary/10 rounded-lg shadow-2xl p-4 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            {currentNotification.type === "purchase" ? (
              <ShoppingBag className="h-5 w-5 text-primary" />
            ) : currentNotification.type === "viewing" ? (
              <Eye className="h-5 w-5 text-primary" />
            ) : (
              <Flame className="h-5 w-5 text-sale" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold text-muted-foreground">Real-time Update</span>
            </div>
            <p className="text-sm font-medium text-foreground">{currentNotification.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
