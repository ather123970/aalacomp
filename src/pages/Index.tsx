import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProductCard } from "@/components/ProductCard";
import { RealTimeNotification } from "@/components/RealTimeNotification";
import { TrustBadges } from "@/components/TrustBadges";
import { DealsSection } from "@/components/DealsSection";
import { Footer } from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedProducts } from "@/lib/localDb";
import { Star, TrendingUp, Users } from "lucide-react";

const Index = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      return await getFeaturedProducts(6);
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <RealTimeNotification />
      <HeroSection />

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Collection</h2>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-96 bg-secondary rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products?.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                compareAtPrice={product.compare_at_price || undefined}
                image={product.image_url || (product.images && product.images.length > 0 ? product.images[0] : "/placeholder.svg")}
                category={product.category}
                badges={product.badges || []}
                discountPercentage={product.discount_percentage}
                stock={product.stock}
                viewCount={product.view_count}
                soldCount={product.sold_count}
              />
            ))}
          </div>
        )}
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-card rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-4xl font-bold mb-2">10,000+</h3>
              <p className="text-muted-foreground">Happy Customers</p>
            </div>
            <div className="bg-card rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
              </div>
              <h3 className="text-4xl font-bold mb-2">4.8/5</h3>
              <p className="text-muted-foreground">Average Rating</p>
            </div>
            <div className="bg-card rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-4xl font-bold mb-2">2,500+</h3>
              <p className="text-muted-foreground">Orders This Month</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Chronos?</h2>
          <TrustBadges variant="full" />
        </div>
      </section>

      {/* Deals Section */}
      <DealsSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
