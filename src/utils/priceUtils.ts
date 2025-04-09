export const calculateDiscountedPrice = (price: number, discount: number | null) => {
    const hasDiscount = discount !== null && discount > 0;
    const originalPrice = price;
    const finalPrice = hasDiscount ? price * (1 - discount / 100) : price;
    const discountPercent = hasDiscount ? discount : 0;

    return { hasDiscount, originalPrice, finalPrice: finalPrice, discountPercent };
};
