// Backend lives on a separate origin (DigitalOcean), not this Next.js app —
// cookies are configured SameSite=None specifically for this cross-origin
// setup (see fact-website-backend/settings.py). Must be set in Vercel's
// project env vars in production; defaults to the local Django dev server.
export const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const EMAIL_MAX_LEN = 200;
export const PASSWORD_MAX_LEN = 200;

export const SESSION_TIMES: Record<number, string> = {
    1: "9:30 AM - 10:40 AM",
    2: "10:50 AM - 12:00 PM",
    3: "1:20 PM - 2:30 PM",
};
