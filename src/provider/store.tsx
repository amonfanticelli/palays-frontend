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
  cartItems: ICartItem[];
  setCartItems: Dispatch<SetStateAction<ICartItem[]>>;
  addToCart: (product: IProduct) => void;
  minusRemoveFromCart: (newProduct: IProduct) => void;
  removeCartItem: (productId: string) => void;
  cartTotal: number;
}

export const GlobalContext = createContext({} as ContextProps);

export function GlobalContextProvider({ children }: IProvider) {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  const handleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const addToCart = (newProduct: IProduct) => {
    const cartItemFound = cartItems.find(
      ({ prod }) => prod.id === newProduct.id
    );
    if (cartItemFound) {
      setCartItems((state) =>
        state.map((cartItem) =>
          cartItem.prod.id === cartItemFound.prod.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems((state) => [...state, { prod: newProduct, quantity: 1 }]);
    }

    setIsCartOpen(true);
  };

  const minusRemoveFromCart = (newProduct: IProduct) => {
    const cartItemFound = cartItems.find(
      ({ prod }) => prod.id === newProduct.id
    );
    // [{ prod: 1, qtd: 1 }, { prod: 2, qtd: 2 }]
    // if (cartItem.quantity > 1  ) {... } else { remove}
    if (cartItemFound?.quantity! > 1) {
      setCartItems((state) =>
        state.map((cartItem) =>
          cartItem.prod.id === newProduct.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    } else {
      setCartItems((state) =>
        state.filter(({ prod }) => prod.id !== newProduct.id)
      );
    }
  };

  const removeCartItem = (productId: string) => {
    setCartItems((state) => state.filter(({ prod }) => prod.id !== productId));
  };

  const cartTotal = cartItems.reduce((total, { prod, quantity }) => {
    return total + prod.numberPrice * quantity;
  }, 0);

  return (
    <GlobalContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        handleCart,
        cartItems,
        setCartItems,
        addToCart,
        minusRemoveFromCart,
        removeCartItem,
        cartTotal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);
