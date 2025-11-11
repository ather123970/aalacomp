import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrustBadges } from "@/components/TrustBadges";
import { Minus, Plus, Trash2, ShieldCheck, Truck, Zap, TrendingUp, Gift, Lock, CreditCard, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
  images?: string[];
  category?: string;
}

interface RecommendedProduct {
  id: string;
  name: string;
  price: number;
  compare_at_price?: number;
  discount_percentage: number;
  image_url?: string;
  images?: string[];
  category?: string;
}

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<RecommendedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // Load cart from localStorage and fetch product details
  useEffect(() => {
    loadCart();
  }, []);

  // Load recommendations when cart changes
  useEffect(() => {
    if (cartItems.length > 0) {
      loadSmartRecommendations();
    }
  }, [cartItems.length]);

  const loadCart = async () => {
    try {
      const cart = localStorage.getItem("cart");
      if (cart) {
        const cartData = JSON.parse(cart);
        
        // Fetch full product details from Supabase
        const productIds = cartData.map((item: any) => item.id);
        const { data: products } = await supabase
          .from('products')
          .select('*')
          .in('id', productIds);
        
        if (products) {
          const enrichedCart = cartData.map((cartItem: any) => {
            const product = products.find(p => p.id === cartItem.id);
            return {
              ...cartItem,
              name: product?.name || cartItem.name,
              price: product?.price || cartItem.price,
              image_url: product?.image_url,
              images: product?.images,
              category: product?.category,
            };
          });
          setCartItems(enrichedCart);
        } else {
          setCartItems(cartData);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Error loading cart:", error);
      setLoading(false);
    }
  };

  const loadSmartRecommendations = async () => {
    try {
      // Get categories from cart
      const cartCategories = cartItems.map(item => item.category).filter(Boolean);
      const cartProductIds = cartItems.map(item => item.id);
      
      // Calculate total cart value for smart discounting
      const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      // Fetch recommended products
      let query = supabase
        .from('products')
        .select('*')
        .not('id', 'in', `(${cartProductIds.join(',')})`)
        .limit(6);
      
      // Prioritize same categories if available
      if (cartCategories.length > 0) {
        query = query.in('category', cartCategories);
      }
      
      const { data: products } = await query;
      
      if (products && products.length > 0) {
        // Sort by price and apply smart discounting
        const sortedProducts = products.sort((a, b) => b.price - a.price);
        
        const recommendations: RecommendedProduct[] = sortedProducts.map((product, index) => {
          // Higher price products get more discount (1-10%)
          // Lower price products get bigger relative discount (50-80% less than cart avg)
          const avgCartPrice = cartTotal / cartItems.reduce((sum, item) => sum + item.quantity, 0);
          const priceRatio = product.price / avgCartPrice;
          
          let discountPercent = 0;
          if (priceRatio > 0.8) {
            // Similar or higher price: 5-10% discount
            discountPercent = Math.min(10, Math.max(5, Math.round(product.price / 10000)));
          } else {
            // Much lower price: already 50-80% less, add 5% extra
            discountPercent = 5;
          }
          
          return {
            ...product,
            discount_percentage: discountPercent,
          };
        });
        
        setRecommendedProducts(recommendations);
      }
    } catch (error) {
      console.error("Error loading recommendations:", error);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const addToCart = (product: RecommendedProduct) => {
    const discountedPrice = Math.round(product.price * (1 - product.discount_percentage / 100));
    const newItem: CartItem = {
      id: product.id,
      name: product.name,
      price: discountedPrice,
      quantity: 1,
      image_url: product.image_url,
      images: product.images,
      category: product.category,
    };
    
    const updatedCart = [...cartItems, newItem];
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
    
    // Remove from recommendations
    setRecommendedProducts(recommendedProducts.filter(p => p.id !== product.id));
  };

  const getProductImage = (item: CartItem | RecommendedProduct) => {
    if (item.images && item.images.length > 0) return item.images[0];
    if (item.image_url) return item.image_url;
    return "/placeholder.svg";
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-secondary rounded w-48"></div>
            <div className="h-64 bg-secondary rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-24 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Start adding some amazing watches to your collection!
            </p>
            <Button size="lg" onClick={() => navigate("/")}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold">Shopping Cart</h1>
          <Badge variant="secondary" className="text-base md:text-lg px-4 py-2">
            {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="p-4 md:p-6">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <Link to={`/product/${item.id}`} className="flex-shrink-0">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-secondary rounded-lg overflow-hidden">
                      <img
                        src={getProductImage(item)}
                        alt={item.name}
                        className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                    </div>
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-bold text-lg md:text-xl mb-2 hover:text-primary transition-colors line-clamp-2">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-2xl md:text-3xl font-bold mb-4">
                      PKR {(item.price * item.quantity).toLocaleString()}
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="h-8 w-8"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-bold text-lg min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="h-8 w-8"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Right: Order Summary */}
          <div className="space-y-6">
            <Card className="p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-lg">
                  <span>Subtotal</span>
                  <span className="font-semibold">PKR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
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

              <TrustBadges />
            </Card>
          </div>
        </div>

        {/* Complete Your Collection Section */}
        {recommendedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold">Complete Your Collection</h2>
                <p className="text-muted-foreground">Exclusive deals just for you</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedProducts.map((product) => {
                const discountedPrice = Math.round(product.price * (1 - product.discount_percentage / 100));
                const savings = product.price - discountedPrice;
                
                return (
                  <Card key={product.id} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <Link to={`/product/${product.id}`}>
                      <div className="relative aspect-square bg-gradient-to-br from-secondary to-secondary/70 overflow-hidden">
                        <img
                          src={getProductImage(product)}
                          alt={product.name}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                        <Badge className="absolute top-3 right-3 bg-sale text-white animate-pulse-glow text-sm px-3 py-1.5">
                          -{product.discount_percentage}% OFF
                        </Badge>
                      </div>
                    </Link>

                    <div className="p-4">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-2xl font-bold">PKR {discountedPrice.toLocaleString()}</span>
                        <span className="text-sm text-muted-foreground line-through">
                          PKR {product.price.toLocaleString()}
                        </span>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 mb-3">
                        <p className="text-sm text-green-800 font-semibold flex items-center gap-1">
                          <TrendingUp className="h-4 w-4" />
                          Save PKR {savings.toLocaleString()}!
                        </p>
                      </div>

                      <Button
                        className="w-full"
                        onClick={() => addToCart(product)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
