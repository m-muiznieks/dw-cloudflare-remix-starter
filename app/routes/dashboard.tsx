import type { AppLoadContext, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { DEFAULT_LOGOUT_REDIRECT } from "routes";
import { createAuthenticator } from "~/services/auth.server";

interface Context extends LoaderFunctionArgs {
	context: AppLoadContext;
}
export const loader = async ({ request, context }: Context) => {
	const authenticator = createAuthenticator(context);
	const checkUser = await authenticator.isAuthenticated(request, {
		failureRedirect: DEFAULT_LOGOUT_REDIRECT,
	});
	console.log("checkUser", checkUser);
	return checkUser;
};
export default function Dashboard() {
	return <div>Dashboard</div>;
}
