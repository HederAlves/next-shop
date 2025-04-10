import { ICartItem } from "@/model/interfaces";

// Calculates the final value with discount.
export function calculateDiscountedPrice(price: number, discount: number) {
    const hasDiscount = discount > 0;
    const originalPrice = price;
    const finalPrice = hasDiscount ? price * (1 - discount / 100) : price;
    const discountPercent = hasDiscount ? discount : 0;

    return {
        hasDiscount,
        originalPrice,
        finalPrice,
        discountPercent,
    };
}

// Calculates the value of each installment with or without interest.
export function calculateInstallmentValue(
    total: number,
    installments: number,
    interest: number
): number {
    const hasInterest = interest > 0;

    if (hasInterest) {
        const monthlyRate = interest / 100;
        return (total * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -installments));
    }

    return total / installments;
}

// Returns complete information about the installment simulation.
export function getInstallmentInfo(
    total: number,
    installments: number,
    interest: number
) {
    const hasInterest = interest > 0;
    const value = calculateInstallmentValue(total, installments, interest);

    return {
        hasInterest,
        installmentValue: value,
        totalInstallments: installments,
        interestRate: interest,
        totalAmount: value * installments,
    };
}

// Utility for cart totals.
export function calculateCartTotals(cart: ICartItem[]) {
    return cart.reduce(
        (totals, item) => {
            const { finalPrice } = calculateDiscountedPrice(item.price, item.discount);
            const quantity = item.quantity;

            const originalTotal = item.price * quantity;
            const discountedTotal = finalPrice * quantity;

            totals.totalOriginal += originalTotal;
            totals.totalWithDiscount += discountedTotal;
            totals.totalItems += quantity;

            return totals;
        },
        {
            totalOriginal: 0,
            totalWithDiscount: 0,
            totalItems: 0,
        }
    );
}

// Formats a number to BRL currency.
export function formatPrice(value: number): string {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
}
