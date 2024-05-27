import type { AppLoadContext, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { createAuthenticator } from "~/services/auth.server";

interface Context extends LoaderFunctionArgs {
	context: AppLoadContext;
}
export const loader = async ({ request, context }: Context) => {
	const authenticator = createAuthenticator(context);
	const checkUser = await authenticator.isAuthenticated(request, {
		failureRedirect: "/login",
	});

	return checkUser;
};
export default function Dashboard() {
	return <div>Dashboard</div>;
}
