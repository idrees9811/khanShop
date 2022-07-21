import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY )

export default async function handler(req, res) {
    // console.log("Body",req.body)
    // console.log("Request",res)
    if (req.method === 'POST') {
        // console.log("Body",req.body)
        try {
            const params = {
                submit_type: 'pay',
                mode:'payment',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                shipping_options: [
                    {shipping_rate: 'shr_1LMzFnGElWE2VfB6dmZiZi3l'},
                    {shipping_rate: 'shr_1LMzGuGElWE2VfB6zMzznubT'},
                ],
                line_items: req.body.map((item) => {
                    const img = item.images[0].asset._ref;
                    const newImage = img.replace('image', 'https://cdn.sanity.io/images/8rvtvq30/production/').replace('-webp', '.webp')

                    // console.log('Images', newImage)

                    return{
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: item.name,
                                images: [newImage],
                            },
                            unit_amount: item.price*100,
                        },
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                        },
                        quantity: item.quantity
                    }
                }),
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/?canceled=true`,
            }

            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create(params);
            // console.log("Session",session)
            res.status(200).json(session)
            res.redirect(303, session.url);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    }
}