'use client'

import { useState } from "react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Pencil, Plus, X } from "lucide-react";
import { DialogService } from "./dialog-service";
import { Service } from "@prisma/client";
import { FormatCurrency } from "@/utils/formatCurrency";
import { deleteService } from "../_actions/delete-service";
import { toast } from "sonner";

interface ServiceListProps {
    services: Service[]
}

export function ServicesList({ services }: ServiceListProps) {

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingService, setEditingServive] = useState<null | Service>(null);

    async function handleDeleteService(serviceId: string) {
        const response = await deleteService({ serviceId: serviceId });

        if (response.error) {
            toast(response.error)
            return;
        }

        toast.success(response.data)
    }

    function handleUpdateService(service: Service) {
        setEditingServive(service);
        setIsDialogOpen(true);
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <section className="mx-auto">

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between spacey-0 pb-2">
                        <CardTitle className="text-xl md:text-2xl font-bold">Serviços</CardTitle>
                        <DialogTrigger asChild>
                            <Button onClick={() => {
                                setEditingServive(null); 
                                setIsDialogOpen(true);   
                            }}>
                                <Plus className="w-4 h-4"></Plus>
                            </Button>
                        </DialogTrigger>

                        <DialogContent onInteractOutside={(e) => {
                            e.preventDefault();
                            setIsDialogOpen(false);
                            setEditingServive(null)
                        }}>
                            <DialogService
                                closeModal={() => {
                                    setIsDialogOpen(false);
                                    setEditingServive(null);
                                }}
                                serviceId={editingService ? editingService.id : undefined}
                                initialValues={editingService ? {
                                    name: editingService.name,
                                    price: (editingService.price / 100).toFixed(2).replace(".", ","),
                                    hours: Math.floor(editingService.duration / 60).toString(),
                                    minutes: (editingService.duration % 60).toString()
                                } : undefined}
                            >
                            </DialogService>
                        </DialogContent>
                    </CardHeader>

                    <CardContent>
                        <section className="space-y-4 mt-5">
                            {services.map(service => (
                                <article key={service.id} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <span className="font-medium">{service.name}</span>
                                        <span className="text-gray-500">-</span>
                                        <span className="text-gray-700">{FormatCurrency((service.price / 100))}</span>
                                    </div>

                                    <div>
                                        <Button
                                            variant={'ghost'}
                                            size={'icon'}
                                            onClick={() => handleUpdateService(service)}
                                        >
                                            <Pencil className="w-4 h-4"></Pencil>
                                        </Button>

                                        <Button
                                            variant={'ghost'}
                                            size={'icon'}
                                            onClick={() => handleDeleteService(service.id)}
                                        >
                                            <X className="w-4 h-4"></X>
                                        </Button>
                                    </div>
                                </article>
                            ))}
                        </section>
                    </CardContent>
                </Card>

            </section>
        </Dialog>
    )
}