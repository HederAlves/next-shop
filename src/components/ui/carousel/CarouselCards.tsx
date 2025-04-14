"use client";

import { useState, useCallback } from "react";
import { Product } from "@/models/interfaces";
import { useItemsPerPage } from "@/hooks/useItemsPerPage";
import { useAutoPlay } from "@/hooks/useAutoPlay";
import ProductCard from "@/components/product/ProductCard";

interface CarouselProps {
    products: Product[];
    autoPlay?: boolean;
    interval?: number;
}

const CarouselCards: React.FC<CarouselProps> = ({
    products,
    autoPlay = true,
    interval = 3000,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = useItemsPerPage();
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const next = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
    }, [totalPages]);

    useAutoPlay({
        enabled: autoPlay,
        interval,
        totalPages,
        onTick: next,
    });

    const prevSlide = (event: React.MouseEvent) => {
        event.stopPropagation();
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
    };

    const nextSlide = (event: React.MouseEvent) => {
        event.stopPropagation();
        next();
    };

    return (
        <div className="relative w-full mx-auto">
            <div className="relative w-full overflow-hidden">
                <div
                    className="flex transition-transform duration-700"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
                    }}
                >
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="w-full px-2 mb-2 text-center"
                            style={{
                                flex: `0 0 ${100 / itemsPerPage}%`,
                                maxWidth: `${100 / itemsPerPage}%`,
                            }}
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800/30 text-white dark:text-green-600 hover:bg-gray-800 dark:bg-gray-800/30 dark:hover:bg-gray-800/60 p-2 w-10 rounded-full z-80"
            >
                ❮
            </button>

            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800/30 text-white dark:text-green-600 hover:bg-gray-800 dark:bg-gray-800/30 dark:hover:bg-gray-800/60 p-2 w-10 rounded-full z-80"
            >
                ❯
            </button>
        </div>
    );
};

export default CarouselCards;
