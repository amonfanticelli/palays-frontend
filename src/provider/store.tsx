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

export interface IPriceVariant {
  id: string;
  nickname: string;
}
export interface IProduct {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  numberPrice: number;
  description: string;
  defaultPriceId: string;
  priceVariants: IPriceVariant[];
}
export interface ICartItem {
  prod: IProduct;
  quantity: number;
  selectedPrice: IPriceVariant;
}
interface ContextProps {
  isCartOpen: boolean;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
  handleCart: () => void;
  cartItems: ICartItem[];
  setCartItems: Dispatch<SetStateAction<ICartItem[]>>;
  addToCart: (product: IProduct, selectedPrice: IPriceVariant) => void;
  minusRemoveFromCart: (
    newProduct: IProduct,
    selectedPrice: IPriceVariant
  ) => void;
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

  const addToCart = (newProduct: IProduct, selectedPrice: IPriceVariant) => {
    const cartItemFound = cartItems.find(
      (cartItem) =>
        cartItem.prod.id === newProduct.id &&
        cartItem.selectedPrice.id === selectedPrice.id
    );
    if (cartItemFound) {
      setCartItems((state) =>
        state.map((cartItem) =>
          cartItem.selectedPrice.id === cartItemFound.selectedPrice.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems((state) => [
        ...state,
        { prod: newProduct, quantity: 1, selectedPrice },
      ]);
    }

    setIsCartOpen(true);
  };

  const minusRemoveFromCart = (
    newProduct: IProduct,
    selectedPrice: IPriceVariant
  ) => {
    const cartItemFound = cartItems.find(
      (cartItem) =>
        cartItem.prod.id === newProduct.id &&
        cartItem.selectedPrice.id === selectedPrice.id
    );

    if (cartItemFound && cartItemFound.quantity > 1) {
      setCartItems((state) =>
        state.map((cartItem) =>
          cartItem.selectedPrice.id === cartItemFound.selectedPrice.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    } else {
      setCartItems((state) =>
        state.filter(
          (cartItem) => cartItem.selectedPrice.id !== selectedPrice.id
        )
      );
    }
  };

  const removeCartItem = (selectedPriceId: string) => {
    setCartItems((state) =>
      state.filter((cartItem) => cartItem.selectedPrice.id !== selectedPriceId)
    );
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
