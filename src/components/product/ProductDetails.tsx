'use client';

import { useCart } from "@/contexts/CartContext";
import { Product } from "@/models/interfaces";
import {
    calculateDiscountedPrice,
    calculateInstallmentValue,
    formatPrice
} from "@/utils/priceUtils";
import CarouselImages from "@/components/ui/carousel/CarouselImages";
import { Button } from "@/components/ui/button/Button";
import RatingStars from "@/components/ui/rating/RatingStars";

const ProductDetails = ({ product }: { product: Product }) => {
    const { addToCart } = useCart();

    const discounted = calculateDiscountedPrice(product.price, product.discount);
    const { hasDiscount, originalPrice, finalPrice, discountPercent } = discounted;

    const installments = 12;
    const installmentValue = calculateInstallmentValue(finalPrice, installments, product.fees);

    return (
        <section className="flex flex-col lg:flex-row gap-8">
            <div className="bg-white w-full lg:w-[60%] dark:bg-black pt-4 px-4 rounded-lg shadow-md">
                <CarouselImages images={product.image} />
            </div>

            <div className="flex flex-col justify-between w-full bg-white dark:bg-black p-6 rounded-lg shadow-md">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    {product.name}
                </h1>

                <RatingStars rating={product.assessment} />

                <p className="text-sm sm:text-xl text-gray-700 dark:text-gray-300 mt-4">
                    {product.description}
                </p>

                <div className="m-4">
                    {hasDiscount && (
                        <span className="md:text-xl text-gray-500 line-through block">
                            {formatPrice(originalPrice)}
                        </span>
                    )}
                    <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-green-600">
                        {formatPrice(finalPrice)}
                    </span>
                    {hasDiscount && (
                        <span className="text-sm sm:text-lg text-red-500 ml-2">
                            -{discountPercent}%
                        </span>
                    )}
                    <p className="text-gray-700 dark:text-gray-300 mt-2">
                        ou em <span className="font-bold">{installments}x</span> de{" "}
                        <span className="font-semibold text-blue-600">
                            {formatPrice(installmentValue)}
                        </span>{" "}
                        {!product.fees && (
                            <span className="text-green-600">sem juros</span>
                        )}
                    </p>
                </div>

                <Button variant="primary" onClick={() => addToCart(product)}>
                    Adicionar ao Carrinho
                </Button>
            </div>
        </section>
    );
};

export default ProductDetails;
