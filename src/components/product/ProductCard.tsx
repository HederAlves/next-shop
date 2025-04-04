'use client';

import { useCart } from "@/contexts/CartContext";
import { IProduct } from "@/model/interfaces";
import Image from 'next/image';
import Link from "next/link";

const ProductCard = ({ product }: { product: IProduct }) => {
    const { addToCart } = useCart();
    const hasDiscount = product.discount !== null && product.discount > 0;
    const discountedPrice = product.price * (1 - (product.discount ?? 0) / 100);

    return (
        <div className="rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out bg-white dark:bg-black dark:text-white flex flex-col justify-between">
            <Link href={`/${product.id}`} className="block">
                <Image
                    src={product.image[0]}
                    alt={product.name}
                    width={400}
                    height={192}
                    className="w-full h-48 object-cover"
                />
            </Link>
            <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold text-gray-800 truncate dark:text-white min-h-[20px]">
                    {product.name}
                </h2>
                <p className="text-gray-600 mt-2 text-sm min-h-[40px]">
                    {product.description}
                </p>
                <div className="mt-auto">
                    {hasDiscount && (
                        <span className="text-gray-500 text-sm line-through block">
                            {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </span>
                    )}
                    <span className="text-xl font-semibold text-green-600">
                        {discountedPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </span>
                    {hasDiscount && (
                        <span className="text-sm text-red-500 ml-2">
                            -{product.discount}%
                        </span>
                    )}
                </div>
                <div className="mt-4">
                    <button
                        onClick={() => addToCart(product)}
                        className="
                        bg-gradient-to-r from-blue-500 via-blue-500 to-blue-500
                        dark:from-black dark:via-blue-900 dark:to-black
                        hover:from-blue-900 hover:via-blue-900 hover:to-blue-900
                        dark:hover:from-blue-900 dark:hover:via-blue-900 dark:hover:to-blue-900
                        focus:outline-none w-full text-white py-2 px-4 rounded-md"
                    >
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        </div>

    );
};

export default ProductCard;
