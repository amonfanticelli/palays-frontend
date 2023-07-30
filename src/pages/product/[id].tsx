import Header from "@/components/Header";
import Stripe from "stripe";
import { GetStaticPaths, GetStaticProps } from "next";
import { stripe } from "@/lib/stripe";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
  };
  // bota um colchete no final pois é um array de produtos
}

export default function Product({ product }: ProductProps) {
  return (
    <>
      <Header />
      <div>
        <h1>olá</h1>
        <span>outfitPrice: {product.price}</span> <br></br>
        <span>outfitName: {product.name}</span> <br></br>
        <span>outfitName: {product.description}</span> <br></br>
        <span>outfitId: {product.id}</span>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // passar no paths os ids mais buscados e vendidos.
  return {
    paths: [{ params: { id: "prod_OLz4FDE6vLsjcX" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
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
        description: product.description,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};
