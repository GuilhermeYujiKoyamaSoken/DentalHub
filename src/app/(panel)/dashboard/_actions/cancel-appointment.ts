'use server'

import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { error } from 'console'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const formSchema = z.object({
    appointmentId: z.string().min(1, "Você precisa fornecer um agendamento!")
})

type FormSchema = z.infer<typeof formSchema>

export async function CancelAppointment(formData: FormSchema) {

    const schema = formSchema.safeParse(formData);

    if (!schema.success) {
        return {
            error: schema.error.issues[0]?.message
        }
    }

    const session = await auth();

    if (!session?.user?.id) {
        return {
            error: "Usuário não encontrado!"
        }
    }

    try {

        await prisma.appointment.delete({
            where: {
                id: formData.appointmentId,
                userId: session.user?.id
            }
        })

        revalidatePath("/dashboard")

        return {
            data: "Agendamento deletado com sucesso!"
        }

    } catch (error) {
        return {
            error: "ocorreu um erro ao deletar agendamento!"
        }
    }
}