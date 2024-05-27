import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Outlet } from "@remix-run/react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	return null;
};
export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-col justify-center items-center h-screen w-screen">
			{children}
		</div>
	);
};
export default function AuthRoot() {
	return (
		<AuthLayout>
			<Outlet />
		</AuthLayout>
	);
}
