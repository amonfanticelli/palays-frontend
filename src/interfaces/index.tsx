import { Dispatch, SetStateAction } from "react";

export interface IProvider {
  children: React.ReactNode;
}

export interface ContextProps {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  data: DataType[];
  setData: Dispatch<SetStateAction<DataType[]>>;
}

export type DataType = {
  firstName: string;
};

export interface IOutfits {
  id: string;
  coverImage: string;
  galleryImages: string[];
  name: string;
  price: number;
  type: string;
  size: string;
  description: string;
  stock: number;
}
