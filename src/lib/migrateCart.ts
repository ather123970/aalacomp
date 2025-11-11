// Utility to migrate old cart data to fix missing images
export const migrateCartData = () => {
  try {
    const cartStr = localStorage.getItem('cart');
    if (!cartStr) return;

    const cart = JSON.parse(cartStr);
    let needsMigration = false;

    const migratedCart = cart.map((item: any) => {
      // Check if image_url is missing or broken
      if (!item.image_url || item.image_url === 'undefined') {
        needsMigration = true;
        return {
          ...item,
          image_url: '/placeholder.svg'
        };
      }
      return item;
    });

    // Only update if migration was needed
    if (needsMigration) {
      localStorage.setItem('cart', JSON.stringify(migratedCart));
      console.log('✅ Cart data migrated - fixed missing images');
      
      // Dispatch event to update UI
      window.dispatchEvent(new Event('cartUpdated'));
    }
  } catch (error) {
    console.error('Error migrating cart data:', error);
  }
};
