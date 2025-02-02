import { CartList } from "./components/CartList";
import { CartEmpty } from "./components/CartEmpty";
import { useCart } from "../../context";
import { useTitle } from "../../hooks/useTitle";

export const CartPage = () => {
  const { cartList } = useCart();
  useTitle(`Кошик(${cartList.length})`);

  return (
    <main>       
      { cartList.length ? <CartList /> : <CartEmpty /> }   
    </main>
  )
}
