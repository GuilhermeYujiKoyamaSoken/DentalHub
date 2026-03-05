import { ManageSubscription } from "@/utils/manage-subscription";
import { stripe } from "@/utils/stripe";
import { Plan } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (request: Request) => {

    const signature = request.headers.get("stripe-signature");

    if (!signature) {
        return NextResponse.error();
    }

    const text = await request.text();

    const event = stripe.webhooks.constructEvent(
        text,
        signature,
        process.env.STRIPE_SECRET_WEBHOOK_KEY as string
    );

    switch (event.type) {

        case "customer.subscription.deleted":
            const payment = event.data.object as Stripe.Subscription;

            await ManageSubscription(
                payment.id,
                payment.customer.toString(),
                false,
                true
            )

            break;

        case "customer.subscription.updated":
            const paymentintent = event.data.object as Stripe.Subscription;

            await ManageSubscription(
                paymentintent.id,
                paymentintent.customer.toString(),
                false
            )

            revalidatePath("/dashboard/plans");

            break;

        case "checkout.session.completed":
            const checkoutSession = event.data.object as Stripe.Checkout.Session;

            const type = checkoutSession?.metadata?.type ? checkoutSession?.metadata?.type : "BASIC";

            if (checkoutSession.subscription && checkoutSession.customer) {
                await ManageSubscription(
                    checkoutSession.subscription.toString(),
                    checkoutSession.customer.toString(),
                    true,
                    false,
                    type as Plan
                )
            }

            revalidatePath("/dashboard/plans");

            break;

        default:
            console.log("Evento não tratado: ", event.type);
    };

    return NextResponse.json({ received: true });
}