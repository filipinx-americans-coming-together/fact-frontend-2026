interface FacilitatorAssistantProps {
    name: string;
    contact: string;
}

export default function FacilitatorAssistant(fa: FacilitatorAssistantProps) {
    return(
        <>
            <h1 className="font-bold text-xl">Facilitator Assistant Information</h1>
            <div className="rounded p-6 flex flex-col gap-4 bg-text-primary text-background-primary">
                <div><span className="font-bold">Name: </span>{fa.name}</div>
                <div><span className="font-bold">Contact: </span>{fa.contact}</div>
            </div>
        </>
    );
}