'use server'

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma";
import { stripe } from '@/utils/stripe'

export async function CreatePortalCustomer() {
    const session = await auth();

    if (!session?.user?.id) {
        return {
            sessionId: "",
            error: "Usuário não autenticado!"
        }
    }

    const user = await prisma.user.findFirst({
        where: {
            id: session?.user?.id
        }
    })

    if (!user) {
        return {
            sessionId: "",
            error: "Usuário não encontrado!"
        }
    }

    const stripeCustomerId = user.stripe_customer_id;

    if (!stripeCustomerId) {
        return {
            sessionId: "",
            error: "Usuário não possui assinatura ativa no Stripe!"
        }
    }

    try {
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: stripeCustomerId,
            return_url: process.env.STRIPE_SUCCESS_URL as string
        })

        return {
            sessionId: portalSession.url, 
            error: null
        }

    } catch (error) {
        console.log("Erro ao criar portal:", error)
        return {
            sessionId: "",
            error: "Erro ao acessar portal de faturamento!"
        }
    }
}