import type { AppLoadContext, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
	return [{ title: "Remix and Hono on Vite" }];
};

export const loader = async (context: AppLoadContext) => {
	const { env } = context.cloudflare;
	const { NODE_ENV } = env;
	return json({ myVar: NODE_ENV });
};

export default function Index() {
	const { myVar } = useLoaderData<typeof loader>();

	return (
		<div>
			<h1>Welcome Remix and Hono on Vite</h1>
			<ul>
				<li>Remix, {myVar}</li>
				<li>
					<a href="/hono">Hono</a>
				</li>
			</ul>
			{/* biome-ignore lint/a11y/useAltText: <explanation> */}
			<img src="/assets/hono-logo.png" />
		</div>
	);
}
