// "use client";
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
interface ContextProps {
  isCartOpen: boolean;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
  handleCart: () => void;
  cartItens: IProduct[];
  setCartItens: Dispatch<SetStateAction<IProduct[]>>;
  addToCart: (product: IProduct) => void;
  removeCartItem: (productId: string) => void;
  cartTotal: number;
}

export const GlobalContext = createContext({} as ContextProps);

export function GlobalContextProvider({ children }: IProvider) {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItens, setCartItens] = useState<IProduct[]>([]);

  const handleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const addToCart = (product: IProduct) => {
    setCartItens((state) => [...state, product]);
    setIsCartOpen(true);
  };

  const removeCartItem = (productId: string) => {
    setCartItens((state) => state.filter((item) => item.id !== productId));
  };

  const cartTotal = cartItens.reduce((total, product) => {
    return total + product.numberPrice;
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
