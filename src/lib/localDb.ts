// Local Database System - No Supabase Required
// All data stored in localStorage

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  compare_at_price: number | null;
  discount_percentage: number | null;
  images: string[];
  image_url: string;
  category: 'mens' | 'womens' | 'smart' | 'premium' | 'bestseller';
  stock: number;
  is_on_sale: boolean;
  sale_end_date: string | null;
  badges: string[];
  view_count: number;
  sold_count: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

// Initialize database with sample products
export const initializeDatabase = () => {
  const existingProducts = localStorage.getItem('products');
  
  if (!existingProducts) {
    const sampleProducts: Product[] = [
      {
        id: '1',
        name: 'Classic Chronograph Steel',
        description: 'Swiss-made precision timepiece featuring a stainless steel case, sapphire crystal, and automatic movement. Water resistant to 100m. Perfect for the modern gentleman who appreciates classic design.',
        price: 92000,
        compare_at_price: 115000,
        discount_percentage: 20,
        images: ['https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800'],
        image_url: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800',
        category: 'mens',
        stock: 51,
        is_on_sale: true,
        sale_end_date: null,
        badges: ['BEST SELLER', 'HOT'],
        view_count: 1247,
        sold_count: 89,
        is_featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Elegant Rose Gold Ladies',
        description: 'Sophisticated ladies watch with rose gold plating, mother-of-pearl dial, and Japanese quartz movement. Perfect for any occasion - from office meetings to elegant dinners.',
        price: 45000,
        compare_at_price: 60000,
        discount_percentage: 25,
        images: ['https://images.unsplash.com/photo-1594534475808-b18fc7fcc2f8?w=800'],
        image_url: 'https://images.unsplash.com/photo-1594534475808-b18fc7fcc2f8?w=800',
        category: 'womens',
        stock: 38,
        is_on_sale: true,
        sale_end_date: null,
        badges: ['LIMITED', 'SALE'],
        view_count: 892,
        sold_count: 67,
        is_featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Modern Smart Watch Pro',
        description: 'Advanced fitness tracker with heart rate monitor, GPS, sleep tracking, and 7-day battery life. Compatible with iOS and Android. Your perfect health companion.',
        price: 35000,
        compare_at_price: 50000,
        discount_percentage: 30,
        images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800'],
        image_url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800',
        category: 'smart',
        stock: 84,
        is_on_sale: true,
        sale_end_date: null,
        badges: ['NEW', 'TRENDING'],
        view_count: 2143,
        sold_count: 156,
        is_featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '4',
        name: 'Premium Automatic Diver',
        description: 'Professional diving watch with 300m water resistance, luminous markers, and ceramic bezel. Automatic self-winding movement with 48-hour power reserve.',
        price: 125000,
        compare_at_price: 150000,
        discount_percentage: 17,
        images: ['https://images.unsplash.com/photo-1606390291165-a60d9a449b3f?w=800'],
        image_url: 'https://images.unsplash.com/photo-1606390291165-a60d9a449b3f?w=800',
        category: 'premium',
        stock: 12,
        is_on_sale: true,
        sale_end_date: null,
        badges: ['PREMIUM', 'LIMITED'],
        view_count: 1567,
        sold_count: 23,
        is_featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '5',
        name: 'Vintage Leather Classic',
        description: 'Timeless design with genuine leather strap, minimalist dial, and reliable quartz movement. A perfect everyday watch that complements any style.',
        price: 28000,
        compare_at_price: 35000,
        discount_percentage: 20,
        images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800'],
        image_url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800',
        category: 'mens',
        stock: 45,
        is_on_sale: true,
        sale_end_date: null,
        badges: ['BESTSELLER'],
        view_count: 2891,
        sold_count: 178,
        is_featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '6',
        name: 'Sport Titanium Pro',
        description: 'Ultra-lightweight titanium case with scratch-resistant sapphire crystal. Built for athletes and outdoor enthusiasts with shock resistance and 200m water resistance.',
        price: 68000,
        compare_at_price: 85000,
        discount_percentage: 20,
        images: ['https://images.unsplash.com/photo-1587836374624-24d3aa0b66f6?w=800'],
        image_url: 'https://images.unsplash.com/photo-1587836374624-24d3aa0b66f6?w=800',
        category: 'premium',
        stock: 28,
        is_on_sale: true,
        sale_end_date: null,
        badges: ['HOT', 'SPORT'],
        view_count: 1834,
        sold_count: 94,
        is_featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    localStorage.setItem('products', JSON.stringify(sampleProducts));
    console.log('✅ Local database initialized with sample products');
  }
};

// CRUD Operations for Products

export const getAllProducts = async (): Promise<Product[]> => {
  const products = localStorage.getItem('products');
  return products ? JSON.parse(products) : [];
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const products = await getAllProducts();
  return products.find(p => p.id === id) || null;
};

export const getFeaturedProducts = async (limit?: number): Promise<Product[]> => {
  const products = await getAllProducts();
  const featured = products.filter(p => p.is_featured);
  return limit ? featured.slice(0, limit) : featured;
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const products = await getAllProducts();
  return products.filter(p => p.category === category);
};

export const updateProductViewCount = async (id: string): Promise<void> => {
  const products = await getAllProducts();
  const product = products.find(p => p.id === id);
  
  if (product) {
    product.view_count += 1;
    localStorage.setItem('products', JSON.stringify(products));
  }
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  const products = await getAllProducts();
  const lowerQuery = query.toLowerCase();
  
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery)
  );
};

export const createProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> => {
  const products = await getAllProducts();
  
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  products.push(newProduct);
  localStorage.setItem('products', JSON.stringify(products));
  
  return newProduct;
};

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product | null> => {
  const products = await getAllProducts();
  const index = products.findIndex(p => p.id === id);
  
  if (index === -1) return null;
  
  products[index] = {
    ...products[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  
  localStorage.setItem('products', JSON.stringify(products));
  return products[index];
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  const products = await getAllProducts();
  const filtered = products.filter(p => p.id !== id);
  
  if (filtered.length === products.length) return false;
  
  localStorage.setItem('products', JSON.stringify(filtered));
  return true;
};

// Admin authentication (simple local auth)
export const adminLogin = (username: string, password: string): boolean => {
  return username === 'admin' && password === 'admin123';
};

// Initialize on first load
if (typeof window !== 'undefined') {
  initializeDatabase();
}
