// Removing the pre-applied BUNDLE code and entering the UIUC Variety Show
// Only code reveals that ticket in the Bundle widget. verify-payment accepts
// it (it's a real order for this event), but it doesn't include workshops,
// so POST /registration/delegates/ would reject it with a 402.
export const NO_WORKSHOPS_TICKET_TYPE = "variety_show";

export function wrongTicketMessage(orderId: string | null) {
    return (
        "Your ticket is Variety Show Only, which doesn't include workshops. " +
        "Don't purchase again. Contact FACT IT" +
        (orderId ? ` with Order #${orderId}` : "") +
        " to switch to the Workshops + Variety Show Bundle."
    );
}
