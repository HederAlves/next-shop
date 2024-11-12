export interface IProduct {
    image: string;
    id: number;
    name: string;
    price: number;
    description: string;
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
