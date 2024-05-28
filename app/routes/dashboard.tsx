import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { DEFAULT_LOGOUT_REDIRECT } from "routes";
import { createAuthenticator } from "~/services/auth.server";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
	const authenticator = createAuthenticator(context);
	const checkUser = await authenticator.isAuthenticated(request, {
		failureRedirect: DEFAULT_LOGOUT_REDIRECT,
	});

	return checkUser;
};
export default function Dashboard() {
	return <div>Dashboard</div>;
}
