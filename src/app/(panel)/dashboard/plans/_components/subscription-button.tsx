'use client'

import { Button } from "@/components/ui/button"
import { Plan } from "@prisma/client"
import { CreateSubscription } from "../_actions/create-subscription"
import { toast } from "sonner"
import { getStripeJs } from "@/utils/stripe-js"

interface SubscriptionButtonProps {
    type: Plan
}

export function SubscriptionButton({ type }: SubscriptionButtonProps) {

    async function handleCreateBiling() {

        const { sessionId, error, url } = await CreateSubscription({ type: type })

        if (error) {
            toast.error(error);
            return;
        }

        const stripe = await getStripeJs();

        if (stripe && url) {
            window.location.href = url;
        }
    }

    return (
        <Button
            className={`w-full bg-black ${type === "PROFESSIONAL" && "bg-emerald-500 hover:bg-emerald-300"}`}
            onClick={handleCreateBiling}
        >
            FAZER ASSINATURA
        </Button>
    )
}