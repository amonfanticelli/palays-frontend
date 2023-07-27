"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { IProvider } from "@/interfaces";
import { IOutfits } from "@/interfaces";
type DataType = {
  firstName: string;
};
import { api } from "@/utils";

interface ContextProps {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  data: DataType[];
  setData: Dispatch<SetStateAction<DataType[]>>;
  outfits: IOutfits[];
  setOutfits: Dispatch<SetStateAction<IOutfits[]>>;
  handlerGETOutfits: () => Promise<void>;
}

const GlobalContext = createContext<ContextProps>({
  userId: "",
  setUserId: (): string => "",
  data: [],
  setData: (): DataType[] => [],
  outfits: [],
  setOutfits: (): IOutfits[] => [],
  handlerGETOutfits: async () => {},
});

export function GlobalContextProvider({ children }: IProvider) {
  const [userId, setUserId] = useState("");
  const [outfits, setOutfits] = useState<IOutfits[]>([]);
  const [data, setData] = useState<[] | DataType[]>([]);

  async function handlerGETOutfits() {
    await api
      .get("outfit")
      .then((response) => {
        const data2 = response.data;
        const data = response.data.results;
        setOutfits(data2);
        console.log(data2);
        console.log(outfits);
      })
      .catch((err) => console.warn(err));
  }
  return (
    <GlobalContext.Provider
      value={{
        userId,
        setUserId,
        data,
        setData,
        outfits,
        setOutfits,
        handlerGETOutfits,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);
