'use server'

import prisma from "@/lib/prisma"
import { addDays, differenceInDays, isAfter } from "date-fns";
import { TRIAL_DAYS } from "../trial-limits";

export async function CheckSubscription(userId: string) {

    const user = await prisma.user.findFirst({
        where: {
            id: userId
        },
        include: {
            subscription: true
        }
    })

    if (!user) {

        throw new Error("Usuário não encontrado!");
    }

    if(user.subscription && user.subscription.status === 'active') {
        return {
            subscriptionsStatus: "active",
            message: "Assinatura ativa",
            planId: user.subscription.plan
        }
    }

    const trialEndDate = addDays(user.createdAt, TRIAL_DAYS);

    if (isAfter(new Date(), trialEndDate)) {

        return {
            subscriptionsStatus: "EXPIRED",
            message: "Seu período de teste expirou!",
            planId: "TRIAL"
        }
    }

    const daysremaining = differenceInDays(trialEndDate, new Date());
    return {
        subscriptionsStatus: "TRIAL",
        message: `Você está no período de teste gratuito. Faltam ${daysremaining} dias para expirar`,
        planId: "TRIAL"
    }
}