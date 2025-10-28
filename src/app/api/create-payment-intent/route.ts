import { NextRequest, NextResponse } from 'next/server';
const stripe = require('stripe')(process.env.STRIPE_SCRET_KEY);

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();

    const paymentIntent = await stripe.paymentIntent.create({
      amount: amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.clientSecret });
  } catch (error) {
    // Handle other erros (e.g., network issues, parsing erros)
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
