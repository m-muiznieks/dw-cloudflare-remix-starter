import { Hono } from "hono";
import { poweredBy } from "hono/powered-by";
import honoMW from "middleware";
import { remix } from "remix-hono/handler";

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		NODE_ENV: string;
		AUTH_SECRET: string;
	};
}>().use(honoMW);

//let handler: RequestHandler | undefined;

app.use(poweredBy());

app.use(
	// async (c, next) => {
	// 	if (process.env.NODE_ENV !== "development") {
	// 		return staticAssets()(c, next);
	// 	}
	// 	await next();
	// },
	async (c, next) => {
		// if (process.env.NODE_ENV !== "development") {
		//@ts-ignore
		const serverBuild = await import("./build/server/index.js");

		return remix({
			build: serverBuild,
			mode: "production",
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			getLoadContext(c) {
				return {
					cloudflare: {
						env: c.env,
					},
				};
			},
		})(c, next);

		// } else {
		// 	if (!handler) {
		// 		const build = await import("build/server/index");
		// 		const { createRequestHandler } = await import("@remix-run/cloudflare");
		// 		handler = createRequestHandler(build, "development");
		// 	}
		// 	const remixContext = {
		// 		cloudflare: {
		// 			env: c.env,
		// 		},
		// 	} as unknown as AppLoadContext;
		// 	return handler(c.req.raw, remixContext);
		// }
	},
);

export default app;
