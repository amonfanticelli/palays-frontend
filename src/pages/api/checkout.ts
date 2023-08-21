// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@/lib/stripe";
import { ICartItem } from "@/provider/store";

export default async function handlerProducts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { products } = req.body as { products: ICartItem[] };

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!products) {
    return res.status(400).json({ error: "Products not found." });
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}`;

  const checkoutSession = await stripe.checkout.sessions.create({
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
    custom_fields: [
      {
        key: "size",
        label: {
          custom: "Size",
          type: "custom",
        },
        dropdown: {
          options: [
            {
              label: "P",
              value: "small",
            },
            {
              label: "M",
              value: "medium",
            },
            {
              label: "G",
              value: "big",
            },
          ],
        },
        type: "dropdown",
      },
    ],
    mode: "payment",
    success_url: successUrl,
    cancel_url: cancelUrl,

    line_items: products.map(({ prod, quantity }) => ({
      price: prod.defaultPriceId,
      quantity: quantity,
    })),
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
