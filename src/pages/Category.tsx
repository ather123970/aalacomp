import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getProductsByCategory } from "@/lib/localDb";

const Category = () => {
  const { category } = useParams<{ category: string }>();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      if (!category) return [];
      return await getProductsByCategory(category);
    },
  });

  const categoryTitles: Record<string, string> = {
    mens: "Men's Watches",
    womens: "Women's Watches",
    smart: "Smart Watches",
    premium: "Premium Collection",
    bestseller: "Best Sellers",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">
          {categoryTitles[category || ""] || "Products"}
        </h1>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-96 bg-secondary rounded-lg animate-pulse" />
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                compareAtPrice={product.compare_at_price || undefined}
                image={product.images[0]}
                category={product.category}
                badges={product.badges}
                discountPercentage={product.discount_percentage}
                stock={product.stock}
                viewCount={product.view_count}
                soldCount={product.sold_count}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No products found in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
