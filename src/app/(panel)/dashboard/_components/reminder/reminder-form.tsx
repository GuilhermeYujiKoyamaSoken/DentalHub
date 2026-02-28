'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { min } from 'date-fns'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const remiderSchema = z.object({
    description: z.string().min(1, "A descrição do lembrete é obrigatória")
})

export type ReminderFormData = z.infer<typeof remiderSchema>

export function UseReminderForm() {
    return useForm<ReminderFormData>({
        resolver: zodResolver(remiderSchema),
        defaultValues: {
            description: ""
        }
    })
}