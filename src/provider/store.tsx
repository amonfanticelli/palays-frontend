import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface IProvider {
  children: React.ReactNode;
}

export interface IProduct {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  numberPrice: number;
  description: string;
  defaultPriceId: string;
}
export interface ICartItem {
  prod: IProduct;
  quantity: number;
}
interface ContextProps {
  isCartOpen: boolean;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
  handleCart: () => void;
  cartItens: ICartItem[];
  setCartItens: Dispatch<SetStateAction<ICartItem[]>>;
  addToCart: (product: IProduct) => void;
  removeCartItem: (productId: string) => void;
  cartTotal: number;
}

export const GlobalContext = createContext({} as ContextProps);

export function GlobalContextProvider({ children }: IProvider) {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItens, setCartItens] = useState<ICartItem[]>([]);

  const handleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const addToCart = (newProduct: IProduct) => {
    const cartItemFound = cartItens.find(
      ({ prod }) => prod.id === newProduct.id
    );
    // [{ prod: 1, qtd: 1 }, { prod: 2, qtd: 2 }]
    // if (cartItem.quantity > 1  ) {... } else { remove}
    if (cartItemFound) {
      setCartItens((state) =>
        state.map((cartItem) =>
          cartItem.prod.id === cartItemFound.prod.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItens((state) => [...state, { prod: newProduct, quantity: 1 }]);
    }

    setIsCartOpen(true);
  };

  const removeCartItem = (productId: string) => {
    setCartItens((state) => state.filter(({ prod }) => prod.id !== productId));
  };

  const cartTotal = cartItens.reduce((total, { prod }) => {
    return total + prod.numberPrice;
  }, 0);

  return (
    <GlobalContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        handleCart,
        cartItens,
        setCartItens,
        addToCart,
        removeCartItem,
        cartTotal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);
