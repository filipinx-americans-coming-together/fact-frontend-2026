"use client";

import { useState } from "react";
import type { ExistingOrder } from "@/hooks/api/useFindMyOrder";

interface LinkOrderFormProps {
    /** Called with the trimmed, non-empty order number. */
    onLink: (orderNumber: string) => void;
    pending: boolean;
    /** The backend's message from a failed link attempt. */
    errorMessage: string | null;
}

const PANEL_STYLE = { border: "1px solid var(--hairline-on-light)" };
const TEXT_LINK = "text-sm underline hover:text-[var(--violet-800)]";

/**
 * Order-number input + "Link my ticket" button. Not a <form>: it sits inside
 * the register page's form, so Enter links instead of submitting Register.
 */
function LinkOrderForm({ onLink, pending, errorMessage }: LinkOrderFormProps) {
    const [orderNumber, setOrderNumber] = useState("");
    const [emptyError, setEmptyError] = useState(false);

    const submit = () => {
        const trimmed = orderNumber.trim();
        if (!trimmed) {
            setEmptyError(true);
            return;
        }
        setEmptyError(false);
        onLink(trimmed);
    };

    return (
        <div className="w-full flex flex-col items-center gap-2">
            <label htmlFor="existing-order-number" className="text-sm font-[550]">
                Eventbrite order number
            </label>
            <input
                id="existing-order-number"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        submit();
                    }
                }}
                className="w-full max-w-xs p-2 rounded-lg text-center"
                style={PANEL_STYLE}
            />
            <button type="button" onClick={submit} disabled={pending} className="pill pill--ink">
                {pending ? "Linking..." : "Link my ticket"}
            </button>
            {emptyError && (
                <p className="text-red-600 text-sm">Enter the order number from your Eventbrite confirmation email.</p>
            )}
            {!emptyError && errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
        </div>
    );
}

interface ExistingOrderPanelProps extends LinkOrderFormProps {
    email?: string;
    /** Masked hints only; the full order number never reaches the browser. */
    orders: ExistingOrder[];
    onShowCheckout: () => void;
}

function orderEnding(order: ExistingOrder) {
    return `Order ending ${order.order_hint.replace(/^…/, "")}`;
}

/**
 * Shown on the register page instead of the Eventbrite checkout when a
 * workshop-including order was already placed with the account's email.
 */
export default function ExistingOrderPanel({ email, orders, onShowCheckout, ...form }: ExistingOrderPanelProps) {
    const multiple = orders.length > 1;

    return (
        <div className="w-full max-w-md mx-auto flex flex-col items-center gap-3 text-center p-4 rounded-lg" style={PANEL_STYLE}>
            <p className="font-bold">You already have a FACT ticket</p>
            <p className="text-sm">
                You already have a FACT ticket bought with {email ?? "your email"}
                {!multiple && ` (${orderEnding(orders[0])})`}. Don&apos;t buy again. Enter the full
                order number from your Eventbrite confirmation email to link it.
            </p>
            {multiple && (
                <>
                    <ul className="text-sm font-[550]">
                        {orders.map((order) => (
                            <li key={order.order_hint}>{orderEnding(order)}</li>
                        ))}
                    </ul>
                    <p className="text-sm">
                        You have more than one order. Link one and contact FACT IT about a refund for the other.
                    </p>
                </>
            )}
            <LinkOrderForm {...form} />
            <button type="button" onClick={onShowCheckout} className={TEXT_LINK}>
                That&apos;s not my ticket, show checkout
            </button>
        </div>
    );
}

/** Collapsed fallback under the checkout for orders bought with a different email. */
export function DifferentEmailOrderLink(props: LinkOrderFormProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full flex flex-col items-center gap-2 pt-2">
            <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className={TEXT_LINK}>
                Already bought a ticket with a different email? Enter your order number
            </button>
            {open && <LinkOrderForm {...props} />}
        </div>
    );
}
