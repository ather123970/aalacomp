import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllProducts, createProduct, updateProduct, deleteProduct, type Product } from "@/lib/localDb";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { Plus, Package, DollarSign, TrendingUp, Edit, Trash2, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const AdminDashboard = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    compare_at_price: "",
    discount_percentage: "",
    category: "mens" as const,
    stock: "",
    images: "",
  });

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    price: "",
    compare_at_price: "",
    discount_percentage: "",
    category: "mens" as const,
    stock: "",
    images: "",
  });

  const { data: products, refetch } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      return await getAllProducts();
    },
  });

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const images = newProduct.images.split(",").map(url => url.trim());
      await createProduct({
        name: newProduct.name,
        description: newProduct.description,
        price: parseFloat(newProduct.price),
        compare_at_price: newProduct.compare_at_price ? parseFloat(newProduct.compare_at_price) : null,
        discount_percentage: newProduct.discount_percentage ? parseInt(newProduct.discount_percentage) : 0,
        category: newProduct.category,
        stock: parseInt(newProduct.stock),
        images: images,
        image_url: images[0] || '',
        is_featured: true,
        is_on_sale: true,
        sale_end_date: null,
        badges: [],
        view_count: 0,
        sold_count: 0,
      });

      toast.success("Product added successfully!");
      refetch();
      setNewProduct({ name: "", description: "", price: "", compare_at_price: "", discount_percentage: "", category: "mens", stock: "", images: "" });
    } catch (error) {
      toast.error("Failed to add product");
      console.error(error);
    }
  };

  const handleEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const images = editForm.images.split(",").map(url => url.trim());
      await updateProduct(editingProduct.id, {
        name: editForm.name,
        description: editForm.description,
        price: parseFloat(editForm.price),
        compare_at_price: editForm.compare_at_price ? parseFloat(editForm.compare_at_price) : null,
        discount_percentage: editForm.discount_percentage ? parseInt(editForm.discount_percentage) : 0,
        category: editForm.category,
        stock: parseInt(editForm.stock),
        images: images,
        image_url: images[0] || '',
      });

      toast.success("Product updated successfully!");
      refetch();
      setEditingProduct(null);
    } catch (error) {
      toast.error("Failed to update product");
      console.error(error);
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully!");
      refetch();
    } catch (error) {
      toast.error("Failed to delete product");
      console.error(error);
    }
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      compare_at_price: product.compare_at_price?.toString() || '',
      discount_percentage: product.discount_percentage?.toString() || '',
      category: product.category as any,
      stock: product.stock.toString(),
      images: product.images.join(', '),
    });
  };

  const totalProducts = products?.length || 0;
  const totalValue = products?.reduce((sum, p) => sum + p.price * p.stock, 0) || 0;
  const lowStock = products?.filter(p => p.stock < 10).length || 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Total Products</p>
                <p className="text-3xl font-bold">{totalProducts}</p>
              </div>
              <Package className="h-12 w-12 text-primary" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Total Value</p>
                <p className="text-3xl font-bold">PKR {(totalValue / 1000).toFixed(0)}k</p>
              </div>
              <DollarSign className="h-12 w-12 text-primary" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Low Stock</p>
                <p className="text-3xl font-bold text-sale">{lowStock}</p>
              </div>
              <TrendingUp className="h-12 w-12 text-sale" />
            </div>
          </Card>
        </div>

        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Plus className="h-6 w-6" /> Add New Product
          </h2>
          <form onSubmit={handleAddProduct} className="grid md:grid-cols-2 gap-4">
            <Input placeholder="Product Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} required />
            <Input placeholder="Price (PKR)" type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} required />
            <Input placeholder="Compare Price" type="number" value={newProduct.compare_at_price} onChange={(e) => setNewProduct({ ...newProduct, compare_at_price: e.target.value })} />
            <Input placeholder="Discount %" type="number" value={newProduct.discount_percentage} onChange={(e) => setNewProduct({ ...newProduct, discount_percentage: e.target.value })} />
            <Input placeholder="Stock" type="number" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} required />
            <Select value={newProduct.category} onValueChange={(value: any) => setNewProduct({ ...newProduct, category: value })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="mens">Men's</SelectItem>
                <SelectItem value="womens">Women's</SelectItem>
                <SelectItem value="smart">Smart</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="bestseller">Best Seller</SelectItem>
              </SelectContent>
            </Select>
            <Textarea placeholder="Description" className="md:col-span-2" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} required />
            <Input placeholder="Image URLs (comma-separated)" className="md:col-span-2" value={newProduct.images} onChange={(e) => setNewProduct({ ...newProduct, images: e.target.value })} required />
            <Button type="submit" className="md:col-span-2">Add Product</Button>
          </form>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">All Products ({totalProducts})</h2>
          <div className="space-y-2">
            {products?.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-muted-foreground">PKR {product.price.toLocaleString()} • Stock: {product.stock} • Category: {product.category}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Dialog open={editingProduct?.id === product.id} onOpenChange={(open) => !open && setEditingProduct(null)}>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" onClick={() => openEditDialog(product)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleEditProduct} className="grid md:grid-cols-2 gap-4 mt-4">
                        <Input placeholder="Product Name" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} required />
                        <Input placeholder="Price (PKR)" type="number" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} required />
                        <Input placeholder="Compare Price" type="number" value={editForm.compare_at_price} onChange={(e) => setEditForm({ ...editForm, compare_at_price: e.target.value })} />
                        <Input placeholder="Discount %" type="number" value={editForm.discount_percentage} onChange={(e) => setEditForm({ ...editForm, discount_percentage: e.target.value })} />
                        <Input placeholder="Stock" type="number" value={editForm.stock} onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })} required />
                        <Select value={editForm.category} onValueChange={(value: any) => setEditForm({ ...editForm, category: value })}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mens">Men's</SelectItem>
                            <SelectItem value="womens">Women's</SelectItem>
                            <SelectItem value="smart">Smart</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                            <SelectItem value="bestseller">Best Seller</SelectItem>
                          </SelectContent>
                        </Select>
                        <Textarea placeholder="Description" className="md:col-span-2" value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} required />
                        <Input placeholder="Image URLs (comma-separated)" className="md:col-span-2" value={editForm.images} onChange={(e) => setEditForm({ ...editForm, images: e.target.value })} required />
                        <div className="md:col-span-2 flex gap-2">
                          <Button type="submit" className="flex-1">Update Product</Button>
                          <Button type="button" variant="outline" onClick={() => setEditingProduct(null)}>Cancel</Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteProduct(product.id, product.name)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
