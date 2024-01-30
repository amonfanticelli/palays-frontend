import "tailwindcss/tailwind.css";
import Header from "@/components/Header";
import Stripe from "stripe";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { stripe } from "@/lib/stripe";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import { IPriceVariant, useGlobalContext } from "@/provider/store";
import Cart from "@/components/Cart";
import Footer from "@/components/Footer";
import { register } from "swiper/element/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import sinners from "../../../public/assets/products/palays-sinners/camiseta-sinners-costas.png";
import palays from "../../../public/assets/products/palays/camiseta-palyays-costas.png";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
    numberPrice: number;
    metadata: {
      secondaryImage: string;
    };
    priceVariants: IPriceVariant[];
  };
}

export default function Product({ product }: ProductProps) {
  const { isCartOpen, addToCart } = useGlobalContext();

  const [selectedPrice, setSelectedPrice] = useState<IPriceVariant | null>(
    null
  );

  const handleSelectSize = (size: string) => {
    const priceFound = product.priceVariants.find(
      (price) => price.nickname === size
    );
    if (priceFound) {
      setSelectedPrice(priceFound);
    }
  };

  // const { isFallback } = useRouter();
  // if (isFallback) {
  //   return <p>Loading...</p>;
  // }
  // loading da page -- pesquisar sobre skeleton page
  // console.log(
  //   "Valor de product.metadata.secondaryImage:",
  //   product.metadata.secondaryImage
  // );

  return (
    <>
      {isCartOpen && <Cart />}
      <Header />
      <div className="h-screen flex flex-col justify-between content-between relative">
        <section className="w-full h max-w-screen-xl mx-auto py-8 px-10 flex justify-between max-[768px]:px-4 max-[1260px]:flex max-[1260px]:flex-col max-[1260px]:items-center">
          <div className="flex flex-nowrap  w-full max-[1259px]:justify-center center-center ">
            <Image
              src={product.imageUrl}
              width={392}
              height={400}
              sizes="(max-width: 768px) 100vw"
              alt="imagem do produto"
            />

            {/* {product.name === "Camiseta Palays SINNERS" && (
              <Image
                src={sinners}
                width={392}
                height={400}
                sizes="(max-width: 768px) 100vw"
                alt="imagem do produto"
              />
            )}

            {product.name === "Camiseta Palays" && (
              <Image
                src={palays}
                width={392}
                height={400}
                sizes="(max-width: 768px) 100vw"
                alt="imagem do produto"
              />
            )} */}
          </div>

          <aside className="w-full max-w-[380px] flex flex-col max-[1260px]:max-w-[620px] max-[1260px]:mt-2">
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
            <div className="flex flex-col mb-3.5">
              <span className="font-normal font-helvetica text-sm text-gray-500 mb-2">
                Tamanho
              </span>
              <div className="flex gap-2 ">
                <button
                  onClick={() => handleSelectSize("pequeno")}
                  className={`py-2.5 px-5 rounded-3xl border ${
                    selectedPrice?.nickname === "pequeno"
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  } border-black font-helvetica text-sm`}
                >
                  P
                </button>
                <button
                  onClick={() => handleSelectSize("médio")}
                  className={`py-2.5 px-5 rounded-3xl ${
                    selectedPrice?.nickname === "médio"
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  } border border-black font-helvetica text-sm`}
                >
                  M
                </button>
                <button
                  onClick={() => handleSelectSize("grande")}
                  className={`py-2.5 px-5 rounded-3xl ${
                    selectedPrice?.nickname === "grande"
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  } border border-black font-helvetica text-sm`}
                >
                  G
                </button>
                <button
                  onClick={() => handleSelectSize("extra-grande")}
                  className={`py-2.5 px-5 rounded-3xl ${
                    selectedPrice?.nickname === "extra-grande"
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  } border border-black font-helvetica text-sm`}
                >
                  GG
                </button>
              </div>
            </div>

            {/* container buttons */}
            <div className="flex flex-col gap-1.5 mb-3.5">
              <button
                onClick={() => addToCart(product, selectedPrice!)}
                disabled={!selectedPrice}
                className="disabled:opacity-60 disabled:cursor-not-allowed w-full border border-black max-w-[343px] h-[45px] font-normal font-helvetica hover:bg-black hover:text-gray-50 transition duration-300"
              >
                ADICIONAR AO CARRINHO
              </button>
            </div>
            {/* container descrição */}
            <div className="flex flex-col gap-2">
              <span className="font-semibold font-helvetica">
                Descrição do Produto:
              </span>
              {product.description.split(";").map((item, index) => (
                <p
                  key={index}
                  className="font-normal font-helvetica text-slate-600"
                >
                  {item.trim()}{" "}
                </p>
              ))}
            </div>
          </aside>
        </section>
        <Footer />
      </div>
    </>
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

  // console.log(product);
  const price = product.default_price as Stripe.Price;

  const productPriceData = await stripe.prices.list({
    product: productId,
    active: true,
  });

  const allPrices = productPriceData.data;

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
        priceVariants: allPrices,
      },
    },
    //   revalidate: 60 * 60 * 1 // 1 hour
  };
};
