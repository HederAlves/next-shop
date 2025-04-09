'use client';

import { useCart } from "@/contexts/CartContext";
import { IProduct } from "@/model/interfaces";
import Image from 'next/image';
import Link from "next/link";
import { Button } from "../layout/Button";

const ProductCard = ({ product }: { product: IProduct }) => {
    const { addToCart } = useCart();
    const hasDiscount = product.discount !== null && product.discount > 0;
    const discountedPrice = product.price * (1 - (product.discount ?? 0) / 100);

    return (
        <div className="rounded-lg h-full shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out bg-white dark:bg-black dark:text-white flex flex-col justify-between">
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
                    <Button variant="primary" onClick={() => addToCart(product)}>
                        Adicionar ao Carrinho
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
