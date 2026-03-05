import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import { GridPlans } from "./_components/grid-plans";
import { GetSubscription } from "@/utils/get-subscription";
import { SubscritptionDetail } from "./_components/subscription-detail";

export default async function Plans() {

    const session = await getSession();

    if (!session) {
        redirect("/")
    }

    const subscription = await GetSubscription({ userId: session?.user?.id })

    return (
        <div>
            {subscription?.status !== "active" && (
                <GridPlans />
            )}

            {subscription?.status === "active" && (
                <SubscritptionDetail subscription={subscription!}></SubscritptionDetail>
            )}
        </div>
    )
}