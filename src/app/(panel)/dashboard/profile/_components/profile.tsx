'use client'

import { useState } from 'react'
import { ProfileFormData, useProfileForm } from './profile-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ImageTest from '../../../../../../public/doctor-image.png'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Prisma } from '@prisma/client'
import { updateProfile } from '../_actions/update-profile'
import { toast } from 'sonner'
import { formatPhone } from '@/utils/formatPhone'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type UserWithSubscription = Prisma.UserGetPayload<{
    include: {
        subscription: true
    }
}>

interface ProfileContentProps {
    user: UserWithSubscription;
}

export function ProfileContent({ user }: ProfileContentProps) {

    const router = useRouter();
    const [selectedHours, setSelectedHours] = useState<string[]>(user.times ?? []);
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const { update } = useSession();

    const form = useProfileForm({
        name: user.name,
        adress: user.address,
        phone: user.phone,
        status: user.status,
        timeZone: user.timeZone
    });

    function generateTimeSlot(): string[] {
        const hours: string[] = [];
        for (let i = 8; i <= 23; i++) {
            for (let j = 0; j < 2; j++) {
                const hour = i.toString().padStart(2, "0");
                const minute = (j * 30).toString().padStart(2, "0");
                hours.push(`${hour}:${minute}`)
            }
        }

        return hours;
    }

    const hours = generateTimeSlot();

    function toggleHour(hour: string) {
        setSelectedHours((prev) => prev.includes(hour) ? prev.filter(h => h !== hour) : [...prev, hour].sort())
    }

    const timeZones = Intl.supportedValuesOf("timeZone").filter((zone) =>
        zone.startsWith("America/Sao_Paulo") ||
        zone.startsWith("America/Fortaleza") ||
        zone.startsWith("America/Recife") ||
        zone.startsWith("America/Bahia") ||
        zone.startsWith("America/Belem") ||
        zone.startsWith("America/Manaus") ||
        zone.startsWith("America/Cuiaba") ||
        zone.startsWith("America/Boa_Vista")
    )

    async function onSubmit(values: ProfileFormData) {

        const response = await updateProfile({
            name: values.name,
            address: values.address,
            status: values.status === 'active' ? true : false,
            phone: values.phone,
            timeZone: values.timeZone,
            times: selectedHours || []

        })

        if (response.error) {
            toast.error(response.error, { position: "bottom-right" })
        }

        toast.success(response.data, { position: "bottom-right" });

    }

    async function handleLogout() {
        await signOut({ callbackUrl: "/" });
    }

    return (
        <div className='mx-auto'>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-xl font-bold">
                                Meu perfil
                            </CardTitle>

                            <Button
                                variant="ghost"
                                onClick={handleLogout}
                                className="text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                            >
                                Sair da conta
                            </Button>
                        </CardHeader>

                        <CardContent className='space-y-6'>

                            <div className='flex justify-center'>
                                <div className='bg-gray-200 relative h-40 w-40 rounded-full overflow-hidden'>
                                    <Image
                                        src={user.image ? user.image : ImageTest}
                                        alt='foto da clínica'
                                        fill
                                        className='object-cover'
                                    >
                                    </Image>
                                </div>
                            </div>

                            <div className='space-y-4'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-semibold'> Nome completo: </FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder='Digite o nome da clínica'></Input>
                                            </FormControl>
                                            <FormMessage></FormMessage>
                                        </FormItem>
                                    )}
                                >
                                </FormField>

                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-semibold'> Endereço completo: </FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder='Digite o endereço da clínica'></Input>
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
                                        <FormItem>
                                            <FormLabel className='font-semibold'> Telefone: </FormLabel>
                                            <FormControl>
                                                <Input {...field}
                                                    placeholder='(67) 90000-0000'
                                                    onChange={(e) => {
                                                        const formattedValue = formatPhone(e.target.value);
                                                        field.onChange(formattedValue)
                                                    }}
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
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-semibold'> Status da clínica: </FormLabel>
                                            <FormControl>

                                                <Select onValueChange={field.onChange} defaultValue={field.value ? 'active' : 'inactive'}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione o status da clínica">
                                                        </SelectValue>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value='active'>Ativo (clínica aberta)</SelectItem>
                                                        <SelectItem value='inactive'>Inativo (clínica aberta)</SelectItem>
                                                    </SelectContent>
                                                </Select>

                                            </FormControl>

                                        </FormItem>
                                    )}
                                >
                                </FormField>

                                <div className='space-y-2'>
                                    <Label className='font-semibold'>
                                        Configurar horários da clínica:
                                    </Label>

                                    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                                        <DialogTrigger asChild>
                                            <Button variant={'outline'} className='w-full justify-between'>
                                                Clique aqui para selecionar horários
                                                <ArrowRight className='w-5 h-5'></ArrowRight>
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Horários da clínica</DialogTitle>
                                                <DialogDescription>
                                                    Selecione abaixo os horários de funcionamento da clínica:
                                                </DialogDescription>
                                            </DialogHeader>

                                            <section className='py-4'>
                                                <p className='text-sm text-muted-foreground mb-2'>
                                                    Clique nos horários abaixo para marcar ou desmarcar:
                                                </p>

                                                <div className='grid grid-cols-5 gap-2'>
                                                    {hours.map((hour) => (
                                                        <Button
                                                            key={hour}
                                                            variant={'outline'}
                                                            className={cn('h-10', selectedHours.includes(hour) && ' border-2 border-emerald-500 text-primary')}
                                                            onClick={() => toggleHour(hour)}
                                                        >
                                                            {hour}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </section>

                                            <Button className='w-full' onClick={() => setDialogIsOpen(false)}>
                                                Salvar horários
                                            </Button>
                                        </DialogContent>
                                    </Dialog>
                                </div>

                                <FormField
                                    control={form.control}
                                    name="timeZone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-semibold'> Selecione o fuso horário </FormLabel>
                                            <FormControl>

                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione o seu fuso horário">
                                                        </SelectValue>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {timeZones.map((zone) => (
                                                            <SelectItem key={zone} value={zone}>{zone}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>

                                            </FormControl>

                                        </FormItem>
                                    )}
                                >
                                </FormField>

                                <Button
                                    type='submit'
                                    className='w-full bg-emerald-500 hover:bg-emerald-300'
                                >
                                    Salvar alterações
                                </Button>

                            </div>

                        </CardContent>
                    </Card>

                </form>
            </Form>

        </div>
    )
}