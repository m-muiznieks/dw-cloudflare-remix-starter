import { createCookieSessionStorage } from "@remix-run/cloudflare";
import type { AppLoadContext, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { createAuthenticator } from "./auth.server";

export const createSessionStorage = (context: AppLoadContext) => {
	const { AUTH_SECRET, NODE_ENV } = context.cloudflare.env;

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
export const getSessionStorage = (context: AppLoadContext) => {
	return createSessionStorage(context);
};

interface Context {
	request: Request;
	context: AppLoadContext;
}

export const isUserLoggedInServerSide = async ({
	request,
	context,
}: Context): Promise<boolean> => {
	const authenticator = createAuthenticator(context);
	const checkUser = await authenticator.isAuthenticated(request, {
		//failureRedirect: DEFAULT_LOGOUT_REDIRECT,
	});

	return !!checkUser?.email;
};

export const isUserLoggedIn = async ({
	request,
	context,
}: LoaderFunctionArgs): Promise<boolean> => {
	const authenticator = createAuthenticator(context);
	const checkUser = await authenticator.isAuthenticated(request, {
		//failureRedirect: DEFAULT_LOGOUT_REDIRECT,
	});

	return !!checkUser?.email;
};
