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

app.use(poweredBy());

app.use(async (c, next) => {
	//@ts-ignore
	const serverBuild = await import("./build/server/index.js");

	return remix({
		build: serverBuild,
		mode: "production",
		// @ts-ignore
		getLoadContext(c) {
			return {
				cloudflare: {
					env: c.env,
				},
			};
		},
	})(c, next);
});

export default app;
