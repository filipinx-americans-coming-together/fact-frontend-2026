"use client";

import FormContainer from "@/components/formatting/FormContainer";
import Navbar from "@/components/navigation/Navbar";
import SchoolSelect from "@/components/ui/SchoolSelect";
import Select from "@/components/ui/Select";
import TextInput from "@/components/ui/TextInput";
import WorkshopSelect from "@/components/ui/WorkshopSelect";

import { registrationProps, useRegister } from "@/hooks/api/useRegister";
import { useEffect, useState } from "react";

import { useRequestEmailVerification } from "@/hooks/api/useRequestEmailVerification";
import { useVerifyEmail } from "@/hooks/api/useVerifyEmail";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "@/components/formatting/PageFooter";
import RegPageContainer from "@/components/formatting/RegPageContainer";
import Script from "next/script";
import LinkButton from "@/components/ui/LinkButton";
import LoadingCircle from "@/components/icons/LoadingCircle";
import { useUser } from "@/hooks/api/useUser";
import InteractiveButton from "@/components/ui/InteractiveButton";
import { PiArrowElbowRightDownBold } from "react-icons/pi";

export default function Register() {
    const { register, isSuccess, isPending, error } = useRegister();
    const { user, isLoading, error : userError } = useUser();

    const [checkoutComplete, setCheckoutComplete] = useState(false);
    const [clientError, setClientError] = useState<string | null>(null);
    const [loadEB, setLoadEB] = useState(false);
    const [ticketType, setTicketType] = useState(false);
    // Load the Eventbrite widgets script
    const loadEventbriteScript = () => {
        const script = document.createElement("script");
        script.src = "https://www.eventbrite.com/static/widgets/eb_widgets.js";
        // script.src = "/static-data/eb_widgets.js"
        script.async = true;
        document.head.appendChild(script);
        console.log('eventbrite script loaded')
        setLoadEB(true);
    };

    useEffect(() => {
        loadEventbriteScript();
    })
    
    const EventbriteWidgetWks = ({ onComplete }: { onComplete: Function }) => {
    useEffect(() => {
        if (loadEB) {
            // @ts-ignore
            try {window.EBWidgets.createWidget({
                // Required
                
                widgetType: 'checkout',
                eventId: '1817643172659',
                iframeContainerId: 'eventbrite-widget-container-1817643172659',
                iframeContainerHeight: 800,
                onOrderComplete: onComplete
            });
        } catch {
            setTimeout(()=>{setLoadEB(true)}, 3000);
        }
        }}, [loadEB]);

        return (
            // <button id="eventbrite-widget-modal-trigger-1817643172659" type="button" className="text-sm text-center text-text-primary w-fit p-4 bg-[rgba(250,250,250,0.3)] shadow-lg rounded-xl hover:scale-105 hover:shadow-xl border-slate-700 border-1">Workshops Only</button>
            <div id="eventbrite-widget-container-1817643172659"></div>
        );
    };

    const EventbriteWidgetBnd = ({ onComplete }: { onComplete: Function }) => {
    useEffect(() => {
        if (loadEB) {
            // @ts-ignore
            try {window.EBWidgets.createWidget({
            widgetType: 'checkout',
            eventId: '1816702820039',
            iframeContainerId: 'eventbrite-widget-container-1816702820039',
            iframeContainerHeight: 800,
            onOrderComplete: onComplete,
            promoCode: "VSHOWBUNDLE"
        })} catch {
            setTimeout(()=>{setLoadEB(true)}, 3000);
        }
        } 
            
        }, [loadEB]);

        return (
            <div id="eventbrite-widget-container-1816702820039"></div>
            // <button id="eventbrite-widget-modal-trigger-1816702820039" type="button" className="text-sm text-center text-text-primary w-fit p-4 bg-[rgba(250,250,250,0.3)] shadow-lg rounded-xl hover:scale-105 hover:shadow-xl border-slate-700 border-1">Workshops + Variety Show Bundle</button>
        );
    };

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
            router.push("/my-fact/dashboard");
        }
    }, [isSuccess])
    useEffect(() => {
        if (userError) {
            router.push("/my-fact/login")
        }
        if (user?.registration?.length) {
            router.push("/my-fact/dashboard")
            console.log("user", user)
        }
    }, [userError, user])

    return (
        <RegPageContainer>

            <FormContainer
                submitText="Register"
                formName="registerForm"
                onSubmit={() => {
                    setClientError(null);

                    if (checkoutComplete) {
                        register({ f_name : user?.user.first_name, l_name: user?.user.last_name, email: user?.user.email, workshop_1_id: formData.workshop_1_id, workshop_2_id:formData.workshop_2_id, workshop_3_id:formData.workshop_3_id } as registrationProps);
                    } else {
                        setClientError("Complete EventBrite checkout before continuing")
                    }
                }}
                isLoading={isPending}
                errorMessage={clientError || error?.message}
            >
                <h1 className="text-center text-3xl uppercase font-bold pb-4 border-b w-full">Register for FACT</h1>

                
                {/* <div className="text-center">Workshop Selection</div> */}
                <Link
                    href="/workshops"
                    target="_blank"
                    className="underline hover:text-highlight-2-primary"
                >Browse Workshops</Link>

                <WorkshopSelect
                    session={1}
                    id="workshop_1_id"
                    setState={setFormData}
                />
                <WorkshopSelect
                    session={2}
                    id="workshop_2_id"
                    setState={setFormData}
                />
                <WorkshopSelect
                    session={3}
                    id="workshop_3_id"
                    setState={setFormData}
                />

                
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
                    {!checkoutComplete && <div className="w-full">
                    <div className="font-bold text-center">Checkout</div>
                    <br/>
                    <div className="text-center text-sm font-[550]">Note: you must press the Register button at the bottom of the page after completing checkout for your registration to be processed.</div>
                    <br/>
                    <div className="flex justify-center gap-2 lg:gap-4">
                        <button onClick={() => setTicketType(true)} type="button" className="text-sm text-center text-text-primary w-fit p-4 bg-[rgba(250,250,250,0.3)] shadow-lg rounded-xl hover:scale-105 hover:shadow-xl border-slate-700 border-1">Workshops Only</button>
                        <button onClick={() => setTicketType(false)} type="button" className="text-sm text-center text-text-primary w-fit p-4 bg-[rgba(250,250,250,0.3)] shadow-lg rounded-xl hover:scale-105 hover:shadow-xl border-slate-700 border-1">Workshops + Variety Show Bundle</button>
                    </div>
                    <br/>
                    {loadEB ?
                    <div className="mx-auto w-full">
                        {ticketType ? <EventbriteWidgetWks
                        onComplete={() => {
                            setCheckoutComplete(true);
                        }}/> : 
                        
                        <div><div className="text-sm"> For Variety Show, you will not have to sit in your assigned seat (row & number), but you will have to sit in your assigned section (1-4). Please choose the seat for your ticket accordingly. The entire seat map of the Foellinger Auditorium floor is detailed for your visualization</div><br/><div className="w-fit mx-auto text-sm text-slate-700 flex gap-1 items-center text-center">Have a promo code? You must click remove then add the code <PiArrowElbowRightDownBold /></div><br/><EventbriteWidgetBnd onComplete={() => {
                            setCheckoutComplete(true);
                        }}/></div>} </div>
                    : <div className="w-fit mx-auto"><LoadingCircle/></div>}</div>
                }
            </FormContainer>

        </RegPageContainer>
    );
}
