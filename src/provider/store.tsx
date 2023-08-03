"use client";
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

interface ContextProps {
  isCartOpen: boolean;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
  handleCart: () => void;
}

const GlobalContext = createContext<ContextProps>({
  isCartOpen: false,
  setIsCartOpen: (): boolean => false,
  handleCart: () => {},
});

export function GlobalContextProvider({ children }: IProvider) {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const handleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <GlobalContext.Provider value={{ isCartOpen, setIsCartOpen, handleCart }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);
