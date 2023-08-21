import { NextApiRequest, NextApiResponse } from 'next'


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method === 'POST'){
        try {
            const session = await stripe.checkout.sessions.create({
                line_items: req.body.lineItems,
                mode: 'payment',
                payment_method_types: ['card'],
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/?canceled=true`,
            })

            return res.status(201).json(session)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}