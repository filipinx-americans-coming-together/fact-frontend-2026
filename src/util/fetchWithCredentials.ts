import Cookies from "universal-cookie";
import { API_URL } from "./constants";

export default async function fetchWithCredentials({
    url,
    method,
    body,
}: {
    url: string;
    method: "GET" | "PUT" | "DELETE" | "POST";
    body?: string | FormData;
}) {
    const cookies = new Cookies(null, { path: "/" });
    let csrf = cookies.get("csrftoken");

    // get csrf if not set
    if (!csrf) {
        let response = await fetch(`${API_URL}/csrf/`, {
            credentials: "include",
        });
        csrf = response.headers.get("X-CSRFToken");
        console.log("cooke", document.cookie);
    }

    const headers: Record<string, string> = { "X-CSRFToken": csrf };
    // FormData bodies must NOT get an explicit Content-Type — the browser
    // needs to set its own with the multipart boundary. Setting this key to
    // undefined still sends a literal "Content-Type: undefined" header
    // (fetch coerces it to a string), which breaks multipart parsing
    // server-side, so the key has to be omitted entirely, not just nulled.
    if (!(body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
    }

    let args: any = {
        method: method,
        credentials: "include",
        headers,
    };

    if (body) args.body = body;

    return await fetch(url, args);
}
