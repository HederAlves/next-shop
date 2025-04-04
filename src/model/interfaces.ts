export interface IProduct {
    fees: number | null;
    image: string[];
    id: number;
    name: string;
    category: string;
    price: number;
    discount: number | null;
    description: string;
    about?: string;
    assessment: number;
}


export interface ICartItem extends IProduct {
    quantity: number;
}

export interface ICartContextType {
    cart: ICartItem[];
    total: number;
    addToCart: (product: IProduct) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
}
