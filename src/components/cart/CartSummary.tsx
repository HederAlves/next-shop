import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import { Button } from "../layout/Button";

const CartSummary = () => {
  const { cart } = useCart();

  // Calcular a quantidade total de itens no carrinho
  const itemCount = cart.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0);

  // Calcular o total com e sem desconto
  const { totalOriginal, totalWithDiscount } = cart.reduce(
    (totals, item) => {
      const discountedPrice = item.price * (1 - (item.discount ?? 0) / 100);
      totals.totalOriginal += item.price * item.quantity;
      totals.totalWithDiscount += discountedPrice * item.quantity;
      return totals;
    },
    { totalOriginal: 0, totalWithDiscount: 0 }
  );

  // Calcular o total economizado em descontos
  const totalDiscount = totalOriginal - totalWithDiscount;

  return (
    <div className="p-4 mb-5 lg:mb-0 text-black bg-white dark:bg-black dark:text-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Resumo do Carrinho</h2>
      <p>Total de Itens: {itemCount}</p>
      <p>Total: {totalWithDiscount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>

      {totalDiscount > 0 && (
        <p className="text-red-500">
          Você está economizando: {totalDiscount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </p>
      )}

      <div className="flex flex-col gap-1 mt-4">
        <Button variant="primary" onClick={() => console.log('Finalizar')}>
          Finalizar Compra
        </Button>
        <Button variant="secondary" href="/">
          Continuar comprando
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
