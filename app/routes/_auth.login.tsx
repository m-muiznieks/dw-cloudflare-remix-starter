import { json, redirect, useActionData } from "@remix-run/react";
import { UserLoginForm } from "components/forms/auth/form-user-login";
import type { AuthenticatedUserSchema } from "schemas/user/user-auth-schema";
import type { z } from "zod";
import { createAuthenticator } from "~/services/auth.server";
import { getSessionStorage } from "../services/session.server";
import { DEFAULT_LOGIN_REDIRECT } from "routes";
import type { Bindings } from "server";
import type { AppLoadContext } from "@remix-run/cloudflare";

// Define a type for the User
type User = z.infer<typeof AuthenticatedUserSchema>;

// Define a union type for the action data
type ActionData = { user?: User; error?: string };

export default function Screen() {
	// Use the defined union type for actionData
	const actionData = useActionData<ActionData>();

	return (
		<UserLoginForm
			headerLabel="Login"
			headerDescription="Sign in to your account"
			backButtonLabel="Create an account"
			backButtonHref="/register"
			formError={actionData?.error}
		/>
	);
}

export const action = async ({
	request,
	context,
}: { request: Request; context: AppLoadContext }) => {
	const env = context.cloudflare.env;
	const sessionStorage = getSessionStorage(env);
	const { getSession, commitSession } = sessionStorage;
	const authenticator = createAuthenticator(context);

	const session = await getSession(request.headers.get("Cookie"));
	try {
		const user = await authenticator.authenticate("user-pass", request, {
			throwOnError: true,
			context, // Pass the context here
		});

		session.set("user", user);

		// Commit the session and set it in the response
		return redirect("/dashboard", {
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		});
	} catch (error) {
		// If authentication fails, return the error message
		return json({ error: (error as Error).message }, { status: 400 });
	}
};

export const loader = async ({
	request,
	context,
}: { request: Request; context: Bindings }) => {
	const authenticator = createAuthenticator(context);
	const checkUser = await authenticator.isAuthenticated(request, {
		successRedirect: DEFAULT_LOGIN_REDIRECT,
	});

	return checkUser;
};
