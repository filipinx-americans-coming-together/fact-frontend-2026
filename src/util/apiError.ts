import { API_URL } from "./constants";

/**
 * Thrown by parseApiResponse for any non-ok response. Carries enough context
 * (endpoint, method, HTTP status) to build a short code a delegate can read
 * off-screen and report to us, instead of a bare "Server error" message that
 * can't be traced back to which request actually failed.
 */
export class ApiError extends Error {
    readonly status: number;
    readonly endpoint: string;
    readonly method: string;
    readonly code: string;

    constructor(
        message: string,
        opts: { status: number; endpoint: string; method: string }
    ) {
        super(message);
        this.name = "ApiError";
        this.status = opts.status;
        this.endpoint = opts.endpoint;
        this.method = opts.method;
        this.code = buildErrorCode(opts.endpoint, opts.method, opts.status);
    }
}

function buildErrorCode(endpoint: string, method: string, status: number): string {
    const path = endpoint.replace(API_URL, "").split("?")[0];
    const slug =
        path
            .split("/")
            .filter(Boolean)
            .join("-")
            .toUpperCase() || "ROOT";

    return `${slug}-${method}-${status}`;
}

/** For UI code that just wants the reportable code, if there is one. */
export function getErrorCode(error: unknown): string | undefined {
    return error instanceof ApiError ? error.code : undefined;
}

/**
 * Reads a fetchWithCredentials response, returning the parsed JSON body on
 * success and throwing a structured ApiError on failure (non-2xx status, or
 * a body that isn't valid JSON at all — a 500 error page from a proxy, a
 * dropped connection, etc). endpoint/method are only used to build the error
 * code, so callers can pass whatever they already used for the fetch call.
 */
export async function parseApiResponse(
    response: Response,
    endpoint: string,
    method: string
) {
    let json: any = null;

    try {
        json = await response.json();
    } catch {
        throw new ApiError("Server error, please try again later", {
            status: response.status,
            endpoint,
            method,
        });
    }

    if (!response.ok) {
        const message =
            json?.message && response.status !== 500
                ? json.message
                : "Server error, please try again later";

        throw new ApiError(message, {
            status: response.status,
            endpoint,
            method,
        });
    }

    return json;
}
