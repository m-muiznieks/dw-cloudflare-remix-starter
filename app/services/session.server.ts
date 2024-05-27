import { createCookieSessionStorage } from "@remix-run/cloudflare";

// @ts-expect-error it's not typed
const ENVIRONMENT: string = globalThis.NODE_ENV;
// @ts-expect-error it's not typed
const SECRET: string = globalThis.AUTH_SECRET;

// export the whole sessionStorage object
export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: "_session", // use any name you want here
		sameSite: "lax", // this helps with CSRF
		path: "/", // remember to add this so the cookie will work in all routes
		httpOnly: true, // for security reasons, make this cookie http only
		secrets: [SECRET], // replace this with an actual secret
		secure: ENVIRONMENT === "production", // enable this in prod only
	},
});

export const { getSession, commitSession, destroySession } = sessionStorage;
