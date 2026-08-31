import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { API_URL } from "./util/constants";
import { ResponseData } from "./util/types";

// TODO: have conditionals for the different states this file should be in (reg open, reg closed, database off)

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith("/refund") || request.nextUrl.pathname.startsWith("/variety-show")) {
        return NextResponse.rewrite(new URL('/not-found', request.url));
    }
    
    // intercept all pages that use accounts
    if (API_URL.length === 0)     {
        if (request.nextUrl.pathname.startsWith("/my-fact") || request.nextUrl.pathname.startsWith("/facilitators") || request.nextUrl.pathname.startsWith("/admin"))
        return NextResponse.rewrite(new URL('/registration-closed', request.url));
    }
    else {
        // get flags     
        let flags: ResponseData<{ label: string; value: boolean }>[];

        try {
            let response = await fetch(`${API_URL}/fact-admin/flags/`);
            flags = await response.json();
        } catch {
            return NextResponse.error();
        }

        // workshop changes
        if (request.nextUrl.pathname.startsWith("/my-fact/workshops")) {
            const workshopChanges = flags.find(
                (flag) => flag.fields.label === "workshop-changes"
            );

            if (!workshopChanges || !workshopChanges?.fields.value) {
                return NextResponse.error();
            }
        }

        // // hide registration related pages
        // if (request.nextUrl.pathname == "/my-fact"){
        //     return NextResponse.redirect(new URL('/', request.url));
        // }
    }
}

export const config = {
    matcher: [
        "/refund", "/variety-show",
        "/my-fact/:path*",
        // "/workshops/:path*",
        "/facilitators/:path*",
        "/admin/:path*",
    ],
};
