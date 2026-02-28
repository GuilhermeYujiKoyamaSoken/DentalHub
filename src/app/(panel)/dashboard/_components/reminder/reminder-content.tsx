'use client'

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { ReminderFormData, UseReminderForm } from "./reminder-form"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CreateReminder } from "../../_actions/create-reminder";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ReminderContentProps {
    closeDialog: () => void;
}

export function ReminderContent({ closeDialog }: ReminderContentProps) {

    const form = UseReminderForm();
    const router = useRouter();

    async function onSubmit(formData: ReminderFormData) {
        const response = await CreateReminder({ description: formData.description })

        if (response.error) {
            toast.error(response.error);
            return;
        }
        toast.success(response.data);
        router.refresh;
        closeDialog();
    }

    return (
        <div className="grid gap-4 py-4">
            <Form {...form}>
                <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold">Descreva lembrete:</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Digite a descrição do lembrete"
                                        className="max-h-52"
                                    ></Textarea>
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>

                    <Button
                        type="submit"
                        disabled={!form.watch('description')}
                    >
                        Cadastrar lembrete
                    </Button>
                </form>
            </Form>
        </div>
    )
}