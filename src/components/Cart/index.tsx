"use client";
import { X } from "@phosphor-icons/react";
import Image from "next/image";
import { useGlobalContext } from "@/provider/store";
import camisa from "../../../public/assets/camiseta-1.png";

export default function Cart() {
  const { setIsCartOpen } = useGlobalContext();
  return (
    <section className="flex flex-col bg-white fixed w-[480px] h-[900px] z-10 top-0 right-0 bottom-0 shadow-[-4px_0_30px_0_rgba(0,0,0,0.80)]">
      <div className="flex justify-end my-6 mr-6">
        <button onClick={() => setIsCartOpen(false)}>
          <X weight="bold" size={24} />
        </button>
      </div>
      <h2 className="ml-12 mb-8 font-helvetica font-bold text-xl">
        Carrinho de Compras
      </h2>
      <ul className="mx-12 flex flex-col gap-6 max-h-[472]">
        <li className="flex">
          <Image
            src={camisa}
            width={100}
            height={100}
            alt="imagem do produto no carrinho"
            className="mr-5"
          ></Image>
          <div className="flex flex-col gap-2">
            <span className="font-normal text-lg text-gray-500 font-helvetica">
              Camiseta bonita
            </span>
            <span className="font-helvetica font-bold text-lg">R$ 260,00</span>
            <button className="flex font-helvetica font-bold text-base">
              Remover
            </button>
          </div>
        </li>
        <li className="flex">
          <Image
            src={camisa}
            width={100}
            height={100}
            alt="imagem do produto no carrinho"
            className="mr-5"
          ></Image>
          <div className="flex flex-col gap-2">
            <span className="font-normal text-lg text-gray-500 font-helvetica">
              Camiseta bonita
            </span>
            <span className="font-helvetica font-bold text-lg">R$ 260,00</span>
            <button className="flex font-helvetica font-bold text-base">
              Remover
            </button>
          </div>
        </li>
        <li className="flex">
          <Image
            src={camisa}
            width={100}
            height={100}
            alt="imagem do produto no carrinho"
            className="mr-5"
          ></Image>
          <div className="flex flex-col gap-2">
            <span className="font-normal text-lg text-gray-500 font-helvetica">
              Camiseta bonita
            </span>
            <span className="font-helvetica font-bold text-lg">R$ 260,00</span>
            <button className="flex font-helvetica font-bold text-base">
              Remover
            </button>
          </div>
        </li>
        <li className="flex">
          <Image
            src={camisa}
            width={100}
            height={100}
            alt="imagem do produto no carrinho"
            className="mr-5"
          ></Image>
          <div className="flex flex-col gap-2">
            <span className="font-normal text-lg text-gray-500 font-helvetica">
              Camiseta bonita
            </span>
            <span className="font-helvetica font-bold text-lg">R$ 260,00</span>
            <button className="flex font-helvetica font-bold text-base">
              Remover
            </button>
          </div>
        </li>
      </ul>
      <div className="mx-12 mb-[55px] mt-[68px]">
        <div className="flex justify-between">
          <span className="text-gray-500 font-helvetica text-base font-normal">
            Quantidade
          </span>
          <span className="text-gray-500 font-helvetica font-normal text-lg">
            3 Itens
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold font-helvetica text-lg">Valor Total</span>
          <span className="font-bold font-helvetica text-lg">R$ 260,00</span>
        </div>
      </div>
      <button className="self-center w-[384px] h-[69px] text-gray-50 border border-black bg-black">
        Finalizar Compra
      </button>
    </section>
  );
}
