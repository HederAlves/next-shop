"use client";

import { useState } from "react";
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Image from "next/image";
import Zoom from "./Zoom";

interface CarouselProps {
    images: string[];
}

const CarouselImages: React.FC<CarouselProps> = ({ images }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [thumbnailIndex, setThumbnailIndex] = useState(0);

    const visibleThumbs = 2;
    const thumbSize = 130;
    const spacing = isMobile ? -36 : 8;

    const maxIndex = Math.max(images.length - visibleThumbs, 0);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    const nextThumbnails = () => {
        setThumbnailIndex((prev) => Math.min(prev + 2, maxIndex));
    };

    const prevThumbnails = () => {
        setThumbnailIndex((prev) => Math.max(prev - 1, 0));
    };

    return (
        <div className="relative pb-4">
            <div className="hs-carousel flex flex-col md:flex-row gap-2">
                <div className="md:order-2 relative min-w-[100%] md:min-w-[77%] lg:min-w-[60%] max-w-[52vw] sm:max-w-[40vw] xl:min-w-[42vw] min-h-[140px] max-h-[140px] md:min-h-[405px] bg-white rounded-lg flex justify-center items-center">
                    <Zoom
                        src={images[currentIndex]}
                        alt={`Slide ${currentIndex + 1}`}
                    />
                </div>

                <div className="md:order-1 flex-none relative w-full md:w-[140px]">
                    {images.length > visibleThumbs && (
                        <button
                            onClick={prevThumbnails}
                            className="absolute md:left-1/2 w-8 md:-translate-x-1/2 left-0 top-1/2 md:-top-3 -translate-y-1/2 md:translate-y-0 bg-gray-800 text-white dark:text-green-600 hover:bg-black/50 dark:bg-gray-800 dark:hover:bg-gray-800/60 p-1 rounded-full z-10 hover:bg-gray-700 disabled:opacity-50"
                            disabled={thumbnailIndex === 0}
                        >
                            <span className="hidden md:inline">▲</span>
                            <span className="md:hidden mr-1">◀</span>
                        </button>
                    )}

                    <div className="overflow-hidden md:h-[420px] h-[80px]">
                        <div
                            className="flex md:flex-col transition-transform duration-300 gap-2 pb-20"
                            style={{
                                transform: isMobile
                                    ? `translateX(-${thumbnailIndex * (thumbSize + spacing)}px)`
                                    : `translateY(-${thumbnailIndex * (thumbSize + spacing)}px)`
                            }}
                        >
                            {images.map((src, index) => (
                                <div
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`border border-gray-200 rounded-md overflow-hidden cursor-pointer size-20 md:size-[130px] ${currentIndex === index ? "border-blue-400" : ""
                                        } dark:border-neutral-700`}
                                    style={{
                                        flex: "0 0 auto"
                                    }}
                                >
                                    <Image
                                        src={src}
                                        alt={`Thumbnail ${index + 1}`}
                                        width={150}
                                        height={150}
                                        className="rounded-md w-full h-full"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {images.length > visibleThumbs && (
                        <button
                            onClick={nextThumbnails}
                            className="absolute md:left-1/2 md:-translate-x-1/2 w-8 right-0 bottom-1/2 md:bottom-0 translate-y-1/2 md:translate-y-0 bg-gray-800 text-white dark:text-green-600 hover:bg-black/50 dark:bg-gray-800 dark:hover:bg-gray-800/60 p-1 rounded-full z-10 hover:bg-gray-700 disabled:opacity-50"
                            disabled={thumbnailIndex >= maxIndex}
                        >
                            <span className="hidden md:inline">▼</span>
                            <span className="md:hidden ml-1">▶</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CarouselImages;
