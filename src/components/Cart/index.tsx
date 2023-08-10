import { Minus, Plus, X } from "@phosphor-icons/react";
import Image from "next/image";
import { useGlobalContext } from "@/provider/store";
import { useState } from "react";
import axios from "axios";

export default function Cart() {
  const { setIsCartOpen, cartItens, removeCartItem, cartTotal } =
    useGlobalContext();

  const cartTotalFormatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cartTotal);

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post("/api/checkout", {
        products: cartItens,
      });
      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);
      console.log(err);
    }
  }

  return (
    <section className="flex flex-col bg-white fixed w-[480px] h-[900px] z-10 top-0 right-0 bottom-0 shadow-[-4px_0_30px_0_rgba(0,0,0,0.80)]">
      <div className="flex justify-end my-6 mr-6">
        <button onClick={() => setIsCartOpen(false)}>
          <X weight="bold" size={24} />
        </button>
      </div>

      <h2 className="ml-10 mb-8 font-helvetica font-bold text-xl">
        Carrinho de Compras
      </h2>
      <ul className="mx-10 flex flex-col gap-6 min-h-[472px] max-h-[472px] overflow-auto relative">
        {!cartItens.length ? (
          <span className="font font-helvetica font-bold self-center absolute  bottom-[210px] ">
            Seu carrinho está vazio
          </span>
        ) : (
          cartItens.map(({ prod, quantity }) => (
            <li key={prod.id} className="flex justify-between">
              <Image
                src={prod.imageUrl}
                width={100}
                height={100}
                alt="imagem do produto no carrinho"
              ></Image>
              <div className="flex flex-col gap-2">
                <span className="font-normal text-lg text-gray-500 font-helvetica">
                  {prod.name}
                </span>
                <span className="font-helvetica font-bold text-lg">
                  {prod.price}
                </span>
                <button
                  onClick={() => removeCartItem(prod.id)}
                  className="flex font-helvetica font-bold text-base hover:text-red-600 transition duration-300"
                >
                  Remover
                </button>
              </div>

              <div className="flex border border-gray-400 items-center gap-3 px-2 h-11">
                <button>
                  <Minus size={16} weight={"regular"} />
                </button>
                <span>{quantity}</span>
                <button>
                  <Plus size={16} weight={"regular"} />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
      <div className="mx-10 mb-[55px] mt-[68px]">
        <div className="flex justify-between">
          <span className="text-gray-500 font-helvetica text-base font-normal">
            Quantidade
          </span>
          <span className="text-gray-500 font-helvetica font-normal text-lg">
            {cartItens.length} {cartItens.length > 1 ? "Itens" : "Item"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold font-helvetica text-lg">Valor Total</span>
          <span className="font-bold font-helvetica text-lg">
            {cartTotalFormatted}
          </span>
        </div>
      </div>
      <button
        onClick={handleCheckout}
        className="self-center w-[384px] h-[69px] text-gray-50 border border-black bg-black"
      >
        Finalizar Compra
      </button>
    </section>
  );
}
