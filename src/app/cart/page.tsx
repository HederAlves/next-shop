'use client'
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { useCart } from "@/contexts/CartContext";

export default function CartPage() {
    const { cart } = useCart();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Carrinho</h1>
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
