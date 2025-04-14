import { useCart } from "@/contexts/CartContext";
import { calculateCartTotals, formatPrice } from "@/utils/priceUtils";
import { Button } from "@/components/ui/button/Button";

const CartSummary = () => {
  const { cart } = useCart();

  const { totalOriginal, totalWithDiscount, totalItems } = calculateCartTotals(cart);
  const totalDiscount = totalOriginal - totalWithDiscount;

  return (
    <div className="p-4 mb-5 lg:mb-0 text-black bg-white dark:bg-black dark:text-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Resumo do Carrinho</h2>
      <p>Total de Itens: {totalItems}</p>
      <p>Total: {formatPrice(totalWithDiscount)}</p>

      {totalDiscount > 0 && (
        <p className="text-red-500">
          Você está economizando: {formatPrice(totalDiscount)}
        </p>
      )}

      <div className="flex flex-col gap-1 mt-4">
        <Button variant="primary">
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
