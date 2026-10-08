"use client";

import Link from "next/link";
import LoadingCircle from "@/components/icons/LoadingCircle";
import { orderEnding } from "@/components/ui/ExistingOrderPanel";
import { useDelegateStatus } from "@/hooks/api/useDelegateStatus";
import { useFindMyOrder } from "@/hooks/api/useFindMyOrder";
import { NO_WORKSHOPS_TICKET_TYPE, wrongTicketMessage } from "@/util/tickets";
import { useRegistrationFlag } from "@/hooks/api/useRegistrationFlag";

const PANEL_STYLE = { border: "1px solid var(--hairline-on-light)" };
const PANEL = "w-full max-w-md mx-auto flex flex-col items-center gap-3 text-center p-4 rounded-lg";

/**
 * What the dashboard shows a delegate with no workshop registrations yet.
 * payment_status is only ever set by the backend confirming the order with
 * Eventbrite (verify-payment), so "paid" means this account is tied to a
 * real order and only needs to pick workshops. Otherwise, an order placed
 * with the account's email (find-my-order) means they already bought and
 * just need to link it. Lookup failures fall through to the plain
 * "Register" prompt, matching the register page.
 */
export default function UnregisteredNotice({ email }: { email?: string }) {
    const { status, isLoading: statusLoading } = useDelegateStatus();
    const isPaid = status?.payment_status === "paid";
    const { orders, isLoading: ordersLoading } = useFindMyOrder(!statusLoading && !isPaid);
    const { flag: newReg } = useRegistrationFlag("new-registration");

    if (statusLoading || (!isPaid && ordersLoading)) {
        return <div className="w-fit mx-auto"><LoadingCircle /></div>;
    }

    if (isPaid && status?.ticket_type === NO_WORKSHOPS_TICKET_TYPE) {
        return (
            <div className={PANEL} style={PANEL_STYLE}>
                <p className="font-bold">Payment Received</p>
                <p className="text-sm">{wrongTicketMessage(null)}</p>
            </div>
        );
    }

    if (isPaid) {
        return (
            <div className={PANEL} style={PANEL_STYLE}>
                <p className="font-bold">Payment Received</p>
                <p className="text-sm">
                    We&apos;ve received your payment. You&apos;re almost done! Pick your workshops to finish registering.
                </p>
                <Link href="/my-fact/register" className="pill pill--ink">Pick your workshops</Link>
            </div>
        );
    }

    if (orders.length) {
        return (
            <div className={PANEL} style={PANEL_STYLE}>
                <p className="font-bold">You already have a FACT ticket</p>
                <p className="text-sm">
                    You already have a FACT ticket bought with {email ?? "your email"}
                    {orders.length === 1 && ` (${orderEnding(orders[0])})`}. Don&apos;t buy again. Link it on the
                    Register page, then pick your workshops.
                </p>
                {orders.length > 1 && (
                    <p className="text-sm">
                        You have more than one order. Link one and contact FACT IT about a refund for the other.
                    </p>
                )}
                <Link href="/my-fact/register" className="pill pill--ink">Link my ticket</Link>
            </div>
        );
    }

    return (
        <>
            {newReg?.value === false ? <div className={PANEL} style={PANEL_STYLE}>Registration is temporarily closed while we work on making more tickets available. Please try again later.</div> :  
            <div className="flex flex-col gap-4 items-center">
            <Link href="/my-fact/regi<div className={PANEL} style={PANEL_STYLE}>Registration is temporarily closed while we work on making more tickets available. Please try again later.</div>ster" className="pill pill--ink w-fit mx-auto text-xl">Register for FACT 2026</Link>
            <p className="text-sm text-[var(--ink-on-light-dim)] text-center">
                Already bought a ticket? Enter your order number on the Register page.
            </p>
            </div> }
        </>
            
    );
}
