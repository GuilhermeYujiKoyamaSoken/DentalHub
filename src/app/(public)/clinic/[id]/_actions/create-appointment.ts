'use server'

import prisma from '@/lib/prisma'
import { email, z } from 'zod'

const formSchema = z.object({
    name: z.string().min(1, 'O nome é obirgatório!'),
    email: z.string().min(1, 'O email é obirgatório!'),
    phone: z.string().min(1, 'O telefone é obirgatório!'),
    date: z.date(),
    serviceId: z.string().min(1, 'O serviço é obirgatório!'),
    time: z.string().min(1, 'O horário é obirgatório!'),
    clinicId: z.string().min(1, 'O horário é obirgatório!'),
})

type FormSchema = z.infer<typeof formSchema>

export async function CreateNewAppointment(formData: FormSchema) {
    const schema = formSchema.safeParse(formData)

    if (!schema.success) {
        return {
            error: schema.error.issues[0].message
        }
    }

    try {

        const selectedDate = new Date(formData.date);

        const year = selectedDate.getFullYear();
        const mouth = selectedDate.getMonth();
        const day = selectedDate.getDate();

        const appointmentDate = new Date(Date.UTC(year, mouth, day, 0, 0, 0, 0));

        const newAppointment = await prisma.appointment.create({
            data: {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                time: formData.time,
                appointmentDate: appointmentDate,
                serviceId: formData.serviceId,
                userId: formData.clinicId
            }
        })

        return {
            data: newAppointment
        }

    } catch (error) {
        console.log(error)
        return {
            error: "Erro ao cadastrar o agendamento!"
        }
    }
}