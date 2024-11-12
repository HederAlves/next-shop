'use client';
import { useCart } from "@/contexts/CartContext";
import { IProduct } from "@/model/interfaces";
import Image from 'next/image';

const ProductCard = ({ product }: { product: IProduct }) => {
    const { addToCart } = useCart();

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
            <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={192}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 truncate">{product.name}</h2>
                <p className="text-gray-600 mt-2 text-sm">{product.description}</p>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-semibold text-green-600">
                        {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </span>
                    <button
                        onClick={() => addToCart(product)}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none w-36"
                    >
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
