import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import type {
	AuthenticatedUserSchema,
	UserAuthSchema,
} from "schemas/user/user-auth-schema";
import { login } from "server-actions/auth/user-login";
import type { z } from "zod";
import { getSessionStorage } from "./session.server";
import type { AppLoadContext } from "@remix-run/cloudflare";

type AuthUser = z.infer<typeof AuthenticatedUserSchema>;
type PublicUser = z.infer<typeof UserAuthSchema>;

export const createAuthenticator = (context: AppLoadContext) => {
	const sessionStorage = getSessionStorage(context);

	const authenticator = new Authenticator<AuthUser | PublicUser>(
		sessionStorage,
		{
			throwOnError: true,
		},
	);

	authenticator.use(
		new FormStrategy(async ({ form, context }) => {
			if (!context) {
				throw new Error("Unexpected error (ctx).");
			}

			let email = form.get("email");
			let password = form.get("password");
			if (!email || !password) {
				throw new Error("Email and password are required");
			}

			email = email.toString().toLowerCase().trim();
			password = password.toString();

			const user = await login({ email, password }, context);
			if ("error" in user) {
				throw new Error(user.error);
			}

			return user;
		}),
		"user-pass",
	);

	return authenticator;
};
