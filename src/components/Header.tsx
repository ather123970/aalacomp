import { Link } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId") || crypto.randomUUID();
    localStorage.setItem("sessionId", sessionId);
    
    // Load cart count from localStorage
    const updateCartCount = () => {
      const cart = localStorage.getItem("cart");
      if (cart) {
        try {
          const cartItems = JSON.parse(cart);
          const totalItems = cartItems.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
          setCartCount(totalItems);
        } catch (e) {
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
    };
    
    updateCartCount();
    
    // Listen for cart updates
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  return (
    <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
              Chronos
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-semibold hover:text-primary transition-colors relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all" />
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-semibold hover:text-primary transition-colors">
                Watches
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background/95 backdrop-blur-xl border-border/50">
                <DropdownMenuItem asChild>
                  <Link to="/category/mens" className="font-medium">Men's Watches</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/womens" className="font-medium">Women's Watches</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/smart" className="font-medium">Smart Watches</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/bestseller" className="font-medium">Best Sellers</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/category/premium" className="text-sm font-semibold hover:text-primary transition-colors relative group">
              Premium
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all" />
            </Link>
            <Link to="/about" className="text-sm font-semibold hover:text-primary transition-colors relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all" />
            </Link>
            <Link to="/contact" className="text-sm font-semibold hover:text-primary transition-colors relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all" />
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/cart" className="hidden md:block">
              <Button variant="ghost" size="icon" className="relative hover:bg-primary/5 rounded-full">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-sale text-white text-xs font-bold flex items-center justify-center animate-pulse shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/admin" className="hidden md:block">
              <Button variant="ghost" size="icon" className="hover:bg-primary/5 rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            
            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="hover:bg-primary/5 rounded-full">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-6 mt-8">
                  <Link 
                    to="/" 
                    className="text-lg font-semibold hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-muted-foreground">WATCHES</p>
                    <Link 
                      to="/category/mens" 
                      className="block text-lg hover:text-primary transition-colors pl-4"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Men's Watches
                    </Link>
                    <Link 
                      to="/category/womens" 
                      className="block text-lg hover:text-primary transition-colors pl-4"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Women's Watches
                    </Link>
                    <Link 
                      to="/category/smart" 
                      className="block text-lg hover:text-primary transition-colors pl-4"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Smart Watches
                    </Link>
                    <Link 
                      to="/category/bestseller" 
                      className="block text-lg hover:text-primary transition-colors pl-4"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Best Sellers
                    </Link>
                  </div>
                  
                  <Link 
                    to="/category/premium" 
                    className="text-lg font-semibold hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Premium
                  </Link>
                  
                  <Link 
                    to="/about" 
                    className="text-lg font-semibold hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  
                  <Link 
                    to="/contact" 
                    className="text-lg font-semibold hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                  
                  <div className="border-t pt-6 mt-6 space-y-4">
                    <Link 
                      to="/cart" 
                      className="flex items-center gap-3 text-lg font-semibold hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      Cart {cartCount > 0 && `(${cartCount})`}
                    </Link>
                    
                    <Link 
                      to="/admin" 
                      className="flex items-center gap-3 text-lg font-semibold hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      Admin
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
