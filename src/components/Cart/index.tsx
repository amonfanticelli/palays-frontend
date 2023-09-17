import "tailwindcss/tailwind.css";
import { Minus, Plus, X } from "@phosphor-icons/react";
import Image from "next/image";
import { useGlobalContext } from "@/provider/store";
import { useState } from "react";
import axios from "axios";

export default function Cart() {
  const {
    setIsCartOpen,
    cartItems,
    removeCartItem,
    cartTotal,
    addToCart,
    minusRemoveFromCart,
  } = useGlobalContext();

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
        products: cartItems,
      });
      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);
      console.log(err);
    }
  }

  return (
    <section className="flex flex-col bg-white fixed w-[480px] h-full max-h-[900px] z-10 top-0 right-0 bottom-0 shadow-[-4px_0_30px_0_rgba(0,0,0,0.80)] px-4 max-[768px]:w-full overflow-scroll">
      <div className="flex justify-end my-6 mr-6">
        <button onClick={() => setIsCartOpen(false)}>
          <X weight="bold" size={24} />
        </button>
      </div>

      <h2 className="ml-10 mb-8 font-helvetica font-bold text-xl max-[768px]:ml-0">
        Carrinho de Compras
      </h2>
      <div className="h-full flex flex-col justify-between">
        <ul className="mx-10 flex flex-col gap-6  max-h-[472px] overflow-auto relative max-[768px]:mx-0 max-[768px]:max-h-[372px]">
          {!cartItems.length ? (
            <span className="font font-helvetica font-bold self-center absolute bottom-[210px] ">
              Seu carrinho está vazio
            </span>
          ) : (
            cartItems.map(({ prod, quantity }) => (
              <li key={prod.id} className="flex justify-between">
                <Image
                  src={prod.imageUrl}
                  width={100}
                  height={100}
                  alt="imagem do produto no carrinho"
                ></Image>
                <div className="flex flex-col gap-2 w-full max-w-[280px] ml-2">
                  <span className="font-normal text-lg text-gray-500 font-helvetica">
                    {prod.name}
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="font-helvetica font-bold text-lg">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(prod.numberPrice * quantity)}
                    </span>
                    <div className="flex border border-gray-400 items-center gap-3 px-2 h-11">
                      <button onClick={() => minusRemoveFromCart(prod)}>
                        <Minus size={16} weight={"regular"} />
                      </button>
                      <span>{quantity}</span>
                      <button onClick={() => addToCart(prod)}>
                        <Plus size={16} weight={"regular"} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeCartItem(prod.id)}
                    className="flex font-helvetica font-bold text-base hover:text-red-600 transition duration-300 "
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
        <div className="flex flex-col">
          <div className="mx-10 mb-[55px] mt-[68px] max-[768px]:mx-0 max-[768px]:mb-4 max-[768px]:mt-4">
            <div className="flex justify-between">
              <span className="text-gray-500 font-helvetica text-base font-normal">
                Quantidade
              </span>
              <span className="text-gray-500 font-helvetica font-normal text-lg">
                {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold font-helvetica text-lg">
                Valor Total
              </span>
              <span className="font-bold font-helvetica text-lg">
                {cartItems.length <= 1
                  ? cartTotalFormatted
                  : new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(cartTotal)}
              </span>
            </div>
          </div>
          <button
            disabled={isCreatingCheckoutSession}
            onClick={handleCheckout}
            className=" self-center w-full max-w-[384px] min-h-[45px] text-gray-50 border border-black bg-black disabled:opacity-60 disabled:cursor-not-allowed mb-4 max-[768px]:max-w-none"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </section>
  );
}
