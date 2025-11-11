import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/CountdownTimer";
import { getAllProducts } from "@/lib/localDb";
import { Zap, Plus, TrendingUp, ShoppingCart } from "lucide-react";

interface Deal {
  id: string;
  title: string;
  description: string;
  product1_id: string;
  product2_id: string;
  discount_percentage: number;
  end_date: string;
  is_active: boolean;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
}

export const DealsSection = () => {
  const [deals, setDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDeals();
  }, []);

  const loadDeals = async () => {
    try {
      // Get products from local database
      const products = await getAllProducts();

      if (products && products.length >= 2) {
        // Create 2 deals from available products
        const mockDeals = [];
        
        for (let i = 0; i < Math.min(2, Math.floor(products.length / 2)); i++) {
          const product1 = products[i * 2];
          const product2 = products[i * 2 + 1];
          
          if (product1 && product2) {
            const totalPrice = product1.price + product2.price;
            const discount = Math.min(15, Math.ceil((totalPrice / 100000) * 10)); // 5-15% discount
            const bundlePrice = Math.round(totalPrice * (1 - discount / 100));
            
            const endDate = new Date();
            endDate.setHours(endDate.getHours() + 12); // 12 hour deals
            
            mockDeals.push({
              id: `deal-${i}`,
              title: `Bundle Deal ${i + 1}`,
              product1,
              product2,
              totalPrice,
              discount,
              bundlePrice,
              endDate,
              savings: totalPrice - bundlePrice,
            });
          }
        }
        
        setDeals(mockDeals);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading deals:', error);
      setLoading(false);
    }
  };

  if (loading || deals.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-sale/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-sale/10 border border-sale/20 rounded-full px-4 py-2 mb-4">
            <Zap className="h-4 w-4 text-sale animate-pulse" />
            <span className="text-sm font-bold text-sale uppercase tracking-wide">Limited Time Deals</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-sale to-primary bg-clip-text text-transparent">
              Bundle & Save
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get two premium watches together and save big. Limited time offers!
          </p>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {deals.map((deal) => (
            <Card 
              key={deal.id} 
              className="group overflow-hidden bg-gradient-to-br from-card to-card/50 border-2 hover:border-primary/50 hover:shadow-2xl transition-all duration-500"
            >
              <div className="p-4 sm:p-6">
                {/* Timer */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 sm:mb-6">
                  <Badge className="bg-sale text-sale-foreground px-4 py-2 text-sm font-bold animate-pulse-glow">
                    SAVE {deal.discount}%
                  </Badge>
                  <CountdownTimer 
                    endDate={deal.endDate} 
                    size="sm" 
                    variant="urgent" 
                    showIcon={false}
                  />
                </div>

                {/* Products Display */}
                <div className="relative mb-4 sm:mb-6">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {/* Product 1 */}
                    <Link to={`/product/${deal.product1.id}`} className="group/product">
                      <div className="aspect-square bg-secondary rounded-xl overflow-hidden relative">
                        <img
                          src={deal.product1.image_url || (deal.product1.images && deal.product1.images.length > 0 ? deal.product1.images[0] : "/placeholder.svg")}
                          alt={deal.product1.name}
                          className="w-full h-full object-cover group-hover/product:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                      </div>
                      <h4 className="font-semibold text-xs sm:text-sm mt-2 sm:mt-3 line-clamp-2 group-hover/product:text-primary transition-colors">
                        {deal.product1.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        PKR {deal.product1.price.toLocaleString()}
                      </p>
                    </Link>

                    {/* Product 2 */}
                    <Link to={`/product/${deal.product2.id}`} className="group/product">
                      <div className="aspect-square bg-secondary rounded-xl overflow-hidden relative">
                        <img
                          src={deal.product2.image_url || (deal.product2.images && deal.product2.images.length > 0 ? deal.product2.images[0] : "/placeholder.svg")}
                          alt={deal.product2.name}
                          className="w-full h-full object-cover group-hover/product:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                      </div>
                      <h4 className="font-semibold text-xs sm:text-sm mt-2 sm:mt-3 line-clamp-2 group-hover/product:text-primary transition-colors">
                        {deal.product2.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        PKR {deal.product2.price.toLocaleString()}
                      </p>
                    </Link>
                  </div>

                  {/* Plus Icon */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary flex items-center justify-center shadow-xl">
                      <Plus className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground font-bold" />
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-gradient-to-r from-sale/10 to-primary/10 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 border border-sale/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-sm text-muted-foreground">Regular Price:</span>
                    <span className="text-sm sm:text-lg line-through text-muted-foreground">
                      PKR {deal.totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-lg font-bold">Bundle Price:</span>
                    <span className="text-xl sm:text-3xl font-bold text-sale">
                      PKR {deal.bundlePrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-600">
                      You save PKR {deal.savings.toLocaleString()}!
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button 
                  size="lg" 
                  className="w-full text-sm sm:text-lg py-4 sm:py-6 group-hover:scale-105 transition-transform"
                >
                  <ShoppingCart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Add Bundle to Cart
                </Button>

                {/* Trust Badge */}
                <p className="text-xs text-center text-muted-foreground mt-3">
                  ✓ Free Shipping • ✓ 2 Year Warranty • ✓ 30-Day Returns
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            These exclusive deals won't last long. Grab them before time runs out!
          </p>
        </div>
      </div>
    </section>
  );
};
