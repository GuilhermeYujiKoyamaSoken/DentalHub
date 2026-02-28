'use server'

import prisma from "@/lib/prisma"

export async function GetProfessionals(){

    try {

        const professionals= await prisma.user.findMany({
            where: {
                status: true
            }
        })

        return professionals;

    } catch (error) {
        return[]
    }
}