export interface Product {
    fees: number;
    image: string[];
    id: number;
    name: string;
    category: string;
    price: number;
    discount: number;
    description: string;
    about?: string;
    assessment: number;
}

export interface CartItemData extends Product {
    quantity: number;
}

export interface CartContextType {
    cart: CartItemData[];
    total: number;
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
}
