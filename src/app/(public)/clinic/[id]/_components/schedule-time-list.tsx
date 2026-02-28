'use client'

import { Button } from "@/components/ui/button"
import { TimeSlot } from "./schedule-content"
import { cn } from "@/lib/utils"
import { IsSlotInThePast, IsSlotSequenceAvailable, IsToday } from "./schedule-utils"

interface ScheduleTimeListProps {
    selectedDate: Date,
    selectedTime: string,
    requiredSlots: number,
    blockedTimes: string[],
    availableTimeSlots: TimeSlot[],
    clinicTimes: string[],
    onSelectTime: (time: string) => void
}

export function ScheduleTimeList({
    selectedDate,
    selectedTime,
    requiredSlots,
    blockedTimes,
    availableTimeSlots,
    clinicTimes,
    onSelectTime
}: ScheduleTimeListProps) {

    const dateIsToday = IsToday(selectedDate);

    return (
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            {availableTimeSlots.map((slot) => {

                const sequenceOk = IsSlotSequenceAvailable(
                    slot.time,
                    requiredSlots,
                    clinicTimes,
                    blockedTimes
                );

                const slotIspast = dateIsToday && IsSlotInThePast(slot.time);

                const slotEnabled = slot.available && sequenceOk && !slotIspast;

                return (
                    <Button
                        onClick={() => slotEnabled && onSelectTime(slot.time)}
                        type="button"
                        variant={'outline'}
                        key={slot.time}
                        className={cn("h-10 select-none",
                            selectedTime === slot.time && "border-2 border-emerald-500 text-primary",
                            !slotEnabled && "opacity-50 cursor-not-allowed"
                        )}
                        disabled={!slotEnabled}
                    >
                        {slot.time}
                    </Button>
                )
            })}
        </div>
    )
}