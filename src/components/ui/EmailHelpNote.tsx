interface EmailHelpNoteProps {
    // "code": a verification / reset code we email from no-reply@psauiuc.org.
    // "ticket": the purchase confirmation Eventbrite sends.
    variant: "code" | "ticket";
}

/** Where to look when an expected email doesn't seem to arrive. */
export default function EmailHelpNote({ variant }: EmailHelpNoteProps) {
    return (
        <p className="text-xs text-[var(--ink-on-light-dim)]">
            {variant === "code" ? (
                <>
                    <b>Didn&apos;t get the email?</b> It can take a few minutes. Check your <b>Spam</b>,{" "}
                    <b>Promotions</b> and <b>Updates</b> folders, and search for <b>no-reply@psauiuc.org</b>.
                </>
            ) : (
                <>
                    Your ticket email comes from <b>Eventbrite</b>. Not seeing it? Check your <b>Spam</b>,{" "}
                    <b>Promotions</b> and <b>Updates</b> folders.
                </>
            )}
        </p>
    );
}
