"use client";

import FormContainer from "@/components/formatting/FormContainer";
import SchoolSelect from "@/components/ui/SchoolSelect";
import Select from "@/components/ui/Select";
import TextInput from "@/components/ui/TextInput";
import WorkshopSelect from "@/components/ui/WorkshopSelect";

import { registrationProps, useRegister } from "@/hooks/api/useRegister";
import { Suspense, useEffect, useState } from "react";

import { useRequestEmailVerification } from "@/hooks/api/useRequestEmailVerification";
import { useVerifyEmail } from "@/hooks/api/useVerifyEmail";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import RegPageContainer from "@/components/formatting/RegPageContainer";
import Script from "next/script";
import LinkButton from "@/components/ui/LinkButton";
import LoadingCircle from "@/components/icons/LoadingCircle";
import { useUser } from "@/hooks/api/useUser";
import { useVerifyPayment } from "@/hooks/api/useVerifyPayment";
import InteractiveButton from "@/components/ui/InteractiveButton";
import { PiArrowElbowRightDownBold } from "react-icons/pi";
import { API_URL } from "@/util/constants";
import { useDelegateStatus } from "@/hooks/api/useDelegateStatus";
import { useUiucPromoCode } from "@/hooks/api/useUiucPromoCode";
import { ApiError, getErrorCode } from "@/util/apiError";
import SearchableSelect from "@/components/ui/SearchableSelect";
import { useWorkshopsTech } from "@/hooks/api/useWorkshops";
import EventbriteCheckout from "@/components/ui/EventbriteCheckout";
import TicketTypeChoice, { isWorkshopsOnly } from "@/components/ui/TicketTypeChoice";
import UiucCodeInstructions from "@/components/ui/UiucCodeInstructions";
import ExistingOrderPanel, { DifferentEmailOrderLink } from "@/components/ui/ExistingOrderPanel";
import { useFindMyOrder } from "@/hooks/api/useFindMyOrder";

export default function Register() {
    return (
        <Suspense fallback={<div className="mx-auto w-fit p-4"><LoadingCircle /></div>}>
            <RegisterForm />
        </Suspense>
    );
}

const WORKSHOP_EVENT_ID = "2001126216382";
const BUNDLE_EVENT_ID = "2001120979719";
// The Bundle ticket class is hidden on Eventbrite and only revealed by this
// code; the same event's Variety Show Only ticket is revealed by VSHOWONLY
// on /variety-show instead.
const BUNDLE_PROMO_CODE = "BUNDLE";

// Saved in place of an order ID when Eventbrite's callback didn't include one.
const UNKNOWN_ORDER_ID = "unknown";
const UNKNOWN_ORDER_MESSAGE =
    "We have received your payment! Don't purchase again. Contact FACT IT with the order number from your Eventbrite confirmation email.";

// Removing the pre-applied BUNDLE code and entering the UIUC Variety Show
// Only code reveals that ticket in the Bundle widget. verify-payment accepts
// it (it's a real order for this event), but it doesn't include workshops,
// so POST /registration/delegates/ would reject it with a 402.
const NO_WORKSHOPS_TICKET_TYPE = "variety_show";
function wrongTicketMessage(orderId: string | null) {
    return (
        "Your ticket is Variety Show Only, which doesn't include workshops. " +
        "Don't purchase again. Contact FACT IT" +
        (orderId ? ` with Order #${orderId}` : "") +
        " to switch to the Workshops + Variety Show Bundle."
    );
}

function orderStorageKey(email: string) {
    return `fact-eventbrite-order:${email}`;
}

const performerOptions = [
    { label: "FASO Kumantayo", value: "0", session: 0 }, // session 1
    { label: "PSA Harana", value: "1", session: 0 },
    { label: "Purple Cakes", value: "2", session: 0 },
    { label: "FIA Modern", value: "3", session: 1 }, // session 2
    { label: "PSA Barkada", value: "4", session: 2 }, // session 3
    { label: "PSA Lumaya", value: "5", session: 2 },
];

