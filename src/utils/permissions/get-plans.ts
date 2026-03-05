'use server'

import { Plan } from "@prisma/client"
import { PlansProps } from "../plans"

export interface PlanDetailsInfo{
    maxServices: number
}

const PLANS_LIMITS: PlansProps = {
    BASIC: {
        maxServices: 10
    },

    PROFESSIONAL: {
        maxServices: 100
    }
}

export async function GetPlan(planId: Plan) {

    return PLANS_LIMITS[planId]
}