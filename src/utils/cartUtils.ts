import { CartItemData, Product } from '@/models/interfaces';

// Function to add item to cart
export const addToCart = (cart: CartItemData[], product: Product): CartItemData[] => {
    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            quantity: updatedCart[existingItemIndex].quantity + 1,
        };
        return updatedCart;
    }
    return [...cart, { ...product, quantity: 1 }];
};

// Function to remove item from cart
export const removeFromCart = (cart: CartItemData[], id: number): CartItemData[] => {
    return cart.filter(item => item.id !== id);
};

// Function to update the quantity of an item in the cart
export const updateQuantity = (cart: CartItemData[], id: number, quantity: number): CartItemData[] => {
    return cart.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
};

// Function to calculate cart total
export const calculateTotal = (cart: CartItemData[]): number => {
    if (cart.length === 0) return 0;
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
};
