'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import { CartContextType, CartItemData, Product } from '@/models/interfaces';
import { addToCart, removeFromCart, updateQuantity, calculateTotal } from '@/utils/cartUtils';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItemData[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            setCart(parsedCart);
        }
    }, []);

    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);

    const total = calculateTotal(cart);

    return (
        <CartContext.Provider value={{
            cart,
            total,
            addToCart: (product: Product) => setCart((prevCart) => addToCart(prevCart, product)),
            removeFromCart: (id: number) => setCart((prevCart) => removeFromCart(prevCart, id)),
            updateQuantity: (id: number, quantity: number) => setCart((prevCart) => updateQuantity(prevCart, id, quantity)),
        }}>
            {children}
        </CartContext.Provider>
    );
};
