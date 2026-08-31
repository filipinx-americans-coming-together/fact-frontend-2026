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

    let args: any = {
        method: method,
        credentials: "include",
        headers: {
            "Content-Type":
                body instanceof FormData ? undefined : "application/json",
            "X-CSRFToken": csrf,
        },
    };

    if (body) args.body = body;

    return await fetch(url, args);
}
