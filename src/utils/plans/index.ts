
export type PlanDetailsProps = {
    maxServices: number;
}

export type PlansProps = {
    BASIC: PlanDetailsProps,
    PROFESSIONAL: PlanDetailsProps
}

export const PLANS: PlansProps = {
    BASIC: {
        maxServices: 10
    },

    PROFESSIONAL: {
        maxServices: 100
    }
}

export const subscriptionPlans = [
    {
        id: "BASIC",
        name: "Basic",
        description: "Perfeito para clínicas menores",
        oldPrice: "R$ 40,00",
        price: "R$ 27,90",
        features: [
            `Até ${PLANS["BASIC"].maxServices} serviços`,
            'Agendamentos ilimitados',
            'Suporte'
        ]
    },

    {
        id: "PROFESSIONAL",
        name: "Profissional",
        description: "ideal para clínicas grandes",
        oldPrice: "R$ 150,00",
        price: "R$ 97,00",
        features: [
            `Até ${PLANS["PROFESSIONAL"].maxServices} serviços`,
            'Agendamentos ilimitados',
            'Destaque na página principal',
            'Suporte prioritário',
        ]
    }
]