import Image from 'next/image';
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { CartItemData } from "@/models/interfaces";
import { calculateDiscountedPrice, formatPrice } from "@/utils/priceUtils";

const CartItem = (item: CartItemData) => {
    const { updateQuantity, removeFromCart } = useCart();

    const {
        hasDiscount,
        finalPrice: discountedPrice
    } = calculateDiscountedPrice(item.price, item.discount);

    const totalPrice = item.price * item.quantity;
    const totalDiscountedPrice = discountedPrice * item.quantity;

    return (
        <div className="flex items-center space-x-4 p-2 border-b">
            <Link href={`/product/${item.id}`} className="block">
                <Image
                    src={item.image[0]}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="object-cover"
                />
            </Link>
            <div className="flex-1">
                <h3 className="text-xs sm:text-base font-semibold truncate w-24 sm:w-56">
                    {item.name}
                </h3>

                {hasDiscount && (
                    <span className="text-xs sm:text-sm text-gray-500 line-through block">
                        {formatPrice(totalPrice)}
                    </span>
                )}

                <span className="text-xs sm:text-sm text-green-500">
                    {formatPrice(totalDiscountedPrice)}
                </span>

                {hasDiscount && (
                    <span className="text-xs sm:text-sm text-red-500 ml-2">
                        -{item.discount}%
                    </span>
                )}

                <div className="flex items-center mt-2">
                    <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity === 1}
                        className="px-2 text-lg font-bold disabled:opacity-50"
                    >
                        -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 text-lg font-bold"
                    >
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