function RegisterForm() {
    const { register, isSuccess, isPending, error } = useRegister();
    const { user, isLoading, error : userError } = useUser();
    const { verifyPaymentAsync, isPending: verifyPending } = useVerifyPayment();
    const { status: delegateStatus, isLoading: delegateStatusLoading } = useDelegateStatus();
    const {
        getPromoCode,
        data: promoCodeResult,
        isPending: promoCodePending,
        error: promoCodeError,
    } = useUiucPromoCode();
    const searchParams = useSearchParams();
    const uiucError = searchParams.get("uiuc_error");
    const [isPerformer, setIsPerformer] = useState(false);
    const [performerSession, setPerformerSession] = useState<{[key: string]: any}>({ performer_id: "-1" });
    const {techTimes, isLoading: techTimesLoading, error: techTimesError} = useWorkshopsTech();
    // orderId is set the moment Eventbrite reports a completed order and is
    // never cleared by a failed verification — once it exists the checkout
    // is locked, so nobody is ever shown a second checkout after paying.
    const [orderId, setOrderId] = useState<string | null>(null);
    // Eventbrite reported a completed order but its callback had no order
    // ID. The delegate still paid, so checkout locks the same way; FACT IT
    // verifies them by hand from their Eventbrite confirmation email.
    const [orderIdUnknown, setOrderIdUnknown] = useState(false);
    const [savedOrderChecked, setSavedOrderChecked] = useState(false);
    const [paymentVerified, setPaymentVerified] = useState(false);
    const [verifiedTicketType, setVerifiedTicketType] = useState<string | null>(null);
    const [clientError, setClientError] = useState<string | null>(null);
    const [clientErrorCode, setClientErrorCode] = useState<string | undefined>(undefined);
    // The delegate's own Workshops Only / Bundle pick. Performers are always
    // Workshops Only (see isWorkshopsOnly), without overwriting this pick, so
    // unticking "performer" brings their earlier choice back.
    const [ticketType, setTicketType] = useState(false);
    const workshopsOnly = isWorkshopsOnly(isPerformer, ticketType);
    const currentTicketType = workshopsOnly ? "workshop" : "bundle";
    const userEmail: string | undefined = user?.user?.email;
    const isPaid = paymentVerified || delegateStatus?.payment_status === "paid";
    const paidTicketType = verifiedTicketType ?? delegateStatus?.ticket_type ?? null;
    const hasNoWorkshopsTicket = isPaid && paidTicketType === NO_WORKSHOPS_TICKET_TYPE;
    const checkoutLocked = isPaid || orderId !== null || orderIdUnknown;
    // Workshop orders already placed with this account's email (masked hints
    // only). Any lookup failure leaves this empty: checkout is never blocked.
    const { orders: existingOrders, isLoading: existingOrdersLoading } = useFindMyOrder(
        !!userEmail && !delegateStatusLoading && delegateStatus?.payment_status !== "paid"
    );
    const [showCheckoutAnyway, setShowCheckoutAnyway] = useState(false);
    const [linkError, setLinkError] = useState<string | null>(null);
    // Don't mount checkout until we know whether this delegate already paid
    // (backend status), already has an order saved in this browser, or
    // already bought one with this email on Eventbrite.
    const checkoutReady = savedOrderChecked && !delegateStatusLoading && !existingOrdersLoading;
    const showExistingOrders = existingOrders.length > 0 && !showCheckoutAnyway;

    const router = useRouter();
    const [formData, setFormData] = useState<{ [key: string]: any }>({
        workshop_1_id: -1,
        workshop_2_id: -1,
        workshop_3_id: -1,
        discount: "",
        code: "",
    });

    useEffect(() => {
        if (isSuccess) {
            if (userEmail) {
                try {
                    localStorage.removeItem(orderStorageKey(userEmail));
                } catch {}
            }
            router.push("/my-fact/dashboard");
        }
    }, [isSuccess])

    // Restore an order placed earlier (reload, closed tab, failed verify) so
    // the checkout stays locked instead of inviting a second purchase.
    useEffect(() => {
        if (!userEmail) return;
        if (!orderId) {
            try {
                const saved = localStorage.getItem(orderStorageKey(userEmail));
                if (saved === UNKNOWN_ORDER_ID) setOrderIdUnknown(true);
                else if (saved) setOrderId(saved);
            } catch {}
        }
        setSavedOrderChecked(true);
    }, [userEmail]);

    // Verifies the order server-side (POST /registration/verify-payment/)
    // — payment_status is never set by anything the browser says, only by
    // the backend confirming the order with Eventbrite itself. A failure
    // here does NOT reopen checkout: the order ID is kept and verification
    // is retried when the delegate presses Register.
    // linking: the delegate typed in an existing order number instead of
    // checking out here. It only counts as their order once verified, and a
    // failure shows the backend's reason next to the order-number input.
    const verifyOrder = async (id: string, linking = false): Promise<boolean> => {
        try {
            const result = await verifyPaymentAsync(id);
            if (linking) setOrderId(id);
            setPaymentVerified(true);
            setVerifiedTicketType(result.ticket_type);
            if (result.ticket_type === NO_WORKSHOPS_TICKET_TYPE) {
                setClientError(wrongTicketMessage(id));
                return false;
            }
            return true;
        } catch (e: any) {
            if (linking) {
                setLinkError(e?.message || "Could not verify that order with Eventbrite.");
                return false;
            }
            setClientError(
                `We have received your payment! Don't purchase again. Press "Register" to retry, ` +
                `or contact FACT IT with Order #${id}. ` +
                `Reason: ${e?.message || "Could not verify your payment with Eventbrite."}`
            );
            setClientErrorCode(e instanceof ApiError ? e.code : undefined);
            return false;
        }
    };

    const handleOrderComplete = (orderData: any) => {
        const rawId = orderData?.orderId ?? orderData?.order_id;

        if (!rawId) {
            setOrderIdUnknown(true);
            if (userEmail) {
                try {
                    localStorage.setItem(orderStorageKey(userEmail), UNKNOWN_ORDER_ID);
                } catch {}
            }
            // The locked "Payment Received" panel already shows the message.
            setClientError(null);
            setClientErrorCode(undefined);
            return;
        }

        const id = String(rawId);
        setOrderId(id);
        if (userEmail) {
            try {
                localStorage.setItem(orderStorageKey(userEmail), id);
            } catch {}
        }
        setClientError(null);
        setClientErrorCode(undefined);
        verifyOrder(id);
    };

    // Links an order bought earlier (on Eventbrite directly, another device,
    // or another email) through the same verify-payment path as checkout.
    const handleLinkOrder = (id: string) => {
        setLinkError(null);
        setClientError(null);
        setClientErrorCode(undefined);
        verifyOrder(id, true);
    };
    useEffect(() => {
        if (userError) {
            router.push("/my-fact/login")
        }
        if (user?.registration?.length) {
            router.push("/my-fact/dashboard")
        }
    }, [userError, user])

    return (
        <RegPageContainer pageTitle="Register for FACT">

            <FormContainer
                submitText="Register"
                formName="registerForm"
                onSubmit={async () => {
                    setClientError(null);
                    setClientErrorCode(undefined);

                    if (hasNoWorkshopsTicket) {
                        setClientError(wrongTicketMessage(orderId));
                        return;
                    }

                    if (!isPaid) {
                        if (!orderId && orderIdUnknown) {
                            setClientError(UNKNOWN_ORDER_MESSAGE);
                            return;
                        }
                        if (!orderId) {
                            setClientError("Complete EventBrite checkout before continuing");
                            return;
                        }
                        if (!(await verifyOrder(orderId))) return;
                    }

                    register({ f_name : user?.user.first_name, l_name: user?.user.last_name, email: user?.user.email, workshop_1_id: formData.workshop_1_id, workshop_2_id:formData.workshop_2_id, workshop_3_id:formData.workshop_3_id } as registrationProps);
                }}
                isLoading={isPending || verifyPending}
                errorMessage={clientError || error?.message}
                errorCode={clientErrorCode || getErrorCode(error)}
            >
                <h1 className="text-center pb-4 border-b w-full">Register for FACT</h1>

                
                {/* <div className="text-center">Workshop Selection</div> */}
                <Link
                    href="/workshops"
                    target="_blank"
                    className="underline hover:text-[var(--violet-800)]"
                >Browse Workshops</Link>

                <div className="flex self-start items-center gap-2">
                    <input
                        type="checkbox"
                        checked={isPerformer}
                        onChange={(e) => setIsPerformer(e.target.checked)}
                        id="performer"
                    />
                    <span>I am a Variety Show performer</span>
                </div>

                {isPerformer && <SearchableSelect
                    id="performer_id"
                    label="Select your Variety Show Act"
                    setState={setPerformerSession}
                    options={performerOptions}
                    placeholder=""
                />}

                {isPerformer && performerOptions.find((opt) => opt.value === performerSession.performer_id)?.session === 0 && techTimes?.length ?  
                    <SearchableSelect 
                        id="workshop_1_id"
                        label="Session 1 (Performer)"
                        setState={setFormData}
                        placeholder=""
                        options={techTimes.filter((wks) => wks.session === 1).map((wks) => ({ value: wks.id.toString(), label: "Performer Tech Time" })) } /> : <WorkshopSelect
                    session={1}
                    id="workshop_1_id"
                    setState={setFormData}
                />}
                {isPerformer && performerOptions.find((opt) => opt.value === performerSession.performer_id)?.session === 1 && techTimes?.length ?  
                    <SearchableSelect 
                        id="workshop_2_id"
                        label="Session 2 (Performer)"
                        setState={setFormData}
                        placeholder=""
                        options={techTimes.filter((wks) => wks.session === 2).map((wks) => ({ value: wks.id.toString(), label: "Performer Tech Time" })) } /> : <WorkshopSelect
                    session={2}
                    id="workshop_2_id"
                    setState={setFormData}
                />}
                {isPerformer && performerOptions.find((opt) => opt.value === performerSession.performer_id)?.session === 2 && techTimes?.length ?  
                    <SearchableSelect 
                        id="workshop_3_id"
                        label="Session 3 (Performer)"
                        setState={setFormData}
                        placeholder=""
                        options={techTimes.filter((wks) => wks.session === 3).map((wks) => ({ value: wks.id.toString(), label: "Performer Tech Time" })) } /> : <WorkshopSelect
                    session={3}
                    id="workshop_3_id"
                    setState={setFormData}
                />}

                
                <div className="static flex items-start gap-1">
                    <div>
                    <input
                        className="relative top-1"
                        required
                        type="checkbox"
                        id="terms-conditions"
                    />
                    </div>
                    <span>
                        <p className="mb-2 lg:mb-4">
                            By checking this box, I affirm that I agree to
                            the following terms and conditions:{" "}
                            <span className="text-red-600">*</span>
                        </p>
                        <div className="text-xs">
                            <p>
                                I. I am a registered student of a college or
                                university with proof of ID or student
                                enrollment.
                            </p>
                            <p>
                                II. I am responsible for any self-inflicted
                                loss, theft or damage of my person, personal
                                valuables, or FACT Conference facilities,
                                vendors, and furniture and therefore am
                                liable for any missing belongings or costs
                                incurred to repair any damage.
                            </p>
                            <p>
                                III. I understand that there may be
                                reactions to sensitive material discussed
                                and that I am allowed to leave any space
                                where I no longer feel comfortable in at any
                                time.
                            </p>
                            <p>
                                IV. I allow myself to be included in photos, videos, and livestreams taken by FACTographers during the event for promotional purposes. If I feel uncomfortable with this, I will promptly inform the FACTographer.

                            </p>
                            <p>
                                V. I am responsible for all payments made
                                for food, drink, parking, or Palengke
                                purchases during the duration of the
                                conference.
                            </p>
                            <p>
                                VI. If I would like to rescind my registration purposes for reasons of changed availability, I must submit a request for refund prior to the Early Registration deadline of October 27th.
                            </p>
                            <p>
                                VII. PSA does not associate with contraband
                                material such as alcohol, nicotine products,
                                or other drug related items. Therefore, I
                                will not bring any contraband material to
                                any FACT-related event during the
                                conference.
                            </p>
                            <p>
                                VIII. I agree to follow all policies of the
                                University of Illinois at Urbana-Champaign
                                and its campus facilities that are outlined
                                via their respective websites.
                            </p>
                            <p>
                                IX. My data and information will be used
                                solely for administering my participation in
                                this event and acting as a source of contact
                                for conference-related alerts and
                                notifications. All payment information will
                                be protected.
                            </p>
                            <p>
                                X. PSA is committed to providing a safe, productive, and welcoming environment to all participants, including staff, vendors, guests, facilitators, and delegates. PSA has no tolerance for any form of discrimination, harassment, or bullying in any form at FACT-related events. Participants are expected to adhere to these principles and respect the rights of others.
                            </p>
                            <p className="ml-8">
                                a. If you are a witness or are subject to
                                unacceptable behavior, please report to any
                                PSA, FACT, or trusted organization leader,
                                who will assist in resolving the issue and
                                escorting out any individuals disrupting the
                                safe environment FACT aims to foster.
                            </p>
                            <p>
                                XI. PSA FACT reserves the right to change,
                                amend, add or remove any of the above Terms
                                & Conditions in its sole discretion and
                                without prior notice. If one or more of the
                                conditions outlined in these Terms &
                                Conditions should become invalid, the
                                remaining conditions will continue to be
                                valid and apply. These Terms & Conditions
                                apply to all event participants (attendees,
                                speakers, sponsors, exhibitors).
                            </p>
                        </div>
                    </span>

                </div>
                    {checkoutLocked && (
                        <div className="w-full max-w-md mx-auto flex flex-col items-center gap-2 text-center p-4 rounded-lg" style={{ border: "1px solid var(--hairline-on-light)" }}>
                            <p className="font-bold">
                                Payment Received{orderId ? `: Order #${orderId}` : ""}
                            </p>
                            {verifyPending ? (
                                <p className="text-sm text-[var(--ink-on-light-dim)]">Verifying your payment with Eventbrite...</p>
                            ) : hasNoWorkshopsTicket ? (
                                <p className="text-sm text-red-600">{wrongTicketMessage(orderId)}</p>
                            ) : isPaid ? (
                                <p className="text-sm">Press the Register button below to finish your registration.</p>
                            ) : !orderId && orderIdUnknown ? (
                                <p className="text-sm">
                                    Don&apos;t purchase again. Contact FACT IT with the order number from your Eventbrite confirmation email.
                                </p>
                            ) : (
                                <p className="text-sm">
                                    Do not purchase again. Press Register below to finish. If it fails, contact FACT IT with your order number.
                                </p>
                            )}
                        </div>
                    )}
                    {!checkoutLocked && !checkoutReady && (
                        <div className="w-fit mx-auto"><LoadingCircle /></div>
                    )}
                    {!checkoutLocked && checkoutReady && showExistingOrders && (
                        <ExistingOrderPanel
                            email={userEmail}
                            orders={existingOrders}
                            onLink={handleLinkOrder}
                            pending={verifyPending}
                            errorMessage={linkError}
                            onShowCheckout={() => setShowCheckoutAnyway(true)}
                        />
                    )}
                    {!checkoutLocked && checkoutReady && !showExistingOrders && <div className="w-full">
                    <div className="font-bold text-center">Checkout</div>
                    <br/>
                    <div className="text-center text-sm font-[550]">Note: you must press the Register button at the bottom of the page after completing checkout for your registration to be processed.</div>
                    <br/>
                    <TicketTypeChoice
                        isPerformer={isPerformer}
                        workshopsOnlySelected={ticketType}
                        onChange={setTicketType}
                    />
                    <br/>

                    <div className="w-fit mx-auto max-w-md flex flex-col items-center gap-2 text-center p-4 rounded-lg" style={{ border: "1px solid var(--hairline-on-light)" }}>
                        {/*
                          UIUC discount code flow temporarily disabled (shown
                          as "coming soon" below) — not a removal. Re-enable by
                          restoring this block; nothing else on the backend or
                          in useUiucPromoCode/useDelegateStatus needs to change.
                        {uiucError === "already_linked" && (
                            <p className="text-red-600 text-sm">
                                That UIUC NetID is already linked to a different FACT account.
                            </p>
                        )}

                        {!delegateStatus?.is_uiuc_verified ? (
                            <>
                                <p className="text-sm">UIUC student? Verify your NetID for a discount code.</p>
                                <a
                                    href={`${API_URL}/saml/login/`}
                                    className="pill pill--ink"
                                >
                                    Verify UIUC Status
                                </a>
                            </>
                        ) : delegateStatus.has_unredeemed_promo?.[currentTicketType] ? (
                            <>
                                <p className="text-sm">Your UIUC discount code for this ticket:</p>
                                <p className="text-lg font-bold">
                                    {delegateStatus.has_unredeemed_promo[currentTicketType]}
                                </p>
                                <p className="text-xs text-[var(--ink-on-light-dim)]">
                                    Enter this code in the Eventbrite checkout below.
                                </p>
                            </>
                        ) : promoCodeResult?.ticket_type === currentTicketType ? (
                            <>
                                <p className="text-sm">Your UIUC discount code for this ticket:</p>
                                <p className="text-lg font-bold">{promoCodeResult.code}</p>
                                <p className="text-xs text-slate-600">
                                    Enter this code in the Eventbrite checkout below.
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="text-sm">
                                    For UIUC Students: Verify your status and get your discount code!
                                </p>
                                <button
                                    type="button"
                                    onClick={() => getPromoCode(currentTicketType)}
                                    className="pill pill--ink"
                                    disabled={promoCodePending}
                                >
                                    {promoCodePending ? "Getting code..." : "Get My Discount Code"}
                                </button>
                                {promoCodeError && (
                                    <p className="text-red-600 text-xs">{promoCodeError.message}</p>
                                )}
                            </>
                        )}
                        */}
                        <p className="text-sm">UIUC student discount codes coming soon.</p>
                    </div>

                    <br/>
                    <UiucCodeInstructions variant={isPerformer ? "performer" : "standard"} />
                    <div className="w-fit mx-auto flex items-center pt-2"><PiArrowElbowRightDownBold /></div>
                    <br/>
                    <div className="mx-auto w-full">
                        <EventbriteCheckout eventId={WORKSHOP_EVENT_ID} hidden={!workshopsOnly} onOrderComplete={handleOrderComplete} />
                        <EventbriteCheckout eventId={BUNDLE_EVENT_ID} promoCode={BUNDLE_PROMO_CODE} hidden={workshopsOnly} onOrderComplete={handleOrderComplete} />
                    </div>
                    <DifferentEmailOrderLink onLink={handleLinkOrder} pending={verifyPending} errorMessage={linkError} />
                    </div>
                }
            </FormContainer>

        </RegPageContainer>
    );
}
