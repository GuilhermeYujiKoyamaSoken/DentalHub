'use server'

import prisma from "@/lib/prisma"

export async function GetTimesClinic({ userId }: { userId: string }) {

    if (!userId) {
        return {
            times: []
        }
    }

    try {

        const user = await prisma.user.findFirst({
            where: {
                id: userId
            },
            select: {
                id: true,
                times: true
            }
        })

        if (!user) {
            return {
                times: [],
                userId: ""
            }
        }

        return {
            times: user.times,
            user: user.id
        }

    } catch (error) {
        console.log(error)
        return {
            times: [],
            userId: ""
        }
    }
}