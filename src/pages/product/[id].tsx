import "tailwindcss/tailwind.css";
import Header from "@/components/Header";
import Stripe from "stripe";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { stripe } from "@/lib/stripe";
import { useRouter } from "next/router";
import Image from "next/image";
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
    priceVariants: [
      {
        id: string;
        nickname: string;
      }
    ];
  };
}

export default function Product({ product }: ProductProps) {
  const [buttonSmallStyle, setButtonSmallStyle] = useState(false);
  const [buttonMediumStyle, setButtonMediumStyle] = useState(false);
  const [buttonLargeStyle, setButtonLargeStyle] = useState(false);
  const [buttonExtraLargeStyle, setButtonExtraLargeStyle] = useState(false);
  // const [priceSelected, setPriceSelected] = useState(product.defaultPriceId);

  const productPriceIDs = product.priceVariants.map((priceVariant) => ({
    priceId: priceVariant.id,
    size: priceVariant.nickname,
  }));

  const handleSizeP = () => {
    const priceIdForSizeP = productPriceIDs.find(
      (price) => price.size === "pequeno"
    );

    console.log({ primeiroIDEncontrado: priceIdForSizeP });
    if (priceIdForSizeP) {
      product.defaultPriceId = priceIdForSizeP.priceId;
      setButtonSmallStyle(true);
      setButtonMediumStyle(false);
      setButtonLargeStyle(false);
      setButtonExtraLargeStyle(false);
    }

    console.log({ IDSetado: product.defaultPriceId });
  };

  const handleSizeM = () => {
    const priceIdForSizeM = productPriceIDs.find(
      (price) => price.size === "médio"
    );
    if (priceIdForSizeM) {
      product.defaultPriceId = priceIdForSizeM.priceId;
      setButtonMediumStyle(true);
      setButtonSmallStyle(false);
      setButtonLargeStyle(false);
      setButtonExtraLargeStyle(false);
    }
  };

  const handleSizeG = () => {
    const priceIdForSizeG = productPriceIDs.find(
      (price) => price.size === "grande"
    );
    if (priceIdForSizeG) {
      product.defaultPriceId = priceIdForSizeG.priceId;
      setButtonLargeStyle(true);
      setButtonMediumStyle(false);
      setButtonSmallStyle(false);
      setButtonExtraLargeStyle(false);
    }
  };

  const handleSizeGG = () => {
    const priceIdForSizeGG = productPriceIDs.find(
      (price) => price.size === "extra-grande"
    );
    if (priceIdForSizeGG) {
      product.defaultPriceId = priceIdForSizeGG.priceId;
      setButtonExtraLargeStyle(true);
      setButtonLargeStyle(false);
      setButtonMediumStyle(false);
      setButtonSmallStyle(false);
    }
  };

  const { isCartOpen, addToCart } = useGlobalContext();

  // const { isFallback } = useRouter();
  // if (isFallback) {
  //   return <p>Loading...</p>;
  // }
  // loading da page -- pesquisar sobre skeleton page

  return (
    <div className="min-h-screen relative">
      {isCartOpen && <Cart />}
      <Header />
      <section className="w-full h max-w-screen-xl mx-auto py-8 px-10 flex justify-between max-[768px]:px-4 max-[1260px]:flex max-[1260px]:flex-col max-[1260px]:items-center">
        {/* <figure className="w-full h-full "> */}
        <Image
          src={product.imageUrl}
          width={620}
          height={620}
          sizes="(max-width: 768px) 100vw"
          alt="imagem do produto"
        />
        {/* </figure> */}

        <aside className="w-full max-w-[540px] flex flex-col max-[1260px]:max-w-[620px] max-[1260px]:mt-2">
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
                onClick={handleSizeP}
                className={`py-2.5 px-5 rounded-3xl border ${
                  buttonSmallStyle
                    ? "bg-black text-white"
                    : "bg-white text-black"
                } border-black font-helvetica text-sm`}
              >
                P
              </button>
              <button
                onClick={handleSizeM}
                className={`py-2.5 px-5 rounded-3xl ${
                  buttonMediumStyle
                    ? "bg-black text-white"
                    : "bg-white text-black"
                } border border-black font-helvetica text-sm`}
              >
                M
              </button>
              <button
                onClick={handleSizeG}
                className={`py-2.5 px-5 rounded-3xl ${
                  buttonLargeStyle
                    ? "bg-black text-white"
                    : "bg-white text-black"
                } border border-black font-helvetica text-sm`}
              >
                G
              </button>
              <button
                onClick={handleSizeGG}
                className={`py-2.5 px-5 rounded-3xl ${
                  buttonExtraLargeStyle
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
              onClick={() => addToCart(product)}
              className="w-full border border-black max-w-[343px] h-[45px] font-normal font-helvetica hover:bg-black hover:text-gray-50 transition duration-300"
            >
              ADICIONAR AO CARRINHO
            </button>
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
