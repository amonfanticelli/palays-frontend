import Image from "next/image";
import Link from "next/link";
import React from "react";
import palays from "../../../public/assets/palays.png";
import { MagnifyingGlass, User, Handbag } from "@phosphor-icons/react";
import { useGlobalContext } from "@/provider/store";

export default function Header() {
  const { handleCart } = useGlobalContext();

  return (
    <header className="w-full flex flex-col">
      <div className="bg-black py-2 flex justify-center">
        <p className=" text-gray-50 text-xs ">FRETE GRÁTIS À PARTIR DE R$399</p>
      </div>
      <div className="w-full flex items-center border-b-2 border-gray-300">
        <div className="max-w-screen-xl flex justify-between items-center w-full px-10 py-5 mx-auto">
          <Link href={"/"}>
            <Image
              src={palays}
              alt="logo da marca palays"
              width={250}
              height={50}
            />
          </Link>
          <div className="flex space-x-2">
            <button>
              <MagnifyingGlass weight="thin" size={32} />
            </button>
            <button>
              <User weight="thin" size={32} />
            </button>
            <button
              onClick={handleCart}
              className="flex justify-center items-center"
            >
              <Handbag weight="thin" size={32} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
