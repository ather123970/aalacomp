export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
  category: string;
  compare_at_price?: number;
}

// Get all cart items from localStorage
export const getCartItems = (): CartItem[] => {
  try {
    const cart = localStorage.getItem('cart');
    if (cart) {
      return JSON.parse(cart);
    }
    return [];
  } catch (error) {
    console.error('Error loading cart:', error);
    return [];
  }
};

// Add item to cart
export const addToCart = (product: {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category: string;
  compare_at_price?: number;
}): void => {
  try {
    const cartItems = getCartItems();
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Dispatch custom event to update cart count
    window.dispatchEvent(new Event('cartUpdated'));
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};

// Update item quantity
export const updateCartItemQuantity = (productId: string, quantity: number): void => {
  try {
    const cartItems = getCartItems();
    const item = cartItems.find(item => item.id === productId);

    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId);
      } else {
        item.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cartItems));
        window.dispatchEvent(new Event('cartUpdated'));
      }
    }
  } catch (error) {
    console.error('Error updating cart:', error);
  }
};

// Remove item from cart
export const removeFromCart = (productId: string): void => {
  try {
    const cartItems = getCartItems();
    const updatedCart = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  } catch (error) {
    console.error('Error removing from cart:', error);
  }
};

// Clear entire cart
export const clearCart = (): void => {
  localStorage.removeItem('cart');
  window.dispatchEvent(new Event('cartUpdated'));
};

// Get cart total
export const getCartTotal = (): number => {
  const cartItems = getCartItems();
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Get cart count
export const getCartCount = (): number => {
  const cartItems = getCartItems();
  return cartItems.reduce((count, item) => count + item.quantity, 0);
};
