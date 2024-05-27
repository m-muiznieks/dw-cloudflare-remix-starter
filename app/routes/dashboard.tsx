import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const checkUser = await authenticator.isAuthenticated(request, {
		failureRedirect: "/login",
	});

	console.log("LOADER", checkUser);
	return checkUser;
};
export default function Dashboard() {
	return <div>Dashboard</div>;
}
