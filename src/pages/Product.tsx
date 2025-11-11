import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CountdownTimer } from "@/components/CountdownTimer";
import { StockIndicator } from "@/components/StockIndicator";
import { LiveViewCount } from "@/components/LiveViewCount";
import { TrustBadges } from "@/components/TrustBadges";
import { Star, ShieldCheck, Truck, Package, Award, CreditCard, Lock, TrendingUp, Zap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getProductById, updateProductViewCount } from "@/lib/localDb";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { addToCart as addToCartUtil } from "@/lib/cartUtils";

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      return await getProductById(id!);
    },
  });

  useEffect(() => {
    if (product && id) {
      updateProductViewCount(id);
    }
  }, [product, id]);

  const addToCart = () => {
    if (!product) return;
    
    addToCartUtil({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url || (product.images && product.images.length > 0 ? product.images[0] : "/placeholder.svg"),
      category: product.category,
      compare_at_price: product.compare_at_price,
    });
    
    toast.success(`${product.name} added to cart!`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-96 bg-secondary rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
        </div>
      </div>
    );
  }

  const savings = product.compare_at_price ? product.compare_at_price - product.price : 0;
  const savingsPercent = product.compare_at_price 
    ? Math.round((savings / product.compare_at_price) * 100) 
    : 0;

  // Deal end date (24 hours from now for demo)
  const dealEndDate = new Date();
  dealEndDate.setHours(dealEndDate.getHours() + 24);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Sale countdown banner */}
        {savingsPercent > 0 && (
          <div className="bg-sale/10 border-2 border-sale rounded-xl p-4 mb-8 animate-pulse-glow">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Zap className="h-6 w-6 text-sale" />
                <div>
                  <p className="font-bold text-lg">Limited Time Offer - {savingsPercent}% OFF!</p>
                  <p className="text-sm text-muted-foreground">This deal won't last long</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">Ends in:</span>
                <CountdownTimer endDate={dealEndDate} size="md" variant="urgent" />
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gradient-to-br from-secondary to-secondary/50 rounded-2xl overflow-hidden group">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {product.discount_percentage > 0 && (
                <div className="absolute top-4 right-4 animate-float-slow">
                  <Badge className="bg-sale text-sale-foreground text-lg px-4 py-2 shadow-lg">
                    {product.discount_percentage}% OFF
                  </Badge>
                </div>
              )}
              {product.badges?.includes("Best Seller") && (
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-foreground text-background">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    BEST SELLER
                  </Badge>
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${
                      selectedImage === idx ? "border-primary shadow-lg" : "border-border"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {product.badges?.map((badge: string, i: number) => (
                <Badge key={i} variant="secondary" className="text-sm px-3 py-1">
                  <Award className="h-3 w-3 mr-1" />
                  {badge}
                </Badge>
              ))}
            </div>

            {/* Product Title */}
            <h1 className="text-5xl font-bold leading-tight">{product.name}</h1>

            {/* Reviews */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-medium">4.5</span>
              <span className="text-muted-foreground">(24 verified reviews)</span>
            </div>

            {/* Live metrics */}
            <div className="flex flex-wrap items-center gap-4">
              <LiveViewCount baseCount={product.view_count || 25} productId={product.id} />
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-medium">{product.sold_count} sold in last 48 hours</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="border-t border-b py-6 space-y-3">
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-bold">
                  PKR {product.price.toLocaleString()}
                </span>
                {product.compare_at_price && product.compare_at_price > product.price && (
                  <span className="text-3xl text-muted-foreground line-through">
                    PKR {product.compare_at_price.toLocaleString()}
                  </span>
                )}
              </div>
              {savings > 0 && (
                <div className="flex items-center gap-2">
                  <Badge variant="destructive" className="text-base px-4 py-1">
                    Save PKR {savings.toLocaleString()} ({savingsPercent}% OFF)
                  </Badge>
                  <span className="text-sm text-green-600 font-semibold">✓ Best Price Guaranteed</span>
                </div>
              )}
            </div>

            {/* Stock urgency */}
            {product.stock > 0 && (
              <StockIndicator stock={product.stock} threshold={30} variant="prominent" />
            )}

            {/* Add to Cart Button */}
            <Button 
              onClick={addToCart} 
              size="lg" 
              className="w-full text-lg py-6 hover:scale-105 transition-transform"
            >
              Add to Cart - PKR {product.price.toLocaleString()}
            </Button>

            {/* Mini trust badges */}
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                <span>Money-Back</span>
              </div>
            </div>

            {/* Trust Badges Section */}
            <div className="bg-secondary/30 rounded-xl p-6 space-y-4">
              <h3 className="font-bold text-lg">Why Buy From Us?</h3>
              <TrustBadges variant="compact" />
            </div>

            {/* Product Description */}
            <div className="border rounded-xl p-6 space-y-3">
              <h3 className="font-bold text-xl flex items-center gap-2">
                <Package className="h-5 w-5" />
                Product Details
              </h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-semibold capitalize">{product.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Stock Status</p>
                  <p className="font-semibold text-green-600">In Stock</p>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="border-2 border-primary/20 rounded-xl p-6 bg-primary/5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Cash on Delivery Available</h4>
                  <p className="text-sm text-muted-foreground">
                    Pay when you receive. Free delivery all over Pakistan. 
                    No hidden charges.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Trust Badges */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Guarantee to You</h2>
          <TrustBadges variant="full" />
        </div>
      </div>
    </div>
  );
};

export default Product;
