"use client";
import "tailwindcss/tailwind.css";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { register } from "swiper/element/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { stripe } from "@/lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import Cart from "@/components/Cart";
import { useGlobalContext } from "@/provider/store";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[];
  // bota um colchete no final pois é um array de produtos
}

export default function Home({ products }: HomeProps) {
  register();
  const { isCartOpen } = useGlobalContext();
  return (
    <>
      {isCartOpen && <Cart />}
      <Header />
      <main className="w-full max-w-screen-xl mx-auto py-7 px-10 ">
        <h1 className="w-full text-2xl font-helvetica font-bold mb-8">Store</h1>

        <section className="w-full flex gap-3 ">
          <Swiper
            modules={[Navigation, Pagination, A11y, EffectFade]}
            slidesPerView={3}
            spaceBetween={10}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation={true}
            grabCursor={true}
            longSwipes={false}
            // a11y={true}

            breakpoints={{
              700: {
                slidesPerView: 3,
                spaceBetween: 10,
              },

              550: {
                slidesPerView: 2,
                spaceBetween: 10,
              },

              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <Link
                  href={`/product/${product.id}`}
                  className="w-[269px] flex flex-col"
                  prefetch={false}
                >
                  <figure>
                    <Image
                      className="mx-auto"
                      src={product.imageUrl}
                      alt="imagem do card"
                      width={250}
                      height={250}
                    />
                  </figure>

                  <div className="flex flex-col py-6">
                    <span className=" font-bold text-sm font-helvetica">
                      {" "}
                      {product.name}
                    </span>
                    <span className="font-normal font-helvetica text-base">
                      {product.price}{" "}
                    </span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });
  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount! / 100),
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, //  2 hours
  };
};
