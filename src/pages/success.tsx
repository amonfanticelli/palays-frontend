import "tailwindcss/tailwind.css";
import Image from "next/image";
import Link from "next/link";
import palays from "../../public/assets/palays.png";
import { GetServerSideProps } from "next";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

interface SuccessProps {
  customerName: string;
  productsImages: string[];
}

export default function Success({
  customerName,
  productsImages,
}: SuccessProps) {
  return (
    <>
      <header className="w-full flex mb-[100px]">
        <div className="w-full min-h-[73px] flex items-center justify-center border-b-2 border-gray-300">
          <Link href={"/"}>
            <Image
              src={palays}
              alt="logo da marca palays"
              width={250}
              height={50}
            />
          </Link>
        </div>
      </header>
      <div className="flex flex-col items-center">
        <section className="flex items-center justify-center gap-4 max-[1024px]:max-w-[375px] flex-wrap">
          {productsImages.map((image, i) => (
            <div
              key={i}
              className=" flex items-center justify-center rounded-full relative w-[140px] h-[140px] shadow-[8px_8px_68px_0_rgba(0,0,0,0.8)]"
            >
              <Image
                src={image}
                alt="imagem do produto comprado"
                width={120}
                height={120}
              />
            </div>
          ))}
        </section>

        <h2 className="font-helvetica flex justify-center mt-11 mb-6 font-bold text-3xl text-green-600">
          Compra efetuada!
        </h2>

        <section className="flex justify-center px-4">
          <p className="max-w-xl font-helvetica font-normal text-2xl">
            Uhuul! <strong>{customerName},</strong> sua compra de{" "}
            {productsImages.length}{" "}
            {productsImages.length === 1 ? "camiseta" : "camisetas"} já está a
            caminho da sua casa.
          </p>
        </section>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details?.name;
  const productsImages = session.line_items?.data.map((item) => {
    const product = item.price?.product as Stripe.Product;
    return product.images[0];
  });

  return {
    props: {
      customerName,
      productsImages,
    },
  };
};
