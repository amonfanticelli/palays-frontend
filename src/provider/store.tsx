"use client";
import { createContext, useContext, useState } from "react";

interface IProvider {
  children: React.ReactNode;
}

interface ContextProps {}

const GlobalContext = createContext<ContextProps>({});

export function GlobalContextProvider({ children }: IProvider) {
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
}

export const useGlobalContext = () => useContext(GlobalContext);
