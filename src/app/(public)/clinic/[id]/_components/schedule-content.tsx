'use client'

import Image from "next/image"
import imageTest from "../../../../../../public/doctor-image.png"
import { Divide, MapPin } from "lucide-react"
import { Prisma } from "@prisma/client"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AppointmentFormData, UseAppointmentForm } from "./schedule-form"
import { Label } from "@/components/ui/label"
import { formatPhone } from "@/utils/formatPhone"
import { DateTimePicker } from "./date-picker"
import { handleRegister } from "@/app/(public)/_actions/login"

type UserWithServiceAndSubscription = Prisma.UserGetPayload<{
    include: {
        subscription: true,
        services: true
    }
}>

interface ScheduleContentProps {
    clinic: UserWithServiceAndSubscription
}

export function ScheduleContent({ clinic }: ScheduleContentProps) {

    const form = UseAppointmentForm();
    const { watch } = form

    async function handleRegisterAppointment(formData: AppointmentFormData){

    }

    return (

        <div className="min-h-screen flex flex-col">

            <div className="h-32 bg-emerald-500"></div>

            <section className="container mx-auto px-4 -mt-16">

                <div className="max-w-2xl mx-auto">
                    <article className="flex flex-col items-center">

                        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white mb-8">
                            <Image
                                src={clinic.image ? clinic.image : imageTest}
                                alt="Foto de perfil da clínica"
                                className="object-cover"
                                fill
                            >
                            </Image>
                        </div>

                        <h1 className="text-2xl font-bold mb-2">{clinic.name}</h1>

                        <div className="flex items-center gap-1">
                            <MapPin className="w-5 h-5"></MapPin>
                            <span>{clinic.address ? clinic.address : "Endereço não informado!"}</span>
                        </div>

                    </article>
                </div>

            </section>

            <section className="max-w-2xl mx-auto w-full mt-6">
                <Form {...form}>
                    <form 
                        className="mx-2 space-y-6 bg-white p-6 border rounded-md shadow-sm"
                        onSubmit={form.handleSubmit(handleRegisterAppointment)}
                    >

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="y-2">
                                    <FormLabel className="font-semibold">Nome completo:</FormLabel>
                                    <FormControl>
                                        <Input id="name" placeholder="Digite seu nome completo" {...field}></Input>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}
                        >
                        </FormField>

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="y-2">
                                    <FormLabel className="font-semibold">Email:</FormLabel>
                                    <FormControl>
                                        <Input id="email" placeholder="Digite seu email" {...field}></Input>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}
                        >
                        </FormField>

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="y-2">
                                    <FormLabel className="font-semibold">Telefone:</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            id="phone"
                                            placeholder="(XX) XXXXXX-XXXX"
                                            onChange={(e) => {
                                                const formattedValue = formatPhone(e.target.value)
                                                field.onChange(formattedValue)
                                            }
                                            }
                                        >
                                        </Input>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}
                        >
                        </FormField>

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="y-2">
                                    <FormLabel className="font-semibold">Email:</FormLabel>
                                    <FormControl>
                                        <Input id="email" placeholder="Digite seu email" {...field}></Input>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}
                        >
                        </FormField>

                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex items-center gap-2 space-y-1">
                                    <FormLabel className="font-semibold">Data do agendamento:</FormLabel>
                                    <FormControl>
                                        <DateTimePicker
                                            initialDate={new Date()}
                                            className="w-full rounded border p-2"
                                            onChange={(date) => {
                                                if (date) {
                                                    field.onChange(date)
                                                }
                                            }}
                                        >
                                        </DateTimePicker>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}
                        >
                        </FormField>

                        <FormField
                            control={form.control}
                            name="serviceId"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel className="font-semibold">Selecione o serviço:</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione um serviço"></SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {clinic.services.map((service) => (
                                                    <SelectItem key={service.id} value={service.id}>
                                                        {service.name} - ({Math.floor(service.duration / 60)}h {service.duration % 60}min)
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}
                        >
                        </FormField>

                        {clinic.status ? (
                            <Button
                                className="w-full bg-emerald-500 hover:bg-emerald-300"
                                type="submit"
                                disabled={!form.watch('name') || !form.watch('email') || !form.watch('phone') || !form.watch('date')}
                            >
                                Realizar agendamento
                            </Button>
                        ) : (
                            <p className="bg-red-500 text-white text-center px-4 py-2 rounded-md">A clínica está fechada nesse momento!</p>
                        )}

                    </form>
                </Form>
            </section>

        </div>
    )
}