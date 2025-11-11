import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2, ShieldCheck, Truck, Zap, TrendingUp, Gift, Lock, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAllProducts } from "@/lib/localDb";
import { getCartItems, updateCartItemQuantity, removeFromCart, type CartItem } from "@/lib/cartUtils";
import { migrateCartData } from "@/lib/migrateCart";
import { toast } from "sonner";

interface RecommendedProduct {
  id: string;
  name: string;
  price: number;
  compare_at_price: number;
  discount_percentage: number;
  image_url: string;
  category: string;
}

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<RecommendedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Migrate old cart data to fix missing images
    migrateCartData();
    loadCart();
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      loadSmartRecommendations();
    }
  }, [cartItems]);

  const loadCart = () => {
    const items = getCartItems();
    setCartItems(items);
    setLoading(false);
  };

  const loadSmartRecommendations = async () => {
    if (cartItems.length === 0) return;

    try {
      // Get cart categories and price range
      const cartCategories = [...new Set(cartItems.map(item => item.category).filter(Boolean))];
      const maxPrice = Math.max(...cartItems.map(item => item.price));
      const minPrice = Math.min(...cartItems.map(item => item.price));

      // Get products from local database
      const allProducts = await getAllProducts();
      
      // Filter out cart items and products without images
      let products = allProducts.filter(p => 
        !cartItems.some(item => item.id === p.id) && 
        p.image_url
      );
      
      // Filter by categories if available
      if (cartCategories.length > 0) {
        products = products.filter(p => cartCategories.includes(p.category));
      }

      if (products && products.length > 0) {
        // Filter products that are 50-70% lower in price than cart items
        const recommendations: RecommendedProduct[] = products
          .filter((product: any) => {
            // Product should be 30-50% of the max price (which means 50-70% lower)
            return product.price >= maxPrice * 0.30 && product.price <= maxPrice * 0.50;
          })
          .map((product: any) => {
            // Calculate bundle discount: 1-10% based on price
            // Higher price in this range gets more discount
            const priceRatio = product.price / (maxPrice * 0.50); // 0 to 1 ratio
            const discountPercent = Math.ceil(priceRatio * 10); // 1-10%

            const originalPrice = product.price;
            const discountedPrice = Math.round(originalPrice * (1 - discountPercent / 100));

            return {
              id: product.id,
              name: product.name,
              price: discountedPrice,
              compare_at_price: originalPrice,
              discount_percentage: discountPercent,
              image_url: product.image_url || "/placeholder.svg",
              category: product.category,
            };
          })
          .filter(p => p.discount_percentage > 0)
          .sort((a, b) => b.discount_percentage - a.discount_percentage)
          .slice(0, 4);

        setRecommendedProducts(recommendations);
      }
    } catch (error) {
      console.error('Error loading recommendations:', error);
    }
  };

  const handleQuantityChange = (productId: string, change: number) => {
    const item = cartItems.find(i => i.id === productId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        updateCartItemQuantity(productId, newQuantity);
        loadCart();
      }
    }
  };

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
    loadCart();
    toast.success("Item removed from cart");
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0; // Free shipping

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <Card className="p-12 text-center max-w-md mx-auto">
            <Gift className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add some amazing watches to get started!</p>
            <Button onClick={() => navigate('/')} size="lg">
              Start Shopping
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="p-4 md:p-6">
                <div className="flex gap-4">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image_url || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-bold text-lg line-clamp-1 hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-2xl font-bold mt-2">PKR {item.price.toLocaleString()}</p>

                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2 border rounded-lg">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-semibold w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemove(item.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-xl">
                      PKR {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-lg">
                  <span>Subtotal</span>
                  <span className="font-semibold">PKR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    Shipping
                  </span>
                  <span className="text-green-600 font-bold flex items-center gap-1">
                    <Zap className="h-4 w-4" />
                    FREE
                  </span>
                </div>
                <div className="border-t-2 pt-4 flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">PKR {subtotal.toLocaleString()}</span>
                </div>
              </div>

              <Button size="lg" className="w-full mb-4 text-lg py-6" onClick={() => navigate('/checkout')}>
                <Lock className="mr-2 h-5 w-5" />
                Proceed to Checkout
              </Button>

              {/* Payment method info */}
              <div className="bg-primary/5 rounded-lg p-4 mb-4 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Cash on Delivery</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Pay when you receive your order
                </p>
              </div>

              {/* Trust indicators */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  <span>100% Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Truck className="h-4 w-4 text-green-600" />
                  <span>Free Nationwide Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span>30-Day Money Back</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Complete Your Collection */}
        {recommendedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-6">
              <Gift className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Complete Your Collection</h2>
            </div>
            <p className="text-muted-foreground mb-8">
              Add these complementary watches to your order and save big!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((product) => (
                <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all">
                  <Link to={`/product/${product.id}`}>
                    <div className="aspect-square bg-secondary overflow-hidden relative">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                      <Badge className="absolute top-3 right-3 bg-sale text-sale-foreground animate-pulse">
                        -{product.discount_percentage}% OFF
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-xl font-bold">PKR {product.price.toLocaleString()}</span>
                        <span className="text-sm text-muted-foreground line-through">
                          PKR {product.compare_at_price.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-green-600 font-semibold">
                        Save PKR {(product.compare_at_price - product.price).toLocaleString()}
                      </p>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
