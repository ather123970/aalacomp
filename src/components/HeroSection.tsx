import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CountdownTimer } from "@/components/CountdownTimer";
import { ChevronRight, ShieldCheck, Truck, Star, TrendingUp } from "lucide-react";
import { getProductById, getAllProducts } from "@/lib/localDb";
import heroWatch1 from "@/assets/hero-watch-1.jpg";


interface HeroProduct {
  id: string;
  name: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  image_url: string | null;
  category: string | null;
  [key: string]: any; // Allow additional properties from Supabase
}

export const HeroSection = () => {
  const [heroProduct, setHeroProduct] = useState<HeroProduct | null>(null);
  const [saleEndDate, setSaleEndDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(true);

  // Load or create timer
  useEffect(() => {
    const loadTimer = () => {
      const storedEndTime = localStorage.getItem('heroTimerEnd');
      const storedProductId = localStorage.getItem('heroProductId');
      
      if (storedEndTime) {
        const endTime = new Date(storedEndTime);
        if (endTime > new Date()) {
          setSaleEndDate(endTime);
          if (storedProductId) {
            loadProduct(storedProductId);
          } else {
            loadRandomProduct();
          }
          return;
        }
      }
      
      // Create new 3-hour timer
      const newEndDate = new Date();
      newEndDate.setHours(newEndDate.getHours() + 3);
      setSaleEndDate(newEndDate);
      localStorage.setItem('heroTimerEnd', newEndDate.toISOString());
      loadRandomProduct();
    };

    loadTimer();

    // Check timer every minute
    const interval = setInterval(() => {
      const storedEndTime = localStorage.getItem('heroTimerEnd');
      if (storedEndTime) {
        const endTime = new Date(storedEndTime);
        if (endTime <= new Date()) {
          // Timer expired, load new product
          const newEndDate = new Date();
          newEndDate.setHours(newEndDate.getHours() + 3);
          setSaleEndDate(newEndDate);
          localStorage.setItem('heroTimerEnd', newEndDate.toISOString());
          loadRandomProduct();
        }
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const loadProduct = async (productId: string) => {
    try {
      const product = await getProductById(productId);
      
      if (product) {
        setHeroProduct(product);
        setLoading(false);
      } else {
        loadRandomProduct();
      }
    } catch (error) {
      console.error('Error loading product:', error);
      loadRandomProduct();
    }
  };

  const loadRandomProduct = async () => {
    try {
      const products = await getAllProducts();
      
      if (products && products.length > 0) {
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        setHeroProduct(randomProduct);
        localStorage.setItem('heroProductId', randomProduct.id);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading random product:', error);
      setLoading(false);
    }
  };

  if (loading || !heroProduct) {
    return (
      <section className="relative bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#0A0A0A] text-white overflow-hidden">
        <div className="container mx-auto px-4 py-32">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-20 bg-white/10 rounded-lg mb-4 mx-auto max-w-md"></div>
              <div className="h-8 bg-white/5 rounded-lg mb-2 mx-auto max-w-sm"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const price = heroProduct.price;
  const originalPrice = heroProduct.compare_at_price || price * 1.25;
  const savings = originalPrice - price;
  const savingsPercent = Math.round((savings / originalPrice) * 100);
  const modelName = heroProduct.name.toUpperCase();
  const modelNumber = heroProduct.id.substring(0, 8).toUpperCase();

  const features = [
    { icon: ShieldCheck, text: "2 Year Warranty" },
    { icon: Truck, text: "Free Delivery" },
    { icon: Star, text: "Premium Quality" },
  ];


  return (
    <section className="relative bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#0A0A0A] text-white overflow-hidden">
      {/* Animated accent elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-600/10 via-transparent to-transparent rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-yellow-400/10 via-transparent to-transparent rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-red-500/5 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
            {/* Model Number Badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
              <span className="text-xs font-semibold tracking-wider text-white/60">MODEL</span>
              <span className="text-sm font-bold tracking-widest">{modelNumber}</span>
              <Badge className="bg-sale text-sale-foreground ml-2 animate-pulse">
                -{savingsPercent}% OFF
              </Badge>
            </div>

            {/* Main Heading */}
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-none mb-4">
                <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                  {modelName.split(' ')[0] || 'PREMIUM'}
                </span>
                <br />
                <span className="bg-gradient-to-r from-white/80 to-white/40 bg-clip-text text-transparent">
                  {modelName.split(' ').slice(1).join(' ') || 'WATCH'}
                </span>
              </h1>
              <p className="text-white/60 text-lg leading-relaxed max-w-lg">
                {heroProduct.description || 'Experience precision engineering with our premium timepiece. Swiss-made movement, sapphire crystal, and water resistance. A watch that defines luxury.'}
              </p>
            </div>

            {/* Price Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-2 sm:gap-4">
              <div>
                <p className="text-sm text-white/50 mb-1">Special Price</p>
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                  PKR {price.toLocaleString()}
                </p>
              </div>
              <div className="pb-0 sm:pb-2">
                <p className="text-xl sm:text-2xl text-white/40 line-through">
                  PKR {originalPrice.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-white/70 uppercase tracking-wide">Limited Time Offer</span>
                <TrendingUp className="h-4 w-4 text-sale animate-pulse" />
              </div>
              <CountdownTimer endDate={saleEndDate} size="lg" variant="default" />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link to={`/product/${heroProduct.id}`} className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-white text-black hover:bg-white/90 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold group"
                >
                  Order Now
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to={`/product/${heroProduct.id}`} className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold backdrop-blur-sm"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-6 pt-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-white/70">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Product Image */}
          <div className="relative order-1 lg:order-2">
            {/* Glow effect behind image */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-yellow-400/20 to-red-500/20 blur-3xl opacity-50 animate-pulse" />
            
            {/* Product Image Container */}
            <div className="relative group">
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img
                  src={heroProduct.image_url || (heroProduct.images && heroProduct.images.length > 0 ? heroProduct.images[0] : heroWatch1)}
                  alt={heroProduct.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = heroWatch1;
                  }}
                />
              </div>
              
              {/* Floating stats */}
              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 animate-float-slow">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-bold">4.9</span>
                  <span className="text-xs text-white/60">(2.4k reviews)</span>
                </div>
              </div>

              {/* Stock indicator */}
              <div className="absolute bottom-4 left-4 bg-sale/90 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 animate-pulse-glow">
                <span className="text-sm font-bold">Limited Time Deal!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Bar */}
        <div className="mt-20 pt-8 border-t border-white/10">
          <div className="flex flex-wrap justify-center gap-12 text-center">
            <div>
              <p className="text-3xl font-bold mb-1">10,000+</p>
              <p className="text-sm text-white/60">Happy Customers</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <p className="text-3xl font-bold mb-1">4.8★</p>
              <p className="text-sm text-white/60">Average Rating</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <p className="text-3xl font-bold mb-1">100%</p>
              <p className="text-sm text-white/60">Authentic Products</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <p className="text-3xl font-bold mb-1">Free</p>
              <p className="text-sm text-white/60">Nationwide Shipping</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
