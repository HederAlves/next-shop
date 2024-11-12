'use client';
import { useCart } from "@/contexts/CartContext";
import { ICartItem } from "@/model/interfaces";
import Image from 'next/image';

const CartItem = (item: ICartItem) => {
    const { updateQuantity, removeFromCart } = useCart();

    return (
        <div className="flex items-center space-x-4 p-2 border-b">
            <Image
                src={item.image}
                alt={item.name}
                width={64}
                height={64}
                className="object-cover"
            />
            <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm">Preço: {item.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                <div className="flex items-center mt-2">
                    <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</button>
                    <span className="mx-2">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
            </div>
            <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-sm"
            >
                Remover
            </button>
        </div>
    );
};

export default CartItem;
