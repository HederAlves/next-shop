'use client';

import { useCart } from "@/contexts/CartContext";
import { IProduct } from "@/model/interfaces";
import Image from 'next/image';

const ProductCard = ({ product }: { product: IProduct }) => {
    const { addToCart } = useCart();

    return (
        <div className="rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out bg-white dark:bg-black dark:text-white">
            <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={192}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 truncate dark:text-white">{product.name}</h2>
                <p className="text-gray-600 mt-2 text-sm">{product.description}</p>
                <span className="text-xl font-semibold text-green-600">
                    {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </span>
                <div className="flex flex-col justify-between mt-4">
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
