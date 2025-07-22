import Stripe from "stripe";

export async function POST(request: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return new Response(JSON.stringify({ error: "STRIPE_SECRET_KEY is not set in environment variables." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  //nothing aa 
  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2025-06-30.basil",
  });
  const origin = request.headers.get("origin") || "";
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Mock Product",
            },
            unit_amount: 1000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
    });

    return new Response(JSON.stringify({ id: session.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
