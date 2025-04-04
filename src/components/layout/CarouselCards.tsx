"use client";

import { IProduct } from "@/model/interfaces";
import Link from "next/link";
import { useState, useEffect } from "react";
import { calculateDiscountedPrice } from "@/utils/priceUtils"; // Importando a função utilitária

interface CarouselProps {
    products: IProduct[];
    autoPlay?: boolean;
    interval?: number;
    addToCart: (product: IProduct) => void;
}

const ITEMS_PER_PAGE = 4; // Mantém 4 itens visíveis ao mesmo tempo

const CarouselCards: React.FC<CarouselProps> = ({ products, autoPlay = false, interval = 3000, addToCart }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const totalItems = products.length;
    const maxIndex = Math.max(0, totalItems - ITEMS_PER_PAGE); // Garante que o índice não ultrapasse o limite

    useEffect(() => {
        if (!autoPlay) return;

        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1 > maxIndex ? 0 : prevIndex + 1));
        }, interval);

        return () => clearInterval(timer);
    }, [autoPlay, maxIndex, interval]);

    const prevSlide = (event: React.MouseEvent) => {
        event.stopPropagation(); // Evita que o clique afete outros elementos
        setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? maxIndex : prevIndex - 1));
    };

    const nextSlide = (event: React.MouseEvent) => {
        event.stopPropagation(); // Evita que o clique afete outros elementos
        setCurrentIndex((prevIndex) => (prevIndex + 1 > maxIndex ? 0 : prevIndex + 1));
    };


    return (
        <div className="relative w-full mx-auto">
            {/* Carousel Wrapper */}
            <div className="relative w-full overflow-hidden">
                <div
                    className="flex transition-transform duration-700"
                    style={{ transform: `translateX(-${currentIndex * (100 / ITEMS_PER_PAGE)}%)` }}
                >
                    {products.map((product) => {
                        const { hasDiscount, originalPrice, finalPrice, discountPercent } = calculateDiscountedPrice(product.price, product.discount);

                        return (
                            <div key={product.id} className="w-1/4 flex-shrink-0 px-2 mb-2">
                                <div className="bg-white dark:bg-black p-4 rounded-lg shadow-md min-h-[410px] flex flex-col justify-between">
                                    <Link href={`/${product.id}`} className="block">
                                        <img
                                            src={product.image[0]}
                                            alt={product.name}
                                            className="w-full h-48 object-cover rounded-md"
                                        />
                                    </Link>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 text-center min-h-[50px]">
                                        {product.name}
                                    </h3>

                                    <div className="text-center mt-2 min-h-[40px]">
                                        {hasDiscount && (
                                            <span className="text-sm text-gray-500 line-through block">
                                                {originalPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                            </span>
                                        )}
                                        <div className="flex justify-center">
                                            <span className="text-xl font-semibold text-green-600 block">
                                                {finalPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                            </span>
                                            {hasDiscount && (
                                                <span className="text-sm text-red-500">
                                                    -{discountPercent}%
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => addToCart(product)}
                                        className="mt-4 w-full bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded-md text-lg font-semibold"
                                    >
                                        Adicionar ao Carrinho
                                    </button>
                                </div>
                            </div>

                        );
                    })}
                </div>
            </div>

            {/* Slider Controls */}
            <button
                onClick={(event) => prevSlide(event)}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 dark:bg-gray-800/30 dark:hover:bg-gray-800/60 p-2 rounded-full z-80"
            >
                ❮
            </button>

            <button
                onClick={(event) => nextSlide(event)}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 dark:bg-gray-800/30 dark:hover:bg-gray-800/60 p-2 rounded-full z-80"
            >
                ❯
            </button>

        </div>
    );
};

export default CarouselCards;
