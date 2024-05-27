import type { LinksFunction } from "@remix-run/cloudflare";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";

// @ts-expect-error shut up and import fonts!
import fonts from "./fonts.css?url";
// @ts-expect-error shut up and use tailwind!
import styles from "./tailwind.css?url";

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: styles },
	{ rel: "stylesheet", href: fonts },
];

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
