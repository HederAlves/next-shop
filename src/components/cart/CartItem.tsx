'use client';

import { useCart } from "@/contexts/CartContext";
import { ICartItem } from "@/model/interfaces";
import Image from 'next/image';

const CartItem = (item: ICartItem) => {
    const { updateQuantity, removeFromCart } = useCart();

    // Cálculo do preço com desconto
    const hasDiscount = item.discount !== null && item.discount > 0;
    const discountedPrice = item.price * (1 - (item.discount ?? 0) / 100);

    // Cálculo do preço total com base na quantidade
    const totalPrice = item.price * item.quantity;
    const totalDiscountedPrice = discountedPrice * item.quantity;

    return (
        <div className="flex items-center space-x-4 p-2 border-b">
            <Image
                src={item.image[0]}
                alt={item.name}
                width={64}
                height={64}
                className="object-cover"
            />
            <div className="flex-1">
                <h3 className="text-xs sm:text-base font-semibold truncate w-24 sm:w-56">
                    {item.name}
                </h3>

                {/* Exibir o preço antigo multiplicado pela quantidade se houver desconto */}
                {hasDiscount && (
                    <span className="text-xs sm:text-sm text-gray-500 line-through block">
                        {totalPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </span>
                )}

                {/* Exibir o preço novo multiplicado pela quantidade */}
                <span className="text-xs sm:text-sm text-green-500">
                    {totalDiscountedPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </span>

                {/* Exibir a porcentagem de desconto */}
                {hasDiscount && (
                    <span className="text-xs sm:text-sm text-red-500 ml-2">
                        -{item.discount}%
                    </span>
                )}

                <div className="flex items-center mt-2">
                    <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>
                        -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        +
                    </button>
                </div>
            </div>
            <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-xs sm:text-sm"
            >
                Remover
            </button>
        </div>
    );
};

export default CartItem;
