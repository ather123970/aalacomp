import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Eye, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  category: string;
  badges?: string[];
  discountPercentage?: number;
  stock: number;
  viewCount?: number;
  soldCount?: number;
}

export const ProductCard = ({
  id,
  name,
  price,
  compareAtPrice,
  image,
  badges = [],
  discountPercentage,
  stock,
  viewCount,
  soldCount,
}: ProductCardProps) => {
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    if (viewCount || soldCount) {
      setShowStats(true);
    }
  }, [viewCount, soldCount]);

  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {showStats && (
        <div className="absolute top-3 left-3 z-10 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border border-white/10">
          <Eye className="h-3 w-3" />
          <span>{viewCount || 0}</span>
          <span className="text-white/40">•</span>
          <ShoppingBag className="h-3 w-3" />
          <span>{soldCount || 0}</span>
          {stock < 30 && (
            <>
              <span className="text-white/40">•</span>
              <span className="text-sale animate-pulse">{stock} left</span>
            </>
          )}
        </div>
      )}

      <Link to={`/product/${id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-secondary to-secondary/70">
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10" />
          
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
          />
          
          {/* Shimmer effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
          
          {discountPercentage && discountPercentage > 0 && (
            <Badge className="absolute top-3 right-3 bg-sale text-sale-foreground animate-pulse-glow text-sm px-3 py-1.5 shadow-lg z-30">
              -{discountPercentage}%
            </Badge>
          )}
          {badges.length > 0 && (
            <div className="absolute bottom-3 left-3 flex gap-2 z-30">
              {badges.map((badge, i) => (
                <Badge key={i} className="bg-black/80 backdrop-blur-md text-white border border-white/20 text-xs">
                  {badge}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="font-bold text-xl mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {name}
          </h3>

          <div className="flex items-center gap-1.5 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm font-semibold text-foreground ml-1">4.5</span>
            <span className="text-xs text-muted-foreground">(128)</span>
          </div>

          <div className="mb-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold">PKR {price.toLocaleString()}</span>
              {compareAtPrice && compareAtPrice > price && (
                <span className="text-lg text-muted-foreground line-through">
                  PKR {compareAtPrice.toLocaleString()}
                </span>
              )}
            </div>
            {compareAtPrice && compareAtPrice > price && (
              <p className="text-sm text-green-600 font-semibold mt-1">
                Save PKR {(compareAtPrice - price).toLocaleString()}
              </p>
            )}
          </div>

          {stock < 10 && stock > 0 && (
            <div className="bg-sale/10 border border-sale/20 rounded-lg px-3 py-2 mb-3">
              <p className="text-sm text-sale font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sale animate-pulse" />
                Only {stock} left in stock!
              </p>
            </div>
          )}

          <Button className="w-full group-hover:bg-primary group-hover:scale-105 transition-all shadow-md" size="lg">
            View Details
          </Button>
        </div>
      </Link>
    </div>
  );
};
