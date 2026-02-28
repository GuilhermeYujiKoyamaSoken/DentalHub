import { GetReminders } from "../../_data-access/get-reminders"
import { ReminderList } from "./reminder-list"

export async function Reminders({ userId }: { userId: string }) {

    const reminder = await GetReminders({ userId: userId })

    return (
        <ReminderList reminder={reminder}></ReminderList>
    )
}