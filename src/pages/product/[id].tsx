import Header from "@/components/Header";
import Stripe from "stripe";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { stripe } from "@/lib/stripe";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { useGlobalContext } from "@/provider/store";
import Cart from "@/components/Cart";
import Footer from "@/components/Footer";
interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
    numberPrice: number;
  };
}

export default function Product({ product }: ProductProps) {
  const { isCartOpen, addToCart } = useGlobalContext();
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  // const { isFallback } = useRouter();
  // if (isFallback) {
  //   return <p>Loading...</p>;
  // }
  // loading da page -- pesquisar sobre skeleton page

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true);
      const response = await axios.post("/api/checkout", {
        priceId: product.defaultPriceId,
      });
      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (error) {
      setIsCreatingCheckoutSession(false);
      // Conectar com uma ferramenta de observabilidade (Datadog / Sentry)
      console.log(error);
    }
  }
  return (
    <div className="min-h-screen relative">
      {isCartOpen && <Cart />}
      <Header />
      <section className="w-full h max-w-screen-xl mx-auto py-8 px-10 flex justify-between">
        {/* <figure className="w-full h-full "> */}
        <Image
          src={product.imageUrl}
          width={620}
          height={620}
          alt="imagem do produto"
          style={{ maxWidth: "620px" }}
        />
        {/* </figure> */}

        <aside className="w-full max-w-[540px] flex flex-col">
          {/*  Preço, nome do produto e nome da marca */}
          <span className="font-normal font-helvetica text-xs text-gray-500 mb-1.5">
            {" "}
            PALAYS STORE{" "}
          </span>
          <h1 className="font-helvetica font-bold text-4xl mb-4">
            {" "}
            {product.name}
          </h1>
          <span className="font-normal font-helvetica text-lg mb-4">
            {product.price}
          </span>

          {/* container com tamanhos */}
          <div className="flex flex-col mb-3">
            <span className="font-normal font-helvetica text-sm text-gray-500 mb-2">
              Tamanho
            </span>
            <div className="flex gap-2 ">
              <button className="py-2.5 px-5 rounded-3xl rounded-l-3xl border border-black font-helvetica text-sm ">
                P
              </button>
              <button className="py-2.5 px-5 rounded-3xl border border-black font-helvetica text-sm">
                M
              </button>
              <button className="py-2.5 px-5 rounded-3xl border border-black font-helvetica text-sm">
                G
              </button>
              <button className="py-2.5 px-5 rounded-3xl border border-black font-helvetica text-sm">
                GG
              </button>
            </div>
          </div>
          {/* container quantidade de produtos */}
          <div className="flex flex-col mb-3">
            <span className="font-normal font-helvetica text-sm text-gray-500 mb-2">
              Quantidade
            </span>
          </div>
          {/* container buttons */}
          <div className="flex flex-col gap-1.5 mb-3.5">
            <button
              onClick={() => addToCart(product)}
              className="w-full border border-black max-w-[343px] h-[45px] font-normal font-helvetica hover:bg-black hover:text-gray-50 transition duration-300"
            >
              ADICIONAR AO CARRINHO
            </button>
            {/* <button
              disabled={isCreatingCheckoutSession}
              onClick={handleBuyProduct}
              className="w-full border border-black bg-black max-w-[343px] h-[45px] text-gray-50 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              COMPRAR
            </button> */}
          </div>
          {/* container descrição */}
          <div className="flex flex-col gap-2">
            <span className="font-semibold font-helvetica">
              Descrição do Produto:
            </span>
            <p className="font-normal font-helvetica text-slate-600">
              {product.description}
            </p>
          </div>
        </aside>
      </section>
      <Footer />
    </div>
  );
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   // passar no paths os ids mais buscados e vendidos.
//   return {
//     paths: [{ params: { id: "prod_OLz4FDE6vLsjcX" } }],
//     fallback: true,
//   };
// };

export const getServerSideProps: GetServerSideProps<
  any,
  { id: string }
> = async ({ params }) => {
  const productId = params!.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount! / 100),
        numberPrice: price.unit_amount! / 100,
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    //   revalidate: 60 * 60 * 1, 1 hour
  };
};
