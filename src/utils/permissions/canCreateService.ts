'use server'

import prisma from "@/lib/prisma";
import { Subscription } from "@prisma/client";
import { Session } from "next-auth";
import { GetPlan } from "./get-plans";
import { PLANS } from "../plans";
import { CheckSubscriptionExpired } from "./checkSubscriptionExpired";
import { ResultPermissionProp } from "./canPermission";

export async function CanCreateService(subscription: Subscription | null, session: Session) : Promise<ResultPermissionProp> {

    try {

        const serviceCount = await prisma.service.count({
            where: {
                userId: session?.user?.id,
                status: true
            }
        })

        if (subscription && subscription.status === "active") {

            const plan = subscription.plan;
            const planLimits = await GetPlan(plan);

            return {
                hasPermission: planLimits.maxServices === null || serviceCount < planLimits.maxServices,
                planId: subscription.plan,
                expired: false,
                plan: PLANS[subscription.plan]
            }
        }

        const checkUserLimit = await CheckSubscriptionExpired(session);

        return checkUserLimit;

    } catch (error) {
        return {
            hasPermission: false,
            planId: "EXPIRED",
            expired: false,
            plan: null
        }
    }
}