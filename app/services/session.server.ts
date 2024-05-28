import { createCookieSessionStorage } from "@remix-run/cloudflare";
import { createAuthenticator } from "./auth.server";
import type { Bindings } from "server";

export const createSessionStorage = (context: Bindings) => {
	const { AUTH_SECRET, NODE_ENV } = context;

	return createCookieSessionStorage({
		cookie: {
			name: "_session", // use any name you want here
			sameSite: "lax", // this helps with CSRF
			path: "/", // remember to add this so the cookie will work in all routes
			httpOnly: true, // for security reasons, make this cookie http only
			secrets: [AUTH_SECRET], // replace this with an actual secret
			secure: NODE_ENV === "production", // enable this in prod only
		},
	});
};

// Function to get session utilities
export const getSessionStorage = (context: Bindings) => {
	return createSessionStorage(context);
};

export const isUserLoggedInServerSide = async ({
	request,
	context,
}: { request: Request; context: Bindings }): Promise<boolean> => {
	const authenticator = createAuthenticator(context);
	const checkUser = await authenticator.isAuthenticated(request, {
		//failureRedirect: DEFAULT_LOGOUT_REDIRECT,
	});

	return !!checkUser?.email;
};
