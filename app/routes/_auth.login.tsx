import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect, useActionData } from "@remix-run/react";
import { UserLoginForm } from "components/forms/auth/form-user-login";
import type { AuthenticatedUserSchema } from "schemas/user/user-auth-schema";
import type { z } from "zod";
import { authenticator } from "~/services/auth.server";
import { commitSession, getSession } from "../services/session.server";

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

export const action = async ({ request }: ActionFunctionArgs) => {
	const session = await getSession(request.headers.get("Cookie"));
	try {
		console.log("ACTION");
		const user = await authenticator.authenticate("user-pass", request, {
			throwOnError: true,
		});
		console.log("ACTION USER", user);

		session.set("user", user);

		// Commit the session and set it in the response
		return redirect("/dashboard", {
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		});
	} catch (error) {
		console.log("ACTION ERROR", error);

		// If authentication fails, return the error message
		return json({ error: (error as Error).message }, { status: 400 });
	}
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const checkUser = await authenticator.isAuthenticated(request, {
		successRedirect: "/dashboard",
	});

	return checkUser;
};
