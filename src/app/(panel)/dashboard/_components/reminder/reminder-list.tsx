'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Reminder } from "@prisma/client"
import { Plus, Trash } from "lucide-react"
import { DeleteReminder } from "../../_actions/delete-reminder"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ReminderContent } from "./reminder-content"
import { useState } from "react"

interface ReminderListProps {
    reminder: Reminder[]
}

export function ReminderList({ reminder }: ReminderListProps) {

    const router = useRouter();

    const [isDialogOpen, setDialogOpen] = useState(false)

    async function handleDeleteReminder(id: string) {
        const response = await DeleteReminder({ reminderId: id })

        if (response?.error) {
            toast.error(response.error);
            return;
        }

        toast.success(response.data);
        router.refresh();
    }

    return (
        <div className="flex flex-col gap-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl md:text-2xl font-bold">Lembretes</CardTitle>

                    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                variant={'ghost'}
                                className="w-9 p-0"
                            >
                                <Plus className="w-5 h-5"></Plus>
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="sm: max-w-106.25">
                            <DialogHeader>
                                <DialogTitle>Novo lembrete</DialogTitle>
                                <DialogDescription>Criar um novo lembrete</DialogDescription>
                            </DialogHeader>

                            <ReminderContent
                                closeDialog={() => { setDialogOpen(false) }}
                            >
                            </ReminderContent>

                        </DialogContent>
                    </Dialog>

                </CardHeader>

                <CardContent>
                    {reminder.length === 0 && (
                        <p className="text-sm text-gray-500">Nenhum lembrete registrado</p>
                    )}

                    <ScrollArea className="h-85 lg:max-h-[calc(100vh - 15rem)] pr-0 w-full flex-1">

                        {reminder.map((item) => (
                            <article
                                key={item.id}
                                className="flex flex-wrap flex-row items-center justify-between py-2 bg-yellow-100 mb-2 px-2 rounded-md"
                            >
                                <p className="text-sm lg:text-base">{item.description}</p>
                                <Button
                                    className="bg-red-500 hover:bg-red-300 shadow-none rounded-full p-2"
                                    size={'sm'}
                                    onClick={() => handleDeleteReminder(item.id)}
                                >
                                    <Trash className="w-4 h-4 text-white"></Trash>
                                </Button>

                            </article>
                        ))}
                    </ScrollArea>
                </CardContent>

            </Card>
        </div>
    )
}