import { useCart } from "@/contexts/CartContext";
import Link from "next/link";

const CartSummary = () => {
    const { cart, total } = useCart();
    const itemCount = cart.reduce((totalQuantity: number, item: { quantity: number; }) => totalQuantity + item.quantity, 0);

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Resumo do Carrinho</h2>
            <p>Total de Itens: {itemCount}</p>
            <p>Total: ${total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
            <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded">
                Finalizar Compra
            </button>
            <Link href="/" passHref>
                <button className="mt-1 w-full bg-green-500 text-white py-2 rounded">
                    Continuar comprando
                </button>
            </Link>
        </div>
    );
};

export default CartSummary;
