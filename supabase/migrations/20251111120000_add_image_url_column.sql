-- Add image_url column as a generated column that returns the first image from images array
-- This provides backward compatibility with code expecting image_url

ALTER TABLE public.products 
ADD COLUMN image_url TEXT GENERATED ALWAYS AS (
  CASE 
    WHEN array_length(images, 1) > 0 THEN images[1]
    ELSE NULL
  END
) STORED; 

-- Add some sample product data if table is empty
INSERT INTO public.products (
  name, 
  description, 
  price, 
  compare_at_price, 
  discount_percentage,
  images, 
  category, 
  stock, 
  is_featured, 
  badges,
  view_count,
  sold_count
) VALUES 
(
  'Classic Chronograph Steel',
  'Swiss-made precision timepiece featuring a stainless steel case, sapphire crystal, and automatic movement. Water resistant to 100m.',
  92000,
  115000,
  20,
  ARRAY['https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800'],
  'mens',
  51,
  true,
  ARRAY['BEST SELLER', 'HOT'],
  24,
  8
),
(
  'Elegant Rose Gold Ladies',
  'Sophisticated ladies watch with rose gold plating, mother-of-pearl dial, and Japanese quartz movement. Perfect for any occasion.',
  45000,
  60000,
  25,
  ARRAY['https://images.unsplash.com/photo-1594534475808-b18fc7fcc2f8?w=800'],
  'womens',
  38,
  true,
  ARRAY['LIMITED', 'SALE'],
  18,
  12
),
(
  'Modern Smart Watch Pro',
  'Advanced fitness tracker with heart rate monitor, GPS, sleep tracking, and 7-day battery life. Compatible with iOS and Android.',
  35000,
  50000,
  30,
  ARRAY['https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800'],
  'smart',
  84,
  true,
  ARRAY['NEW', 'TRENDING'],
  43,
  24
),
(
  'Premium Automatic Diver',
  'Professional diving watch with 300m water resistance, luminous markers, and ceramic bezel. Automatic self-winding movement.',
  125000,
  150000,
  17,
  ARRAY['https://images.unsplash.com/photo-1606390291165-a60d9a449b3f?w=800'],
  'premium',
  12,
  true,
  ARRAY['PREMIUM', 'LIMITED'],
  67,
  5
),
(
  'Vintage Leather Classic',
  'Timeless design with genuine leather strap, minimalist dial, and reliable quartz movement. A perfect everyday watch.',
  28000,
  35000,
  20,
  ARRAY['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800'],
  'mens',
  45,
  true,
  ARRAY['BESTSELLER'],
  89,
  34
),
(
  'Sport Titanium Pro',
  'Ultra-lightweight titanium case with scratch-resistant sapphire crystal. Built for athletes and outdoor enthusiasts.',
  68000,
  85000,
  20,
  ARRAY['https://images.unsplash.com/photo-1587836374624-24d3aa0b66f6?w=800'],
  'premium',
  28,
  true,
  ARRAY['HOT', 'SPORT'],
  56,
  18
)
ON CONFLICT (id) DO NOTHING;
