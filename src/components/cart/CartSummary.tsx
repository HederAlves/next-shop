import { useCart } from "@/contexts/CartContext";
import Link from "next/link";

const CartSummary = () => {
  const { cart, total } = useCart();
  const itemCount = cart.reduce((totalQuantity: number, item: { quantity: number; }) => totalQuantity + item.quantity, 0);

  return (
    <div className="p-4 text-black bg-white dark:bg-black dark:text-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Resumo do Carrinho</h2>
      <p>Total de Itens: {itemCount}</p>
      <p>Total: ${total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
      <div className="flex flex-col gap-1 mt-4">
        <button className="
                  bg-gradient-to-r from-blue-500 via-blue-500 to-blue-500
                dark:from-black dark:via-blue-900 dark:to-black
                hover:from-blue-900 hover:via-blue-900 hover:to-blue-900
                dark:hover:from-blue-900 dark:hover:via-blue-900 dark:hover:to-blue-900
                  focus:outline-none w-full text-white py-2 px-4 rounded-md">
          Finalizar Compra
        </button>
        <Link href="/" passHref>
          <button className="
                      bg-gradient-to-r from-green-500 via-green-500 to-green-500
                    dark:from-black dark:via-green-900 dark:to-black
                    hover:from-green-900 hover:via-green-900 hover:to-green-900
                    dark:hover:from-green-900 dark:hover:via-green-900 dark:hover:to-green-900
                      focus:outline-none w-full text-white py-2 px-4 rounded-md">
            Continuar comprando
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
