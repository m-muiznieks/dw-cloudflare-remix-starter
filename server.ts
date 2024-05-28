import { Hono } from "hono";
import { poweredBy } from "hono/powered-by";
import honoMW from "middleware";
import { remix } from "remix-hono/handler";
import type { AppLoadContext } from "@remix-run/cloudflare";

export type Bindings = {
	DATABASE_URL: string;
	NODE_ENV: string;
	AUTH_SECRET: string;
};

export type Variables = {
	isLoggedIn: boolean;
};

type ContextEnv = {
	Bindings: Bindings;
	Variables: Variables;
	Cloudflare: AppLoadContext;
};

const server = new Hono<ContextEnv>().use(honoMW);

server.use(poweredBy());

server.use(async (c, next) => {
	//@ts-ignore
	const build = await import("./build/server/index.js");
	const currentMode: "development" | "production" =
		c.env.NODE_ENV === "production" ? "production" : "development";

	return remix({
		build: build,
		mode: currentMode,
		// @ts-ignore
		getLoadContext(c) {
			//const sessionstorage = getSessionStorage(c);

			return {
				cloudflare: {
					env: c.env as Bindings,
				},
				hono: c,
			};
		},
	})(c, next);
});

export default server;
