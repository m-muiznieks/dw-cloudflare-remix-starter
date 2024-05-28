import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
	return [{ title: "Remix and Hono on Vite" }];
};

// interface Props extends LoaderFunctionArgs {
// 	context: AppLoadContext;
// }

export const loader = async ({ context }: LoaderFunctionArgs) => {
	console.log("HONO CONTEXT", context.hono.env.NODE_ENV);
	const test = context.cloudflare.env.NODE_ENV;
	console.log("CLOUDFLARE TEST", test);

	// console.log("HONO VAR", c.env);
	// console.log("CF", context.cloudflare);

	return json({ myVar: test });
};

export default function Index() {
	const { myVar } = useLoaderData<typeof loader>();

	return (
		<div>
			<h1>Welcome Remix and Hono on Vite</h1>
			<ul>
				<li>Cloudflare: {myVar}</li>

				<li>
					<a href="/hono">Hono</a>
				</li>
			</ul>
			{/* biome-ignore lint/a11y/useAltText: <explanation> */}
			<img src="/assets/hono-logo.png" />
		</div>
	);
}
