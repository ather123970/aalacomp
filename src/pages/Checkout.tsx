import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Truck, CreditCard, Smartphone, CheckCircle2, Package, MapPin, User, Mail, Phone } from "lucide-react";
import emailjs from '@emailjs/browser';
import { getCartItems, type CartItem } from "@/lib/cartUtils";
import { migrateCartData } from "@/lib/migrateCart";

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });

  useEffect(() => {
    // Migrate old cart data to fix missing images
    migrateCartData();
    
    // Load real cart from localStorage
    const items = getCartItems();
    setCartItems(items);

    // Redirect if cart is empty
    if (items.length === 0) {
      navigate('/cart');
    }

    // Initialize EmailJS (keys will be added to .env later)
    // emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, [navigate]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    // Validate form
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);

    const orderDetails = {
      orderNumber: `CHR-${Date.now()}`,
      customerName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: `${formData.address}, ${formData.city}`,
      items: cartItems.map(item => `${item.name} x${item.quantity} - PKR ${item.price.toLocaleString()}`).join('\n'),
      subtotal: `PKR ${subtotal.toLocaleString()}`,
      shipping: 'Free',
      total: `PKR ${total.toLocaleString()}`,
      paymentMethod: paymentMethod === "cod" ? "Cash on Delivery" : "Send Payment (Easypaisa)",
      notes: formData.notes || "N/A",
      date: new Date().toLocaleString(),
    };

    if (paymentMethod === "cod") {
      // Send email via EmailJS
      try {
        // Template will be configured later
        /*
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          orderDetails,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
        */
        
        // For now, log the order
        console.log("Order Details:", orderDetails);
        
        setOrderPlaced(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error) {
        console.error("Error sending email:", error);
        alert("Order placed but email notification failed. We'll contact you soon!");
      }
    } else {
      // Redirect to WhatsApp
      const whatsappNumber = "+923446942266";
      const message = `*New Order - ${orderDetails.orderNumber}*\n\n` +
        `*Customer Details:*\n` +
        `Name: ${formData.fullName}\n` +
        `Phone: ${formData.phone}\n` +
        `Address: ${orderDetails.address}\n\n` +
        `*Order Items:*\n${orderDetails.items}\n\n` +
        `*Total: ${orderDetails.total}*\n\n` +
        `_Sending payment to your Easypaisa number_`;
      
      const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }

    setLoading(false);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <Card className="p-12 max-w-md text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle2 className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Order Placed!</h2>
          <p className="text-muted-foreground mb-6">
            Thank you for your order. We'll contact you shortly to confirm delivery details.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-green-800">
              You'll receive a confirmation email soon
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Checkout</h1>
          <p className="text-muted-foreground text-lg">Complete your order securely</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Customer Information</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+92 300 1234567"
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="email">Email Address (Optional)</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="mt-1"
                  />
                </div>
              </div>
            </Card>

            {/* Delivery Address */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Delivery Address</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Complete Address *</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="House/Flat no, Street, Area"
                    rows={3}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Karachi, Lahore, Islamabad, etc."
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Order Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any special instructions for delivery"
                    rows={2}
                    className="mt-1"
                  />
                </div>
              </div>
            </Card>

            {/* Payment Method */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Payment Method</h2>
              </div>

              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                {/* Cash on Delivery */}
                <div className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === "cod" ? "border-primary bg-primary/5" : "border-border"}`}>
                  <div className="flex items-start gap-4">
                    <RadioGroupItem value="cod" id="cod" className="mt-1" />
                    <label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="h-5 w-5" />
                        <span className="font-bold text-lg">Cash on Delivery</span>
                        <Badge className="bg-green-500 text-white">Recommended</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Pay when you receive your order. No advance payment required.
                      </p>
                    </label>
                  </div>
                </div>

                {/* Send Payment */}
                <div className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === "payment" ? "border-primary bg-primary/5" : "border-border"}`}>
                  <div className="flex items-start gap-4">
                    <RadioGroupItem value="payment" id="payment" className="mt-1" />
                    <label htmlFor="payment" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2 mb-2">
                        <Smartphone className="h-5 w-5" />
                        <span className="font-bold text-lg">Send Payment</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Send payment to our Easypaisa number via WhatsApp
                      </p>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-xs font-semibold text-yellow-800">
                          📱 Easypaisa: +92 344 6942266
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </RadioGroup>
            </Card>
          </div>

          {/* Right: Order Summary */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b">
                    <div className="w-16 h-16 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image_url || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold line-clamp-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="font-bold">PKR {item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
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
                  <span className="text-green-600 font-bold">FREE</span>
                </div>
                <div className="border-t-2 pt-3 flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">PKR {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <Button 
                size="lg" 
                className="w-full text-lg py-6 mb-4" 
                onClick={handlePlaceOrder}
                disabled={loading}
              >
                {loading ? "Processing..." : paymentMethod === "cod" ? "Place Order" : "Continue to WhatsApp"}
              </Button>

              {/* Trust Badges */}
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
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>30-Day Money Back Guarantee</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
