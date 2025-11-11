# 🛍️ Chronos - Premium Watch Store (Local Database Version)

> **A modern, fully-featured e-commerce store running entirely in your browser!**

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
http://localhost:5173
```

That's it! The app will automatically create 6 sample products on first load.

---

## ✨ Features

### 🎨 **Beautiful UI**
- Premium black & white theme
- Smooth animations and transitions
- Fully responsive (mobile, tablet, desktop)
- Modern card layouts with hover effects

### 🛒 **Complete Shopping Experience**
- Product listings with filtering
- Product detail pages with image galleries
- Shopping cart with quantity management
- Checkout with Cash on Delivery
- Smart product recommendations

### ⚡ **Urgency & Conversion**
- Live countdown timers
- Stock urgency indicators
- Real-time purchase notifications
- View count tracking
- Bundle deals section

### 🔐 **Admin Panel**
- Full product management
- Add/Edit products
- Inventory tracking
- Low stock alerts
- Sales statistics

---

## 📦 Included Products

The app comes pre-loaded with 6 premium watches:

1. Classic Chronograph Steel (PKR 92,000)
2. Elegant Rose Gold Ladies (PKR 45,000)
3. Modern Smart Watch Pro (PKR 35,000)
4. Premium Automatic Diver (PKR 125,000)
5. Vintage Leather Classic (PKR 28,000)
6. Sport Titanium Pro (PKR 68,000)

All with real images, descriptions, and realistic data!

---

## 🔑 Admin Access

**URL:** `http://localhost:5173/admin`

**Credentials:**
- Username: `admin`
- Password: `admin123`

---

## 🗄️ Database

**Type:** localStorage (browser-based)
**Location:** No external database needed!
**Data:** Stored in browser `localStorage['products']`

### View Your Database:
```javascript
// Open browser console (F12) and run:
JSON.parse(localStorage.getItem('products'))
```

### Reset Database:
```javascript
// In browser console:
localStorage.removeItem('products');
location.reload();
```

---

## 📱 Pages

- **Homepage** (`/`) - Featured products, hero section, deals
- **Product Detail** (`/product/:id`) - Full product information
- **Category** (`/category/:category`) - Filtered product listings
- **Cart** (`/cart`) - Shopping cart with recommendations
- **Checkout** (`/checkout`) - Order form and payment
- **Admin** (`/admin`) - Product management dashboard

---

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **React Query** - Data fetching
- **Lucide Icons** - Icons
- **localStorage** - Database

---

## 📚 Documentation

- `LOCAL_DATABASE_SETUP.md` - Complete database guide
- `CART_FIX_COMPLETE.md` - Cart system documentation
- `FIX_SUMMARY.md` - All bug fixes applied

---

## 🚀 Build for Production

```bash
npm run build
```

Output will be in `dist/` folder. Deploy to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting

---

## 💡 Tips

### Add New Products
1. Login to admin panel
2. Fill in product form
3. Use Unsplash URLs for images
4. Product appears immediately!

### Manage Cart
- Cart data stored in `localStorage['cart']`
- Persists across page refreshes
- Clear with: `localStorage.removeItem('cart')`

### Customize
- All products in `src/lib/localDb.ts`
- Modify sample products array
- Add your own product data

---

## 🎯 Perfect For

✅ Development and testing  
✅ Demos and presentations  
✅ Learning React/TypeScript  
✅ Building prototypes  
✅ Personal projects  

---

## 📞 Support

Check documentation:
- `LOCAL_DATABASE_SETUP.md` - Full setup guide
- `CART_FIX_COMPLETE.md` - Cart troubleshooting
- `FIX_SUMMARY.md` - All fixes applied

---

## 📄 License

This is a demo project. Feel free to use and modify!

---

## 🎉 Enjoy Your Store!

Your watch store is ready to go. No database setup, no API keys, no hassle!

**Happy selling! 🚀**
