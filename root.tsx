import {
	type LinksFunction,
	type LoaderFunctionArgs,
	json,
} from "@remix-run/cloudflare";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";

import fonts from "./fonts.css?url";
import styles from "./tailwind.css?url";

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: styles },
	{ rel: "stylesheet", href: fonts },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const q = url.searchParams.get("q");
	return json({ q });
};

interface Props {
	children: React.ReactNode;
}

export function Layout({ children }: Props) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="font-inter">
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return (
		<Layout>
			<Outlet />
		</Layout>
	);
}
