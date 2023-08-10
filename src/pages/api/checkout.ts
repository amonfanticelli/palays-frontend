// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@/lib/stripe";
import { IProduct } from "@/provider/store";
import { ICartItem } from "@/provider/store";

export default async function handlerProducts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { products } = req.body as { products: ICartItem[] };
  console.log(products);
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!products) {
    return res.status(400).json({ error: "Products not found." });
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "brl",
          },
          display_name: "Frete Grátis",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "brl",
          },
          display_name: "Entrega no próximo Dia",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    invoice_creation: {
      enabled: true,
    },
    payment_method_types: ["card", "boleto"],
    shipping_address_collection: {
      allowed_countries: ["BR"],
    },
    phone_number_collection: {
      enabled: true,
    },
    mode: "payment",
    line_items: products.map(({ prod }) => ({
      price: prod.defaultPriceId,
      quantity: 1,
    })),
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
