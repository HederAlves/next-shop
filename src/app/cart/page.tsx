'use client'

import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { useCart } from "@/contexts/CartContext";

export default function CartPage() {
    const { cart } = useCart();

    return (
        <div className="px-6 pt-6 pb-2 min-h-screen bg-gray-100 text-black dark:bg-[#0c0d0f] dark:text-white">
            <h1 className="sm:text-lg font-bold mb-4">Meu Carrinho</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    {cart.map((item) => (
                        <CartItem key={item.id} {...item} />
                    ))}
                </div>
                <div>
                    <CartSummary />
                </div>
            </div>
        </div>
    );
}
